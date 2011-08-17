Ext.define('AM.store.Personentypen', {
    extend: 'Ext.data.Store',
	
    requires: 'AM.model.Personentypen',
	model: 'AM.model.Personentypen',
	
	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
});