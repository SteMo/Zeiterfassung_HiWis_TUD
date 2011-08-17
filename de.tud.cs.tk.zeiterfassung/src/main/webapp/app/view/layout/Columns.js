/* Hier möchte ich die Columns definieren. Eigentlich wollte ich das Ganze aus der DB laden, aber so erschien es mir leichter
 * -> die columns.js wird entsprechend der Rolle des eingeloggten Benutzters geladen
 */

var columnsFachgebiete = [
	  		{
	  			dataIndex: 'fachgebiet',
	  			header: 'Fachgebiet',
	  			sortable: true,
	  			width: 250,
	  		},
	  		{
	  			dataIndex: 'kuerzel',
	  			header: 'Kürzel',
	  			sortable: true,
	  			width: 60,
	  			align: 'center',
	  		},
	  		{
	  			dataIndex: 'leiter',
	  			header: 'Leiter',
	  			sortable: true,
	  			width: 165,
	  		},
	  		{
	  			dataIndex: 'stellvertreter',
	  			header: 'Stellvertreter',
	  			sortable: true,
	  			width: 165,
//    		  			renderer: getPerson

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
	  		}];


var columnsPersonen = [
      		{
    			// xtype: 'gridcolumn',
    			dataIndex: 'name',
    			header: 'Name',
    			sortable: true,
    			width: 100,
    		},
    		{
    			// xtype: 'gridcolumn',
    			dataIndex: 'fachgebiet',
    			header: 'Fachgebiet',
    			sortable: true,
    			width: 100,
    			align: 'left',
    		},
    		{
    			// xtype: 'gridcolumn',
    			dataIndex: 'position',
    			header: 'Position',
    			sortable: true,
    			width: 100,
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
    			width:48,
    			items: [{
    				icon: 'resources/images/edit.png',  // Use a URL in the icon
    													// config
    				iconCls: 'modifyImage',
    				tooltip: 'Edit',
    				handler: function(grid, rowIndex, colIndex) {
    					var rec = grid.getStore().getAt(rowIndex);
    					Ext.create('Ext.window.Window', {
    						title: 'Hello',
    						height: 200,
    						width: 400,
    						layout: 'fit',
    						items: {  // Let's put an empty grid in just to
    									// illustrate fit layout
    							xtype: 'grid',
    							data: grid.getStore().getAt(rowIndex),
    							border: false,
    							columns: [{ header: 'Name',
    										dataIndex: "name"
    									  },{
    										header: 'Fachbereich',
    										dataIndex: "fachbereich"
    									  }],                 // One header just
    															// for show. There's
    															// no data,
    							store: Ext.create('Ext.data.ArrayStore', {}) // A
    																			// dummy
    																			// empty
    																			// data
    																			// store
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
    		}];	