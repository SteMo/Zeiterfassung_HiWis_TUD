Ext.define('AM.store.Fachgebiete', {
    extend: 'Ext.data.Store',
	
    requires: 'AM.model.Fachgebiete',
	model: 'AM.model.Fachgebiete',
	
	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
});