/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung;

import de.tud.cs.tk.zeiterfassung.dao.AufgabeDAO;
import de.tud.cs.tk.zeiterfassung.dao.FachgebietDAO;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.dao.RolleDAO;
import de.tud.cs.tk.zeiterfassung.entities.Aufgabe;
import de.tud.cs.tk.zeiterfassung.entities.AufgabeDetails;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.entities.Rolle;
import java.util.ArrayList;
import java.util.Date;

/**
 *
 * @author letzkus
 */
public class Installation {
    public Installation() {
        
        if(alreadyInstalled()) // Prevent installing more than once
            return;
        
        /**
         * Fachgebiete
         */
        Fachgebiet tk = new Fachgebiet();
        tk.name = "TK";
        tk.leiter = -1;
        tk.stellv = -1;
        tk.budget = 10000;
        tk.people = new ArrayList();
        long id_tk = FachgebietDAO.create(tk);
        
        /**
         * Rollen
         */
        Rolle rolleHiwi = new Rolle(); 
        rolleHiwi.name = "Hiwi";
        rolleHiwi.significance = 40;
        rolleHiwi.personen = new ArrayList();
        long id_rolleHiwi = RolleDAO.create(rolleHiwi);
        
        Rolle rolleMitarbeiter = new Rolle();
        rolleMitarbeiter.name = "Mitarbeiter";
        rolleMitarbeiter.personen = new ArrayList();
        rolleMitarbeiter.significance = 30;
        long id_rolleMitarbeiter = RolleDAO.create(rolleMitarbeiter);
        
        /**
         * Personen
         */
        Person mitarbeiter = new Person();
        mitarbeiter.firstName = "Frau";
        mitarbeiter.givenName = "Mitarbeiterin";
        mitarbeiter.principal = "Hier_steht_ihr_principal"; 
        mitarbeiter.setRolle(rolleMitarbeiter);
        mitarbeiter.setFachgebiet(tk);
        long id_mitarbeiter = PersonDAO.create(mitarbeiter);
        
        Person hiwi = new Person();
        hiwi.firstName = "Herr";
        hiwi.givenName = "Hiwi";
        hiwi.principal = "https://www.google.com/accounts/o8/id?id=AItOawlgjtpP9YGHgZBjjt9PT9gExv6k-01clVU"; 
        hiwi.setRolle(RolleDAO.retrieve(id_rolleHiwi));
        hiwi.setFachgebiet(FachgebietDAO.retrieve(id_tk));
        long id_hiwi = PersonDAO.create(hiwi);   
        
        // set Supervisor of Hiwi to Mitarbeiter
        hiwi = PersonDAO.retrieve(id_hiwi);
        hiwi.setSupervisor(PersonDAO.retrieve(id_mitarbeiter));       
        PersonDAO.update(hiwi);
        
        /**
         * Aufgaben
         */
        Aufgabe aufgabeFuerHiwi = new Aufgabe();
        aufgabeFuerHiwi.titel = "Die erste Aufgabe für den Hiwi vom Mitarbeiter";
        aufgabeFuerHiwi.beschreibung = "Jag das Schnitzel in der Mensa";
        aufgabeFuerHiwi.assignedFrom = mitarbeiter;
        aufgabeFuerHiwi.deadline = new Date();
        aufgabeFuerHiwi.assignedAt = new Date();
        aufgabeFuerHiwi.worked = 0;
        aufgabeFuerHiwi.verantwortlicher = hiwi;
        hiwi.addAufgabe(aufgabeFuerHiwi);
        PersonDAO.update(hiwi);
        long id_aufgabeFuerHiwi = PersonDAO.retrieve(id_hiwi).getAufgaben().get(0).id;
        
        /**
         * Aufgabendetails
         */
        AufgabeDetails aufgabeDetailsFuerAufgabe1 = new AufgabeDetails();
        aufgabeDetailsFuerAufgabe1.aufgabe = aufgabeFuerHiwi;
        aufgabeDetailsFuerAufgabe1.datum = new Date();
        aufgabeDetailsFuerAufgabe1.beschreibung = "Einige Details zur ersten Aufgabe vom Hiwi";
        aufgabeDetailsFuerAufgabe1.worked = 4;
        
        // Set Aufgabe
        aufgabeFuerHiwi = AufgabeDAO.retrieve(id_aufgabeFuerHiwi);
        aufgabeFuerHiwi.addDetails(aufgabeDetailsFuerAufgabe1);      
        AufgabeDAO.update(aufgabeFuerHiwi);
        
    }
    
    public boolean alreadyInstalled() {
        // do things like receiving things and so on...
        return false;
    }
}
