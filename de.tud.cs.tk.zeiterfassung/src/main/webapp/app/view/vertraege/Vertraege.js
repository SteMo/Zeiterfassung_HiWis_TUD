Ext.define('AM.view.vertraege.Vertraege', {

    alias : 'widget.vertraegeMitarbeiter',
    extend: 'Ext.container.Container',
    
    width: 700,
        
    initComponent: function() {   
    	this.addEvents('create');
    	var me = this;  	

        var storeAufgaben = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.HiWiVertrag',  
        });       
        
        var storeHiwiTarifgruppe = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.HiwiTarifgruppe',  
        });       
        
        me.items = [
            {
                xtype: 'form',
                id: 'formAddContract',
                bodyPadding: 10,
                margin: '10 0 10 0',
                title: 'Neuen HiWi-Vertrag eintragen',
                
//                fieldDefaults: {
//                    anchor: '100%',
//                    labelAlign: 'right'
//                },                
                
                listeners: {
                    // hier wird auf das "create" event gehört und ein neuer Datensatz per Post an die im Model definierte Adresse geschickt
                	create: function(form, data){
                		storeAufgaben.insert(0, data);
                    }
                },    
                
                items: [
                        {
                            xtype: 'combobox',
                            name: 'cbHiwi',
                            fieldLabel: 'Vertragspartner',
                            store: 'Personen',
                            queryMode: 'local',
                            displayField: 'name',
                            valueField: 'name',
                            allowBlank: false,
                            anchor: '100%'
                        },                        
                        {
                            xtype: 'combobox',
                            margin: '20 0 10 0',
                            name: 'cbRate',
                            fieldLabel: 'Tarifgruppe',
                            store: storeHiwiTarifgruppe,
                            queryMode: 'local',
                            displayField: 'group',
                            valueField: 'group',
                            allowBlank: false,
                            anchor: '100%'
                        }, 
                        {
                            xtype: 'numberfield',
                            name: 'edHoursPerMonth',
                            fieldLabel: 'Stunden/Monat',
                            allowBlank: false,
                            allowNegative: false,
                            anchor: '100%'
                        },                        
                    {
                        xtype: 'datefield',
                        margin: '20 0 10 0',
                        name: 'edBegin',
                        format: 'd.m.y',
                        fieldLabel: 'Vertragsbeginn',
                        allowBlank: false,
                        align: 'right',
                        anchor: '100%'
                    },
                    {
                        xtype: 'datefield',
                        name: 'edEnd',
                        format: 'd.m.y',
                        fieldLabel: 'Vertragsende',
                        allowBlank: false,
                        anchor: '100%'
                    },                    

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
                                              text: 'Vertrag eintragen',
                                              icon: 'resources/images/drop-add.gif',
                                              handler: function(){
                                              	console.log("TaskDetailsWindow > onCreate");
                                                  var form = me.getComponent("formAddContract").getForm();
                                                  // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                                                  console.log("Form valid: " + form.isValid());
                                                  if (form.isValid()) {
                                                	  me.getComponent("formAddContract").fireEvent('create', me.getComponent("formAddContract"), form.getValues());
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
                                              me.getComponent("formAddContract").getForm().reset();
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