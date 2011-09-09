Ext.define('AM.view.dashboard.TaskDetailsWindow', {
    extend: 'Ext.window.Window',

    height: 373,
    width: 700,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'Aufgaben: Übersicht & Stunden eintragen',
    
    

    initComponent: function() {
    	var rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
    	// store hier, weil wir auf ihn referenzieren müssen
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
//            autoSync: true,
            model: 'AM.model.TaskDetails',  
        });     
    	   	
    	var me = this;
        me.items = [
            {
                xtype: 'gridpanel',
                id: 'taskDetailsGrid',
                title: 'Übersicht der geleisteten Stunden',
                flex: 1,
                store: store,
                frame: true,
                columns: [
                    {
                        xtype: 'datecolumn',
                        width: 97,
                        dataIndex: 'date',
                        text: 'Datum',
                        format: 'd.m.y',
                        field: {
                            xtype: 'datefield',
                            format: 'd.m.y',
                        }                        
                    },
                    {
                        xtype: 'numbercolumn',
                        dataIndex: 'worked',
                        text: 'Stunden',
                        format: '0.00',
                        field: {
                            xtype: 'textfield'
                        }                        
                    },
                    {
                        xtype: 'gridcolumn',
                        width: 491,
                        dataIndex: 'description',
                        text: 'Tätigkeit',
                        field: {
                            xtype: 'textfield'
                        }
                    }
                ],
                plugins: [rowEditing],
                viewConfig: {

                },
                dockedItems: [{
                              xtype: 'toolbar',
                              dock: 'bottom',
                              items: [{
                                  text: 'Stunden eintragen',
                                  icon: 'resources/images/drop-add.gif',
                                  handler: function(){
                                      // empty record
                                      store.insert(0, new AM.model.TaskDetails());
                                      rowEditing.startEdit(0, 0);
                                  }
                              }, '-', {
                                  itemId: 'delete',
                                  text: 'Stunden löschen',
                                  icon: 'resources/images/delete.png',
                                  disabled: true,
                                  /* das hier muss vermutlich über den Controller gemacht werden, this.getView() geht hier nicht... */
                                  handler: function(){
                                      var selection = this.getView().getSelectionModel().getSelection()[0];
                                      if (selection) {
                                          store.remove(selection);
                                      }
                                  }
                              }]
            }]
            }
        ];
        
//        console.log((this.items[0]).getView());

        
        me.callParent(arguments);
    }
});