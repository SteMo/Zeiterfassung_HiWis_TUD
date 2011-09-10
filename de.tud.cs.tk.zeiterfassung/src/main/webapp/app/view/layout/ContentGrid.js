Ext.define('AM.view.layout.ContentGrid' ,{
    extend: 'Ext.grid.GridPanel',
    alias : 'widget.contentGrid',
	
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
	
});