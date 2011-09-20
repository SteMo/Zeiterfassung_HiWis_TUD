/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung;

import de.tud.cs.tk.zeiterfassung.dao.AufgabeDAO;
import de.tud.cs.tk.zeiterfassung.dao.FachgebietDAO;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.dao.RolleDAO;
import de.tud.cs.tk.zeiterfassung.dao.TarifDAO;
import de.tud.cs.tk.zeiterfassung.dao.VertragDAO;
import de.tud.cs.tk.zeiterfassung.entities.Aufgabe;
import de.tud.cs.tk.zeiterfassung.entities.AufgabeDetails;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;
import de.tud.cs.tk.zeiterfassung.entities.Person;
import de.tud.cs.tk.zeiterfassung.entities.Rolle;
import de.tud.cs.tk.zeiterfassung.entities.Tarif;
import de.tud.cs.tk.zeiterfassung.entities.Vertrag;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
        long id_rolleHiwi = RolleDAO.create(rolleHiwi);
        
        Rolle rolleMitarbeiter = new Rolle();
        rolleMitarbeiter.name = "Mitarbeiter";
        rolleMitarbeiter.significance = 30;
        long id_rolleMitarbeiter = RolleDAO.create(rolleMitarbeiter);
        
        Rolle rolleAdministrator = new Rolle();
        rolleMitarbeiter.name = "Administrator";
        rolleMitarbeiter.significance = 10;
        long id_rolleAdministrator = RolleDAO.create(rolleAdministrator);
        
        /**
         * Personen
         */
        
        Person administrator = new Person();
        administrator.firstName = "Königin";
        administrator.givenName = "Administrator";
        administrator.principal = "this-is-my-principal";
        administrator.setRolle(RolleDAO.retrieve(id_rolleAdministrator));  
        administrator.setFachgebiet(FachgebietDAO.retrieve(id_tk));
        long id_administartor = PersonDAO.create(administrator);
        
        Person mitarbeiter = new Person();
        mitarbeiter.firstName = "Frau";
        mitarbeiter.givenName = "Mitarbeiterin";
        mitarbeiter.principal = "https://www.google.com/accounts/o8/id?id=AItOawlgjtpP9YGHgZBjjt9PT9gExv6k-01clVU"; 
        mitarbeiter.setRolle(RolleDAO.retrieve(id_rolleMitarbeiter));
        mitarbeiter.setFachgebiet(FachgebietDAO.retrieve(id_tk));
        long id_mitarbeiter = PersonDAO.create(mitarbeiter);        
        
        Person hiwi = new Person();
        hiwi.firstName = "Stephan";
        hiwi.givenName = "M";
        hiwi.principal = "https://www.google.com/accounts/o8/id?id=AItOawnHXIx1clex8SIcPQnK74vE8W4OJ4xSoUM"; 
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
        hiwi = PersonDAO.retrieve(id_hiwi);
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
        
        /**
         * Verträge
         */
        mitarbeiter = PersonDAO.retrieve(id_mitarbeiter);
        hiwi = PersonDAO.retrieve(id_hiwi);

        Vertrag vertragMitarbeiterHiwi = new Vertrag();
        vertragMitarbeiterHiwi.start = new Date();
        vertragMitarbeiterHiwi.ende = new Date();
        vertragMitarbeiterHiwi.stundenProMonat = 40;
        vertragMitarbeiterHiwi.vertragspartner = PersonDAO.retrieve(id_hiwi);
        mitarbeiter.addVertragssteller(vertragMitarbeiterHiwi);
        hiwi.addVertragspartner(vertragMitarbeiterHiwi);
        long id_vertragMitarbeiterHiwi = VertragDAO.create(vertragMitarbeiterHiwi);
        
        /**
         * Tarife
         */
        mitarbeiter = PersonDAO.retrieve(id_mitarbeiter);
        hiwi = PersonDAO.retrieve(id_hiwi);
        vertragMitarbeiterHiwi = VertragDAO.retrieve(id_vertragMitarbeiterHiwi);
        Tarif tarifWerkstudent = new Tarif();
        tarifWerkstudent.name = "Werkstudent";
        tarifWerkstudent.stufe = 0;
        tarifWerkstudent.stundensatz = 9;
        long id_tarifWerkstudent = TarifDAO.create(tarifWerkstudent);
        tarifWerkstudent = TarifDAO.retrieve(id_tarifWerkstudent);
        vertragMitarbeiterHiwi.setTarif(tarifWerkstudent);
        VertragDAO.update(vertragMitarbeiterHiwi);
        
    }
    
    public boolean alreadyInstalled() {
        Fachgebiet f = FachgebietDAO.findByName("tk");
        if(f != null)
            return true;
        return false;
    }
}
