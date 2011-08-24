package de.tud.cs.tk.zeiterfassung.entities;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Fachgebiet {

	@Id
	@GeneratedValue
	public long id;
	
	@Basic
	public String name;
	
	@Basic
	public int budget;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="fachgebiet")
	public List<Person> people;
	
}
