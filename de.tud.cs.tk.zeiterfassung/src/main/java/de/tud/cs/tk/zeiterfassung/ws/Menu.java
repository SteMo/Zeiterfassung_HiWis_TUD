/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.*;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

/**
 *
 * @author letzkus
 */
@Path("/menu")
public class Menu {
    
    class MenuResult {
       public boolean success;
       public List<MenuItem> results = new ArrayList();
    }
    
    class MenuItem {
        public String id,text,handler,xtype;

        public MenuItem(String id, String text, String handler, String xtype) {
            this.id = id;
            this.text = text;
            this.handler = handler;
            this.xtype = xtype;
        }
    }
    
    @GET
    @Produces("application/json")
    public MenuResult get(@Context HttpServletRequest req) {
        MenuResult result = new MenuResult();
        
        OpenIdPrincipal principal = null;
	if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal)req.getUserPrincipal();
	}
        if(principal!=null) {
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if(people != null && people.size()!=1) {
                // Mehrere oder Kein Datenbank-Eintrag zu bestimmter Identity
                // Es wird nichts vom Webservice zurückgegeben
                result.success=false;
                return result;
            }
            Person p = people.get(0);
            if(p.getRolle().significance<=40) { // Hiwi=40
               result.results.add(new MenuItem("btnDashboard", "Dashboard","","button"));
                if(p.getRolle().significance<=30) { // Mitarbeiter=30                   
                    if(p.getRolle().significance<=20) { // Professor=20
                        if(p.getRolle().significance<=10) { // Administrator=10
                            result.results.add(new MenuItem("btnFachbereiche", "Fachgebiete","","button"));
                        }
                    }
                    result.results.add(new MenuItem("btnPersonen", "Personen","","button"));

                }
                result.results.add(new MenuItem("btnVertraege", "Vertr&auml;ge","","button"));
                result.results.add(new MenuItem("btnAufgaben", "Aufgaben","","button"));
                
            }
        }else{
            result.success=false;
            return result;
        }
        result.success=true;
        return result;
    }
    
}
