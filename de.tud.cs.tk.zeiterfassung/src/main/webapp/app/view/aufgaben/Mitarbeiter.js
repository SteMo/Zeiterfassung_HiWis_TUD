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
                		storeAufgaben.insert(0, data);
                    }
                },    
                
                items: [
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
                                              xtype: 'button',
                                              itemId: 'btnStundenEintragen',
                                              text: 'Stunden eintragen',
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
                                          }, '-',                                
                                      {
                                          xtype: 'button',
                                          itemId: 'btnReset',
                                          text: 'Reset',
                                          icon: 'resources/images/Arrow_undo.png',
                                          handler: function(){
//                                              this.setActiveRecord(null);
                                              me.getComponent("formAddTask").getForm().reset();
                                          }
                                      },

                                  ]
                              }
                          ],
            }
        ];
        me.callParent(arguments);
    }
});