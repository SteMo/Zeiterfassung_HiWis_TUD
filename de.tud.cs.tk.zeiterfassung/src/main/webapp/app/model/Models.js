/* Warum hier proxy? Setzt Standardproxy, muss dann nicht von Stores immer gesetzt werden, nur wenn mehrere Stores selbes model benutzen und sich RÃ¼ckgabe unterscheidet  */

// Lets override JsonP-Proxy to change "records="
Ext.define('Ext.data.proxy.JsonP', {
    extend: 'Ext.data.proxy.Server',
    alternateClassName: 'Ext.data.ScriptTagProxy',
    alias: ['proxy.jsonp', 'proxy.scripttag'],
    requires: ['Ext.data.JsonP'],

    defaultWriterType: 'base',

    /**
     * @cfg {String} callbackKey
     * See {@link Ext.data.JsonP#callbackKey}.
     */
    callbackKey : 'callback',

    /**
     * @cfg {String} recordParam
     * The param name to use when passing records to the server (e.g. 'records=someEncodedRecordString'). Defaults to
     * 'records'
     */
    recordParam: 'records',

    /**
     * @cfg {Boolean} autoAppendParams
     * True to automatically append the request's params to the generated url. Defaults to true
     */
    autoAppendParams: true,

    constructor: function(){
        this.addEvents(
            /**
             * @event
             * Fires when the server returns an exception
             * @param {Ext.data.proxy.Proxy} this
             * @param {Ext.data.Request} request The request that was sent
             * @param {Ext.data.Operation} operation The operation that triggered the request
             */
            'exception'
        );
        this.callParent(arguments);
    },

    /**
     * @private
     * Performs the read request to the remote domain. JsonP proxy does not actually create an Ajax request,
     * instead we write out a <script> tag based on the configuration of the internal Ext.data.Request object
     * @param {Ext.data.Operation} operation The {@link Ext.data.Operation Operation} object to execute
     * @param {Function} callback A callback function to execute when the Operation has been completed
     * @param {Object} scope The scope to execute the callback in
     */
    doRequest: function(operation, callback, scope) {
        //generate the unique IDs for this request
        var me      = this,
            writer  = me.getWriter(),
            request = me.buildRequest(operation),
            params = request.params;

        if (operation.allowWrite()) {
            request = writer.write(request);
        }

        // apply JsonP proxy-specific attributes to the Request
        Ext.apply(request, {
            callbackKey: me.callbackKey,
            timeout: me.timeout,
            scope: me,
            disableCaching: false, // handled by the proxy
            callback: me.createRequestCallback(request, operation, callback, scope)
        });

        // prevent doubling up
        if (me.autoAppendParams) {
            request.params = {};
        }

        request.jsonp = Ext.data.JsonP.request(request);
        // restore on the request
        request.params = params;
        operation.setStarted();
        me.lastRequest = request;

        return request;
    },

    /**
     * @private
     * Creates and returns the function that is called when the request has completed. The returned function
     * should accept a Response object, which contains the response to be read by the configured Reader.
     * The third argument is the callback that should be called after the request has been completed and the Reader has decoded
     * the response. This callback will typically be the callback passed by a store, e.g. in proxy.read(operation, theCallback, scope)
     * theCallback refers to the callback argument received by this function.
     * See {@link #doRequest} for details.
     * @param {Ext.data.Request} request The Request object
     * @param {Ext.data.Operation} operation The Operation being executed
     * @param {Function} callback The callback function to be called when the request completes. This is usually the callback
     * passed to doRequest
     * @param {Object} scope The scope in which to execute the callback function
     * @return {Function} The callback function
     */
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;

        return function(success, response, errorType) {
            delete me.lastRequest;
            me.processResponse(success, operation, request, response, callback, scope);
        };
    },

    // inherit docs
    setException: function(operation, response) {
        operation.setException(operation.request.jsonp.errorType);
    },


    /**
     * Generates a url based on a given Ext.data.Request object. Adds the params and callback function name to the url
     * @param {Ext.data.Request} request The request object
     * @return {String} The url
     */
    buildUrl: function(request) {
        var me      = this,
            url     = me.callParent(arguments),
            params  = Ext.apply({}, request.params),
            filters = params.filters,
            records,
            filter, i;

        delete params.filters;

        if (me.autoAppendParams) {
            url = Ext.urlAppend(url, Ext.Object.toQueryString(params));
        }

        if (filters && filters.length) {
            for (i = 0; i < filters.length; i++) {
                filter = filters[i];

                if (filter.value) {
                    url = Ext.urlAppend(url, filter.property + "=" + filter.value);
                }
            }
        }

        //if there are any records present, append them to the url also
        records = request.records;

        if (Ext.isArray(records) && records.length > 0) {
            url = Ext.urlAppend(url, Ext.String.format("{0}", me.encodeRecords(records)));
        }

        return url;
    },

    //inherit docs
    destroy: function() {
        this.abort();
        this.callParent();
    },

    /**
     * Aborts the current server request if one is currently running
     */
    abort: function() {
        var lastRequest = this.lastRequest;
        if (lastRequest) {
            Ext.data.JsonP.abort(lastRequest.jsonp);
        }
    },

    /**
     * Encodes an array of records into a string suitable to be appended to the script src url. This is broken out into
     * its own function so that it can be easily overridden.
     * @param {Ext.data.Model[]} records The records array
     * @return {String} The encoded records string
     */
    encodeRecords: function(records) {
        var encoded = "",
            i = 0,
            len = records.length;

        for (; i < len; i++) {
            encoded += Ext.Object.toQueryString(records[i].data);
        }

        return encoded;
    }
});

/**
 * ! Wenn sich etwas am Model Ã¤ndert mÃ¼ssen evtl auch andere Stellen angepasst werden, da diese 
 * auf die Felder ja zugreifen (z.B. die Detail-Fenster zu Personen bei Doppelklick @ Controller) 
 * */

Ext.define('AM.model.Fachgebiete', {
    extend: 'Ext.data.Model',
    fields:['name'],
	proxy: {
	    type: 'jsonp',
	    url: 'ws/fachgebiete',
	    reader: {
	        type: 'json',
	        root: 'results'
	    }
	}
});

Ext.define('AM.model.Personentypen', {
    extend: 'Ext.data.Model',
    fields:['name'],
    proxy: {
        type: 'ajax',
        url: 'resources/data/personentypen.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});

Ext.define('AM.model.ZeitDiagramm', {
    extend: 'Ext.data.Model',
    fields:['geleisteteArbeit', 'ist', 'soll'],
    proxy: {
        type: 'jsonp',
        url: 'ws/aufgaben/geleistet',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});


Ext.define('AM.model.Personen', {
    extend: 'Ext.data.Model',
    fields:['id', 'name', 'fachgebiet', 'position', 'supervisor', 'surname', 'givenname'],
    proxy: {
        type: 'jsonp',
        url: 'ws/personen',
        format: 'json',
       // reader: {
       //     type: 'json',
       //     root: 'results',
       //     totalProperty: 'total'
       // }
       api: {
           create: 'ws/personen/insert', // Called when saving new records
           read: 'ws/personen',
           destroy: 'ws/personen/ID' //id muss sobald bekannt hier gesetzt werden, z.B. in view/personen/Admin.js
        },
       reader: new Ext.data.JsonReader({
           root: 'results',
           id: 'id',
           fields: ['name', 'fachgebiet', 'position', 'supervisor', 'id',]
       }),
       writer: {
		    type: 'json',
                    fields: ['fachgebiet', 'position', 'supervisor', 'id', 'surname', 'givenname']
		} 
    }
});

Ext.define('AM.model.fachgebiete.FachgebieteData', {
    extend: 'Ext.data.Model',
    fields:['id', 'name', 'budget', 'leiter', 'stellvertreter'],
    proxy: {
		type: 'jsonp',
		api: {
            create: 'ws/fachgebiete/insert', // Called when saving new records
            read: 'ws/fachgebiete', // Called when reading existing records
            update: 'ws/fachgebiete/update', // Called when updating existing records
            destroy: 'ws/fachgebiete/delete' // Called when deleting existing records
		},        
		reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
		},
		writer: {
		    type: 'json'
		}  
    }
});

/* ################## Menü ################### */
Ext.define('AM.model.MenuModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'handler',type: 'string'},
        {name: 'xtype',type: 'string'}
    ],
    
    proxy: {
        type: 'jsonp',
        url: 'ws/menu',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});


/* ################## Columns (ContentGrid) ################### */
Ext.define('AM.model.ColumnsFachgebiete', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'handler',type: 'string'},
        {name: 'xtype',type: 'string'}
    ],
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/columnsFachgebiete.json',
        reader: {
            type: 'json',
            root: 'columns'
        }
    }    
});


/* ################## HiWi ################### */
Ext.define('AM.model.DashboardData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'priority', type: 'int'},
        {name: 'deadline', type: 'date', dateFormat: 'd.m.y'},
        {name: 'title',type: 'string'},
        {name: 'assignedFrom',type: 'string'},
        {name: 'assignedAt',type: 'date', dateFormat: 'd.m.y'},
        {name: 'worked',type: 'string'}
    ],
    
    proxy: {
        // type: 'ajax',
        // url: 'resources/data/dashboardData.json',
        type: 'jsonp',
        url: 'ws/aufgaben',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});

Ext.define('AM.model.TaskDetails', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int', useNull: true},
        {name: 'date', type: 'date', dateFormat: 'd.m.y'},
        {name: 'worked',type: 'string'},
        {name: 'description', type: 'string'},       
    ],
    
    proxy: {
        type: 'jsonp',
        api: {
            create: 'ws/aufgabendetails/insert', // Called when saving new records
            read: 'ws/aufgabendetails', // Called when reading existing records
            update: 'ws/aufgabendetails/update', // Called when updating existing records
            destroy: 'ws/aufgabendetails/delete' // Called when deleting existing records
        },        
        reader: {
            type: 'json',
            root: 'results'
        },
        writer: {
            type: 'json'
        }        
    }    
});


/* ################## Mitarbeiter ################### */

Ext.define('AM.model.MitarbeiterDashboardInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'budget', type: 'int'},
        {name: 'vorgesetzter', type: 'string'},
        {name: 'fachgruppe', type: 'string'},
        {name: 'aktiveHiwis', type: 'int'},        
        {name: 'aktiveAufgaben', type: 'int'},
    ],    
    proxy: {
        type: 'jsonp',
		api: {
			read: 'ws/aufgaben', // Called when reading existing records
		},        
		reader: {
		    type: 'json',
		    root: 'results',
		},              
    } 
});


Ext.define('AM.model.HiWiAufgabe', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'supervisor', type: 'string'},
        {name: 'hiwi', type: 'string'},        
        {name: 'deadline', type: 'date', dateFormat: 'd.m.y'},
        {name: 'assignedAt', type: 'date', dateFormat: 'd.m.y'},
        {name: 'priority', type: 'int'},
        {name: 'status', type: 'string'}
    ],    
    proxy: {
        type: 'jsonp',
		api: {
		    create: 'ws/aufgaben/insert', // Called when saving new records
		    read: 'ws/aufgaben', // Called when reading existing records
		    update: 'ws/aufgaben/update', // Called when updating existing records
		    destroy: 'ws/aufgaben/delete' // Called when deleting existing records
		},        
		reader: {
		    type: 'json',
		    root: 'results',
		},
		writer: {
		    type: 'json',
		},
                
    }    
});

Ext.define('AM.model.HiWiVertrag', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'hiwi', type: 'string'},     
        {name: 'hiwiMail', type: 'string'},
        {name: 'supervisor', type: 'string'},        
        {name: 'begin', type: 'date', dateFormat: 'd.m.y'},
        {name: 'end', type: 'date', dateFormat: 'd.m.y'},
        {name: 'hoursPerMonth', type: 'int'},
        {name: 'remainingHours',type: 'int'},	/* noch zu verrichtende Stunden */
        {name: 'remainingTasks',type: 'string'}, /* ich denke so im Stil: x/y (also x von y offen), nur sortieren im Grid wird dann evtl schwierig */
        {name: 'rate', type: 'string'} /* Tarifgruppe */
    ],    
    proxy: {
        type: 'jsonp',
		api: {
		    create: 'ws/vertraege/insert', // Called when saving new records
		    read: 'ws/vertraege', // Called when reading existing records
		    update: 'ws/vertraege/update', // Called when updating existing records
		    destroy: 'ws/vertraege/delete' // Called when deleting existing records
		},        
		reader: {
		    type: 'json',
		    root: 'results',
		},
		writer: {
		    type: 'json'
		}  
    }    
});

Ext.define('AM.model.HiwiTarifgruppe', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'group', type: 'string'},        
    ],    
    proxy: {
        type: 'jsonp',
        url: 'ws/tarife',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});



Ext.define('AM.model.PersonenZuweisung', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'name', type: 'string'},        
    ],    
    proxy: {
        type: 'jsonp',
        url: 'ws/personen',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});

Ext.define('AM.model.PersonenTitel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'title', type: 'string'},        
    ],    
    proxy: {
        type: 'ajax',
        url: 'resources/data/personenTitel.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});

Ext.define('AM.model.PersonenPosition', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'position', type: 'string'},        
    ],    
    proxy: {
        type: 'ajax',
        url: 'resources/data/personenPosition.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});


/* ################## Admin ################### */
Ext.define('AM.model.PersonData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'givenname', type: 'string'},
        {name: 'surname', type: 'string'},
        {name: 'fachgebiet', type: 'string'},        
        {name: 'position', type: 'string'},
        {name: 'supervisor', type: 'string'},
        {name: 'openid', type: 'string'},
        {name: 'status', type: 'string'}
    ],    
    proxy: {
    	type: 'jsonp',
		api: {
		    create: 'ws/personen/insert', // Called when saving new records
		    read: 'ws/personen',
		},        
		reader: {
		    type: 'json',
		    root: 'results'
		},
		writer: {
		    type: 'json'
		}  
    }    
});


/* ################## LoggedInPerson ################### */
Ext.define('AM.model.LoggedInPerson', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
    ],    
    proxy: {
        type: 'jsonp',
        url: 'ws/whoami',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    	  
});



Ext.define('AM.model.Status', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', name: 'erledigt'},
    ],    

	proxy: {
	    type: 'ajax',
	    url: 'resources/data/statusData.json',
	    reader: {
	        type: 'json',
	        root: 'results'
	    }
	}
});


