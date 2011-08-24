package de.tud.cs.tk.zeiterfassung.test;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import de.tud.cs.tk.zeiterfassung.dao.FachgebietDAO;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;

public class FachgebietTest {

	@Test
	public void createFachgebiet() {
		Fachgebiet f = new Fachgebiet();
		f.name = "TK";
		
		long id = FachgebietDAO.create(f);
		f = null;
		
		f = FachgebietDAO.retrieve(id);
		assertEquals("TK", f.name);
	}
	
}
