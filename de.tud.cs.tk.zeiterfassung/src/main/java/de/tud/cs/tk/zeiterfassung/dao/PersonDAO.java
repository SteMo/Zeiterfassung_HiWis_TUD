package de.tud.cs.tk.zeiterfassung.dao;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Session;

import de.tud.cs.tk.zeiterfassung.Hibernate;
import de.tud.cs.tk.zeiterfassung.HibernateUtil;
import de.tud.cs.tk.zeiterfassung.entities.Person;

public class PersonDAO {

	public static long create(Person person) {
		Hibernate.saveObject(person);
		return person.id;
	}
	
	public static void delete(Person person) {
		Hibernate.deleteObject(person);
	}
	
	public static Person retrieve(long id) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		Person person = (Person) session.createQuery("from Person where id=?").setLong(0, id).uniqueResult();

		session.getTransaction().commit();

		return person;
	}
	
	public static List<Person> findByName(String firstName, String givenName) {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<Person> personen = (ArrayList<Person>) session.createQuery("from Person where firstName=? and givenName=?").setString(0, firstName).setString(1, givenName).list();

		session.getTransaction().commit();

		return personen;
	}
	
	public static List<Person> retrieveAll() {
		Session session = HibernateUtil.getSessionFactory().getCurrentSession();
		session.beginTransaction();

		@SuppressWarnings("unchecked")
		List<Person> personen = (ArrayList<Person>) session.createQuery("from Person").list();

		session.getTransaction().commit();

		return personen;	
	}

	public static long update(Person person) {
		Hibernate.saveOrUpdateObject(person);
		return person.id;
	}

}
