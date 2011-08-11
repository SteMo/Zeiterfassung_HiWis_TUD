Ext.require([
	'Ext.container.Viewport',
]);

Ext.BLANK_IMAGE_URL = '/extjs/resources/images/default/s.gif';
// Diese URL führt ins Nichts, wo kommt denn das Bild her?
// Und warum muss es in jeder Datei einzeln spezifiziert werden, es sollte doch reichen, das einmal irgendwo hinzuschreiben.


Ext.application({
    name: 'AM',
    appFolder: 'app',
	
	controllers: [
        'Personen',
        'Fachgebiete',
        'Vertraege',
        'Aufgaben'
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