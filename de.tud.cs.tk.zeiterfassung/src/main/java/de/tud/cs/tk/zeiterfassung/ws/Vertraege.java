/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.PojoMapper;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.dao.TarifDAO;
import de.tud.cs.tk.zeiterfassung.dao.VertragDAO;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.entities.Tarif;
import de.tud.cs.tk.zeiterfassung.entities.Vertrag;
import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author letzkus
 */
@Path("/vertraege")
public class Vertraege {

    public class VertraegeList {
        public boolean success = false;
        public int total = 0;
        public List<VertraegeEntry> results = new ArrayList<VertraegeEntry>();
    }

    public class VertraegeEntry {
        public long id;
        public String hiwi, hiwiMail, supervisor, begin, end, rate;
        public int hoursPerMonth;

        public VertraegeEntry(long id, String hiwi, String hiwiMail, String supervisor, String begin, String end, String rate, int hoursPerMonth) {
            this.id = id;
            this.hiwi = hiwi;
            this.hiwiMail = hiwiMail;
            this.supervisor = supervisor;
            this.begin = begin;
            this.end = end;
            this.rate = rate;
            this.hoursPerMonth = hoursPerMonth;
        }
        
    }

    @GET
    @Path("/")
    @Produces({"text/javascript", "application/json"})
    public String processGetList(@Context HttpServletRequest req, @Context HttpServletResponse resp) {
        VertraegeList vl = getList(req);
        String cb = req.getParameter("callback");
        String result = "";
        try {
            result = PojoMapper.toJson(vl, true);
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

    public VertraegeList getList(@Context HttpServletRequest req) {
        VertraegeList vl = new VertraegeList();
        vl.success = false;
        vl.total = 0;
        OpenIdPrincipal principal = null;
        if (req.getUserPrincipal() instanceof OpenIdPrincipal) {
            principal = (OpenIdPrincipal) req.getUserPrincipal();
        }
        if (principal != null) {
            List<Person> people = PersonDAO.findByPrincipal(principal.getIdentity());
            if (people == null || people.size() != 1) {
                return vl;
            }
            Person me = people.get(0);
            List<Vertrag> vs = me.getVertragspartner(); // Alle Verträge, bei denen ich vertragspartner bin
            List<Person> ps = PersonDAO.retrieveAll();
            for(Vertrag v : vs) {
                vl.results.add(new VertraegeEntry(v.id, me.firstName+" "+me.givenName, "email???", v.vertragssteller.firstName+" "+v.vertragssteller.givenName, new SimpleDateFormat("dd.mm.yy").format(v.start.getTime()), new SimpleDateFormat("dd.mm.yy").format(v.ende.getTime()), (v.getTarif()==null)? "Kein Tarif" : v.getTarif().name, v.stundenProMonat));
            }
            vs = me.getVertragssteller();
            for(Vertrag v : vs) {
                vl.results.add(new VertraegeEntry(v.id, v.vertragspartner.firstName+" "+v.vertragspartner.givenName, "email???", v.vertragssteller.firstName+" "+v.vertragssteller.givenName, new SimpleDateFormat("dd.mm.yy").format(v.start.getTime()), new SimpleDateFormat("dd.mm.yy").format(v.ende.getTime()), (v.getTarif()==null)? "Kein Tarif" : v.getTarif().name, v.stundenProMonat));
            }
            vl.success = true;
            vl.total = vl.results.size();
        }
        return vl;
    }
    
    public Vertrag createVertrag(@QueryParam("cbHiwi") String hiwi, @QueryParam("cbRate") String rate, @QueryParam("edHoursPerMonth") String hours, @QueryParam("edBegin") String begin, @QueryParam("edEnd") String end, @QueryParam("authorID") int sv) {
        Vertrag v = new Vertrag();
        try {
            
            DateFormat formatter = new SimpleDateFormat("dd.mm.yy");
            if(!end.equals(""))
                v.ende = formatter.parse(end);
            if(!begin.equals(""))
                v.start = formatter.parse(begin);
        } catch (ParseException ex) {
            Logger.getLogger(Vertraege.class.getName()).log(Level.SEVERE, null, ex);
        }
        Tarif t = TarifDAO.findByName(rate);
        if(t!=null)
            v.setTarif(t);
        v.stundenProMonat = Integer.parseInt(hours);
        String firstName = "";
        String givenName = "";
        String[] names = hiwi.split(" ");
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
        Person vs = PersonDAO.retrieve(sv);
        Person vp = ps.get(0);
        
        if(ps == null || ps.isEmpty() || ps.size()>1 || vs==null)
            return v; 
        vp.addVertragspartner(v);
        vs.addVertragssteller(v);
        return v;
    }
    
    /*
     * Example
     * cbHiwi=Stephan%20M&cbRate=Werkstudent&edHoursPerMonth=4&edBegin=28.09.11&edEnd=30.09.11&id=0&hiwi=&hiwiMail=&supervisor=&begin=&end=&hoursPerMonth=0&remainingHours=0&remainingTasks=&rate=&callback=Ext.data.JsonP.callback12 HTTP/1.1 
     */
    @GET
    @Path("/insert")
    public long insertVertrag(@Context HttpServletRequest req, @QueryParam("cbHiwi") String hiwi, @QueryParam("cbRate") String rate, @QueryParam("edHoursPerMonth") String hours, @QueryParam("edBegin") String begin, @QueryParam("edEnd") String end, @QueryParam("authorID") int sv) {
        Vertrag v = createVertrag(hiwi, rate, hours, begin, end, sv);        
        return VertragDAO.create(v);
    }
    
    @GET
    @Path("/insert")
    public long updateVertrag(@Context HttpServletRequest req, @QueryParam("id") long id, @QueryParam("cbHiwi") String hiwi, @QueryParam("cbRate") String rate, @QueryParam("edHoursPerMonth") String hours, @QueryParam("edBegin") String begin, @QueryParam("edEnd") String end, @QueryParam("authorID") int sv) {
        Vertrag vnew = createVertrag(hiwi, rate, hours, begin, end, sv); 
        Vertrag vold = VertragDAO.retrieve(id);
        if(vnew.start!=null) {
            vold.start = vnew.start;
        }
        if(vnew.ende!=null) {
            vold.ende = vnew.ende;
        }
        if(vnew.stundenProMonat!=0) {
            vold.stundenProMonat = vnew.stundenProMonat;
        }
        if(vnew.getTarif()!=null) {
            vold.setTarif(vnew.getTarif());
        }
        return VertragDAO.update(vold);
    }
    
    @GET
    @Path("/remove") 
    public void removeVertrag(@QueryParam("id") long id) {
        Vertrag v = VertragDAO.retrieve(id);
        if(v!=null) 
            VertragDAO.delete(v);
    }
    
}
