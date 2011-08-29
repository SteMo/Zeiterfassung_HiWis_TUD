/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung;

import de.tud.cs.tk.zeiterfassung.ws.Personen;
import java.util.HashSet;
import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author letzkus
 */
public class ZeiterfassungWS extends Application  {
    
   private HashSet<Class<?>> classes = new HashSet<Class<?>>();
   private HashSet<Object> singletons = new HashSet<Object>();
   
   public ZeiterfassungWS() {
       this.singletons.add(new Personen());
       this.classes.add(Personen.class);
   }
   
   @Override
   public Set<Class<?>> getClasses() {
       return classes;
   }
   
   @Override
   public Set<Object> getSingletons() {
       return singletons;
   }
}
