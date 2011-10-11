Ext.define('AM.view.dashboard.HiWiTaskDetailsWindow', {
    extend: 'Ext.window.Window',

    id: 'taskDetailsWindow',
    
    width: 700,
    height: 500,
    
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Aufgaben: Übersicht & Stunden eintragen',

    initComponent: function(arguments) {
    	this.addEvents('create');
    	this.addEvents('itemsLoaded2');
    	var me = this;
    	
    	console.log("Gewählte Aufgabe (id): " + this.chosenTask);
    	
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
    	// store hier, weil wir auf ihn referenzieren müssen
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.TaskDetails',
            sorters: [{
                    property: 'date',
                    direction: 'ASC',
            }]
        });         	  
        
        /* setze den Proxy entsprechend auf den konkreten Task für read/update/delete, Model wird vorher geladen, kann da also
         * so nicht einfach schon rein. Vielleicht könnte man es oben direkt beim store create machen, aber so wie hier geht es
         * jedenfalls auch. */
        store.getProxy().api.read = 'ws/aufgabendetails/'+this.chosenTask; // Called when reading existing records
        store.getProxy().api.update= 'ws/aufgabendetails/update/'+this.chosenTask; // Called when updating existing records
        store.getProxy().api.destroy= 'ws/aufgabendetails/remove/'+this.chosenTask; // Called when deleting existing records       
        store.getProxy().api.create = 'ws/aufgabendetails/insert/'+this.chosenTask; // Called when adding
        store.load(); 	  
        
    	
    	
        /* muss wegen OpenID so gemacht werden, bei insert können wir über OpenID nicht gehen */
        var storeGetIdOfLoggedInPerson  = Ext.create('Ext.data.Store', {
            autoLoad: false,
            autoSync: true,
            model: 'AM.model.LoggedInPerson',  
        });         
        storeGetIdOfLoggedInPerson.load(function(records, operation, success) {
            console.log("Person id: " + storeGetIdOfLoggedInPerson.getAt(0).get("id"));  
            (Ext.ComponentQuery.query('#authorID')[0]).setValue(storeGetIdOfLoggedInPerson.getAt(0).get("id"));
    	});        

    	
    	me.items = [
            {
                xtype: 'form',
                id: 'formAdd',
                layout: {
                    type: 'auto',
                },
                height: 140,
                bodyPadding: 10,
//                title: 'Arbeitszeit eintragen',
                flex: 0,
                
                listeners: {
                    // hier wird auf das "create" event gehört und ein neuer Datensatz per Post an die im Model definierte Adresse geschickt
                	create: function(form, data){
                    	store.insert(0, new AM.model.TaskDetails({	                    		 
			                    			date: data.edDate,
			                    			worked: data.edHours,
			                    			description: data.edDescription
			                    		}));
            			/* refresh grid */
                		(Ext.ComponentQuery.query('#hiwiTaskDetails')[0]).getStore().load(function(records, operation, success) {
	                		var store2 = Ext.data.StoreManager.lookup('zeitDiagrammStore');
	                		store2.load(function(records, operation, success) {
	                              (Ext.ComponentQuery.query('#geleisteteStunden')[0]).setValue(store2.getAt(0).get("ist")); 
	                		});
                		});
                    },
                },                
                items: [
                    {
                        xtype: 'hiddenfield',
                        itemId: 'authorID',
                        name: 'authorID',
                    },                        
                    {
                        xtype: 'datefield',
                        name: 'edDate',
                        itemId: 'edDate',                        
                        fieldLabel: 'Datum',
                        format: 'd.m.y',
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'edHours',
                        itemId: 'edHours',
                        fieldLabel: 'Stunden',
                        allowBlank: false,
                        allowNegative: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textfield',
                        name: 'edDescription',
                        itemId: 'edDescription',
                        fieldLabel: 'Beschreibung',
                        anchor: '100%'
                    }
                ],
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        anchor: '100%',
                        dock: 'bottom',
                        items: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnStundenEintragen',
                                    text: 'Stunden eintragen',
                                    icon: 'resources/images/drop-add.gif',
                                    handler: function(){
                                    	console.log("TaskDetailsWindow > onCreate");
                                        var form = me.getComponent("formAdd").getForm();
                                        // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                                        if (form.isValid()) {
                                        	me.getComponent("formAdd").fireEvent('create', me.getComponent("formAdd"), form.getValues());
                                            form.reset();
                                        }
                                    }
                                }, '-',                                
                            {
                                xtype: 'button',
                                itemId: 'btnReset',
                                text: 'Reset',
                                icon: 'resources/images/Arrow_undo.png',
                                handler: function(){
//                                    this.setActiveRecord(null);
                                    me.getComponent("formAdd").getForm().reset();
                                }
                            },

                        ]
                    }
                ],
                            
            },
             {
                xtype: 'gridpanel',
                itemId: 'taskDetailsGrid',
                title: 'Übersicht der geleisteten Stunden',
                margin: '10 0 0 0',
                flex: 1,
                store: store,
                columns: [
                    {
                        xtype: 'datecolumn',
                        width: 97,
                        dataIndex: 'date',
                        text: 'Datum',
                        format: 'd.m.y',
                        field: {
                            xtype: 'datefield',
                            format: 'd.m.y',
                        }                        
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'worked',
                        text: 'Stunden',
                        format: '0.00',
                        allowNegative: false,
                        field: {
                            xtype: 'textfield'
                        }                        
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 491,
                        dataIndex: 'description',
                        text: 'Tätigkeit',
                        maxLength: 255,
                        field: {
                            xtype: 'textfield'
                        }
                    }
                ],
                plugins: [rowEditing],
                viewConfig: {

                },
                dockedItems: [{
                              xtype: 'toolbar',
                              dock: 'bottom',
                              items: [{
                                  itemId: 'delete',
                                  text: 'Stunden löschen',
                                  icon: 'resources/images/Delete-silk.png',
                                  disabled: true,
                                  /* das hier muss vermutlich über den Controller gemacht werden, this.getView() geht hier nicht... */
                                  handler: function(){
                                	  var grid = me.getComponent('taskDetailsGrid');
                                      var selection = grid.getView().getSelectionModel().getSelection()[0];
                                      console.log(selection);
                                      Ext.Msg.confirm('Löschen bestätigen', 'Sollen die eingetragenen ' + selection.data.worked + ' Stunden wirklich gelöscht werden?',
                              		  		function(btn, text){
                          	    				if (btn == 'yes'){
    	                                              if (selection) {                     	                                            	   
    	                                            	  Ext.Ajax.request({
        	                                      			url : 'ws/aufgabendetails/remove/'+this.chosenTask, 
        	                                      			params : { id : selection.data.id },
        	                                      			method: 'GET',
        	                                      			success: function ( result, request ) { 
        	                                      				Ext.MessageBox.alert('Success', 'Die Stunden wurden erfolgreich aus der Datenbank entfernt.');
          	                                      				/* refresh grid */
          	                                      				grid.getStore().load(function(records, operation, success) {
          	                                      					var store3 = Ext.data.StoreManager.lookup('zeitDiagrammStore');
          	                                      					store3.load();
          	                                      					store3.load(function(records, operation, success) {
          	                                      						(Ext.ComponentQuery.query('#geleisteteStunden')[0]).setValue(store3.getAt(0).get("ist"));
          	                                      					});	
          	                                      				});
        	                                      			},
        	                                      			failure: function ( result, request) { 
        	                                      				Ext.MessageBox.alert('Failed', 'Die Stunden konnten nicht aus der Datenbank entfernt werden!'); 
        	                                      			} 
    	                                            	  }); 
    	                                            	  
  	                                              }            	                                            	    					
    	                                          	}            	                                            	    				
                                      }); 
                                  }
                              }]
            }]
            }
        ];
        me.callParent(arguments);
    },
    

    
//    // override initEvents
//    initEvents: function() {
//        // call the superclass's initEvents implementation
//        this.callParent();
//
//        // now add application specific events
//        // notice we use the selectionmodel's rowselect event rather
//        // than a click event from the grid to provide key navigation
//        // as well as mouse navigation
//        var grid = this.getComponent('taskDetailsGrid').getSelectionModel();
//        console.log("grid: ");
//        console.log(grid);
//        grid.on('selectionchange', this.onRowSelect, this);
//    },
//    // add a method called onRowSelect
//    // This matches the method signature as defined by the 'rowselect'
//    // event defined in Ext.selection.RowModel
//    onRowSelect: function(sm, rs) {
//        // getComponent will retrieve itemId's or id's. Note that itemId's
//        // are scoped locally to this instance of a component to avoid
//        // conflicts with the ComponentManager
//
//    }    
});