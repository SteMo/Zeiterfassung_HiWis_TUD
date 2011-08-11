Ext.define('AM.controller.Personen', {
    extend: 'Ext.app.Controller',

    stores: [
         'Fachgebiete',
         'Personentypen',
         'Personen'
    ],
	
    views: [
        'layout.Menu',
		'personen.ComboFachgebiete',
		'personen.ComboPersonentypen',
		'personen.ContentGrid'
    ],
	
	models: [
		'Personen',
		'Personentypen',
		'Fachgebiete'
	],
	

    init: function() {
    },


    // editUser: function(grid, record) {
        // var view = Ext.widget('useredit');

        // view.down('form').loadRecord(record);
    // }
});