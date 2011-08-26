package de.tud.cs.tk.zeiterfassung.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityExistsException;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Fachgebiet;

public class FachgebietDAO {

	public static long create(Fachgebiet fachgebiet) {
		if (findByName(fachgebiet.name) == null) {
			Hibernate.saveObject(fachgebiet);
		} else {
			throw new EntityExistsException();
		}

		return fachgebiet.id;
	}

	public static void delete(Fachgebiet fachgebiet) {
		Hibernate.deleteObject(fachgebiet);
	}
	
	public static Fachgebiet findByName(String name) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Fachgebiet fachgebiet = (Fachgebiet) session.createQuery("from Fachgebiet where name=?").setString(0, name).uniqueResult();

		session.getTransaction().commit();

		return fachgebiet;	
	}
	
	public static Fachgebiet retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Fachgebiet fachgebiet = (Fachgebiet) session.createQuery("from Fachgebiet where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return fachgebiet;
	}
	
	public static List<Fachgebiet> retrieveAll() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<Fachgebiet> fachgebiete = (ArrayList<Fachgebiet>) session.createQuery("from Fachgebiet").list();

		session.getTransaction().commit();

		return fachgebiete;	
	}

	public static long update(Fachgebiet fachgebiet) {
		Hibernate.saveOrUpdateObject(fachgebiet);
		return fachgebiet.id;
	}
	
}
