/* speichern, welcher Menüpunkt gerade aktiv ist - wichtig für Detailfenster, da ich nicht weiß, wie ich verschiedene Selektoren für die dynamischen Grids machen kann */
var activeView = 0;

Ext.define('AM.controller.AdminController', {
    extend: 'Ext.app.Controller',

    stores: [
         'Personen',
         'Menu',
         'PersonenZuweisung'
    ],
	
    views: [
	        'layout.Menu',
	        'layout.ContentGrid',
	        'personen.Admin',
	        'fachgebiete.Admin'
            ],
	
	models: [
		'Personen',
		'Personentypen',
		'PersonenZuweisung',
		'Fachgebiete',
		'MenuModel'
	],
	
	/* mit refs kann man auf Views zugreifen, "ref" ist nur ein beliebiger Name, selector der xtype der Komponente (oder sonstiges, siehe "Ext.ComponentQuery")
	 * -> Zugriff über: this.get<ref>(), erster Buchstabe von <ref> groß...	 */
    refs: [
       { ref: "content",   selector: "contentGrid", },
       { ref: 'menu',      selector: 'menue'		},
       { ref: 'aufgabenGrid', selector: '#aufgabenGrid'}
//       { ref: 'detailsWindow', selector: 'detailsWindow'}
    ],

    init: function() {
    	console.log("AdminController -> init");

    	/* hier greifen wir auf Events zu! Das "render"-Event ist wichtig, wenn wir auf eine Komponente zurückgreifen wollen mit getXYZ()
    	 * da man erst ab diesem Zeitpunkt auf die Komponente zugreifen kann (vollständig initialisiert und gerendered) */
        this.control({
        	'menue': 								{ render : this.menuLoadItemsFromDB,
        											  'itemsLoaded': this.menuLoadItems},
        	'menue button[id="btnFachbereiche"]': 	{ click: this.showFachgebiete  },
        	'menue button[id="btnPersonen"]': 		{ click: this.showPersonen  },
        	'#aufgabenGrid':						{ itemdblclick: this.showTaskEditWindow,
        											  selectionchange: this.taskDetailsGridSelectionChanged},
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
    

    
    showFachgebiete: function(){
    	console.log("Fachbereiche clicked");
    	var layout = Ext.getCmp('viewport');
    	/* lösche Komponenten um aktuelle hinzufügen zu können - definiert in functions.js */
    	clearContentArea(layout); 	
    	layout.add(Ext.create('AM.view.fachgebiete.Admin'));
    	layout.doLayout();
    },

    showPersonen: function(){
    	console.log("Personen clicked");
    	var layout = Ext.getCmp('viewport');
    	/* lösche Komponenten um aktuelle hinzufügen zu können - definiert in functions.js */
    	clearContentArea(layout); 	
    	layout.add(Ext.create('AM.view.personen.Admin'));
    	layout.doLayout();
    },
  
    
    
    taskDetailsGridSelectionChanged: function(selModel, selections){
        this.getAufgabenGrid().down('#btnTaskUpdate').setDisabled(selections.length === 0);     
    },             
    
});