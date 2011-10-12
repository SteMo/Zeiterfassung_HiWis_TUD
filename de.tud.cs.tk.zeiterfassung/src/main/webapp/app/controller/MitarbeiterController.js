/* speichern, welcher Menüpunkt gerade aktiv ist - wichtig für Detailfenster, da ich nicht weiß, wie ich verschiedene Selektoren für die dynamischen Grids machen kann */
var activeView = 0;

Ext.define('AM.controller.MitarbeiterController', {
    extend: 'Ext.app.Controller',

    stores: [
         'Personen',
         'Menu',
         'PersonenZuweisung',
         'StatusData'
    ],
	
    views: [
	        'layout.Menu',
	        'layout.LiveSearchGridPanel',
	        'dashboard.Mitarbeiter',	        
	        'aufgaben.Mitarbeiter',
	        'aufgaben.MitarbeiterTaskEditWindow',
	        'vertraege.Vertraege',
	        'vertraege.MitarbeiterContractEditWindow',	        
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
       { ref: 'menu',      selector: 'menue'		},
       { ref: 'dashboard', selector: 'dashboard'},
       { ref: 'aufgabenGrid', selector: '#aufgabenGrid'},
       { ref: 'vertragsGrid', selector: '#vertragsGrid'}
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
        	'menue button[id="btnVertraege"]': 		{ click: this.showVertraege  },
        	'menue button[id="btnAufgaben"]': 		{ click: this.showAufgaben  }, 	
            '#aufgabenDeadlineGrid':				{ itemdblclick: this.showTaskEditWindow },             	
        	'#personenGrid':						{ itemdblclick: this.showPersonenDetails },
        	'#aufgabenGrid':						{ itemdblclick: this.showTaskEditWindow,
        											  selectionchange: this.gridSelectionChanged},
        	'#vertragsGrid':						{ selectionchange: this.gridSelectionChanged2}
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
    
    showPersonen: function(){
    	console.log("Personen clicked");
    	var layout = Ext.getCmp('viewport');
    	/* lösche Komponenten um aktuelle hinzufügen zu können - definiert in functions.js */
    	clearContentArea(layout); 	
    	layout.add(Ext.create('AM.view.personen.Personen'));
    	layout.doLayout();
    },
    
    showVertraege: function(){
    	console.log("Verträge clicked");
    	var layout = Ext.getCmp('viewport');
    	/* lösche Komponenten um aktuelle hinzufügen zu können - definiert in functions.js */
    	clearContentArea(layout); 	
    	layout.add(Ext.create('AM.view.vertraege.Vertraege'));
    	layout.doLayout();
    },
    
    showAufgaben: function(){
    	console.log("Aufgaben clicked");
    	var layout = Ext.getCmp('viewport');
    	/* lösche Komponenten um aktuelle hinzufügen zu können - definiert in functions.js */
    	clearContentArea(layout); 	
    	layout.add(Ext.create('AM.view.aufgaben.Mitarbeiter'));
    	layout.doLayout();
    },        
    
    
    showTaskEditWindow: function(a, item){
    	var detailsWindow = Ext.create('widget.mitarbeiterTaskEditWindow');
    	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
      	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowId')[0]).setValue(item.data.id);
  	  	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowTitle')[0]).setValue(item.data.title);
      	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowDescription')[0]).setValue(item.data.desc);
      	(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowAssignedOn')[0]).setValue(item.data.assignedAt);    	        	
  		(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowDeadline')[0]).setValue(item.data.deadline);
  		(Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowPriority')[0]).setValue(item.data.priority);
  		
		var combo = Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowHiwi')[0];
		/* vorauswahl des momentan eingetragenen HiWis */
		combo.store.load(function(records, operation, success) {
		    combo.setValue(item.data.hiwi);
		});	                                                  		

		var combo2 = Ext.ComponentQuery.query('#mitarbeiterTaskEditWindowErledigt')[0];
  		/* vorauswahl des momentan eingetragenen HiWis */
  		combo2.store.load(function(records, operation, success) {
  		    combo2.setValue(item.data.status);
  		});          
    	/* zeige Fenster */
    	detailsWindow.show();    	
    },    
    
    
    showPersonenDetails: function(a, item){    	
    	Ext.create('Ext.window.Window', {
    	    width: 379,
    	    bodyPadding: 10,
    	    title: 'Personendetails',
    	    items: [
    	            {
    	                xtype: 'displayfield',
    	                name: 'name',
    	                value: item.data.hiwi,
    	                fieldLabel: 'Name'
    	            },
    	            {
    	                xtype: 'displayfield',
    	                name: 'mail',
    	                value: item.data.hiwiMail,
    	                fieldLabel: 'E-Mail'
    	            }
    	        ],
    	}).show();
    },
    
    

    gridSelectionChanged: function(selModel, selections){
        this.getAufgabenGrid().down('#btnTaskUpdate').setDisabled(selections.length === 0);
        this.getAufgabenGrid().down('#btnDelete').setDisabled(selections.length === 0);  
    },    
    gridSelectionChanged2: function(selModel, selections){
        this.getVertragsGrid().down('#btnTaskUpdate').setDisabled(selections.length === 0);
        this.getVertragsGrid().down('#btnDelete').setDisabled(selections.length === 0);  
    },        
    
});