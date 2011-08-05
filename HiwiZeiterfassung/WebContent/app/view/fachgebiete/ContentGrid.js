		var getPerson = function(value){
						if (value === -1) {
							return '';
						}
						var dataStore;
						var idx;
						if(Ext.data.StoreManager.lookup('Tabelle1').isFiltered()) {
							dataStore = Ext.data.StoreManager.lookup('Tabelle1').snapshot;
							idx = dataStore.findIndexBy(function(o,k) {
									if(k==value) {
										return true;
									}
									return false;
								});
						} else {
							dataStore = dataStore = Ext.data.StoreManager.lookup('Tabelle1');
							idx = dataStore.findExact("id",value);
						}
						if(idx === -1) {
							return "(404 - id: "+ value + ")";
						}
						return dataStore.getAt(idx).get("name");
					}	

Ext.define('AM.view.fachgebiete.ContentGrid' ,{
    extend: 'Ext.grid.GridPanel',
    alias : 'widget.contentGrid',

	store: 'Tabelle1',	
	
	id: 'listOfPeople',
	width: 700,
	title: '',
	autoHeight: true,	
	
	columns: [
		{
			// xtype: 'gridcolumn',
			dataIndex: 'name',
			header: 'Name',
			sortable: true,
			width: 100,
			editor: {
				xtype:'textfield',
				allowBlank:false
			}
		},
		{
			// xtype: 'gridcolumn',
			dataIndex: 'fachgebiet',
			header: 'Fachgebiet',
			sortable: true,
			width: 100,
			align: 'left',
			editor: {
				xtype:'textfield',
				allowBlank:false
			}
		},
		{
			// xtype: 'gridcolumn',
			dataIndex: 'position',
			header: 'Position',
			sortable: true,
			width: 100,
			editor: {
				xtype:'textfield',
				allowBlank:false
			}
		},
		{
			// xtype: 'gridcolumn',
			dataIndex: 'prof_zuordnung',
			header: 'Zugeordneter Professor',
			sortable: true,
			width: 175,
			renderer: getPerson

		},
		{
			// xtype: 'gridcolumn',
			dataIndex: 'mitarbeiter_zuordnung',
			header: 'Zugeordneter Mitarbeiter',
			sortable: true,
			width: 175,
			renderer: getPerson

		},
		{
			xtype:'actioncolumn', 
			width:50,
			items: [{
				icon: 'resources/images/edit.png',  // Use a URL in the icon config
				iconCls: 'modifyImage',
				tooltip: 'Edit',
				handler: function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					Ext.create('Ext.window.Window', {
						title: 'Hello',
						height: 200,
						width: 400,
						layout: 'fit',
						items: {  // Let's put an empty grid in just to illustrate fit layout
							xtype: 'grid',
							data: grid.getStore().getAt(rowIndex),
							border: false,
							columns: [{ header: 'Name',
										dataIndex: "name"
									  },{
										header: 'Fachbereich',
										dataIndex: "fachbereich"
									  }],                 // One header just for show. There's no data,
							store: Ext.create('Ext.data.ArrayStore', {}) // A dummy empty data store
						}
					}).show();
				}
			},{
				icon: 'resources/images/delete.png',
				iconCls: 'modifyImage',
				tooltip: 'Delete',
				handler: function(grid, rowIndex, colIndex) {
					var rec = grid.getStore().getAt(rowIndex);
					alert("Terminate " + rec.get('name'));
				}                
			}]
		}],
		selType: 'rowmodel',
		plugins: [
		Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit: 1
		})]				
	
	// initComponent: function() {
        // this.callParent(arguments);
    // }
	
});