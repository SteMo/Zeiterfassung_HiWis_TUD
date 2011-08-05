Ext.define('AM.view.fachgebiete.SearchField', {
    extend: 'Ext.form.TriggerField',
    alias: 'widget.searchField',
    
	fieldLabel: 'Search',
	triggerClass: 'x-form-search-trigger',
    
    // override onTriggerClick
    onTriggerClick: function() {
        Ext.Msg.alert('Status', 'You clicked my trigger!');
    }
});