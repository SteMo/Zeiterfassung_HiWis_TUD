package de.tud.cs.tk.zeiterfassung.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Vertrag;

public class VertragDAO {

	public static long create(Vertrag vertrag) {
		Hibernate.saveObject(vertrag);
		return vertrag.id;
	}

	public static void delete(Vertrag vertrag) {
		Hibernate.deleteObject(vertrag);
	}
	
	public static Vertrag retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Vertrag vertrag = (Vertrag) session.createQuery("from Vertrag where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return vertrag;
	}
	
	public static List<Vertrag> retrieveAll() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<Vertrag> vertraege = (ArrayList<Vertrag>) session.createQuery("from Vertrag").list();

		session.getTransaction().commit();

		return vertraege;	
	}

	public static long update(Vertrag vertrag) {
		Hibernate.saveOrUpdateObject(vertrag);
		return vertrag.id;
	}
	
}
