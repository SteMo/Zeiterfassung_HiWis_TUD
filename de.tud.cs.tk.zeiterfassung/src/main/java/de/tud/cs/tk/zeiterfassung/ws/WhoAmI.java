/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;

/**
 *
 * @author letzkus
 */
@Path("/whoami")
public class WhoAmI {
    
    @Path("/")
    @GET
    public String whoami(@Context HttpServletRequest req) {
        OpenIdPrincipal principal = null;
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        List<Person> peopleDAO = PersonDAO.retrieveAll();
        if (principal != null) { // Benutzer ist per OpenID identifiziert
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people == null || people.size() != 1) {
                return Long.toString(-1);
            }
            Person me = people.get(0);
            return Long.toString(me.id);
        }
        return Long.toString(-1);
    }
}
