Ext.define('AM.view.menu.Menu' ,{
    alias : 'widget.menue',
    extend: 'Ext.Toolbar',
    
    
    id: 'menue',
    itemId: 'menue',
    
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
//				var wincmp = Ext.getCmp('lectures_win').getComponent('lecturescolumn');
//				var rec = wincmp.getSelectionModel().getSelection();
//				if (rec.length > 0) {
//					var selectedlecture = rec[0];
//		
//					// loadlecture
//					var lecture = new Clls.model.Lecture({
//								title : selectedlecture.get('title'),
//								serverId : selectedlecture.get('serverId'),
//								channelSubId : selectedlecture
//										.get('channelSubId'),
//								creationTimeStamp : selectedlecture
//										.get('creationTimeStamp'),
//								noofslides: selectedlecture.get('noofslides'),
//								noofdrawings: selectedlecture.get('noofdrawings'),
//							});
//		
//					Ext.getCmp('lectures_win').hide();
//					CllsApp = new CllsDesktop.App(lecture);
//					CllsApp.loadLecture();
//				}
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