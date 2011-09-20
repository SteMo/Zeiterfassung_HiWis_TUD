/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung;

import de.tud.cs.tk.zeiterfassung.ws.Aufgaben;
import de.tud.cs.tk.zeiterfassung.ws.AufgabenDetails;
import de.tud.cs.tk.zeiterfassung.ws.Fachgebiete;
import de.tud.cs.tk.zeiterfassung.ws.Menu;
import de.tud.cs.tk.zeiterfassung.ws.Personen;
import de.tud.cs.tk.zeiterfassung.ws.Tarife;
import de.tud.cs.tk.zeiterfassung.ws.Vertraege;
import de.tud.cs.tk.zeiterfassung.ws.WhoAmI;
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
       this.singletons.add(new Menu());
       this.singletons.add(new Fachgebiete());
       this.singletons.add(new Aufgaben());
       this.singletons.add(new AufgabenDetails());
       this.singletons.add(new Vertraege());
       this.singletons.add(new Tarife());
       this.singletons.add(new WhoAmI());
       
       this.classes.add(WhoAmI.class);
       this.classes.add(Tarife.class);
       this.classes.add(Vertraege.class);
       this.classes.add(AufgabenDetails.class);
       this.classes.add(Aufgaben.class);
       this.classes.add(Personen.class);
       this.classes.add(Menu.class);
       this.classes.add(Fachgebiete.class);
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
