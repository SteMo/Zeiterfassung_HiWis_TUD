/*
 * File: app/view/ui/MyViewport.js
 * Date: Sat Sep 10 2011 12:23:48 GMT+0200 (W. Europe Daylight Time)
 *
 * This file was generated by Ext Designer version 1.2.0.
 * http://www.sencha.com/products/designer/
 *
 * This file will be auto-generated each and everytime you export.
 *
 * Do NOT hand edit this file.
 */

Ext.define('AM.view.fachgebiete.Admin', {

    alias : 'widget.fachgebieteAdmin',
    extend: 'Ext.container.Container',
    
    width: 700,
    
    initComponent: function() {    	
    	var me = this;
          	
        var storeFachgebiet = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.fachgebiete.FachgebieteData',  
        });        
        
        /* muss wegen OpenID so gemacht werden, bei insert können wir über OpenID nicht gehen */
        var storeGetIdOfLoggedInPerson  = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.LoggedInPerson',  
        });  
        
        var ds  = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.Personen',  
        }); 
        
        storeGetIdOfLoggedInPerson.load(function(records, operation, success) {
            console.log("Person id: " + storeGetIdOfLoggedInPerson.getAt(0).get("id"));  
            (Ext.ComponentQuery.query('#authorID')[0]).setValue(storeGetIdOfLoggedInPerson.getAt(0).get("id"));
    	});           
                    
        me.items = [
                    {
                        xtype: 'form',
                        id: 'formAddFachgebiet',
                        bodyPadding: 10,
                        margin: '10 0 10 0',
                        title: 'Neues Fachgebiet eintragen',
                        
//                                    fieldDefaults: {
//                                        anchor: '100%',
//                                        labelAlign: 'right'
//                                    },                
                        
                        listeners: {
                            // hier wird auf das "create" event gehört und ein neuer Datensatz per Post an die im Model definierte Adresse geschickt
                        	create: function(form, data){
                        		storeFachgebiet.insert(0, data);
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
    		                        name: 'name',
    		                        fieldLabel: 'Fachgebiet',
    		                        allowBlank: false,
    		                        anchor: '100%',
    		                    }, 
    		                    {
    		                        xtype: 'combobox',
    		                        name: 'leiter',
    		                        fieldLabel: 'Leiter',
    		                        store: ds,
//    		                        queryMode: 'local',
    		                        displayField: 'name',
    		                        valueField: 'id',
    		                        allowBlank: false, 
                                        hideTrigger:true,                                        
    		                        anchor: '100%'
                                    }, 
//                                    {
//    		                        xtype: 'combobox',
//    		                        name: 'stellv',
//    		                        fieldLabel: 'Stellvertreter',
//    		                        store: ds,
////    		                        queryMode: 'local',
//    		                        displayField: 'name',
//    		                        valueField: 'id',
//    		                        allowBlank: true,
//                                        hideTrigger:true,  
//    		                        anchor: '100%'
//                                    },    		                    
    		                    {
    		                        xtype: 'numberfield',
    		                        name: 'budget',
    		                        fieldLabel: 'Budget',
    		                        allowBlank: false,
    		                        allowNegative: false,
    		                        anchor: '100%',
    		                        margin: '0 0 20 0',
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
        	                                          itemId: 'btnFachgebietHinzufuegen',
        	                                          text: 'Fachgebiet hinzufügen',
        	                                          icon: 'resources/images/drop-add.gif',
        	                                          handler: function(){
        	                                              var form = me.getComponent("formAddFachgebiet").getForm();
        	                                              // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
        	                                              console.log("Form valid: " + form.isValid());
        	                                              if (form.isValid()) {
        	                                            	  me.getComponent("formAddFachgebiet").fireEvent('create', me.getComponent("formAddFachgebiet"), form.getValues());
        	                                                  form.reset();
        	                                              }
        	                                          }
        	                                      }  , '-', {
        	                                          xtype: 'button',
        	                                          itemId: 'btnReset',
        	                                          text: 'Reset',
        	                                          icon: 'resources/images/Arrow_undo.png',
        	                                          handler: function(){
//        	                                              this.setActiveRecord(null);
        	                                              me.getComponent("formAddFachgebiet").getForm().reset();
        	                                          }
        	                                      }                             


        	                                  ]
        	                              }
        	                          ],        		            
        		            

                            },
                            {
                                xtype: 'liveSearchGridPanel',
                                id: 'adminGrid',
                                title: '&Uuml;berblick bereits eingetragener Fachgebiete',
                                margin: '10 0 10 0',
                                store: storeFachgebiet,
                                columns: [
                                       
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'name',
                                        text: 'Fachgebiet',
                                        flex: 1,
                                    },     
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'leiter',
                                        text: 'Leiter',
                                    },      
//                                    {
//                                        xtype: 'gridcolumn',
//                                        dataIndex: 'stellvertreter',
//                                        text: 'Stellvertreter',
//                                    },
                                    {
                                        xtype: 'gridcolumn',
                                        dataIndex: 'budget',
                                        text: 'Budget',
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
            	                                          text: 'Markiertes Fachgebiet löschen',
            	                                          icon: 'resources/images/Delete-silk.png',
            	                                          disabled: true,
            	                                          handler: function(){
            	                                        	  var grid = me.getComponent('adminGrid');
            	                                              var selection = grid.getView().getSelectionModel().getSelection()[0];
            	                                              console.log("Ausgewählte Zeile/Objekt zum Löschen: ");
            	                                              console.log(selection);
            	                                              Ext.Msg.confirm('Löschen bestätigen', 'Soll das Fachgebiet "' + selection.data.name + '" wirklich gelöscht werden?',
	            	                                            		  		function(btn, text){
            	                                            	    				if (btn == 'yes'){
            	                      	                                              if (selection) {
            	                      	                                            	  /* ajax request weil die proprietären extJS Varianten 'bescheiden' dokumentiert sind */
            	                      	                                            	  Ext.Ajax.request({
  	            	                      	                                      			url : 'ws/fachgebiete/remove' , 
  	            	                      	                                      			params : { id : selection.data.id },
  	            	                      	                                      			method: 'GET',
  	            	                      	                                      			success: function ( result, request ) { 
  	            	                      	                                      				Ext.MessageBox.alert('Success', 'Das Fachgebiet "' + selection.data.name + '" wurde erfolgreich aus der Datenbank entfernt');
	            	                      	                                      				/* refresh grid, function() scheint wichtig, dann wartet er hier bis zum refresh */
	            	                      	                                      				grid.getStore().load(function(records, operation, success) {});	            	                      	                                      				
  	            	                      	                                      			},
  	            	                      	                                      			failure: function ( result, request) { 
  	            	                      	                                      				Ext.MessageBox.alert('Failed', 'Das Fachgebiet "' + selection.data.name + '" konnte nicht aus der Datenbank entfernt werden!'); 
  	            	                      	                                      			} 
              	                      	                                            	  });             	                    	                                              }            	                                            	    					
            	                      	                                          	}            	                                            	    				
            	                                              });            	                                              
            	                                          }
            	                                      }, 
            	                                      '-',                                              
            	                                      {
                                                          xtype: 'button',
                                                          itemId: 'btnTaskUpdate',
                                                          text: 'Markiertes Fachgebiet editieren',
                                                          icon: 'resources/images/edit.png',
                                                          disabled: true,
                                                          handler: function(){
                                                        	  var grid = me.getComponent('adminGrid');
                                                              var item = grid.getView().getSelectionModel().getSelection()[0];
                                                              if (item) {
                                                              	  var win = Ext.create('widget.adminEditDepartmentWindow');
        	                                                      	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
        	                                                      	(Ext.ComponentQuery.query('#fachgebietID')[0]).setValue(item.data.id);
        	                                                      	(Ext.ComponentQuery.query('#name')[0]).setValue(item.data.name);
        	                                                  		(Ext.ComponentQuery.query('#budget')[0]).setValue(item.data.budget);
        	                                                  		var comboLeiter = Ext.ComponentQuery.query('#leiter')[0];
        	                                                  		/* vorauswahl des momentan eingetragenen HiWis */
        	                                                  		comboLeiter.store.load(function(records, operation, success) {
        	                                                  			comboLeiter.setValue(item.data.leiter);
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