Ext.define('AM.view.aufgaben.MitarbeiterTaskEditWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.mitarbeiterTaskEditWindow',
    
    width: 500,
    bodyPadding: '',
    title: 'Aufgaben: Details & Editieren',

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
        statusStore = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'AM.model.Status',  
        });  
        
        me.items = [
            {
                xtype: 'form',
                itemId: 'formTaskUpd',
                bodyPadding: 10,
                fieldDefaults: {
                	anchor: '100%',
                },
                listeners: {
                	update: function(form, data){
                		Ext.Ajax.request({
                			url : 'ajax.php' , 
                			params : { id : data.id, title : data.title, description : data.description, hiwi : data.hiwi, assignedOn : data.assignedOn, deadline : data.deadline },
                			method: 'PUT',
                			success: function ( result, request ) { 
                        		Ext.Msg.alert('Status', "Die Aufgabe '" + data.title + "' wurde erfolgreich aktualisiert!");
                			},
                			failure: function ( result, request) { 
                				Ext.MessageBox.alert('Failed', "Die Aktualisierung der Aufgabe '" + data.title + "' ist fehlgeschlagen!"); 
                			} 
                		});                		                		
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
                        itemId: 'mitarbeiterTaskEditWindowId',
                        name: 'id',
                    },                            
                    {
                        xtype: 'textfield',
                        itemId: 'mitarbeiterTaskEditWindowTitle',
                        name: 'title',
                        fieldLabel: 'Titel',
                        allowBlank: false,
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'mitarbeiterTaskEditWindowDescription',
                        name: 'description',
                        fieldLabel: 'Beschreibung'
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'mitarbeiterTaskEditWindowHiwi',
                        name: 'hiwi',
                        fieldLabel: 'Zugewiesen zu',
                        store: 'PersonenZuweisung',
                        displayField: 'name',
                        valueField: 'name',                        
//                        queryMode: 'local',
                        allowBlank: false,
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'mitarbeiterTaskEditWindowAssignedOn',
                        name: 'assignedOn',
                        fieldLabel: 'Zugewiesen am',
                        format: 'd.m.y',
                    },
                    {
                        xtype: 'datefield',
                        name: 'deadline',
                        itemId: 'mitarbeiterTaskEditWindowDeadline',
                        fieldLabel: 'Deadline',
                        format: 'd.m.y',
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'mitarbeiterTaskEditWindowErledigt',
                        name: 'hiwi',
                        fieldLabel: 'Erledigt',
                        store: statusStore,
                        displayField: 'erledigt',
                        valueField: 'erledigt',                        
                        allowBlank: false,
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
                            var form = me.getComponent("formTaskUpd").getForm();
                            // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                            if (form.isValid()) {
                            	me.getComponent("formTaskUpd").fireEvent('update', me.getComponent("formTaskUpd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});