
/* wir holen uns aus der URL die Rolle und setzen eine Variable, damit wir im Controller die entsprechenden Views laden können
 * Sicherheit? Keine, allerdings wird die tatsächliche Zugehörigkeit auf Serverseite überprüft und nur Daten entsprechend der 
 * authentifizierten Rolle zurückgegegebn
 */
function get_GET_params() {
	   var GET = new Array();
	   if(location.search.length > 0) {
	      var get_param_str = location.search.substring(1, location.search.length);
	      var get_params = get_param_str.split("&");
	      for(i = 0; i < get_params.length; i++) {
	         var key_value = get_params[i].split("=");
	         if(key_value.length == 2) {
	            var key = key_value[0];
	            var value = key_value[1];
	            GET[key] = value;
	         }
	      }
	   }
	   return(GET);
	}
	 
	function get_GET_param(key) {
	   var get_params = get_GET_params();
	   if(get_params[key])
	      return(get_params[key]);
	   else
	      return false;
	}
 

var role = get_GET_params()['role'];
console.log("Rolle für Views (GET-Parameter 'role'): " + role);



/* definiere Sichten */
var controller;
var dashboard;
if(role=="hiwi"){
	controller =  new Array("HiwiController");
	dashboard = "dashboardHiWi"; 
}else if(role=="mitarbeiter"){
	 	controller = new Array("MitarbeiterController");
	 	dashboard = "dashboardMitarbeiter"; 
}else if(role=="admin"){
 	controller = new Array("AdminController");
 	dashboard = "personenAdmin"; 
}
//
//
//'layout.Filterbereich',
//'layout.ContentGrid',
//'personen.ComboFachgebiete',
//'personen.ComboPersonentypen',
//'personen.DetailsWindow',
//viewDashboard,
//
//'dashboard.Mitarbeiter'
