/* speichern, welcher Menüpunkt gerade aktiv ist - wichtig für Detailfenster, da ich nicht weiß, wie ich verschiedene Selektoren für die dynamischen Grids machen kann */
var activeView = 0;

Ext.define('AM.controller.HiwiController', {
    extend: 'Ext.app.Controller',

    stores: [
         'Menu',
         'DashboardData',
         'TaskDetails'
    ],	
    views: [        
        'layout.Menu',
        'layout.LiveSearchGridPanel',        
		'dashboard.HiWi',
		'dashboard.HiWiTaskDetailsWindow'],
	
	models: [
		'Personen',
		'MenuModel'
	],
	
	/* mit refs kann man auf Views zugreifen, "ref" ist nur ein beliebiger Name, selector der xtype der Komponente (oder sonstiges, siehe "Ext.ComponentQuery")
	 * -> Zugriff über: this.get<ref>(), erster Buchstabe von <ref> groß...	 */
    refs: [
       { ref: 'menu',      selector: 'menue'		},
       { ref: 'dashboard', selector: 'dashboard'},
       { ref: 'taskDetailsGrid', selector: '#taskDetailsGrid'},
       
       
    ],

    
    init: function() {
    	console.log("HiwiController -> init");

    	/* hier greifen wir auf Events zu! Das "render"-Event ist wichtig, wenn wir auf eine Komponente zurückgreifen wollen mit getXYZ()
    	 * da man erst ab diesem Zeitpunkt auf die Komponente zugreifen kann (vollständig initialisiert und gerendered) */
        this.control({
        	'menue': 								{ render : this.menuLoadItemsFromDB,
        											  'itemsLoaded': this.menuLoadItems},
            'menue button[id="btnDashboard"]': 		{ click: this.showDashboard  },
      
            '#hiwiTaskDetails':						{ itemdblclick: this.showContentDetails },        	
            '#taskDetailsGrid':						{ selectionchange: this.taskDetailsGridSelectionChanged},
        	
            
            '#hiwiDbLblAbgeschlosseneAufgaben':		{ click: this.loadCompletedTasks }
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
    	Ext.getCmp('viewport').add(Ext.create('AM.view.dashboard.HiWi'));
    	Ext.getCmp('viewport').doLayout();
    },
      
    
    showContentDetails: function(a, item){
    	var detailsWindow = Ext.create('AM.view.dashboard.HiWiTaskDetailsWindow', {chosenTask: item.data.id});
    	detailsWindow.show();
    },

    
    loadCompletedTasks: function(){
    	console.log("Lade alte Aufgaben clicked");
    	var columns = [
                       {
                           xtype: 'numbercolumn',
                           dataIndex: 'priority',
                           format: '0',
                           width: 50,
                           text: 'Priorität',
                       },                        
                       {
                           xtype: 'datecolumn',
                           dataIndex: 'deadline',
                           text: 'Deadline',
                           width: 75,
                           format: 'd.m.y'
                       },
                       {
                           xtype: 'gridcolumn',                            
                           dataIndex: 'title',
                           text: 'Titel',
                           flex: 1
                       },
                       {
                           xtype: 'gridcolumn',
                           dataIndex: 'assignedFrom',
                           width: 120,
                           text: 'Zugewiesen von'
                       },
                       {
                           xtype: 'datecolumn',
                           dataIndex: 'assignedAt',
                           text: 'Zugewiesen am',
                           width: 85,
                           format: 'd.m.y'
                       },
                       {
                           xtype: 'numbercolumn',
                           dataIndex: 'worked',
                           text: 'Geleistete Arbeit',
                           width: 90,
                           format: '0.00 h',
                       }                        
                   ];
    	
    	var store;
    	var button = (Ext.ComponentQuery.query('#hiwiDbLblAbgeschlosseneAufgaben')[0]);

    	console.log(button.getText());
    	if(button.getText()=="Abgeschlossene Aufgaben anzeigen"){
    		button.setText("Zeige offene Aufgaben");
    		store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'AM.model.HiWiAufgabeOld',  
            });     
    	}else{
    		button.setText("Abgeschlossene Aufgaben anzeigen");
    		store = Ext.create('Ext.data.Store', {
                autoLoad: true,
                autoSync: true,
                model: 'AM.model.HiWiAufgabe',  
            });         	}
    	
    	var me = this;
    	store.load(function(records, operation, success) {	
    		me.getTaskDetailsGrid().reconfigure(store, columns);
    		me.getTaskDetailsGrid().doLayout();
    	});
    },
    
    
    taskDetailsGridSelectionChanged: function(selModel, selections){
        this.getTaskDetailsGrid().down('#delete').setDisabled(selections.length === 0);     
    },        
    
});