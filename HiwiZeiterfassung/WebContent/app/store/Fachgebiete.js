Ext.define('AM.store.Fachgebiete', {
    extend: 'Ext.data.Store',
	
	model: AM.model.fachgebiete.Fachgebiete,
	
	data : [
	  {"name":"Alle"},
	  {"name":"CMS"},
	  {"name":"NCS"},
	  {"name":"HCE"},
	  {"name":"DKE"}
	]
});