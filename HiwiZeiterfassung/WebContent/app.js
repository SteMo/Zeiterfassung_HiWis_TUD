Ext.require('Ext.container.Viewport');
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
						text: 'Person hinzufügen',
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