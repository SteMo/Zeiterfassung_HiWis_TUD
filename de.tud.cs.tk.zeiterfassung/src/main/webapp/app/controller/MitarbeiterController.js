/* speichern, welcher Menüpunkt gerade aktiv ist - wichtig für Detailfenster, da ich nicht weiß, wie ich verschiedene Selektoren für die dynamischen Grids machen kann */
var activeView = 0;

Ext.define('AM.controller.MitarbeiterController', {
    extend: 'Ext.app.Controller',

    stores: [
         'Fachgebiete',
         'Personentypen',
         'Personen',
         'FachgebieteData',
         'Menu',
         'DashboardData',
         'TaskDetails'
    ],
	
    views: [
	        'layout.Menu',
	        'layout.ContentGrid',
	        'dashboard.Mitarbeiter'            
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
       { ref: "filterbereich", selector: "filterbereich"},
       { ref: 'menu',      selector: 'menue'		},
       { ref: 'dashboard', selector: 'dashboard'},
       { ref: 'taskDetailsGrid', selector: '#taskDetailsGrid'}
//       { ref: 'detailsWindow', selector: 'detailsWindow'}
    ],

    init: function() {
    	console.log("MitarbeiterController -> init");

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
        	'menue button[id="btnStundenEintragen"]': { click: this.showHiWiStundenEintragen  },
        	'contentGrid':							{ itemdblclick: this.showContentDetails },
        	'#taskDetailsGrid':						{ selectionchange: this.taskDetailsGridSelectionChanged}
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
    	var layout = Ext.getCmp('viewport');
    	/* lösche Komponenten um aktuelle hinzufügen zu können - definiert in functions.js */
    	clearContentArea(layout); 	
    	layout.add(Ext.create('AM.view.dashboard.Mitarbeiter'));
    	layout.doLayout();
    },
    
    showFachgebiete: function(){
    	console.log("Fachbereiche clicked");
    	/* reconfigure bindet einen neuen Store + columns an Grid */
    	this.getContent().id = "listOfDepartments";
    	this.getContent().reconfigure(this.getFachgebieteDataStore(), columnsFachgebiete);
    	/* PagingToolbar aktualisieren: 1. an geänderten Store binden, 2. Ansicht refreshen */
    	this.getContent().getDockedComponent("pagingtoolbar").bindStore(this.getFachgebieteDataStore());
    	this.getContent().getDockedComponent("pagingtoolbar").doRefresh();
    },

    showPersonen: function(){
    	console.log("Personen clicked");
    	this.getContent().id = "listOfPeople";
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
    
    
    showContentDetails: function(a, item){
//    	console.log("showContentDetails:");
//    	console.log(item.data);

    	var detailsWindow = Ext.create('widget.detailsWindow', { title: 'Details &uuml;ber ' + item.data.name });

    	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
    	/**
    	 * ToDo: 
    	 * Was soll alles angezeigt werden? Beim Store/Model muss man mal sehen, in dem Beispiel von unseren
    	 * Betreuern (glaub da war das) haben die einfach alle Daten im Store, im Grid werden nicht alle angezeigt
    	 *  - so wäre hier ja auch sinnvoll um bei den Details dann "alles" anzeigen zu können
    	 */
    	
    	
    	/* Abfrage welches Grid gerade geladen ist um entsprechendes Detailfenster anzuzeigen */
    	if(Ext.ComponentQuery.query('#listOfPeople').length!=0){
    		//Name:
    		/* Packagenotation geht in query nicht, CSS-like... */
        	(Ext.ComponentQuery.query('#personenDetailsWindowPersonName')[0]).setValue(item.data.name);
        	//Vorname:
        	(Ext.ComponentQuery.query('#personenDetailsWindowPersonVorname')[0]).setValue(item.data.name);
        	//Fachgebiet:
        	(Ext.ComponentQuery.query('#personenDetailsWindowUniFachgebiet')[0]).setValue(item.data.fachgebiet);
        	//Position:
        	(Ext.ComponentQuery.query('#personenDetailsWindowUniPosition')[0]).setValue(item.data.position);    	
        	
        	//zugeordneter Professor? Ist das entweder oder mit Mitarbeiter?
        	if(item.data.prof_zuordnung!=-1)
        		(Ext.ComponentQuery.query('#personenDetailsWindowUniZuProfessor')[0]).setValue(getPerson(item.data.prof_zuordnung));
        	//zugeordneter Mitarbeiter?
        	if(item.data.mitarbeiter_zuordnung!=-1)
        		(Ext.ComponentQuery.query('#personenDetailsWindowUniZuMitarbeiter')[0]).setValue(getPerson(item.data.mitarbeiter_zuordnung));    	

    	}else if(Ext.ComponentQuery.query('#listOfDepartments').length!=0){
    		// TO DO ! Siehe oben...
    	
    	}else if(Ext.ComponentQuery.query('#listOfTasks').length!=0){
    		var detailsWindow = Ext.create('AM.view.dashboard.HiWiTaskDetailsWindow');
		}

    	/* zeige Fenster */
    	detailsWindow.show();
    },
    
    
    
    /* ----------- HiWi ------------ */
// -> über Doppelklick
//    showHiWiStundenEintragen: function(){
//    	console.log("HiWiStundenEintragen clicked");
//    	Ext.getCmp('viewport').remove("listOfFilters");
//        this.getContent().bindStore(this.getFachgebieteDataStore());   
//    },
    
    taskDetailsGridSelectionChanged: function(selModel, selections){
        this.getTaskDetailsGrid().down('#delete').setDisabled(selections.length === 0);     
    },        
    
});