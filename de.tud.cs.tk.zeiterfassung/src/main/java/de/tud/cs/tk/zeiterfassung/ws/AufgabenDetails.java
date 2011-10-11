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
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import java.io.IOException;
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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author letzkus
 */
@Path("/aufgabendetails")
public class AufgabenDetails {
    
    public class AufgabenDetailsEntry {
        public String date, description;
        public long aufgabenId;
        public long id;
        public int worked;

        public AufgabenDetailsEntry(long id, String date, String beschreibung, int worked, long aufgabenId) {
            this.id = id;
            this.date = date;
            this.description = beschreibung;
            this.worked = worked;
            this.aufgabenId = aufgabenId;
        }
        
    }
    
    @GET
    @Path("/{id}")
    @Produces({"application/json", "text/javascript"})
    public String processGetDetails(@Context HttpServletRequest req, @Context HttpServletResponse resp, @PathParam("id") long aid) {
        ResultSet<AufgabenDetailsEntry> al = getDetails(req, aid);
        String cb = req.getParameter("callback");
        String result = "";
        try {
            result = PojoMapper.toJson(al, true);
        } catch (JsonMappingException ex) {
            Logger.getLogger(AufgabenDetails.class.getName()).log(Level.SEVERE, null, ex);
        } catch (JsonGenerationException ex) {
            Logger.getLogger(AufgabenDetails.class.getName()).log(Level.SEVERE, null, ex);
        } catch (IOException ex) {
            Logger.getLogger(AufgabenDetails.class.getName()).log(Level.SEVERE, null, ex);
        }
        if (cb != null) {
            resp.setContentType("text/javascript");
            return cb + "(" + result + ");";
        }
        resp.setContentType("application/json");
        return result;
    }
    
    public ResultSet<AufgabenDetailsEntry> getDetails(@Context HttpServletRequest req, long aid) {
        ResultSet<AufgabenDetailsEntry> al = new ResultSet<AufgabenDetailsEntry>();
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
            List<AufgabeDetails> lds = AufgabeDetailsDAO.retrieveAll();
            for(AufgabeDetails a : lds) {
                if(me.id == AufgabeDAO.retrieve(a.aufgabe.id).verantwortlicher.id
                        || me.id == AufgabeDAO.retrieve(a.aufgabe.id).assignedFrom.id) {
                    if(a.aufgabe.id == aid)
                        al.results.add(new AufgabenDetailsEntry(a.id, new SimpleDateFormat("dd.MM.yy").format(a.datum.getTime()), a.beschreibung, a.worked, a.aufgabe.id));
                }
            }
            al.success = true;
            al.total = al.results.size();
            
        }
        return al;
    }
    
    /**
     * Do not try this at home!
     * Note: THIS IS NOT RESTful! THIS IS EXTJS-BULLSHIT!
     */
    @GET
    @Path("/insert/{aufgabe}")
    public void insertAufgabenDetails(@QueryParam("date") String date, @QueryParam("worked") String worked, @QueryParam("description") String desc, @PathParam("aufgabe") long aufgabeId) {
        // TODO implement authentication

        Logger.getLogger(AufgabenDetails.class.getName()).log(Level.SEVERE,"Inserting new AufgabeDetails: "+date+" | "+desc+" | "+worked+" | "+aufgabeId);
        
        AufgabeDetails a = new AufgabeDetails();
        a.beschreibung = desc;
        try {
            a.datum = new SimpleDateFormat("yyyy-MM-dd'T'00:00:00").parse(date);
        } catch (ParseException ex) {
            a.datum = new Date();
        }
        a.worked = Integer.parseInt(worked);
        
        Aufgabe af = AufgabeDAO.retrieve(aufgabeId);
        af.addDetails(a);
        af.worked += a.worked;
        
        long id = AufgabeDAO.update(af);
        
    }
    
    @GET
    @Path("/remove/{aid}")
    public void deleteDetails(@PathParam("aid") long aid, @QueryParam("id") long adid) {
        Aufgabe a = AufgabeDAO.retrieve(aid);
        AufgabeDetails ad = AufgabeDetailsDAO.retrieve(adid);
        
        if(ad!=null)
            a.getDetails().remove(ad);
        
    }
}
