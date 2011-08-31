/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.dao.RolleDAO;
import de.tud.cs.tk.zeiterfassung.entities.Person;

import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.sound.midi.SysexMessage;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;

/**
 *
 * @author letzkus
 */
@Path("/personen")
public class Personen {

    public class PersonResult {

        public boolean success;
        public int total;
        public List<PersonEntry> results = new ArrayList<PersonEntry>();
    }

    public class PersonEntry {

        public String name, fachgebiet, position;
        public long id, supervisor;

        public PersonEntry(long id, String name, String fg, String pos, long sv) {
            this.id = id;
            this.name = name;
            this.fachgebiet = fg;
            this.position = pos;
            this.supervisor = sv;
        }
    }

    @GET
    @Produces({"application/json"})
    public PersonResult getPeople(@Context HttpServletRequest req) {

        PersonResult pl = new PersonResult();

        // IDM
        OpenIdPrincipal principal = null;
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        List<Person> peopleDAO = PersonDAO.retrieveAll();
        if (principal != null) { // Benutzer ist per OpenID identifiziert
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people != null && people.size() != 1) {
                pl.success = false;
                return pl;
            }
            Person me = people.get(0);
  
            pl.total = 0;
            for (Person p : peopleDAO) {
                System.out.println("Mein Name: "+me.firstName);
                System.out.println("Mein Fachbereichsname: "+me.getFachgebiet().name);
                System.out.println("Mein Rollenname: "+me.getRolle().name+" mit der Signifikanz "+me.getRolle().significance);
          
                if (me.getRolle().significance <= 10 // Alle Personen
                        || (me.getRolle().significance <= 20 && me.getFachgebiet().id == p.getFachgebiet().id) // Alle Personen im Fachgebiet
                        || (me.getRolle().significance <= 30 && p.getSupervisor()!=null && p.getSupervisor().id == me.id)) // Alle mir zugeordneten Personen
                {
                    pl.results.add(new PersonEntry(p.id, p.firstName + " " + p.givenName,
                            p.getFachgebiet().name,
                            p.getRolle().name,
                            (p.getSupervisor() != null)
                            ? p.getSupervisor().id
                            : Long.valueOf("-1")));
                    pl.total++;
                }
            }
            pl.success = true;
        }
        return pl;
    }

    @GET
    @Path("/{ident}")
    public Person getById(@PathParam("ident") String ident) {
        // Todo: Welche Daten sollen ausgegeben werden?
        return null;
    }
}