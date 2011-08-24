package de.tud.cs.tk.zeiterfassung.entities;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Tarif {

	@Id
	@GeneratedValue
	public long id;
	
	@Basic
	public String name;
	
	@Basic
	public int stufe;
	
	@Basic
	public double stundensatz;
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="tarif")
	public List<Vertrag> vertraege;
	
}
