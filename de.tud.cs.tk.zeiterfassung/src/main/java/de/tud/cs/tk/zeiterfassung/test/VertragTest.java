package de.tud.cs.tk.zeiterfassung.test;

import static org.junit.Assert.assertEquals;

import java.util.Date;

import org.junit.Test;

import de.tud.cs.tk.zeiterfassung.dao.TarifDAO;
import de.tud.cs.tk.zeiterfassung.dao.VertragDAO;
import de.tud.cs.tk.zeiterfassung.entities.Vertrag;

public class VertragTest {

	@Test
	public void createVertrag() {
		Vertrag v = new Vertrag();
		v.ende = new Date();
		v.start = new Date();
		v.stundenProMonat = 80;
		
		long id = VertragDAO.create(v);
		
		v = VertragDAO.retrieve(id);
		
		assertEquals(80, v.stundenProMonat);
	}
	
	@Test
	public void updateVertrag() {
		Vertrag v = VertragDAO.retrieveAll().get(0);
		
		v.setTarif(TarifDAO.findByName("1"));
		
		long id = VertragDAO.update(v);
		
		v = VertragDAO.retrieve(id);
		
		assertEquals(1, v.getTarif().stufe);
	}
}
