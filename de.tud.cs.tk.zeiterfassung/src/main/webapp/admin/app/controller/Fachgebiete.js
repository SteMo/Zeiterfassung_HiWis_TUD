Ext.define('AM.controller.Fachgebiete', {
    extend: 'Ext.app.Controller',

    stores: ['Fachgebiete','Personentypen','Tabelle1'],
	
    views: [
        'menu.Menu',
        'menu.FachgebietMenuBottom',
        'fachgebiete.SearchField',
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
    	var view = this.getView("menu.Menu");
    	console.log(view);
    	console.log(view.getName);
    	var test = view.prototype;
    	console.log(test);
    	console.log(test.alias);
    	console.log(test.getId());
    	test.add("Berichte");
    },


    // editUser: function(grid, record) {
        // var view = Ext.widget('useredit');

        // view.down('form').loadRecord(record);
    // }
});