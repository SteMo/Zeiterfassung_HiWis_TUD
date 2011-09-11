/* Warum hier proxy? Setzt Standardproxy, muss dann nicht von Stores immer gesetzt werden, nur wenn mehrere Stores selbes model benutzen und sich RÃ¼ckgabe unterscheidet  */

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


Ext.define('AM.model.Personen', {
    extend: 'Ext.data.Model',
    fields:['id', 'name', 'fachgebiet', 'position', 'supervisor'],
    proxy: {
        type: 'jsonp',
        url: 'ws/personen',
        format: 'json',
       // reader: {
       //     type: 'json',
       //     root: 'results',
       //     totalProperty: 'total'
       // }
       reader: new Ext.data.JsonReader({
           root: 'results',
           id: 'id',
           fields: ['name', 'fachgebiet', 'position', 'supervisor', 'id']
       })
    }
});

Ext.define('AM.model.fachgebiete.FachgebieteData', {
    extend: 'Ext.data.Model',
    fields:['id', 'name', 'budget', 'leiter', 'stellv'],
    proxy: {
        type: 'jsonp',
        url: 'ws/fachgebiete',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
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
        type: 'rest',
        api: {
            create: 'test', // Called when saving new records
            read: 'resources/data/dashboardTaskDetails.json', // Called when reading existing records
            update: 'myBackend.php?action=update', // Called when updating existing records
            destroy: 'myBackend.php?action=destroy' // Called when deleting existing records
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

Ext.define('AM.model.HiWiAufgabe', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'title', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'supervisor', type: 'string'},
        {name: 'hiwi', type: 'string'},        
        {name: 'deadline', type: 'date', dateFormat: 'd.m.y'},
        {name: 'assignedOn', type: 'date', dateFormat: 'd.m.y'},
        {name: 'priority', type: 'int'},
        {name: 'status', type: 'string'}
    ],    
    proxy: {
        type: 'ajax',
        url: 'resources/data/hiwiAufgaben.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});

Ext.define('AM.model.HiWiVertrag', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'hiwi', type: 'string'},        
        {name: 'supervisor', type: 'string'}, /* seine ID */        
        {name: 'begin', type: 'date', dateFormat: 'd.m.y'},
        {name: 'end', type: 'date', dateFormat: 'd.m.y'},
        {name: 'hoursPerMonth', type: 'int'},
        {name: 'remainingHours',type: 'int'},	/* noch zu verrichtende Stunden */
        {name: 'rate', type: 'string'} /* Tarifgruppe */
    ],    
    proxy: {
        type: 'ajax',
        url: 'resources/data/hiwiVertraege.json',
        reader: {
            type: 'json',
            root: 'results'
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
        type: 'ajax',
        url: 'resources/data/hiwiTarifgruppen.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});



