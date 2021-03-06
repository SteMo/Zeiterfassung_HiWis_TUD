Ext.define('AM.view.personen.AdminEditPersonWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.adminEditPersonWindow',
    
    width: 500,
    bodyPadding: '',
    title: 'Person editieren',

    initComponent: function() {
        var me = this;
        
        /* muss wegen OpenID so gemacht werden, bei insert können wir über OpenID nicht gehen */
        var storeGetIdOfLoggedInPerson  = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.LoggedInPerson',  
        });         
        storeGetIdOfLoggedInPerson.load(function(records, operation, success) {
            console.log("Person id: " + storeGetIdOfLoggedInPerson.getAt(0).get("id"));  
            (Ext.ComponentQuery.query('#authorID')[0]).setValue(storeGetIdOfLoggedInPerson.getAt(0).get("id"));
    	});
        var fgds = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'AM.model.fachgebiete.FachgebieteData',            
        });        
        var storePersonenPosition = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.PersonenPosition',  
        });                
        var ds = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'AM.model.Personen',  
        });        
        
        me.items = [
            {
                xtype: 'form',
                itemId: 'formPersonUpd',
                bodyPadding: 10,
                fieldDefaults: {
                	anchor: '100%',
                },
                listeners: {
                	update: function(form, data){
                		console.log("Person ID: " + data.personID);
                		Ext.Ajax.request({
                			url : 'ws/personen/update' , 
                			params : { id : data.personID, givenname : data.edVorname, surname : data.edNachname, fachgebiet : data.cbFachgebiet, position : data.cbHiwi, supervisor : data.cbVorgesetzter, ident : data.edOpenID },
                			method: 'GET',
                			success: function ( result, request ) { 
                        		Ext.Msg.alert('Status', data.edVorname + " " + data.edNachname + " wurde erfolgreich aktualisiert!");
                    			/* refresh grid, doppelt, dann tut es extJS sogar meistens... */
                        		(Ext.ComponentQuery.query('#adminGrid')[0]).getStore().load(function(records, operation, success) {});
                			},
                			failure: function ( result, request) { 
                				Ext.MessageBox.alert('Failed', "Die Aktualisierung von " + data.edVorname + " " + data.edNachname + " ist fehlgeschlagen!"); 
                			} 
                		});                		
                		
//                		ds.insert(0, data);
                    }
                },                  
                items: [
                        {
                            xtype: 'hiddenfield',
                            itemId: 'authorID',
                            name: 'authorID',
                        },                                
                        {
                            xtype: 'hiddenfield',
                            itemId: 'personID',
                            name: 'personID',
                        },    
	                    {
	                        xtype: 'textfield',
	                        name: 'edVorname',
	                        itemId: 'name',
	                        fieldLabel: 'Vorname',
	                        allowBlank: false,
	                        anchor: '100%',
	                        margin: '20 0 10 0',
	                    },       
	                    {
	                        xtype: 'textfield',
	                        name: 'edNachname',
	                        itemId: 'surname',
	                        fieldLabel: 'Nachname',
	                        allowBlank: false,
	                        anchor: '100%',
	                        margin: '0 0 20 0',
	                    },   
                        {
                            xtype: 'combobox',
                            name: 'cbFachgebiet',
                            itemId: 'department',
                            fieldLabel: 'Fachgebiet',
                            store: fgds,
                            displayField: 'name',
                            valueField: 'name',
                            typeAhead: false,
//                            hideLabel: true,
                            hideTrigger:true,        		                            
                            anchor: '100%',
                            // override default onSelect to do redirect      		                            
                        },
                        {
	                        xtype: 'combobox',
	                        name: 'cbHiwi',
	                        itemId: 'position',
	                        fieldLabel: 'Position',
	                        store: storePersonenPosition,
//	                        queryMode: 'local',
	                        displayField: 'position',
	                        valueField: 'position',
	                        allowBlank: false,
	                        anchor: '50%'
                        },
                        {
                            xtype: 'combobox',
                            name: 'cbVorgesetzter',
                            itemId: 'supervisor',
                            fieldLabel: 'Vorgesetzter',
                            store: ds,
                            displayField: 'name',
                            valueField: 'id',
                            typeAhead: false,
//                            hideLabel: true,
                            hideTrigger:true,        		                            
                            anchor: '100%',
                            renderer: getPerson,
                        },
	                    {
	                        xtype: 'textfield',
	                        name: 'edOpenID',
	                        itemId: 'openID',
	                        fieldLabel: 'OpenID',
	                        allowBlank: false,
	                        anchor: '100%',
	                        margin: '20 0 10 0',
	                    },  
                ]
            }
        ];
        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    {
						   xtype: 'tbfill'
					  },                                
                    {
                        xtype: 'button',
                        itemId: 'btnSaveTaskChanges',
                        text: 'Änderungen speichern',
                        icon: 'resources/images/Icons-mini-action_save.gif',
                        handler: function(){
                        	console.log("TaskDetailsWindow > onCreate");
                            var form = me.getComponent("formPersonUpd").getForm();
                            // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                            if (form.isValid()) {
                            	me.getComponent("formPersonUpd").fireEvent('update', me.getComponent("formPersonUpd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});
