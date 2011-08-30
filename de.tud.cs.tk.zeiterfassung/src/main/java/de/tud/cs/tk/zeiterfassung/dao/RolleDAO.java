package de.tud.cs.tk.zeiterfassung.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityExistsException;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Rolle;

public class RolleDAO {

	public static long create(Rolle rolle) {
		if (findByName(rolle.name) == null) {
			Hibernate.saveObject(rolle);
		} else {
			throw new EntityExistsException();
		}

		return rolle.id;
	}

	public static void delete(Rolle rolle) {
		Hibernate.deleteObject(rolle);
	}
	
	public static Rolle findByName(String name) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Rolle rolle = (Rolle) session.createQuery("from Rolle where name=?").setString(0, name).uniqueResult();

		session.getTransaction().commit();

		return rolle;
	}
	
	public static Rolle retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Rolle rolle = (Rolle) session.createQuery("from Rolle where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return rolle;
	}
	
	public static List<Rolle> retrieveAll() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<Rolle> rollen = (ArrayList<Rolle>) session.createQuery("from Rolle").list();

		session.getTransaction().commit();

		return rollen;
	}

	public static long update(Rolle rolle) {
		Hibernate.saveOrUpdateObject(rolle);
		return rolle.id;
	}

}
