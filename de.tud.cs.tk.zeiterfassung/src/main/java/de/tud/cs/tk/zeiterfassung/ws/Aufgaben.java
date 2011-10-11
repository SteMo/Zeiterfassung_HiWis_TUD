/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.PojoMapper;
import de.tud.cs.tk.zeiterfassung.dao.AufgabeDAO;
import de.tud.cs.tk.zeiterfassung.dao.AufgabeDetailsDAO;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.entities.Aufgabe;
import de.tud.cs.tk.zeiterfassung.entities.AufgabeDetails;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.entities.Vertrag;
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import de.tud.cs.tk.zeiterfassung.ws.Aufgaben.AufgabenEntry;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author letzkus
 */
@Path("/aufgaben")
public class Aufgaben {

    public class AufgabenList<T> {

        public boolean success = false;
        public int total = 0;
        public List<T> results = new ArrayList<T>();
    }

    public class AufgabenEntry {

        public long id;
        public int priority;
        public String deadline, title, assignedFrom, assignedAt, desc;
        public float worked;
        public long responsible;
        public boolean done;
        public String hiwi;

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

        private AufgabenEntry(long id, int priority, String deadline, String title, String assignedFrom, String assignedAt, float worked, long resp, String desc, boolean done, String hiwi) {
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
            this.hiwi = hiwi;
        }
    }
    
    public class ErledigtEntry {
        public float geleisteteArbeit;
        public float ist, soll;

        public ErledigtEntry(float geleisteteArbeit, float ist, float soll) {
            this.geleisteteArbeit = geleisteteArbeit;
            this.ist = ist;
            this.soll = soll;
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
        AufgabenList<AufgabenEntry> al = new AufgabenList<AufgabenEntry>();
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
                if (me.id == a.verantwortlicher.id) { // Ich bin der, dem die Aufgabe zugewiesen wurde
                    al.results.add(new AufgabenEntry(a.id, a.priority, new SimpleDateFormat("dd.MM.yy").format(a.deadline), a.titel, a.assignedFrom.firstName + " " + a.assignedFrom.givenName, new SimpleDateFormat("dd.MM.yy").format(a.assignedAt), a.worked, a.verantwortlicher.id, a.beschreibung, a.erledigt));
                }else if(me.getRolle().significance <= 30 && me.id == a.assignedFrom.id) {
                    al.results.add(new AufgabenEntry(a.id, a.priority, new SimpleDateFormat("dd.MM.yy").format(a.deadline), a.titel, a.assignedFrom.firstName + " " + a.assignedFrom.givenName, new SimpleDateFormat("dd.MM.yy").format(a.assignedAt), a.worked, a.verantwortlicher.id, a.beschreibung, a.erledigt, a.verantwortlicher.firstName+" "+a.verantwortlicher.givenName));
                }
                   
            }
            al.success = true;
            al.total = al.results.size();
        }
        return al;
    }
    
    public Aufgabe createAufgabe(String title, String desc, String date, int prio, String hiwi, int supervisor, float worked, boolean erledigt) {       
        Aufgabe a = new Aufgabe();    
        String firstName = "", givenName = "";
        String[] names;
        a.titel = title;
        firstName = "";
        givenName = "";
        names = hiwi.split(" ");
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
        a.verantwortlicher = (ps!=null && !ps.isEmpty())? ps.get(0) : null;
        try {
            DateFormat formatter = new SimpleDateFormat("dd.MM.yy");
            a.deadline = formatter.parse(date);
        } catch (ParseException ex) {
            a.deadline = null;
        }
        a.assignedAt = new Date();
        a.assignedFrom = PersonDAO.retrieve(supervisor);
        a.beschreibung = desc;
        a.erledigt = erledigt;
        a.priority = prio;
        a.worked = worked;
        return a;
    }
    
    /* Example:
     * GET /ws/aufgaben/insert?_dc=1316546787375&edTitle=titel&txtDescription=beschreibung&edDate=30.09.11&edPriority=1&cbHiwi=Stephan%20M&id=0&title=&description=&supervisor=&hiwi=&deadline=&assignedAt=&priority=0&status=&callback=Ext.data.JsonP.callback14 HTTP/1.1 
     */
    @GET
    @Path("/insert")
    public long insertAufgabe(@QueryParam("edTitle") String title, @QueryParam("txtDescription") String desc, @QueryParam("edDate") String date, @QueryParam("edPriority") int prio, @QueryParam("cbHiwi") String hiwi, @QueryParam("authorID") int supervisor) {       
            Aufgabe a = createAufgabe(title, desc, date, prio, hiwi, supervisor, 0, false);      
            return AufgabeDAO.create(a);
    }
    
    @GET
    @Path("/update")
    public void updateAufgabe(@QueryParam("id") long id, @QueryParam("edTitle") String title, @QueryParam("txtDescription") String desc, @QueryParam("edDate") String date, @QueryParam("edPriority") int prio, @QueryParam("cbHiwi") String hiwi, @QueryParam("authorID") int supervisor, @QueryParam("worked") float worked, @QueryParam("erledigt") String erledigt) {       
            boolean done;
            if(erledigt.equals("Ja"))
                done=true;
            else
                done=false;
            Aufgabe anew = createAufgabe(title, desc, date, prio, hiwi, supervisor, worked, done);  
            Aufgabe aold = AufgabeDAO.retrieve(id);
            if(anew.worked != 0L) {
                aold.worked = anew.worked;
            }
            if(anew.erledigt != aold.erledigt) {
                aold.erledigt = anew.erledigt;
            }
            if(!anew.beschreibung.equals("")) {
                aold.beschreibung = anew.beschreibung;
            }
            if(!anew.titel.equals("")) {
                aold.titel = anew.titel;
            }
            if(anew.deadline != null) {
                aold.deadline = anew.deadline;
            }
            if(anew.priority != aold.priority) {
                aold.priority = anew.priority;
            }
            if(anew.verantwortlicher != null) {
                aold.verantwortlicher = anew.verantwortlicher;
            }
            // Sollten assigedAt und assignedFrom geändert werden?
            AufgabeDAO.update(aold);
    }
    
    @GET
    @Path("/remove")
    public void deleteAufgabe(@QueryParam("id") long id) {
        Aufgabe a = AufgabeDAO.retrieve(id);
        List<AufgabeDetails> ads = a.getDetails();
        a.details = null;   
        id = AufgabeDAO.update(a);
        a = AufgabeDAO.retrieve(id);
        AufgabeDAO.delete(a);
        
        for(AufgabeDetails ad : ads) {
            AufgabeDetailsDAO.delete(ad);
        }
         
    }
    
    @GET
    @Path("/geleistet")
    public String getGeleisteteArbeit(@Context HttpServletRequest req, @Context HttpServletResponse resp) {
        OpenIdPrincipal principal = null;
        String result = "";
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        if (principal != null) {
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people == null || people.size() != 1) {
                return String.valueOf(0);
            }
            Person me = people.get(0);
            
            AufgabenList<AufgabenEntry> al = getList(req);
            String cb = req.getParameter("callback");
            AufgabenList<ErledigtEntry> res = new AufgabenList<ErledigtEntry>();
            res.results = new ArrayList<ErledigtEntry>();
            
            float ist = 0f;
            float soll = 0f;
            List<Vertrag> vs = me.getVertragspartner();    
            for(Vertrag v : vs) {
                soll += v.stundenProMonat;
            }
            for(AufgabenEntry e : al.results) {
                ist += e.worked;
            }
            
            if(soll==0) {
                soll=1f;
            }
            res.results.add(new ErledigtEntry(ist/soll*100, ist, soll));
            res.total = 1;
            res.success = true;
            
            try {
                result = PojoMapper.toJson(res, true);
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
        return result;
    }
}
