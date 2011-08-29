/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import javax.ws.rs.*;

/**
 *
 * @author letzkus
 */
@Path("/personen")
public class Personen {
    
    @GET
    public String getId() {
        return "hello-world";
    }
}
