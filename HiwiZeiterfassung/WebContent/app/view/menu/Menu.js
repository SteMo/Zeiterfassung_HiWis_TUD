//Ext.require([
//	'Ext.util.Cookies',
//	'Ext.state.*'
//	]);
//
//
// 	

var createItemListFromStore = function (dataStore) {
	var itemList = new Array();
	var i = 0;
	for(var menuItem in dataStore.data.items) {
		console.log(">>>>> "+menuItem);
		itemList[i] = new Object();
		for(var menuItemKey in dataStore.data.items[menuItem].fields.keys) {
			itemList[i][dataStore.data.items[menuItem].fields.keys[menuItemKey]] = dataStore.data.items[menuItem].data[dataStore.data.items[menuItem].fields.keys[menuItemKey]]
		}
		i++;
	}
	return itemList;
}

Ext.define('menuModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'text', type: 'string'},
        {name: 'handler',type: 'string'},
        {name: 'xtype',type: 'string'}
    ]
});

Ext.define('AM.view.menu.Menu' ,{
    alias : 'widget.menue',
    extend: 'Ext.Toolbar',
    
    autoRender: true,
   
	title: '',
	width: 700,
	
	items: createItemListFromStore(new Ext.data.Store({
	    model: 'menuModel',
	    data : [
	        {text: 'Dashboard',handler:'',xtype: 'button'},
	        {text: 'Fachbereich',handler:'',xtype: 'button'},
	        {text: 'Personen',handler:'',xtype: 'button'},
	        {text: 'Vertr&auml;ge',handler:'',xtype: 'button'},
	        {text: 'Aufgaben',handler:'',xtype: 'button'}
	    ]
	})),
	

//	items: [
//		{	text: 'Dashboard'	},
//		' ',
//		{	text: 'Fachgebiete'	},
//		' ',
//		{	text: 'Personen', handler: function() {
//								window.location.href = "index.html";
//			}},
//		' ',
//		{	text: 'Verträge', handler: function() {
//								window.location.href = "vertraege.html";
//			}},
//		' ',
//		{	text: 'Aufgaben'	},
//		' '
//	],  
	
//	 initComponent: function() {
//	   id = Ext.util.Cookies.get('id');
//	   console.log(id);
//	   
//	   if(id==1){
//		   self.add({ text: 'Berichte'  });
//	   }
//	 this.callParent(arguments);
//}    	

	
});


//var toolbar = Ext.create('AM.view.menu.Menu', {
//    width   : 700,
//    items: [
//        {
//            text: 'Example Button'
//        }
//    ],
//    
//	
//	 initComponent: function() {
//		   id = Ext.util.Cookies.get('id');
//		   console.log(id);
//		   
//		   if(id==1){
//			   toolbar.add({ text: 'Berichte'  });
//		   }
//		 this.callParent(arguments);
//    }    
//});