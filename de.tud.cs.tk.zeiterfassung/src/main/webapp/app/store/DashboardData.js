Ext.define('AM.store.DashboardData', {
    extend: 'Ext.data.Store',
	storeId:'DashboardData',
	
	requires: 'AM.model.DashboardData',
	model: 'AM.model.DashboardData',

	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
});