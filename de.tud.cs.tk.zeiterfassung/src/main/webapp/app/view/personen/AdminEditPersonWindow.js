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
        
        me.items = [
            {
                xtype: 'form',
                itemId: 'formPersonUpd',
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
//                        {
//	                        xtype: 'combobox',
//	                        name: 'cbTitel',
//	                        fieldLabel: 'Titel',
//	                        store: storePersonenTitel,
////	                        queryMode: 'local',
//	                        displayField: 'title',
//	                        valueField: 'title',
//	                        allowBlank: false,
//	                        anchor: '50%'
//                        },
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
                            listeners: {
                                select: function(combo, selection) {
                                    var post = selection[0];
                                    console.log(post);
                                    /* war im Beispiel, aber ka wozu man die URL wechseln sollte */
//	                                    if (post) {
//	                                        window.location =
//	                                            Ext.String.format('http://www.sencha.com/forum/showthread.php?t={0}&p={1}', post.get('topicId'), post.get('id'));
//	                                    }
                                }
                            }        		                            
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
                            valueField: 'supervisor',
                            typeAhead: false,
//                            hideLabel: true,
                            hideTrigger:true,        		                            
                            anchor: '100%',
                            // override default onSelect to do redirect
                            listeners: {
                                select: function(combo, selection) {
                                    var post = selection[0];
                                    console.log(post);
                                    /* war im Beispiel, aber ka wozu man die URL wechseln sollte */
//	                                    if (post) {
//	                                        window.location =
//	                                            Ext.String.format('http://www.sencha.com/forum/showthread.php?t={0}&p={1}', post.get('topicId'), post.get('id'));
//	                                    }
                                }
                            }        		                            
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
                            	me.getComponent("formPersonUpd").fireEvent('create', me.getComponent("formPersonUpd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});