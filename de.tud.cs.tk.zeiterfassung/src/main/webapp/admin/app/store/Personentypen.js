Ext.define('AM.store.Personentypen', {
    extend: 'Ext.data.Store',
	
	model: 'AM.model.fachgebiete.Personentypen',
	
	data : [
	  {"name":"Alle"},
	  {"name":"Prof"},
	  {"name":"Mitarbeiter"},
	  {"name":"HiWi"}
	]
});