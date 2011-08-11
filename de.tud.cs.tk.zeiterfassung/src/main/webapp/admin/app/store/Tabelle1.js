Ext.define('AM.store.Tabelle1', {
    extend: 'Ext.data.Store',
	storeId:'Tabelle1',
	
	model: 'AM.model.fachgebiete.Tabelle1',

	data:{'items':[
	  {"id": 1, "fachgebiet":"Data Knowledge Engineering", "kuerzel":"DKE", "leiter":"Prof A", "stellvertreter": "StellV"},
	  {"id": 2, "fachgebiet":"Net Centric Systems", "kuerzel":"NCS", "leiter":"Prof B", "stellvertreter": "StellV"},
	  {"id": 3, "fachgebiet":"Human Computer Interaction", "kuerzel":"HCI", "leiter":"Prof C", "stellvertreter": "StellV"},
	  {"id": 4, "fachgebiet":"Computer Micro Systems", "kuerzel":"CMS", "leiter":"Prof D", "stellvertreter": "StellV"}, 
	  {"id": 5, "fachgebiet":"Computer Micro Systems", "kuerzel":"CMS", "leiter":"Prof D", "stellvertreter": "StellV"},
        					
	]},
	proxy: {
	  type: 'memory',
	  reader: {
		  type: 'json',
		  root: 'items'
	  }
	}
});