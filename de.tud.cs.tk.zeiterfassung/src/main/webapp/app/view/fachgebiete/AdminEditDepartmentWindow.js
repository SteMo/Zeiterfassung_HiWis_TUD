Ext.define('AM.view.fachgebiete.AdminEditDepartmentWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.adminEditDepartmentWindow',
    
    width: 500,
    bodyPadding: '',
    title: 'Fachgebiet editieren',

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
        var ds = Ext.create('Ext.data.Store', {
            pageSize: 10,
            model: 'AM.model.Personen',  
        });      
        
        me.items = [
            {
                xtype: 'form',
                itemId: 'formFachgebietUpd',
                bodyPadding: 10,
                fieldDefaults: {
                	anchor: '100%',
                },
                listeners: {
                	update: function(form, data){
                		console.log("Fachgebiet ID: " + data.edFachgebiet);
                		Ext.Ajax.request({
                			url : 'ws/fachgebiete/update' , 
                			params : { id : data.fachgebietID, name : data.edFachgebiet, leiter : data.cbLeiter, budget : data.edBudget },
                			method: 'GET',
                			success: function ( result, request ) { 
                        		Ext.Msg.alert('Status', "Das Fachgebiet " + data.edFachgebiet + " wurde erfolgreich aktualisiert!");
                        		/* refresh grid */
                        		(Ext.ComponentQuery.query('#adminGrid')[0]).getStore().load(function(records, operation, success) {});
                			},
                			failure: function ( result, request) { 
                				Ext.MessageBox.alert('Failed', "Die Aktualisierung des Fachgebiets " + data.edFachgebiet + " ist fehlgeschlagen!"); 
                			} 
                		});                		                		
                    }
                },     
                
                items: [
                        {
                            xtype: 'hiddenfield',
                            itemId: 'authorID',
                            name: 'authorID',
                        },                  
                        {
                            xtype: 'hiddenfield',
                            itemId: 'fachgebietID',
                            name: 'fachgebietID',
                        },                            
	                    {
	                        xtype: 'textfield',
	                        name: 'edFachgebiet',
	                        itemId: 'name',
	                        fieldLabel: 'Fachgebiet',
	                        allowBlank: false,
	                        anchor: '100%',
	                    }, 
//	                    {
//	                        xtype: 'textfield',
//	                        name: 'edKuerzel',
//	                        fieldLabel: 'Kürzel',
//	                        allowBlank: false,
//	                        anchor: '100%',
//	                        margin: '20 0 10 0',
//	                    },      		  
                        {
		                    xtype: 'combobox',
	                        name: 'cbLeiter',
	                        itemId: 'leiter',
	                        fieldLabel: 'Leiter',
	                        store: ds,
	                        displayField: 'name',
	                        valueField: 'id',
	                        typeAhead: false,
	//                        hideLabel: true,
	                        hideTrigger:true,        		                            
	                        anchor: '100%',
                                renderer: getPerson,
            			},
	                    {
	                        xtype: 'numberfield',
	                        name: 'edBudget',
	                        itemId: 'budget',
	                        fieldLabel: 'Budget',
	                        allowBlank: false,
	                        allowNegative: false,
	                        anchor: '100%',
	                        margin: '0 0 20 0',
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
                            var form = me.getComponent("formFachgebietUpd").getForm();
                            // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                            if (form.isValid()) {
                            	me.getComponent("formFachgebietUpd").fireEvent('update', me.getComponent("formFachgebietUpd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});
