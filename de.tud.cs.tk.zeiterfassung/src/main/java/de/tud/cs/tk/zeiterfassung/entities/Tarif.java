package de.tud.cs.tk.zeiterfassung.entities;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

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
	
	@OneToMany(cascade=CascadeType.ALL, mappedBy="tarif", fetch=FetchType.EAGER)
	@Fetch(value = FetchMode.SUBSELECT)
	public List<Vertrag> vertraege;
	
}
