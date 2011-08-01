Ext.define('AM.view.user.List' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.userlist',

    title : 'All Users',

	store: 'Users',
	
    initComponent: function() {
        this.callParent(arguments);
    }
});