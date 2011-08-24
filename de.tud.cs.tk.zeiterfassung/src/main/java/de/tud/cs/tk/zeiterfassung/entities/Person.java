package de.tud.cs.tk.zeiterfassung.entities;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Person {

	@Id
	@GeneratedValue
	public long id;
	
	@Basic
	public String firstName;
	
	@Basic
	public String givenName;
	
	@ManyToOne
	private Person supervisor;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="vertragspartner")
	private List<Vertrag> vertraege;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="supervisor")
	private List<Person> mitarbeiter;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="verantwortlicher")
	private List<Aufgabe> aufgaben;
	
	@ManyToOne
	private Fachgebiet fachgebiet;
	
	public void addAufgabe(Aufgabe aufgabe) {
		aufgabe.verantwortlicher = this;
		this.aufgaben.add(aufgabe);
	}
	
	public void addMitarbeiter(Person employee) {
		employee.supervisor = this;
		this.mitarbeiter.add(employee);
	}
	
	public void addVertrag(Vertrag vertrag) {
		vertrag.vertragspartner = this;
		this.vertraege.add(vertrag);
	}
	
	public List<Aufgabe> getAufgaben() {
		return aufgaben;
	}
	
	public Fachgebiet getFachgebiet() {
		return fachgebiet;
	}

	public List<Person> getMitarbeiter() {
		return mitarbeiter;
	}
	
	public Person getSupervisor() {
		return supervisor;
	}
	
	public List<Vertrag> getVertraege() {
		return vertraege;
	}

	public void setFachgebiet(Fachgebiet fachgebiet) {
		fachgebiet.people.add(this);
		this.fachgebiet = fachgebiet;
	}
	
	public void setSupervisor(Person supervisor) {
		supervisor.mitarbeiter.add(this);
		this.supervisor = supervisor;
	}
	
}
