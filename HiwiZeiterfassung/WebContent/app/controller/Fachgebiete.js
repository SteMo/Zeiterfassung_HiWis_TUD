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
	
    refs: [
           {
               ref: 'menu',
               selector: 'toolbar'
           },
    ],	

     init: function() {
    	 console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    	 console.log("Toolbar: " + this.getMenu());
    	 console.log("Toolbar item[0] " + this.getMenu().items.get(0).getId());
    	 console.log("Toolbar item[0] " + this.getMenu().items.get(0).hide());
    	 this.getMenu().items.get(0).hide();
    	 this.getMenu().items.get(0).disable(true);
    	 this.getMenu().items.get(0).setText("hi");
    	 this.getMenu().add({ text: 'Berichte'  });
    	 this.getMenu().doLayout();
    },


    // editUser: function(grid, record) {
        // var view = Ext.widget('useredit');

        // view.down('form').loadRecord(record);
    // }
});