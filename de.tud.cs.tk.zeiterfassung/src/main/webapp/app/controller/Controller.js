
Ext.define('AM.controller.Controller', {
    extend: 'Ext.app.Controller',

    stores: [
         'Fachgebiete',
         'Personentypen',
         'Personen',
         'FachgebieteData',
         'Menu'
    ],
	
    views: [
        'layout.Menu',
        'layout.Filterbereich',
        'layout.ContentGrid',
		'personen.ComboFachgebiete',
		'personen.ComboPersonentypen',
    ],
	
	models: [
		'Personen',
		'Personentypen',
		'Fachgebiete',
		'MenuModel'
	],
	
	/* mit refs kann man auf Views zugreifen, "ref" ist nur ein beliebiger Name, selector der xtype der Komponente (oder sonstiges, siehe "Ext.ComponentQuery")
	 * -> Zugriff über: this.get<ref>(), erster Buchstabe von <ref> groß...	 */
    refs: [
       { ref: "content",   selector: "contentGrid", },
       { ref: 'menu',      selector: 'menue'		}
    ],

    init: function() {
    	console.log("Controller -> init");

    	/* hier greifen wir auf Events zu! Das "render"-Event ist wichtig, wenn wir auf eine Komponente zurückgreifen wollen mit getXYZ()
    	 * da man erst ab diesem Zeitpunkt auf die Komponente zugreifen kann (vollständig initialisiert und gerendered) */
        this.control({
        	'menue': 								{ render : this.menuLoadItemsFromDB,
        											  'itemsLoaded': this.menuLoadItems},
            'menue button[id="btnDashboard"]': 		{ click: this.showDashboard  },
        	'menue button[id="btnFachbereiche"]': 	{ click: this.showFachgebiete  },
        	'menue button[id="btnPersonen"]': 		{ click: this.showPersonen  },
        	'menue button[id="btnVertraege"]': 		{ click: this.showDashboard  },
        	'menue button[id="btnAufgaben"]': 		{ click: this.showDashboard  }, 	
        });       	
    },
    
    /* lade Daten von DB in Menü-store */
    menuLoadItemsFromDB: function(e){
    	this.getMenu().removeAll();
    	/* so kann man auf das load-Event zugreifen. Geht vll auch anders, war hier einfach ausprobieren... */
    	this.getMenu().relayEvents(this.getMenuStore(), ['itemsLoaded']);
    	this.getMenuStore().load(function(records, operation, success) {
    	    console.log('Controller > menuLoadItemsFromDB: menu records loaded');
    	    /* es gibt zwar ein load-Event, aber dann wird die Funktion 2x aufgerufen (weiß nicht wieso), deshalb habe ich ein eigenes gemacht */
    	    this.fireEvent("itemsLoaded");
    	});

    },   
    /* lade Daten aus Menü-store ins Menü (GUI) */
    menuLoadItems: function(e){
    	var items = createItemListFromStore(this.getMenuStore());    	
    	this.getMenu().removeAll();
    	for(var i in items) {
    		this.getMenu().add(items[i]);
    	}
    	this.getMenu().doLayout(); //refresh layout    	
    },
    
    
    showDashboard: function(){
    	console.log("Dashboard clicked");
        this.getContent().bindStore(this.getFachgebieteDataStore());
    },
    
    showFachgebiete: function(){
    	console.log("Fachbereiche clicked");
    	/* reconfigure bindet einen neuen Store + columns an Grid */
    	this.getContent().reconfigure(this.getFachgebieteDataStore(), columnsFachgebiete);
    	/* PagingToolbar aktualisieren: 1. an geänderten Store binden, 2. Ansicht refreshen */
    	this.getContent().getDockedComponent("pagingtoolbar").bindStore(this.getFachgebieteDataStore());
    	this.getContent().getDockedComponent("pagingtoolbar").doRefresh();
    },

    showPersonen: function(){
    	console.log("Personen clicked");
    	/* reconfigure bindet einen neuen Store + columns an Grid */
    	this.getContent().reconfigure(this.getPersonenStore(), columnsPersonen);
    	/* PagingToolbar aktualisieren: 1. an geänderten Store binden, 2. Ansicht refreshen */
    	this.getContent().getDockedComponent("pagingtoolbar").bindStore(this.getPersonenStore());
    	this.getContent().getDockedComponent("pagingtoolbar").doRefresh();
    },
    
    showVertraege: function(){
    	console.log("Verträge clicked");
        this.getContent().bindStore(this.getFachgebieteDataStore());
    },
    
    showAufgaben: function(){
    	console.log("Aufgaben clicked");
        this.getContent().bindStore(this.getFachgebieteDataStore());
    },    
});