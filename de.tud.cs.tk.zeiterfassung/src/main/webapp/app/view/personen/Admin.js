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
      
        
        var ds = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'AM.model.PersonenZuweisung',  
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
                        		storeAufgaben.insert(0, data);
                            }
                        },    
                        
                        items: [
                                {
        		                            xtype: 'combobox',
        		                            name: 'cbHiwi',
        		                            fieldLabel: 'Vertragspartner',
        		                            store: ds,
        		                            displayField: 'name',
        		                            valueField: 'name',
        		                            typeAhead: false,
        		                            hideLabel: true,
        		                            hideTrigger:true,        		                            
        		                            anchor: '100%',
        		                            // override default onSelect to do redirect
        		                            listeners: {
        		                                select: function(combo, selection) {
        		                                    var post = selection[0];
        		                                    console.log(post);
        		                                    /* war im Beispiel, aber ka wozu man die URL wechseln sollte */
//        		                                    if (post) {
//        		                                        window.location =
//        		                                            Ext.String.format('http://www.sencha.com/forum/showthread.php?t={0}&p={1}', post.get('topicId'), post.get('id'));
//        		                                    }
        		                                }
        		                            }        		                            
        		                        }
        		            ],

                            },                    
        ];
        me.callParent(arguments);
    }
});