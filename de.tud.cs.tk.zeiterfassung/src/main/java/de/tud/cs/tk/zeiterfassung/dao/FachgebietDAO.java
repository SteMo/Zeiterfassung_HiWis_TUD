package de.tud.cs.tk.zeiterfassung.dao;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;

public class FachgebietDAO {

	public static boolean exists(String name) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Long occ = (Long) session.createQuery("select count(*) from Fachgebiet as f where f.name = ?").setString(0, name).uniqueResult();

		session.getTransaction().commit();

		return (occ > 0);
	}

	public static void create(Fachgebiet f) {
		Hibernate.saveObject(f);
	}

	public static void update(Fachgebiet f) {
		Hibernate.saveOrUpdateObject(f);
	}

	public static Fachgebiet get(String name) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Fachgebiet f = (Fachgebiet) session.createQuery("from Fachgebiet where name=?").setString(0, name).uniqueResult();

		session.getTransaction().commit();

		return f;
	}
	
}
