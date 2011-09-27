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
        
        me.items = [
            {
                xtype: 'form',
                itemId: 'formFachgebietUpd',
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
	                    {
	                        xtype: 'textfield',
	                        name: 'edFachgebiet',
	                        fieldLabel: 'Fachgebiet',
	                        allowBlank: false,
	                        anchor: '100%',
	                    }, 
	                    {
	                        xtype: 'textfield',
	                        name: 'edKuerzel',
	                        fieldLabel: 'Kürzel',
	                        allowBlank: false,
	                        anchor: '100%',
	                        margin: '20 0 10 0',
	                    },      		                    
	                    {
	                        xtype: 'numberfield',
	                        name: 'edBudget',
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
                            	me.getComponent("formFachgebietUpd").fireEvent('create', me.getComponent("formFachgebietUpd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});