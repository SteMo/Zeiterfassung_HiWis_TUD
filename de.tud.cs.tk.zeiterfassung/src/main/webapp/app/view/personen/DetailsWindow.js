var noData = '-';

Ext.define('AM.view.personen.DetailsWindow', {
    extend: 'Ext.window.Window',
    alias : 'widget.detailsWindow',
    
    height: 400,
    width: 369,
    layout: {
        align: 'stretch',
        padding: 10,
        type: 'vbox',
    },
    
    closable: 'true',
    
    items: [
            {
                xtype: 'fieldset',
                padding: 10,
                flex: 1,
                title: 'Personendaten',    	                
                items: [
                    {
                        xtype: 'displayfield', 
                        itemId: 'personenDetailsWindowPersonName',
                        value: noData,
                        fieldLabel: 'Name'
                    },
                    {
                        xtype: 'displayfield',
                        itemId: 'personenDetailsWindowPersonVorname',
                        value: noData,
                        fieldLabel: 'Vorname'
                    },

                ]},
	            {
	                xtype: 'fieldset',
	                padding: 10,
	                flex: 1,
	                title: 'Universit&auml;r',    	                
	                items: [
	                    {
	                        xtype: 'displayfield',
	                        itemId: 'personenDetailsWindowUniFachgebiet',
	                        value: noData,
	                        fieldLabel: 'Fachgebiet'
	                    },
	                    {
	                        xtype: 'displayfield',
	                        itemId: 'personenDetailsWindowUniPosition',
	                        value: noData,
	                        fieldLabel: 'Position'
	                    },
	                    {
	                        xtype: 'displayfield',
	                        itemId: 'personenDetailsWindowUniZuProfessor',
	                        value: noData,
	                        fieldLabel: 'Zugeordneter Professor'
	                    },	  	                    
	                    {
	                        xtype: 'displayfield',
	                        itemId: 'personenDetailsWindowUniZuMitarbeiter',
	                        value: noData,
	                        fieldLabel: 'Zugeordneter Mitarbeiter'
	                    },	                                   
	                ]},    	                
                
                
                ],
   
	 buttonAlign: 'center',       
	 buttons:	[{text:'Bearbeiten', handler: function() {  }}, 
	         	 {text:'Schlie&szlig;en', handler: function() { close(); }}]    	 
});