Ext.define('AM.view.menu.Menu' ,{
    alias : 'widget.menue',
    extend: 'Ext.Toolbar',
    
    
    autoRender: true,
   
	title: '',
	width: 700,

	items: [
		{	text: 'Dashboard', 
			handler: function() {
				window.location.href = "index.html";
			}
		},
		' ',
		
		{	text: 'Fachgebiete', 
			handler: function() {
				window.location.href = "fachgebiete.html";
			}
		},
		' ',
		
		{	text: 'Personen', 
			handler: function() {
				window.location.href = "personen.html";
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