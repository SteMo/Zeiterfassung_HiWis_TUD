Ext.require([
	'Ext.container.Viewport',
	'Ext.state.*',
	'Ext.util.Cookies'
	]);

Ext.BLANK_IMAGE_URL = '../ext/resources/images/default/s.gif';


Ext.application({
    name: 'AM',
    appFolder: 'app',
	
	controllers: [
        'Fachgebiete'
    ],
	

    
	launch: function() {
		
//   var cp = new Ext.state.CookieProvider({
//       path: "/cgi-bin/",
//       expires: new Date(new Date().getTime()+(1000*60*60*24*30)), //30 days
//       domain: "sencha.com"
//   });
//   Ext.state.Manager.setProvider(cp);
//   
//   Ext.util.Cookies.set('id','1');
		
        Ext.create('Ext.container.Viewport', {
			layout: {
				type:'vbox',
				padding:'5',
				align:'center',
				autoWidth: true,
			},              
			
			items: [
			{   	
				// Toolbar/Menue
				xtype: 'menue',
			},
			{
				// Filterbereich
				xtype: 'fieldset',
				id: 'listOfFilters',
				width: 700,
				title: '',
				items: [
					{
						xtype: 'comboFachgebiete',                   
					},
					{
						xtype: 'comboPersonentypen',
					},
					{
						xtype: 'button',
						text: 'Fachgebiet hinzuf�gen',
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
//							            close();  // close() versucht wohl nicht nur Popup zu schlie�en, erlaubt Browser nicht... Wie schlie�en?
							        }
							    }]
							}
							).show();
						},
						icon: ''
					} 
				]
			},
			{
				// Inhaltsbereich (Tabelle/Grid)
				xtype: 'contentGrid',
			},
			{
				// Toolbar/Menue
				xtype: 'fgMenueBottom',
			}
			]					
			});
    }
});