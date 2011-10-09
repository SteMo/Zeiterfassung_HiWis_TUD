Ext.define('AM.view.vertraege.MitarbeiterContractEditWindow', {
    extend: 'Ext.window.Window',

    alias: 'widget.mitarbeiterContractEditWindow',
    
    width: 500,
    bodyPadding: '',
    title: 'Hiwi-Vertrag: Details & Editieren',

    initComponent: function() {
        var me = this;
        
        var storeHiwiTarifgruppe = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: true,
            model: 'AM.model.HiwiTarifgruppe',  
        });              
        
        me.items = [
            {
                xtype: 'form',
                itemId: 'formContractUpd',                
                bodyPadding: 10,
                fieldDefaults: {
                	anchor: '100%',
                },
                listeners: {
                	update: function(form, data){
                		Ext.Ajax.request({
                			url : 'ajax.php' , 
                			params : { id : data.contractId, tarif : data.cbRate, stundenMonat : data.edHoursPerMonth, vertragsbeginn : data.edBegin, vertragsende : data.edEnd,  betreuer : data.cbSupervisor},
                			method: 'PUT',
                			success: function ( result, request ) { 
                        		Ext.Msg.alert('Status', "Der Vertrag von " + data.hiwi + " wurde erfolgreich aktualisiert!");
                    				/* refresh grid, function() scheint wichtig, dann wartet er hier bis zum refresh */
                        		(Ext.ComponentQuery.query('#vertragsGrid')[0]).getStore().load(function(records, operation, success) {});
                			},
                			failure: function ( result, request) { 
                				Ext.MessageBox.alert('Failed', "Die Aktualisierung des Vertrags von  " + data.hiwi + " ist fehlgeschlagen!"); 
                			} 
                		});                		                		
                    }
                },                  
                items: [
                    {
                        xtype: 'hiddenfield',
                        itemId: 'contractId',
                        name: 'contractId',
                    },                        
                    {
                        xtype: 'displayfield',
                        itemId: 'hiwi',
                        fieldLabel: 'HiWi',
                        name: 'hiwi',
                    },
                    {
                        xtype: 'combobox',
                        margin: '20 0 10 0',
                        name: 'cbRate',
                        itemId: 'rate',
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
                        itemId: 'hoursPerMonth',
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
	                    itemId: 'begin',
	                    format: 'd.m.y',
	                    fieldLabel: 'Vertragsbeginn',
	                    allowBlank: false,
	                    align: 'right',
	                    anchor: '100%'
	                },
	                {
	                    xtype: 'datefield',
	                    name: 'edEnd',
	                    itemId: 'end',
	                    format: 'd.m.y',
	                    fieldLabel: 'Vertragsende',
	                    allowBlank: false,
	                    anchor: '100%'
	                },
                    {
                        xtype: 'combobox',
                        name: 'cbSupervisor',
                        itemId: 'supervisor',
                        fieldLabel: 'Betreuer',
                        store: 'PersonenZuweisung',
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'name',
                        allowBlank: false,
                        anchor: '100%',
                        margin: '22 0 10 0'
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
                        itemId: 'btnDone',
                        text: 'Erledigt',
                        icon: 'resources/images/Crystal_Project_success.png',
                    }, '-', 
                    {
                        xtype: 'button',
                        itemId: 'btnSaveTaskChanges',
                        text: 'Änderungen speichern',
                        icon: 'resources/images/Icons-mini-action_save.gif',
                        handler: function(){
                            var form = me.getComponent("formContractUpd").getForm();
                            // prüfen ob Pflichtfelder ausgefüllt sind (allowBlank-Attribut) und evtl Validitätsbedingung im Model
                            if (form.isValid()) {
                            	me.getComponent("formContractUpd").fireEvent('update', me.getComponent("formContractUpd"), form.getValues());
                            }
                        }
                    }  
                ]
            }
        ];
        me.callParent(arguments);
    }
});