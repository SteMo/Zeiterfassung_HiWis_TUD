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

Ext.define('AM.view.personen.Admin', {

    alias : 'widget.personenAdmin',
    extend: 'Ext.container.Container',
    
    width: 700,
    
    initComponent: function() {    	
    	var me = this;
      
        
    	
        var storePersonen = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.PersonData',  
        });         	
    	
        var storePersonenTitel = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.PersonenTitel',  
        }); 
    	
        var ds = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'AM.model.PersonenZuweisung',  
        });
        
        var storePersonenPosition = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.PersonenPosition',  
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
                        id: 'formAddPerson',
                        bodyPadding: 10,
                        margin: '10 0 10 0',
                        title: 'Neue Person eintragen',
                        
//                                    fieldDefaults: {
//                                        anchor: '100%',
//                                        labelAlign: 'right'
//                                    },                
                        
                        listeners: {
                            // hier wird auf das "create" event gehört und ein neuer Datensatz per Post an die im Model definierte Adresse geschickt
                        	create: function(form, data){
                        		console.log(data);
                        		storePersonen.insert(0, data);
                            }
                        },    
                        
                        items: [
                                {
                                    xtype: 'hiddenfield',
                                    itemId: 'authorID',
                                    name: 'authorID',
                                },                                
//                                {
//    		                        xtype: 'combobox',
//    		                        name: 'cbTitel',
//    		                        fieldLabel: 'Titel',
//    		                        store: storePersonenTitel,
////    		                        queryMode: 'local',
//    		                        displayField: 'title',
//    		                        valueField: 'title',
//    		                        allowBlank: false,
//    		                        anchor: '50%'
//                                },
    		                    {
    		                        xtype: 'textfield',
    		                        name: 'edVorname',
    		                        fieldLabel: 'Vorname',
    		                        allowBlank: false,
    		                        anchor: '100%',
    		                        margin: '20 0 10 0',
    		                    },       
    		                    {
    		                        xtype: 'textfield',
    		                        name: 'edNachname',
    		                        fieldLabel: 'Nachname',
    		                        allowBlank: false,
    		                        anchor: '100%',
    		                        margin: '0 0 20 0',
    		                    },   
                                {
		                            xtype: 'combobox',
		                            name: 'cbFachgebiet',
		                            fieldLabel: 'Fachgebiet',
		                            store: ds,
		                            displayField: 'name',
		                            valueField: 'name',
		                            typeAhead: false,
//		                            hideLabel: true,
		                            hideTrigger:true,        		                            
		                            anchor: '100%',
		                            // override default onSelect to do redirect
		                            listeners: {
		                                select: function(combo, selection) {
		                                    var post = selection[0];
		                                    console.log(post);
		                                    /* war im Beispiel, aber ka wozu man die URL wechseln sollte */
//    		                                    if (post) {
//    		                                        window.location =
//    		                                            Ext.String.format('http://www.sencha.com/forum/showthread.php?t={0}&p={1}', post.get('topicId'), post.get('id'));
//    		                                    }
		                                }
		                            }        		                            
                                },
//                                {
//    		                        xtype: 'combobox',
//    		                        name: 'cbHiwi',
//    		                        fieldLabel: 'Position',
//    		                        store: storePersonenPosition,
////    		                        queryMode: 'local',
//    		                        displayField: 'position',
//    		                        valueField: 'position',
//    		                        allowBlank: false,
//    		                        anchor: '50%'
//                                },
                                {
		                            xtype: 'combobox',
		                            name: 'cbVorgesetzter',
		                            fieldLabel: 'Vorgesetzter',
		                            store: ds,
		                            displayField: 'supervisor',
		                            valueField: 'supervisor',
		                            typeAhead: false,
//		                            hideLabel: true,
		                            hideTrigger:true,        		                            
		                            anchor: '100%',
		                            // override default onSelect to do redirect
		                            listeners: {
		                                select: function(combo, selection) {
		                                    var post = selection[0];
		                                    console.log(post);
		                                    /* war im Beispiel, aber ka wozu man die URL wechseln sollte */
//    		                                    if (post) {
//    		                                        window.location =
//    		                                            Ext.String.format('http://www.sencha.com/forum/showthread.php?t={0}&p={1}', post.get('topicId'), post.get('id'));
//    		                                    }
		                                }
		                            }        		                            
                                },
    		                    {
    		                        xtype: 'textfield',
    		                        name: 'edOpenID',
    		                        fieldLabel: 'OpenID',
    		                        allowBlank: false,
    		                        anchor: '100%',
    		                        margin: '20 0 10 0',
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
        	                                          itemId: 'btnPersonHinzufügen',
        	                                          text: 'Person hinzufügen',
        	                                          icon: 'resources/images/drop-add.gif',
        	                                          handler: function(){
        	                                              var form = me.getComponent("formAddPerson").getForm();
        	                                              // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
        	                                              console.log("Form valid: " + form.isValid());
        	                                              if (form.isValid()) {
        	                                            	  me.getComponent("formAddPerson").fireEvent('create', me.getComponent("formAddPerson"), form.getValues());
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
        	                                              me.getComponent("formAddPerson").getForm().reset();
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