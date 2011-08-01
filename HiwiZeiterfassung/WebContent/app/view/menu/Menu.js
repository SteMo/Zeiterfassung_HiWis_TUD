Ext.define('AM.view.menu.Menu' ,{
    extend: 'Ext.Toolbar',
    alias : 'widget.menue',

	title: '',
	width: 700,

	items: [
		{	text: 'Dashboard'	},
		' ',
		{	text: 'Fachgebiete'	},
		' ',
		{	text: 'Personen', handler: function() {
								window.location.href = "index.html";
			}},
		' ',
		{	text: 'Verträge', handler: function() {
								window.location.href = "vertraege.html";
			}},
		' ',
		{	text: 'Aufgaben'	},
		' ',
		{	text : 'Berichte'	}
	]  
	
	// initComponent: function() {
        // this.callParent(arguments);
    // }
	
});