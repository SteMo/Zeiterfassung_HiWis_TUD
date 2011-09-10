/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.PojoMapper;
import de.tud.cs.tk.zeiterfassung.dao.AufgabeDAO;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.entities.Aufgabe;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import de.tud.cs.tk.zeiterfassung.ws.Aufgaben.AufgabenEntry;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author letzkus
 */
@Path("/aufgaben")
public class Aufgaben {
    
    public class AufgabenList {
        public boolean success = false;
        public int total = 0;
        public List<AufgabenEntry> results = new ArrayList<AufgabenEntry>();
    }
    
    public class AufgabenEntry {
        public long id;
        public int priority;
        public String deadline, title, assignedFrom, assignedAt;
        public float worked;

        public AufgabenEntry(long id, int priority, String deadline, String title, String assignedFrom, String assignedAt, float worked) {
            this.id = id;
            this.priority = priority;
            this.deadline = deadline;
            this.title = title;
            this.assignedFrom = assignedFrom;
            this.assignedAt = assignedAt;
            this.worked = worked;
        }
        
        
    }
    
    @GET 
    @Path("/")
    @Produces({"text/javascript", "application/json"})
    public String processGetList(@Context HttpServletRequest req, @Context HttpServletResponse resp) {
        AufgabenList al = getList(req);
        String cb = req.getParameter("callback");
        String result = "";
        try {
            result = PojoMapper.toJson(al, true);
        } catch (JsonMappingException ex) {
            Logger.getLogger(Personen.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JsonGenerationException ex) {
            Logger.getLogger(Personen.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(Personen.class.getName()).log(Level.SEVERE, null, ex);
        }
        if (cb != null) {
            resp.setContentType("text/javascript");
            return cb + "(" + result + ");";
        }
        resp.setContentType("application/json");
        return result;
    }
    
    public AufgabenList getList(@Context HttpServletRequest req) {
        AufgabenList al = new AufgabenList();
        al.success = false;
        al.total = 0;
        OpenIdPrincipal principal = null;
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        if(principal != null) {
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people == null || people.size() != 1) {
                return al;
            }
            Person me = people.get(0);
            List<Aufgabe> aufgaben = AufgabeDAO.retrieveAll();
            for(Aufgabe a : aufgaben) {
                if(me.id == a.verantwortlicher.id ||
                        (me.getRolle().significance<=30 && me.id == a.assignedFrom.id))
                    al.results.add(new AufgabenEntry(a.id, a.priority, new SimpleDateFormat("dd.mm.yy").format(a.deadline.getTime()), a.titel,a.assignedFrom.firstName+" "+a.assignedFrom.givenName, new SimpleDateFormat("dd.mm.yy").format(a.assignedAt.getTime()), a.worked));
            }
            al.success = true;
            al.total = al.results.size();
        }
        return al;
    }
}
