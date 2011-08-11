Ext.define('AM.store.Fachgebiete', {
    extend: 'Ext.data.Store',
	
	model: 'AM.model.Fachgebiete',
	
	data : [
	  {"name":"Alle"},
	  {"name":"CMS"},
	  {"name":"NCS"},
	  {"name":"HCE"},
	  {"name":"DKE"}
	]
});