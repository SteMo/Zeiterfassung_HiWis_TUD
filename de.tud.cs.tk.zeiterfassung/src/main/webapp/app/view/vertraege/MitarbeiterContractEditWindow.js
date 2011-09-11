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
                bodyPadding: 10,
                fieldDefaults: {
                	anchor: '100%',
                },
                items: [
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