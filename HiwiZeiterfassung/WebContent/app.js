Ext.require([
	'Ext.container.Viewport',
]);

Ext.BLANK_IMAGE_URL = '/ext-4.0.1/resources/images/default/s.gif';


Ext.application({
    name: 'AM',
    appFolder: 'app',
	
	controllers: [
        'Fachgebiete'
    ],
	

    
	launch: function() {
			
        Ext.create('Ext.container.Viewport', {
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
			},
			{
				// Filterbereich
				xtype: 'fieldset',
				id: 'listOfFilters',
				width: 700,
				title: '',
				items: [
					{
						xtype: 'comboFachgebiete',                   
					},
					{
						xtype: 'comboPersonentypen',
					},
					{
						xtype: 'button',
						text: 'Person hinzuf&uuml;gen',
						icon: ''
					} 
				]
			},
			{
				// Inhaltsbereich (Tabelle/Grid)
				xtype: 'contentGrid',
			}]					
			});
    }
});