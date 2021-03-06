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
        
        var storeVertragsdaten = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.HiWiVertrag',  
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
                		/* Problem: die Namen der Formularfelder muessten mit dem Grid uebereinstimmen, damit diese direkt korrekt dort
                		 * eingetragen werden - wenn ich die Namen hier aendere muesste man auch in den WS anpassen -> kann man als
                		 * Verschoenerung spaeter ja machen...
                		 */
                		Ext.Msg.alert('Status', "Der Vertrag wurde erfolgreich eingetragen! Aktualisieren Sie nun bitte manuell die Ansicht (klick auf den Men&uuml;punkt gen&uuml;gt).");
                    }
                },    
                
                items: [
                        {
                            xtype: 'hiddenfield',
                            itemId: 'authorID',
                            name: 'authorID',
                        },                        
                        {
		                            xtype: 'combobox',
		                            name: 'cbHiwi',
		                            fieldLabel: 'Vertragspartner',
		                            store: 'PersonenZuweisung',
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
		                            emptyText: 12,
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
//	                                              this.setActiveRecord(null);
	                                              me.getComponent("formAddContract").getForm().reset();
	                                          }
	                                      },

	                                  ]
	                              }
	                          ],

                    },
                    {
                        xtype: 'liveSearchGridPanel',
                        itemId: 'vertragsGrid',
                        title: 'Vorhandene Vertr&auml;ge',
                        margin: '10 0 10 0',                        
                        store: storeVertragsdaten,
                        columns: [
                         
                            {
                                xtype: 'gridcolumn',
                                dataIndex: 'hiwi',
                                itemIndex: 'hiwi',
                                text: 'Name',
                                flex: 1,
//                                renderer: function(val, meta, record) {
//                                    return record.data.vorname + " " + record.data.name;
//                              }

                            },

                            {
                                xtype: 'datecolumn',
                                dataIndex: 'begin',
                                text: 'Vertragsbeginn',
                            	format: 'd.m.y',
                            },
                            {
                                xtype: 'datecolumn',
                                dataIndex: 'end',
                                text: 'Vertragsende',
                                format: 'd.m.y',
                            },                             
                            {
                                xtype: 'numbercolumn',
                                dataIndex: 'hoursPerMonth',
                                text: 'Stunden/Monat',
                                format: '0'
                            },                
                            {
                                xtype: 'gridcolumn',
                                text: 'Tarif',
                                dataIndex: 'rate',                                
                            }
                        ],
                        viewConfig: {

                        },
                        
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
    	                                          itemId: 'btnDelete',
    	                                          text: 'Markierten Vertrag löschen',
    	                                          icon: 'resources/images/Delete-silk.png',
    	                                          disabled: true,
    	                                          handler: function(){
    	                                        	  var grid = me.getComponent('vertragsGrid');
    	                                              var selection = grid.getView().getSelectionModel().getSelection()[0];
    	                                              console.log("Ausgewählte Zeile/Objekt zum Löschen: ");
    	                                              console.log(selection);
    	                                              Ext.Msg.confirm('Löschen bestätigen', 'Soll der Vertrag mit ' + selection.data.hiwi + ' wirklich unwiderruflich gelöscht werden?',
        	                                            		  		function(btn, text){
    	                                            	    				if (btn == 'yes'){
    	                      	                                              if (selection) {                     	                                            	   
    	                      	                                            	  Ext.Ajax.request({
        	                      	                                      			url : 'ws/vertraege/remove' , 
        	                      	                                      			params : { id : selection.data.id },
        	                      	                                      			method: 'GET',
        	                      	                                      			success: function ( result, request ) { 
        	                      	                                      				Ext.MessageBox.alert('Success', 'Der Vertrag mit ' + selection.data.name + ' wurde erfolgreich aus der Datenbank entfernt.');
        	                      	                                      				/* refresh grid, function() scheint wichtig, dann wartet er hier bis zum refresh */
        	                      	                                      				grid.getStore().load(function(records, operation, success) {});     	                      	                                      				
        	                      	                                      			},
        	                      	                                      			failure: function ( result, request) { 
        	                      	                                      				Ext.MessageBox.alert('Failed', 'Der Vertrag mit ' + selection.data.name + ' konnte nicht aus der Datenbank entfernt werden!'); 
        	                      	                                      			} 
    	                      	                                            	  }); 
    	                      	                                            	  
    	                    	                                              }            	                                            	    					
    	                      	                                          	}            	                                            	    				
    	                                              });            	                                              
    	                                          }
    	                                      }, 
    	                                      '-',                                                                                           
                                                 {
                                                      xtype: 'button',
                                                      itemId: 'btnTaskUpdate',
                                                      text: 'Markierten Vertrag editieren',
                                                      icon: 'resources/images/edit.png',
                                                      disabled: true,
                                                      handler: function(){
                                                    	  var grid = me.getComponent('vertragsGrid');
                                                          var item = grid.getView().getSelectionModel().getSelection()[0];
                                                          if (item) {
                                                          	  var win = Ext.create('widget.mitarbeiterContractEditWindow');
    	                                                      	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
    	                                                      	(Ext.ComponentQuery.query('#contractId')[0]).setValue(item.data.id);
                                                          	  	(Ext.ComponentQuery.query('#hiwi')[0]).setValue(item.data.hiwi);
    	                                                      	(Ext.ComponentQuery.query('#rate')[0]).setValue(item.data.rate);
    	                                                      	(Ext.ComponentQuery.query('#hoursPerMonth')[0]).setValue(item.data.hoursPerMonth);    	        	
    	                                                  		(Ext.ComponentQuery.query('#begin')[0]).setValue(item.data.begin);
    	                                                  		(Ext.ComponentQuery.query('#end')[0]).setValue(item.data.end);   	                                                  		    	                                                  		
    	                                                  		var combo = Ext.ComponentQuery.query('#supervisor')[0];
    	                                                  		/* vorauswahl des momentan eingetragenen HiWis */
    	                                                  		combo.store.load(function(records, operation, success) {
    	                                                  		    combo.setValue(item.data.supervisor);
    	                                                  		});        
                                           	                                                  		
    	                                                  		win.show();
                                                          }
                                                      }
                                                  }                               


                                          ]
                                      }
                                  ],                    
                    },

                ];

        me.callParent(arguments);
    }
});