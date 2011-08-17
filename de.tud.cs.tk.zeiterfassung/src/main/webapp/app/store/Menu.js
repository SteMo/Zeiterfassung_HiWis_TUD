Ext.define('AM.store.Menu', {
    extend: 'Ext.data.Store',
	
    requires: 'AM.model.MenuModel',
	model: 'AM.model.MenuModel',
	
	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
});