/* Unsere App folgt dem MVC Style und lehnt sich an den folgenden Tutorials an:
 * http://www.sencha.com/learn/the-mvc-application-architecture/
 * http://www.sencha.com/learn/architecting-your-app-in-ext-js-4-part-1
 * http://www.sencha.com/learn/architecting-your-app-in-ext-js-4-part-2
 */

/* dadurch läd er benötigte Klassen automatisch */
Ext.Loader.setConfig({enabled:true});

Ext.application({
    /* definiert Namespace in dem alle Klassen adressierbar sind, globale Variable */
	name: 'AM',
    appFolder: 'app',
	
    /* "By setting autoCreateViewport to true, the framework will, by convention, include the app/view/Viewport.js file" */
    autoCreateViewport: true,
    
	controllers: ['Controller'],
	
    
	launch: function() {
		console.log("app.js launch called");		
    }
});