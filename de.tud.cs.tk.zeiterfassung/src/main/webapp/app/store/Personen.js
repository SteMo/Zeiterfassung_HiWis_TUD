Ext.define('AM.store.Personen', {
    extend: 'Ext.data.Store',
//	storeId:'Personen',
	
	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
	
	pageSize: 4,
    
    requires: 'AM.model.Personen',	
	model: 'AM.model.Personen',
});