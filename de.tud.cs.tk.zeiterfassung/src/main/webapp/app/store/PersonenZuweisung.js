Ext.define('AM.store.PersonenZuweisung', {
    extend: 'Ext.data.Store',
//	storeId:'Personen',
	
	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
	autoSync: true,
    
    requires: 'AM.model.PersonenZuweisung',	
	model: 'AM.model.PersonenZuweisung',
});