Ext.define('AM.view.layout.ContentGrid' ,{
    extend: 'Ext.grid.GridPanel',
    alias : 'widget.contentGrid',

	store: 'Personen',	
	
	id: 'listOfPeople',

	title: '',
//	autoHeight: true,	
		
	/* columnsPersonen definiert in view/layout/Columns.js */
	columns: columnsPersonen,
	
	
    dockedItems: [{
    	id:	   'pagingtoolbar',
        xtype: 'pagingtoolbar',
        store: 'Personen',   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true
    }]
	
});