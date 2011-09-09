Ext.define('AM.view.Viewport', {
    extend: 'Ext.container.Viewport',
	
    id: "viewport",
    
    layout: {
		type:'vbox',
		padding:'5',
		align:'center',
		autoWidth: true,
	},              
	
	items: [
	{   	
		// Toolbar/Menue
		xtype: 'menue',
		width: 700,
	},
//	{
//		// Filterbereich
//		xtype: 'filterbereich',
//		width: 700,
//	},
	{
		// Inhaltsbereich (Tabelle/Grid)
		xtype: 'contentGrid',
		width: 700,
		padding: '10 0 5 0',
	},
	{
		xtype: 'dashboard'
	}
	],				
	
});