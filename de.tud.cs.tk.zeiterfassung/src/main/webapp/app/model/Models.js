/* Warum hier proxy? Setzt Standardproxy, muss dann nicht von Stores immer gesetzt werden, nur wenn mehrere Stores selbes model benutzen und sich Rückgabe unterscheidet  */

/**
 * ! Wenn sich etwas am Model ändert müssen evtl auch andere Stellen angepasst werden, da diese 
 * auf die Felder ja zugreifen (z.B. die Detail-Fenster zu Personen bei Doppelklick @ Controller) 
 * */

Ext.define('AM.model.Fachgebiete', {
    extend: 'Ext.data.Model',
    fields:['name'],
	proxy: {
	    type: 'ajax',
	    url: 'resources/data/fachgebiete.json',
	    reader: {
	        type: 'json',
	        root: 'results'
	    }
	}
});

Ext.define('AM.model.Personentypen', {
    extend: 'Ext.data.Model',
    fields:['name'],
    proxy: {
        type: 'ajax',
        url: 'resources/data/personentypen.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }
});


Ext.define('AM.model.Personen', {
    extend: 'Ext.data.Model',
    fields:['id', 'name', 'fachgebiet', 'position', 'prof_zuordnung', 'mitarbeiter_zuordnung'],
    proxy: {
        type: 'ajax',
        url: 'resources/data/personenData.json',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});

Ext.define('AM.model.fachgebiete.FachgebieteData', {
    extend: 'Ext.data.Model',
    fields:['id', 'fachgebiet', 'kuerzel', 'leiter', 'stellvertreter'],
    proxy: {
        type: 'ajax',
        url: 'resources/data/fachgebieteData.json',
        reader: {
            type: 'json',
            root: 'results',
            totalProperty: 'total'
        }
    }
});

/* ################## Menü ################### */
Ext.define('AM.model.MenuModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'handler',type: 'string'},
        {name: 'xtype',type: 'string'}
    ],
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/menu.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});


/* ################## Columns (ContentGrid) ################### */
Ext.define('AM.model.ColumnsFachgebiete', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'text', type: 'string'},
        {name: 'handler',type: 'string'},
        {name: 'xtype',type: 'string'}
    ],
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/columnsFachgebiete.json',
        reader: {
            type: 'json',
            root: 'columns'
        }
    }    
});
