package de.tud.cs.tk.zeiterfassung.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Aufgabe {

	@Id
	@GeneratedValue
	public long id;

	@Basic
	public String titel;
	
	@Basic
	public String beschreibung;
	
	@Basic
	public Date deadline;
	
	@Basic
	public boolean erledigt;
        
	@Basic 
	public int priority;
        
	@Basic
	public float worked;
               
	@Basic
	public Date assignedAt;
        
	@ManyToOne
	public Person assignedFrom;
	
	@ManyToOne
	public Person verantwortlicher;

	@OneToMany(cascade=CascadeType.ALL, mappedBy="aufgabe", fetch=FetchType.EAGER)
	public List<AufgabeDetails> details = new ArrayList<AufgabeDetails>();

	public void addDetails(AufgabeDetails detail) {
		this.details.add(detail);
		detail.aufgabe = this;
	}
	
	public List<AufgabeDetails> getDetails() {
		return details;
	}
	
}
