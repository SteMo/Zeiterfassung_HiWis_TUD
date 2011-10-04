Ext.define('AM.store.StatusData', {
    extend: 'Ext.data.Store',
	
    requires: 'AM.model.Status',
	model: 'AM.model.Status',
	
	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
});