Ext.define('AM.store.Personentypen', {
    extend: 'Ext.data.Store',
	
	model: 'AM.model.Personentypen',
	
	data : [
	  {"name":"Alle"},
	  {"name":"Prof"},
	  {"name":"Mitarbeiter"},
	  {"name":"HiWi"}
	]
});