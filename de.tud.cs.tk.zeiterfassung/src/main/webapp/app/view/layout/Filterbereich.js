Ext.define('AM.view.layout.Filterbereich' ,{
    alias : 'widget.filterbereich',
    extend: 'Ext.form.FieldSet',
    
	id: 'listOfFilters',
	
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
});


