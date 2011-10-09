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
	        'layout.LiveSearchGridPanel',
	        'personen.Admin',
	        'personen.AdminEditPersonWindow',
	        'fachgebiete.Admin',
	        'fachgebiete.AdminEditDepartmentWindow'
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
       { ref: 'grid', 	   selector: '#adminGrid'}
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
            '#adminGrid':							{ itemdblclick: this.showEditPersonWindow, 
        											  selectionchange: this.gridSelectionChanged},
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
  
    
    
    gridSelectionChanged: function(selModel, selections){
        this.getGrid().down('#btnTaskUpdate').setDisabled(selections.length === 0);
        this.getGrid().down('#btnDelete').setDisabled(selections.length === 0);  
    },    
    
    showEditPersonWindow: function(a, item){
  	  var win = Ext.create('widget.adminEditPersonWindow');
    	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
	  	(Ext.ComponentQuery.query('#personID')[0]).setValue(item.data.id);	
	  	(Ext.ComponentQuery.query('#name')[0]).setValue(item.data.givenname);
    	(Ext.ComponentQuery.query('#surname')[0]).setValue(item.data.surname);
		(Ext.ComponentQuery.query('#openID')[0]).setValue(item.data.openID);
		var comboSuperv = Ext.ComponentQuery.query('#supervisor')[0];
		comboSuperv.store.load(function(records, operation, success) {
  			comboSuperv.setValue(getPerson(item.data.supervisor));
		});                	                                                  		
		/* vorauswahl des momentan eingetragenen HiWis */
		var comboDepartm = Ext.ComponentQuery.query('#department')[0]
		comboDepartm.store.load(function(records, operation, success) {
			comboDepartm.setValue(item.data.fachgebiet);
		});                   
		var comboPosition = Ext.ComponentQuery.query('#position')[0];
		/* vorauswahl des momentan eingetragenen HiWis */
		comboPosition.store.load(function(records, operation, success) {
			comboPosition.setValue(item.data.position);
		});               	                                                  		
		win.show();	
    },    
    
    showEditDepartmentWindow: function(a, item){
    	var detailsWindow = Ext.create('widget.adminEditDepartmentWindow');
    	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
      	/* setze Inhalt im Fenster entsprechend angeklicktem Item */
      	(Ext.ComponentQuery.query('#fachgebietID')[0]).setValue(item.data.id);
      	(Ext.ComponentQuery.query('#name')[0]).setValue(item.data.name);
  		(Ext.ComponentQuery.query('#budget')[0]).setValue(item.data.budget);
  		var comboLeiter = Ext.ComponentQuery.query('#leiter')[0];
  		/* vorauswahl des momentan eingetragenen HiWis */
  		comboLeiter.store.load(function(records, operation, success) {
  			comboLeiter.setValue(item.data.leiter);
  		});    
    	/* zeige Fenster */
    	detailsWindow.show();    	
    },    
    
});