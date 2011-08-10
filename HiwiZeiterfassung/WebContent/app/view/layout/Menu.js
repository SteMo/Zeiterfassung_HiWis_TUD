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

Ext.define('AM.view.layout.Menu' ,{
    alias : 'widget.menue',
    extend: 'Ext.Toolbar',
    
    autoRender: true,
   
	title: '',
	width: 700,
	
	items: createItemListFromStore(new Ext.data.Store({
	    model: 'menuModel',
	    data : [
	        {text: 'Dashboard',handler:'',xtype: 'button'},
	        {text: 'Fachbereiche',handler:'',xtype: 'button'},
	        {text: 'Personen',handler:'',xtype: 'button'},
	        {text: 'Vertr&auml;ge',handler:'',xtype: 'button'},
	        {text: 'Aufgaben',handler:'',xtype: 'button'}
	    ]
	})),
	
});


