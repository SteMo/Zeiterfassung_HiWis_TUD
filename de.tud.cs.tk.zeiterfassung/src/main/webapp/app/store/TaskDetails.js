Ext.define('AM.store.TaskDetails', {
    extend: 'Ext.data.Store',
	storeId:'TaskDetails',
	
	requires: 'AM.model.TaskDetails',
	model: 'AM.model.TaskDetails',

	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
});