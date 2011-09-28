/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.PojoMapper;
import de.tud.cs.tk.zeiterfassung.dao.FachgebietDAO;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.dao.RolleDAO;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;
import de.tud.cs.tk.zeiterfassung.entities.Person;

import de.tud.cs.tk.zeiterfassung.entities.Rolle;
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author letzkus
 */
@Path("/personen")
public class Personen {

    public class PersonEntry {

        public String name, fachgebiet, position;
        public long id, supervisor;
        public String surname, givenname;

        public PersonEntry(String name, String fachgebiet, String position, long id, long supervisor, String surname, String givenname) {
            this.name = name;
            this.fachgebiet = fachgebiet;
            this.position = position;
            this.id = id;
            this.supervisor = supervisor;
            this.surname = surname;
            this.givenname = givenname;
        }
    }

    @GET
    @Produces({"text/javascript", "application/json"})
    public String processGetList(@Context HttpServletRequest req, @Context HttpServletResponse resp) {

        ResultSet<PersonEntry> personen = getList(req);
        String cb = req.getParameter("callback");
        String result = "";
        try {
            result = PojoMapper.toJson(personen, true);
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

    public ResultSet getList(@Context HttpServletRequest req) {

        ResultSet<PersonEntry> pl = new ResultSet<PersonEntry>();
        pl.results = new ArrayList<PersonEntry>();

        // IDM
        OpenIdPrincipal principal = null;
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        List<Person> peopleDAO = PersonDAO.retrieveAll();
        if (principal != null) { // Benutzer ist per OpenID identifiziert
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people == null || people.size() != 1) {
                pl.success = false;
                return pl;
            }
            Person me = people.get(0);

            pl.total = 0;
            for (Person p : peopleDAO) {

                if (me.getRolle().significance <= 10 // Alle Personen
                        || (me.getRolle().significance <= 20 && me.getFachgebiet().id == p.getFachgebiet().id) // Alle Personen im Fachgebiet
                        || (me.getRolle().significance <= 30 && p.getSupervisor() != null && p.getSupervisor().id == me.id)) // Alle mir zugeordneten Personen
                {
                    pl.results.add(new PersonEntry(p.firstName + " " + p.givenName,
                            p.getFachgebiet().name,
                            p.getRolle().name,
                            p.id,
                            (p.getSupervisor() != null)
                            ? p.getSupervisor().id
                            : Long.valueOf("-1"),
                            p.givenName,
                            p.firstName));
                    pl.total++;
                }
            }
            pl.success = true;
        }
        return pl;
    }
    
    public Person createPerson(int adminId, String vorname, String nachname, String fg, String role, int sv, String ident) {
        Person p = new Person();
        // Name
        p.firstName = vorname;
        p.givenName = nachname;
        // Supervisor
        Person svs = PersonDAO.retrieve(sv);
        if(svs!=null)
             p.setSupervisor(svs);               
        
        if(p.getSupervisor()==null) // Wenn kein Supervisor vorhanden ist, dann nimm Admin als Supervisor :>
            p.setSupervisor(PersonDAO.retrieve(adminId));
        
        // Rolle
        Rolle r = RolleDAO.findByName(role);
        if(r != null)
            p.setRolle(r);
        
        // Fachgebiet
        Fachgebiet f = FachgebietDAO.findByName(fg);
        if (f != null) {
            p.setFachgebiet(f);
        }

        // Ident
        p.principal = ident;
        
        return p;
        
    }

    /**
     * Beispiel:
     * /ws/personen/insert?_dc=1317224572727&authorID=5&givenname=vname&surname=nname&fachgebiet=TK&position=Hiwi&supervisor=6&ident=ident&id=&name=&callback=Ext.data.JsonP.callback
     */
    @GET
    @Path("/insert")
    public String insertPerson(@QueryParam("authorID") int adminId, @QueryParam("givenname") String vorname, @QueryParam("surname") String nachname, @QueryParam("fachgebiet") String fg, @QueryParam("position") String role, @QueryParam("supervisor") int sv, @QueryParam("ident") String ident) {
        Person p = createPerson(adminId, vorname, nachname, fg, role, sv, ident);
        Logger.getLogger(Personen.class.getName()).log(Level.ALL,"Neuen Benutzer anlegen: Name: "+vorname+" "+nachname+" Supervisor-ID: "+sv);
        return Long.toString(PersonDAO.create(p));
    }
    
    @GET
    @Path("/update")
    public String updatePerson(@QueryParam("authorID") int adminId, @QueryParam("edVorname") String vorname, @QueryParam("edNachname") String nachname, @QueryParam("cbFachgebiet") String fg, @QueryParam("cbHiwi") String role, @QueryParam("cbVorgesetzter") int sv, @QueryParam("edOpenID") String ident) {
        Person p = createPerson(adminId, vorname, nachname, fg, role, sv, ident);
        return null;
    }
}