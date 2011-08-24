package de.tud.cs.tk.zeiterfassung.dao;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Person;

public class PersonDAO {

	public static long create(Person person) {
		Hibernate.saveObject(person);
		return person.id;
	}
	
	public static Person retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Person person = (Person) session.createQuery("from Person where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return person;
	}
	
	public static long update(Person person) {
		Hibernate.saveOrUpdateObject(person);
		return person.id;
	}

	public static void delete(Person person) {
		Hibernate.deleteObject(person);
	}

}
