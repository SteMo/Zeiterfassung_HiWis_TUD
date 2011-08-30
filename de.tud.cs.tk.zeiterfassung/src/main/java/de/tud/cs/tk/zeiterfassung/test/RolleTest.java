package de.tud.cs.tk.zeiterfassung.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

import javax.persistence.EntityExistsException;

import org.junit.Test;

import de.tud.cs.tk.zeiterfassung.dao.RolleDAO;
import de.tud.cs.tk.zeiterfassung.entities.Rolle;

public class RolleTest {

	@Test
	public void createRolleProf() {
		if (RolleDAO.findByName("Prof") == null) {
			Rolle r = new Rolle();
			r.name = "Prof";
			
			long id = RolleDAO.create(r);
			
			r = RolleDAO.retrieve(id);
			assertEquals("Prof", r.name);
		}
	}

	@Test(expected=EntityExistsException.class)
	public void createExistingRolle() {
		Rolle r = new Rolle();
		r.name = "Prof";
		
		RolleDAO.create(r);
	}

	@Test
	public void findRolle() {
		Rolle r = RolleDAO.findByName("Prof");
		assertEquals("Prof", r.name);
	}

	@Test
	public void findUnknownProf() {
		Rolle r = RolleDAO.findByName("Dekan");
		assertNull(r);
	}

}
