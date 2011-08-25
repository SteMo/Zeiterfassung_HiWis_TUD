package de.tud.cs.tk.zeiterfassung.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import javax.persistence.EntityExistsException;

import org.junit.Test;

import de.tud.cs.tk.zeiterfassung.dao.TarifDAO;
import de.tud.cs.tk.zeiterfassung.entities.Tarif;

public class TarifTest {

	@Test
	public void createTarif1() {
		if (TarifDAO.findByName("1") == null) {
			Tarif t = new Tarif();
			t.name = "1";
			
			long id = TarifDAO.create(t);
			
			t = TarifDAO.retrieve(id);
			assertEquals("1", t.name);
		}
	}

	@Test(expected=EntityExistsException.class)
	public void createExistingTarif() {
		Tarif t = new Tarif();
		t.name = "1";
		
		TarifDAO.create(t);
	}

	@Test
	public void findTarif() {
		Tarif t = TarifDAO.findByName("1");
		assertEquals("1", t.name);
	}

	@Test
	public void findUnknownTarif() {
		Tarif t = TarifDAO.findByName("FOO");
		assertNull(t);
	}
	
	@Test
	public void updateTarif() {
		Tarif t = TarifDAO.findByName("1");
		t.stufe = 1;
		t.stundensatz = 10;
		
		long id = TarifDAO.update(t);
		
		t = TarifDAO.retrieve(id);
		assertEquals(1, t.stufe);
		assertEquals(10, t.stundensatz, 0);
	}

}
