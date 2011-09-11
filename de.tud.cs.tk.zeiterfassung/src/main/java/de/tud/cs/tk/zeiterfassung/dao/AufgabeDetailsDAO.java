/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityExistsException;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.AufgabeDetails;
/**
 *
 * @author letzkus
 */
public class AufgabeDetailsDAO {
    
	public static long create(AufgabeDetails a) {
		Hibernate.saveObject(a);
		return a.id;
	}

	public static void delete(AufgabeDetails a) {
		Hibernate.deleteObject(a);
	}
	
	public static AufgabeDetails retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		AufgabeDetails a = (AufgabeDetails) session.createQuery("from AufgabeDetails where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return a;
	}
	
	public static List<AufgabeDetails> retrieveAll() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<AufgabeDetails> a = (ArrayList<AufgabeDetails>) session.createQuery("from AufgabeDetails").list();

		session.getTransaction().commit();

		return a;	
	}

	public static long update(AufgabeDetails a) {
		Hibernate.saveOrUpdateObject(a);
		return a.id;
	}
}
