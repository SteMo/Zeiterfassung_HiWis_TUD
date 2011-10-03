Ext.define('AM.view.aufgaben.Mitarbeiter', {

    alias : 'widget.aufgabenMitarbeiter',
    extend: 'Ext.container.Container',
    
    width: 700,
        
    initComponent: function() {   
    	this.addEvents('create');
    	var me = this;  	

        var storeAufgaben = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.HiWiAufgabe',  
        });         
        
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
                id: 'formAddTask',
                bodyPadding: 10,
                margin: '10 0 10 0',
                title: 'Neue Aufgabe eintragen',
                               
                listeners: {
                    // hier wird auf das "create" event gehört und ein neuer Datensatz per Post an die im Model definierte Adresse geschickt
                	create: function(form, data){
                		/* hier muss ein model definiert werden und verschickt, also evtl das bestehende, oder ein angepasstes */
                		storeAufgaben.insert(0, data);
                    }
                },    
                
                items: [
                    {
                        xtype: 'hiddenfield',
                        itemId: 'authorID',
                        name: 'authorID',                  	
                    },
                    {
                        xtype: 'textfield',
                        name: 'edTitle',
                        fieldLabel: 'Titel',
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'txtDescription',
                        fieldLabel: 'Beschreibung',
                        anchor: '100%'
                    },
                    {
                        xtype: 'datefield',
                        name: 'edDate',
                        format: 'd.m.y',
                        fieldLabel: 'Deadline',
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'edPriority',
                        fieldLabel: 'Priorität',
                        allowBlank: false,
                        anchor: '100%'
                    },
                    {
                        xtype: 'combobox',
                        name: 'cbHiwi',
                        fieldLabel: 'HiWi',
                        store: 'PersonenZuweisung',
//                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
                        allowBlank: false,
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
                   						   xtype: 'tbfill'
                   					  }, 
                   					{
                                          xtype: 'button',
                                          itemId: 'btnStundenEintragen',
                                          text: 'Aufgabe zuweisen',
                                          icon: 'resources/images/drop-add.gif',
                                          handler: function(){
                                          	console.log("TaskDetailsWindow > onCreate");
                                              var form = me.getComponent("formAddTask").getForm();
                                              // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                                              console.log("Form valid: " + form.isValid());
                                              if (form.isValid()) {
                                            	  me.getComponent("formAddTask").fireEvent('create', me.getComponent("formAddTask"), form.getValues());
                                                  form.reset();
                                              }
                                          }
                                      }  , '-', {
                                          xtype: 'button',
                                          itemId: 'btnReset',
                                          text: 'Reset',
                                          icon: 'resources/images/Arrow_undo.png',
                                          handler: function(){
                                              me.getComponent("formAddTask").getForm().reset();
                                          }
                                      }                             


                                  ]
                              }
                          ],
            },
                {
                    xtype: 'liveSearchGridPanel',
                    itemId: 'aufgabenGrid',
                    title: 'Eingetragene Aufgaben',
                    margin: '10 0 0 0',
                    store: storeAufgaben,
                    columns: [
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'deadline',
                            width: 60,
                            text: 'Deadline',
                            format: 'd.m.y',
                        },
                        {
                            xtype: 'gridcolumn',
                            flex: 1,
                            dataIndex: 'title',
                            text: 'Aufgabe',
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'hiwi',
                            text: 'HiWi',
                            width: 170,
                        },
                        {
                            xtype: 'datecolumn',
                            dataIndex: 'assignedOn',
                            text: 'Zugewiesen am',
                            format: 'd.m.y',
                        },   
                        {
                            xtype: 'numbercolumn',
                            dataIndex: 'priority',
                            text: 'Priorität',
                            format: '0',
                            width: 60
//                            allowNegative: false,                    	
                        }                    
                    ],
                    dockedItems: [
                                  {
                                      xtype: 'toolbar',
                                      anchor: '100%',
                                      dock: 'bottom',
                                      items: [
                                              {
                       						   xtype: 'tbfill'
                       					  },                                             
                                             {
                                                  xtype: 'button',
                                                  itemId: 'btnTaskUpdate',
                                                  text: 'Markierten Eintrag editieren',
                                                  icon: 'resources/images/edit.png',
                                                  disabled: true,
                                                  handler: function(){
                                                	  var grid = me.getComponent('aufgabenGrid');
                                                      var item = grid.getView().getSelectionModel().getSelection()[0];
                                                      if (item) {
                                                      	  var win = Ext.create('widget.mitarbeiterTaskEditWindow');
	                                                      	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
	                                                      	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowId')[0]).setValue(item.data.id);
                                                      	  	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowTitle')[0]).setValue(item.data.title);
	                                                      	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowDescription')[0]).setValue(item.data.description);
	                                                      	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowAssignedOn')[0]).setValue(item.data.assignedOn);    	        	
	                                                  		(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowDeadline')[0]).setValue(item.data.deadline);
	                                                  		var combo = Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowHiwi')[0];
	                                                  		/* vorauswahl des momentan eingetragenen HiWis */
	                                                  		combo.store.load(function(records, operation, success) {
	                                                  		    combo.setValue(item.data.hiwi);
	                                                  		});                                                   
	                                                  		win.show();
                                                      }
                                                  }
                                              }                               


                                      ]
                                  }
                              ],                    
                    viewConfig: {

                    }
                }            	
        ];
        me.callParent(arguments);
    }
});