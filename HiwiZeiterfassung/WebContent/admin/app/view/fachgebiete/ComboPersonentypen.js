Ext.define('AM.view.fachgebiete.ComboPersonentypen' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.comboPersonentypen',

	fieldLabel: 'Personentypen',
	
	store: 'Personentypen',
	anchor: '100%',
	queryMode: 'local',
	displayField: 'name',
	valueField: 'name',                        
	xtype: 'combo',
	listeners:{
		select:{
			fn:function(combo, value) {
				var peoples = Ext.getCmp('listOfPeople');
				var filters = peoples.store.filters;
						
				var otherFilters = filters.filterBy(function(value){
					return value.property!="position";
					}); // "Vor"-filtern, da clear auch filters loeschen wuerde
				peoples.store.clearFilter();
				
				otherFilters.eachKey(function (key,item) {
								Ext.getCmp("listOfPeople").store.filter(item.property, item.value);
								//console.log("Filtering by..."+item.property+" for "+item.value);
						})
				
				if(combo.getValue()!="Alle") {
					peoples.store.filter('position', combo.getValue());
				}
			}
		}
	} 
	
	// initComponent: function() {
        // this.callParent(arguments);
    // }
	
});