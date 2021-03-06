Ext.define('AM.view.dashboard.HiWi' ,{
    alias : 'widget.dashboardHiWi',
    extend: 'Ext.container.Container',     
    	
    	
    	initComponent: function(){
            var vertragsdatenStore = Ext.create('Ext.data.Store', {
                model: 'AM.model.HiWiVertrag',
                autoLoad: false,
            });
            vertragsdatenStore.load(function(records, operation, success) {
                (Ext.ComponentQuery.query('#vertragsbeginn')[0]).setValue(vertragsdatenStore.getAt(0).get("begin"));
                (Ext.ComponentQuery.query('#vertragsende')[0]).setValue(vertragsdatenStore.getAt(0).get("end"));
                (Ext.ComponentQuery.query('#stundenMonat')[0]).setValue(vertragsdatenStore.getAt(0).get("hoursPerMonth"));
                (Ext.ComponentQuery.query('#tarif')[0]).setValue(vertragsdatenStore.getAt(0).get("rate"));
        	});                
            
            var zeitDiagrammStore = Ext.create('Ext.data.Store', {
                model: 'AM.model.ZeitDiagramm',
                autoLoad: true,
                storeId: 'zeitDiagrammStore'
            });      
            zeitDiagrammStore.load(function(records, operation, success) {
                (Ext.ComponentQuery.query('#geleisteteStunden')[0]).setValue(zeitDiagrammStore.getAt(0).get("ist"));
        	});    

        	var me = this;
    		me.items = [

				{
					// Inhaltsbereich (Tabelle/Grid)
					xtype: 'liveSearchGridPanel',
					width: 700,
					height: 300,
					padding: '10 0 5 0',
				
					id: 'hiwiTaskDetails',	//war: listOfPeople
					width: '700',

					store: 'DashboardData',
					columns: [
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
		                    ],	
					
					title: 'Aufgaben',	
					
				    dockedItems: [
	                              {
	                                  xtype: 'toolbar',
	                                  anchor: '100%',
	                                  dock: 'bottom',
	                                  items: [
	                                          {
	                   						   xtype: 'tbfill'
	                   					  }, 				                  
		                                  {
		                                      xtype: 'button',
		                                      itemId: 'btnStundenUpdate',
		                                      text: 'Stunden eintragen/ansehen',
		                                      icon: 'resources/images/edit.png',
		                                      disabled: true,
		                                      handler: function(){
		                                    	  var grid = me.getComponent('hiwiTaskDetails');
		                                          var item = grid.getView().getSelectionModel().getSelection()[0];
		                                          if (item) {
		                                          	var detailsWindow = Ext.create('AM.view.dashboard.HiWiTaskDetailsWindow', {chosenTask: item.data.id});
		                                        	detailsWindow.show();
		                                          }
		                                      }
		                                  }]},   				                  
//				                  {				    	
//				    	id:	   'pagingtoolbar',
//				        xtype: 'pagingtoolbar',
//				        store: 'DashboardData',   // same store GridPanel is using
//				        dock: 'bottom',
//				        displayInfo: true
//				    }
		            ]					
				},
				{
					xtype: 'container',
					width: 700,
					
					border: 10,
					
				    layout: {
				        type: 'table',
				        padding: '30 0 0 0',
				        columns: 2
				    },
					
					title: '',
					items: [
				            {            
				                xtype: 'button',
				                id: 'hiwiDbLblAbgeschlosseneAufgaben',                
				                text: 'Abgeschlossene Aufgaben anzeigen',
				                margin: '15 0 30 0',
				                flex: 0
				            },{
				            	 xtype: 'label',
				            	 
				            	 text: ''
				            },{
				                        xtype: 'container',
				                        height: 250,
				                        id: 'hiwiDbInfoContainer',
				                        layout: {
				                            align: 'stretch',
				                            type: 'vbox'
				                        },
				                        flex: 1,
				                        items: [
				                            {
				                                xtype: 'displayfield',
				                                width: 114,
				                                itemId: 'vertragsbeginn',
				                                value: 'Display Field',
				                                fieldLabel: 'Vertragsbeginn',
				                                flex: 0,
				                                padding: '10 0 25 0'
				                            },
				                            {
				                                xtype: 'displayfield',
				                                width: 114,
				                                itemId: 'vertragsende',
				                                value: 'Display Field',
				                                format: 'd.m.y',
				                                fieldLabel: 'Vertragsende',
				                                flex: 0,
				                                padding: '10 0 25 0'
				                            },	
				                            {
				                                xtype: 'displayfield',
				                                width: 114,
				                                itemId: 'stundenMonat',
				                                value: 'Display Field',
				                                fieldLabel: 'Stunden/Monat',
				                                flex: 0
				                            },		
				                            {
				                                xtype: 'displayfield',
				                                width: 114,
				                                itemId: 'geleisteteStunden',
				                                value: 'Display Field',
				                                fieldLabel: 'Geleistete Stunden',
				                                flex: 0
				                            },					                            
				                            {
				                                xtype: 'displayfield',
				                                width: 114,
				                                itemId: 'tarif',
				                                value: 'Display Field',
				                                fieldLabel: 'Tarif',
				                                flex: 0
				                            }
				                        ]
				                    },
				                    {
				                        xtype: 'chart',
				                        frame: true,
				                        height: 210,
				                        id: 'hiwiDbZeitDiagramm',
				                        margin: '0 0 0 100',              
				                        width: 300,
				                        animate: true,
				                        insetPadding: 35,
				                        store: zeitDiagrammStore,
				                        flex: 1,
				                        axes: [
				                            {
				                                position: 'gauge',
				                                type: 'gauge',
				                                margin: 8,
				                                maximum: 100,
				                                minimum: 0
				                            }
				                        ],
				                        series: [
				                            {
				                                type: 'gauge',
				                                field: 'geleisteteArbeit',
				                                donut: 30,
				                                colorSet: ['#82B525', '#ddd']
				                            }
				                        ]
				                    }
				        ]
				}
				];	    		
    		
    		this.callParent(arguments);
    	}
    	
    });