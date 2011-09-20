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
        
        me.items = [
            {
                xtype: 'form',
                bodyPadding: 10,
                fieldDefaults: {
                	anchor: '100%',
                },
                items: [
                    {
                        xtype: 'hiddenfield',
                        itemId: 'authorID',
                        name: 'authorID',
                    },                        
                    {
                        xtype: 'textfield',
                        itemId: 'mitarbeiterTaskEditWindowTitle',
                        fieldLabel: 'Titel',
                        allowBlank: false,
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'mitarbeiterTaskEditWindowDescription',
                        fieldLabel: 'Beschreibung'
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'mitarbeiterTaskEditWindowHiwi',
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
                        fieldLabel: 'Zugewiesen am',
                        format: 'd.m.y',
                    },
                    {
                        xtype: 'datefield',
                        itemId: 'mitarbeiterTaskEditWindowDeadline',
                        fieldLabel: 'Deadline',
                        format: 'd.m.y',
                    }
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
                        itemId: 'btnDone',
                        text: 'Erledigt',
                        icon: 'resources/images/Crystal_Project_success.png',
                    }, '-', 
                    {
                        xtype: 'button',
                        itemId: 'btnSaveTaskChanges',
                        text: 'Änderungen speichern',
                        icon: 'resources/images/Icons-mini-action_save.gif',
                        handler: function(){
                        	console.log("TaskDetailsWindow > onCreate");
                            var form = me.getComponent("formAdd").getForm();
                            // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                            if (form.isValid()) {
                            	me.getComponent("formAdd").fireEvent('create', me.getComponent("formAdd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});