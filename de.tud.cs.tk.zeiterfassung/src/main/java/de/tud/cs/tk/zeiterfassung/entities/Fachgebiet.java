package de.tud.cs.tk.zeiterfassung.entities;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Fachgebiet {

	@Id
	@GeneratedValue
	public long id;
	
	@Basic
	public String name;
	
}
