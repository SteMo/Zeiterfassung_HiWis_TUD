Ext.define('AM.view.fachgebiete.ComboFachgebiete' ,{
    extend: 'Ext.form.field.ComboBox',
    alias : 'widget.comboFachgebiete',

	fieldLabel: 'Fachbereiche',
	store: 'Fachgebiete',
	anchor: '100%',
	queryMode: 'local',
	displayField: 'name',
	valueField: 'name',
	listeners:{
		select:{
			fn:function(combo, value) {
				var peoples = Ext.getCmp('listOfPeople');
				var filters = peoples.store.filters;
				
				var otherFilters = filters.filterBy(function(value){
					return value.property!="fachgebiet";
					}); // "Vor"-filtern, da clear auch filters loeschen wuerde
				peoples.store.clearFilter();
				
				otherFilters.eachKey(function (key,item) {
								Ext.getCmp("listOfPeople").store.filter(item.property, item.value);
								//console.log("Filtering by..."+item.property+" for "+item.value);
						})
				
				if(combo.getValue()!="Alle") {
					peoples.store.filter('fachgebiet', combo.getValue());
				}
			}
		}
	}   
	
	// initComponent: function() {
        // this.callParent(arguments);
    // }
	
});