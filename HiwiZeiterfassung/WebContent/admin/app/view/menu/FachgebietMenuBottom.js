Ext.define('AM.view.menu.FachgebietMenuBottom' ,{
    alias : 'widget.fgMenueBottom',
    extend: 'Ext.Toolbar',
    
    
    autoRender: true,
   
	title: '',
	width: 700,
	

	items: [
		{	text: 'Fachgebiet hinzuf�gen', 
			handler: function() {
				Ext.create('Ext.window.Window', {
					title: 'Fachgebiet hinzuf�gen',
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
				        fieldLabel: 'K�rzel',
				    }, {
				    	xtype: 'searchField'
				    }, {
				    	xtype: 'searchField'
				    }, { 
				    	xtype: 'button', 
				    	margin: '6 0 0 0',
				    	text: 'Fachgebiet hinzuf�gen' 
				    }, { 
				    	xtype: 'button', 
				    	margin: '6 0 0 0',
				    	text: 'Schlie�en',
				        handler: function() {
//				            close();  // close() versucht wohl nicht nur Popup zu schlie�en, erlaubt Browser nicht... Wie schlie�en?
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