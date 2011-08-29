/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.entities.Person;

import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.*;

/**
 *
 * @author letzkus
 */
@Path("/personen")
public class Personen {

    public class PersonList {

        public boolean success;
        public int total;
        public List<PersonView> results = new ArrayList<PersonView>();
    }

    public class PersonView {

        public String name, fachgebiet, position;
        public long id, supervisor;

        public PersonView(long id, String name, String fg, String pos, long sv) {
            this.id = id;
            this.name = name;
            this.fachgebiet = fg;
            this.position = pos;
            this.supervisor = sv;
        }
    }

    @GET
    @Produces({"application/json"})
    public PersonList getPeople() {
        PersonList pl = new PersonList();
        List<Person> peopleDAO = PersonDAO.retrieveAll();
        pl.total = peopleDAO.size();
        for (Person p : peopleDAO) {
            pl.results.add(new PersonView(p.id, p.firstName + " " + p.givenName,
                    p.getFachgebiet().name,
                    null,
                    (p.getSupervisor() != null)
                    ? p.getSupervisor().id 
                    : Long.valueOf("-1")));
        }
        pl.success = true;
        return pl;
    }

    @GET
    @Path("/{ident}")
    public Person getById(@PathParam("ident") String ident) {
        // Todo: Welche Daten sollen ausgegeben werden?
        return null;
    }
}