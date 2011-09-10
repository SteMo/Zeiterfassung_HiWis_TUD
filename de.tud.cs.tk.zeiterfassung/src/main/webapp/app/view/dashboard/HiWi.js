Ext.define('AM.view.dashboard.HiWi' ,{
    alias : 'widget.dashboardHiWi',
    extend: 'Ext.container.Container',     
    	
    	
    	initComponent: function(){
        	var me = this;
    		me.items = [

				{
					// Inhaltsbereich (Tabelle/Grid)
					xtype: 'grid',
					width: 700,
					height: 300,
					padding: '10 0 5 0',
				
					id: 'listOfTasks',	//war: listOfPeople
					width: '700',

					store: 'DashboardData',
					columns: columnsDashboard,	
					
					title: 'Aufgaben',	
					
				    dockedItems: [{
				    	id:	   'pagingtoolbar',
				        xtype: 'pagingtoolbar',
				        store: 'DashboardData',   // same store GridPanel is using
				        dock: 'bottom',
				        displayInfo: true
				    }]					
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
				                        height: 100,
				                        id: 'hiwiDbInfoContainer',
				                        layout: {
				                            align: 'stretch',
				                            type: 'vbox'
				                        },
				                        flex: 1,
				                        items: [
				                            {
				                                xtype: 'displayfield',
				                                id: 'hiwiDbLblLetzterLogin',
				                                width: 114,
				                                value: 'Display Field',
				                                fieldLabel: 'Letzter Login',
				                                flex: 0
				                            },
				                            {
				                                xtype: 'displayfield',
				                                id: 'hiwiDbLblTarif',
				                                width: 114,
				                                value: 'Display Field',
				                                fieldLabel: 'Tarif',
				                                flex: 0
				                            }
				                        ]
				                    },
				                    {
				                        xtype: 'chart',
				                        frame: true,
				                        height: 155,
				                        id: 'hiwiDbZeitDiagramm',
				                        margin: '0 0 0 100',              
				                        width: 300,
				                        animate: true,
				                        insetPadding: 35,
				                        store: Ext.create('Ext.data.Store', {
						                            fields: ['geleisteteArbeit'],
						                            data : [{'geleisteteArbeit': '80'}]}),
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