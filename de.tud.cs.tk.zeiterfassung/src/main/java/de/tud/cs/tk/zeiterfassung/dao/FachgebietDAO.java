package de.tud.cs.tk.zeiterfassung.dao;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;

public class FachgebietDAO {

	public static long create(Fachgebiet fachgebiet) {
		Hibernate.saveObject(fachgebiet);
		return fachgebiet.id;
	}

	public static Fachgebiet retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Fachgebiet fachgebiet = (Fachgebiet) session.createQuery("from Fachgebiet where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return fachgebiet;
	}

	public static long update(Fachgebiet fachgebiet) {
		Hibernate.saveOrUpdateObject(fachgebiet);
		return fachgebiet.id;
	}
	
	public static void delete(Fachgebiet fachgebiet) {
		Hibernate.deleteObject(fachgebiet);
	}
	
}
