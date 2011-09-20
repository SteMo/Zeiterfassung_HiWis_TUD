/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import de.tud.cs.tk.zeiterfassung.PojoMapper;
import de.tud.cs.tk.zeiterfassung.dao.TarifDAO;
import de.tud.cs.tk.zeiterfassung.entities.Tarif;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;

/**
 *
 * @author letzkus
 */
@Path("/tarife")
public class Tarife {

    /*
     * Todo: Use this for all classes! Refactoring!
     */
    public class ResultSet<T> {
        public List<T> results;
        public int total;
        public boolean success;
    }
    
    public class ResultEntry {
        public String id,group;

        public ResultEntry(String id, String group) {
            this.id = id;
            this.group = group;
        }
        
    }
    
    @GET
    @Path("/")
    public String getTarife(@Context HttpServletRequest req,  @Context HttpServletResponse resp) {
        List<Tarif> tarife = TarifDAO.retrieveAll();
        ResultSet<ResultEntry> resultSet = new ResultSet<ResultEntry>();
        resultSet.results = new ArrayList();
        for(Tarif t : tarife) {
            resultSet.results.add(new ResultEntry(Long.toString(t.id), t.name));
        }
        resultSet.success = true;
        resultSet.total = resultSet.results.size();
        String cb = req.getParameter("callback");
        String result = "";
        try {
            result = PojoMapper.toJson(resultSet, true);
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
}
