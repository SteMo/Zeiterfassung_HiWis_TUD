/* Vertrag editieren keine häufige Funktionalität -> vorerst außen vor */

Ext.define('AM.view.vertraege.MitarbeiterContractEditWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.mitarbeiterContractEditWindow',
    
    width: 500,
    bodyPadding: '',
    title: 'Aufgaben: Details & Editieren',

    initComponent: function() {
        var me = this;
        me.items = [
            {
                xtype: 'form',
                itemId: 'formContractUpd',                
                bodyPadding: 10,
                fieldDefaults: {
                	anchor: '100%',
                },
                listeners: {
                	update: function(form, data){
                		Ext.Ajax.request({
                			url : 'ajax.php' , 
                			params : { id : data.fachgebietID, name : data.edFachgebiet, leiter : data.cbLeiter, budget : data.edBudget },
                			method: 'PUT',
                			success: function ( result, request ) { 
                        		Ext.Msg.alert('Status', "Das Fachgebiet " + data.edFachgebiet + " wurde erfolgreich aktualisiert!");
                			},
                			failure: function ( result, request) { 
                				Ext.MessageBox.alert('Failed', "Die Aktualisierung des Fachgebiets " + data.edFachgebiet + " ist fehlgeschlagen!"); 
                			} 
                		});                		                		
                    }
                },                  
                items: [
                    {
                        xtype: 'textfield',
                        itemId: 'mitarbeiterTaskEditWindowTitle',
                        fieldLabel: 'Titel',
                        name: 'title',
                        allowBlank: false,
                    },
                    {
                        xtype: 'hiddenfield',
                        itemId: 'contractId',
                        name: 'contractId',
                    },                        
                    {
                        xtype: 'textareafield',
                        itemId: 'mitarbeiterTaskEditWindowDescription',
                        fieldLabel: 'Beschreibung',
                        name: 'description',
                    },
                    {
                        xtype: 'combobox',
                        itemId: 'mitarbeiterTaskEditWindowHiwi',
                        fieldLabel: 'Zugewiesen zu',
                        name: 'assignedTo',
                        store: 'PersonenZuweisung',
                        displayField: 'name',
                        valueField: 'name',                        
//                        queryMode: 'local',
                        allowBlank: false,
                    },
                    {
                        xtype: 'datefield',
                        name: 'assignedOn',
                        itemId: 'mitarbeiterTaskEditWindowAssignedOn',
                        fieldLabel: 'Zugewiesen am',
                        format: 'd.m.y',
                    },
                    {
                        xtype: 'datefield',
                        name: 'title',
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
                            var form = me.getComponent("formContractUpd").getForm();
                            // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                            if (form.isValid()) {
                            	me.getComponent("formContractUpd").fireEvent('update', me.getComponent("formContractUpd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});