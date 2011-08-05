Ext.define('AM.view.menu.FachgebietMenuBottom' ,{
    alias : 'widget.fgMenueBottom',
    extend: 'Ext.Toolbar',
    
    
    autoRender: true,
   
	title: '',
	width: 700,
	

	items: [
		{	text: 'Fachgebiet hinzufügen', 
			handler: function() {
				Ext.create('Ext.window.Window', {
					title: 'Fachgebiet hinzufügen',
					height: 230,
					width: 400,
					layout: {
						type:'vbox',
						padding:'5',
						align:'center',
						autoWidth: true,
					}, 
					items: [
					{   	
				        xtype: 'textfield',
				        name: 'name',
				        fieldLabel: 'Name',
				        allowBlank: false  // requires a non-empty value
				    }, {
				        xtype: 'textfield',
				        name: 'kuerzel',
				        fieldLabel: 'Kürzel',
				    }, {
				    	xtype: 'searchField'
				    }, {
				    	xtype: 'searchField'
				    }, { 
				    	xtype: 'button', 
				    	margin: '6 0 0 0',
				    	text: 'Fachgebiet hinzufügen' 
				    }, { 
				    	xtype: 'button', 
				    	margin: '6 0 0 0',
				    	text: 'Schließen',
				        handler: function() {
//				            close();  // close() versucht wohl nicht nur Popup zu schließen, erlaubt Browser nicht... Wie schließen?
				        }
				    }]
				}

				).show();
			}
		}
	],  
	
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