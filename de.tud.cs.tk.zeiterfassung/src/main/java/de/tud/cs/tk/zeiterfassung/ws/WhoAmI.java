/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.PojoMapper;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author letzkus
 */
@Path("/whoami")
public class WhoAmI {
    
    public class ResultSet<T> {
        public List<ResultEntry> results;
        public int total;
        public boolean success;
    }
    
    public class ResultEntry {
        public String id;

        public ResultEntry(String id) {
            this.id = id;
        }
        
    }
    
    @Path("/")
    @GET
    public String whoami(@Context HttpServletRequest req) {
        ResultSet<ResultEntry> rs = new ResultSet();
        rs.results = new ArrayList();
        OpenIdPrincipal principal = null;
        String cb = req.getParameter("callback");
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        try {
        List<Person> peopleDAO = PersonDAO.retrieveAll();
        if (principal != null) { // Benutzer ist per OpenID identifiziert
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            
            if (people != null && people.size() == 1) {
                Person me = people.get(0);
                rs.results.add(new ResultEntry(Long.toString(me.id)));
                rs.success = true;
                rs.total = 1;
                if(cb!=null)
                        return cb + "(" + PojoMapper.toJson(rs, true)+")";
                    else
                        return PojoMapper.toJson(rs, true); 
            }
        }
        return Long.toString(-1);
        } catch (JsonMappingException ex) {
            Logger.getLogger(WhoAmI.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JsonGenerationException ex) {
            Logger.getLogger(WhoAmI.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(WhoAmI.class.getName()).log(Level.SEVERE, null, ex);
        }
        rs.success = false;
        rs.total = 0;
        if(cb!=null)
            return cb + "()";
        else
            return "";
    }
}
