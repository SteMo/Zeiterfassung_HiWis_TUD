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
    fields:['id', 'name', 'fachgebiet', 'position', 'supervisor'],
    proxy: {
        type: 'jsonp',
        url: 'ws/personen',
        format: 'json',
       // reader: {
       //     type: 'json',
       //     root: 'results',
       //     totalProperty: 'total'
       // }
       reader: new Ext.data.JsonReader({
           root: 'results',
           id: 'id',
           fields: ['name', 'fachgebiet', 'position', 'supervisor', 'id']
       })
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
        type: 'jsonp',
        url: 'ws/menu',
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

Ext.define('AM.model.DashboardData', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'priority', type: 'int'},
        {name: 'deadline', type: 'date', dateFormat: 'd.m.y'},
        {name: 'title',type: 'string'},
        {name: 'assignedFrom',type: 'string'},
        {name: 'assignedAt',type: 'date', dateFormat: 'd.m.y'},
        {name: 'worked',type: 'string'}
    ],
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/dashboardData.json',
        reader: {
            type: 'json',
            root: 'results'
        }
    }    
});

Ext.define('AM.model.TaskDetails', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'string'},
        {name: 'date', type: 'date', dateFormat: 'd.m.y'},
        {name: 'worked',type: 'string'},
        {name: 'description', type: 'string'},       
    ],
    
    proxy: {
        type: 'ajax',
        url: 'resources/data/dashboardTaskDetails.json',
        reader: {
            type: 'json',
            root: 'results'
        },
        writer: {
            type: 'json'
        }        
    }    
});

