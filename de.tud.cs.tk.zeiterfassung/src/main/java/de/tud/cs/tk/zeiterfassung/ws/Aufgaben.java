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
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
        public String deadline, title, assignedFrom, assignedAt, desc;
        public float worked;
        public long responsible;
        public boolean done;

        public AufgabenEntry(long id, int priority, String deadline, String title, String assignedFrom, String assignedAt, float worked, long resp, String desc, boolean done) {
            this.id = id;
            this.priority = priority;
            this.deadline = deadline;
            this.title = title;
            this.assignedFrom = assignedFrom;
            this.assignedAt = assignedAt;
            this.worked = worked;
            this.responsible = resp;
            this.desc = desc;
            this.done = done;
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
        if (principal != null) {
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people == null || people.size() != 1) {
                return al;
            }
            Person me = people.get(0);
            List<Aufgabe> aufgaben = AufgabeDAO.retrieveAll();
            for (Aufgabe a : aufgaben) {
                if (me.id == a.verantwortlicher.id
                        || (me.getRolle().significance <= 30 && me.id == a.assignedFrom.id)) {
                    al.results.add(new AufgabenEntry(a.id, a.priority, new SimpleDateFormat("dd.mm.yy").format(a.deadline.getTime()), a.titel, a.assignedFrom.firstName + " " + a.assignedFrom.givenName, new SimpleDateFormat("dd.mm.yy").format(a.assignedAt.getTime()), a.worked, a.verantwortlicher.id, a.beschreibung, a.erledigt));
                }
            }
            al.success = true;
            al.total = al.results.size();
        }
        return al;
    }
    
    @POST
    @Path("/")
    @Consumes("application/json")
    public long insertAufgabe(@Context HttpServletRequest req, AufgabenEntry ae) {
        OpenIdPrincipal principal = null;
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        if (principal != null) {
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people == null || people.size() != 1 || people.get(0).getRolle().significance>30) { // nur >=Mitarbeiter darf Aufgaben anlegen
                return -1;
            }
            Person me = people.get(0);
            Aufgabe a = new Aufgabe();
            a.titel = ae.title;
            a.verantwortlicher = PersonDAO.retrieve(ae.responsible);
            a.deadline = new Date(ae.deadline);
            a.assignedAt = new Date(ae.assignedAt);
            String firstName = "", givenName = "";
            String[] names = ae.assignedFrom.split(" ");
            if (names.length >= 1) {
                firstName = names[0];
                if (names.length >= 2) {
                    givenName = names[1];
                    if (names.length >= 3) {
                        for (int i = 2; i < names.length - 3; i++) {
                            givenName = givenName.concat(names[i]);
                        }
                    }
                }
            }
            List<Person> ps = PersonDAO.findByName(firstName, givenName);
            if(ps.isEmpty()) {
                return -1;
            }
            a.assignedFrom = ps.get(0);
            a.beschreibung = ae.desc;
            a.erledigt = ae.done;
            a.priority = ae.priority;
            a.worked = ae.worked;
            return AufgabeDAO.create(a);
        }
        return -1;
    }
}
