package de.tud.cs.tk.zeiterfassung.dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityExistsException;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Tarif;

public class TarifDAO {

	public static long create(Tarif tarif) {
		if (findByName(tarif.name) == null) {
			Hibernate.saveObject(tarif);
		} else {
			throw new EntityExistsException();
		}

		return tarif.id;
	}

	public static void delete(Tarif tarif) {
		Hibernate.deleteObject(tarif);
	}
	
	public static Tarif findByName(String name) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Tarif tarif = (Tarif) session.createQuery("from Tarif where name=?").setString(0, name).uniqueResult();

		session.getTransaction().commit();

		return tarif;
	}
	
	public static Tarif retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Tarif tarif = (Tarif) session.createQuery("from Tarif where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return tarif;
	}
	
	public static List<Tarif> retrieveAll() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<Tarif> tarife = (ArrayList<Tarif>) session.createQuery("from Tarif").list();

		session.getTransaction().commit();

		return tarife;	
	}

	public static long update(Tarif tarif) {
		Hibernate.saveOrUpdateObject(tarif);
		return tarif.id;
	}
	
}
