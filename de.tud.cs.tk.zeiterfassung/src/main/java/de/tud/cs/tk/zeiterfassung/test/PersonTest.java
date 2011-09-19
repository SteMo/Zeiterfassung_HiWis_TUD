package de.tud.cs.tk.zeiterfassung.test;

import static org.junit.Assert.assertFalse;

import org.junit.Test;

import de.tud.cs.tk.zeiterfassung.dao.AufgabeDAO;
import de.tud.cs.tk.zeiterfassung.dao.FachgebietDAO;
import de.tud.cs.tk.zeiterfassung.dao.PersonDAO;
import de.tud.cs.tk.zeiterfassung.dao.RolleDAO;
import de.tud.cs.tk.zeiterfassung.dao.VertragDAO;
import de.tud.cs.tk.zeiterfassung.entities.Person;

public class PersonTest {

	@Test
	public void createChuckNorris() {
		if (PersonDAO.findByName("Chuck", "Norris").size() == 0) {
			Person p = new Person();
			p.firstName = "Chuck";
			p.givenName = "Norris";
			
			p.setFachgebiet(FachgebietDAO.findByName("TK"));
			
			PersonDAO.create(p);
			
			assertFalse(PersonDAO.findByName("Chuck", "Norris").size() == 0);
		}
	}
	
	@Test 
	public void createBudSpencer() {
		if (PersonDAO.findByName("Bud", "Spencer").size() == 0) {
			Person p = new Person();
			p.firstName = "Bud";
			p.givenName = "Spencer";
			p.setFachgebiet(FachgebietDAO.findByName("TK"));
			p.setSupervisor(PersonDAO.findByName("Chuck", "Norris").get(0));
			p.setRolle(RolleDAO.findByName("Prof"));
			
			PersonDAO.create(p);
			
			assertFalse(PersonDAO.findByName("Bud", "Spencer").size() == 0);
			assertFalse(PersonDAO.findByName("Chuck", "Norris").get(0).getMitarbeiter().size() == 0);
		}
	}
	
	@Test
	public void updateBudSpencer() {
		Person p = PersonDAO.findByName("Bud", "Spencer").get(0);
		p.addAufgabe(AufgabeDAO.retrieveAll().get(0));
		p.addVertragspartner(VertragDAO.retrieveAll().get(0));
		
		long id = PersonDAO.update(p);

		p = PersonDAO.retrieve(id);

		assertFalse(p.getAufgaben().size() == 0);
		assertFalse(p.getVertragspartner().size() == 0);
	}
	
}
