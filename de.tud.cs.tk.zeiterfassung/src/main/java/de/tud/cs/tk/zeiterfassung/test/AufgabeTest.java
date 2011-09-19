package de.tud.cs.tk.zeiterfassung.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.junit.Test;

import de.tud.cs.tk.zeiterfassung.dao.AufgabeDAO;
import de.tud.cs.tk.zeiterfassung.entities.Aufgabe;
import de.tud.cs.tk.zeiterfassung.entities.AufgabeDetails;

public class AufgabeTest {

	@Test
	public void createAufgabe() {
		String todo = UUID.randomUUID().toString();
		
		Aufgabe a = new Aufgabe();
		a.beschreibung = todo;
		a.titel = todo.substring(0, 6);
		a.deadline = new Date();
		a.erledigt = false;
		
		AufgabeDetails d1 = new AufgabeDetails();
		d1.beschreibung = "asd";
		d1.worked = 15;
		
		a.addDetails(d1);
		
		long id = AufgabeDAO.create(a);

		a = AufgabeDAO.retrieve(id);

		assertEquals(todo, a.beschreibung);
	}
	
	@Test
	public void findUnknownAufgabe() {
		Aufgabe a = AufgabeDAO.retrieve(Long.MAX_VALUE);
		
		assertNull(a);
	}
	
	@Test
	public void updateAufgabe() {
		List<Aufgabe> aufgaben = AufgabeDAO.retrieveAll(); 
		Aufgabe a = aufgaben.get(aufgaben.size() / 2);
		a.erledigt = true;
		
		AufgabeDetails d2 = new AufgabeDetails();
		d2.beschreibung = "sdf";
		d2.worked = 40;
		
		a.addDetails(d2);
		
		long id = AufgabeDAO.update(a);
		
		a = AufgabeDAO.retrieve(id);
		
		assertTrue(a.erledigt);
	}
	
}
