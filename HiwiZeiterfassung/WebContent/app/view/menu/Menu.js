//Ext.require([
//	'Ext.util.Cookies',
//	'Ext.state.*'
//	]);
//
//
//


Ext.define('AM.view.menu.Menu' ,{
    alias : 'widget.menue',
    extend: 'Ext.Toolbar',
    
    
    autoRender: true,
   
	title: '',
	width: 700,

	items: [
		{	text: 'Dashboard'	},
		' ',
		{	text: 'Fachgebiete'	},
		' ',
		{	text: 'Personen', handler: function() {
//								window.location.href = "index.html";
								this.application.fireEvent('personen');  
			}},
		' ',
		{	text: 'Verträge', handler: function() {
								window.location.href = "vertraege.html";
			}},
		' ',
		{	text: 'Aufgaben'	},
		' '
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