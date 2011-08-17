Ext.define('AM.store.FachgebieteData', {
    extend: 'Ext.data.Store',
	storeId:'FachgebieteData',
	
	requires: 'AM.model.fachgebiete.FachgebieteData',
	model: 'AM.model.fachgebiete.FachgebieteData',

	/* durch autoLoad=true läd er die JSON Daten direkt in den Store */
	autoLoad: true,
});