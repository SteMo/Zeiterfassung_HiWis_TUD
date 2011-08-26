package de.tud.cs.tk.zeiterfassung.entities;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class Aufgabe {

	@Id
	@GeneratedValue
	public long id;

	@Basic
	public String titel;
	
	@Lob
	public String beschreibung;
	
	@Basic
	public Date deadline;
	
	@Basic
	public boolean erledigt;
	
	@ManyToOne
	public Person verantwortlicher;

}
