package de.tud.cs.tk.zeiterfassung.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import javax.persistence.EntityExistsException;

import org.junit.Test;

import de.tud.cs.tk.zeiterfassung.dao.FachgebietDAO;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;

public class FachgebietTest {

	@Test
	public void createTKFachgebiet() {
		if (FachgebietDAO.findByName("TK") == null) {
			Fachgebiet f = new Fachgebiet();
			f.name = "TK";
			
			long id = FachgebietDAO.create(f);
			
			f = FachgebietDAO.retrieve(id);
			assertEquals("TK", f.name);
		}
	}

	@Test(expected=EntityExistsException.class)
	public void createExistingFachgebiet() {
		Fachgebiet f = new Fachgebiet();
		f.name = "TK";
		
		FachgebietDAO.create(f);
	}

	@Test
	public void findFachgebiet() {
		Fachgebiet f = FachgebietDAO.findByName("TK");
		assertEquals("TK", f.name);
	}

	@Test
	public void findUnknownFachgebiet() {
		Fachgebiet f = FachgebietDAO.findByName("FOO");
		assertNull(f);
	}

	@Test
	public void createSEFachgebiet() {
		if (FachgebietDAO.findByName("SE") == null) {
			Fachgebiet f = new Fachgebiet();
			f.name = "SE";
			
			long id = FachgebietDAO.create(f);
			
			f = FachgebietDAO.retrieve(id);
			assertEquals("SE", f.name);
		}
	}
	
	@Test
	public void updateFachgebiet() {
		Fachgebiet f = FachgebietDAO.findByName("TK");
		f.budget = 1000;
		
		long id = FachgebietDAO.update(f);
		
		f = FachgebietDAO.retrieve(id);
		assertEquals(1000, f.budget);
	}
	
}