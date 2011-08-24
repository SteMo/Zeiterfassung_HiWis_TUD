package de.tud.cs.tk.zeiterfassung.dao;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Tarif;

public class TarifDAO {

	public static long create(Tarif tarif) {
		Hibernate.saveObject(tarif);
		return tarif.id;
	}

	public static Tarif retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Tarif tarif = (Tarif) session.createQuery("from Tarif where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return tarif;
	}
	
	public static long update(Tarif tarif) {
		Hibernate.saveOrUpdateObject(tarif);
		return tarif.id;
	}

	public static void delete(Tarif tarif) {
		Hibernate.deleteObject(tarif);
	}
	
}
