Ext.define('AM.store.Tabelle1', {
    extend: 'Ext.data.Store',
	storeId:'Tabelle1',
	
	model: 'AM.model.fachgebiete.Tabelle1',
	
	data:{'items':[
	  {"id": 1, "name":"Lisa", "fachgebiet":"DKE", "position":"Prof", "prof_zuordnung": -1, "mitarbeiter_zuordnung": -1},
	  {"id": 2, "name":"Bart", "fachgebiet":"NCS", "position":"Prof", "prof_zuordnung": -1, "mitarbeiter_zuordnung": -1},
	  {"id": 3, "name":"Homer", "fachgebiet":"HCE", "position":"Prof", "prof_zuordnung": -1, "mitarbeiter_zuordnung": -1},  
	  {"id": 4, "name":"Dieter", "fachgebiet":"CMS", "position":"Prof", "prof_zuordnung": -1, "mitarbeiter_zuordnung": -1}, 
	  {"id": 5, "name":"Lina", "fachgebiet":"CMS", "position":"Mitarbeiter", "prof_zuordnung": 4, "mitarbeiter_zuordnung": -1}, 
	  {"id": 6, "name":"Tobias", "fachgebiet":"NCS", "position":"Mitarbeiter", "prof_zuordnung": 2, "mitarbeiter_zuordnung": -1},
	  {"id": 7, "name":"Emil", "fachgebiet":"HCE", "position":"Hiwi", "prof_zuordnung": 3, "mitarbeiter_zuordnung": -1}, 
	  {"id": 8, "name":"Siegfried", "fachgebiet":"DKE", "position":"HiWi", "prof_zuordnung": 1, "mitarbeiter_zuordnung": -1}, 
	  {"id": 9, "name":"Mira", "fachgebiet":"NCS", "position":"Hiwi", "prof_zuordnung": -1, "mitarbeiter_zuordnung": 6},                       
	  {"id": 10, "name":"Marge", "fachgebiet":"NCS", "position":"HiWi", "prof_zuordnung": 2, "mitarbeiter_zuordnung": -1},            
	  {"id": 11, "name":"Mr. Burns", "fachgebiet":"CMS", "position":"HiWi", "prof_zuordnung": -1, "mitarbeiter_zuordnung": 5}            					
	]},
	proxy: {
	  type: 'memory',
	  reader: {
		  type: 'json',
		  root: 'items'
	  }
	}
});