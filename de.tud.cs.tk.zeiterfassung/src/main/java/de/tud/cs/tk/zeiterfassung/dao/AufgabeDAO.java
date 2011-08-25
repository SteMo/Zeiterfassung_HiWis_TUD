package de.tud.cs.tk.zeiterfassung.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Aufgabe;

public class AufgabeDAO {

	public static long create(Aufgabe aufgabe) {
		Hibernate.saveObject(aufgabe);
		return aufgabe.id;
	}

	public static void delete(Aufgabe aufgabe) {
		Hibernate.deleteObject(aufgabe);
	}
	
	public static Aufgabe retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Aufgabe aufgabe = (Aufgabe) session.createQuery("from Aufgabe where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return aufgabe;
	}
	
	public static List<Aufgabe> retrieveAll() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<Aufgabe> aufgaben = (ArrayList<Aufgabe>) session.createQuery("from Aufgabe").list();

		session.getTransaction().commit();

		return aufgaben;		
	}

	public static long update(Aufgabe aufgabe) {
		Hibernate.saveOrUpdateObject(aufgabe);
		return aufgabe.id;
	}

}
