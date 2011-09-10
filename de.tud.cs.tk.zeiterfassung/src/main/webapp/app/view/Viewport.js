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
	{   	
		xtype: 'dashboardHiWi',
		width: 700,
	}]
	
});