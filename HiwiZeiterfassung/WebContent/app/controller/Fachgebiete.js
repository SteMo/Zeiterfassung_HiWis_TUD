Ext.define('AM.controller.Fachgebiete', {
    extend: 'Ext.app.Controller',

    stores: ['Fachgebiete','Personentypen','Tabelle1'],
	
    views: [
        'menu.Menu',
		'fachgebiete.ComboFachgebiete',
		'fachgebiete.ComboPersonentypen',
		'fachgebiete.ContentGrid'
    ],
	
	models: [
		'fachgebiete.Tabelle1',
		'fachgebiete.Personentypen',
		'fachgebiete.Fachgebiete'
	],
	

    init: function() {
    },


    // editUser: function(grid, record) {
        // var view = Ext.widget('useredit');

        // view.down('form').loadRecord(record);
    // }
});