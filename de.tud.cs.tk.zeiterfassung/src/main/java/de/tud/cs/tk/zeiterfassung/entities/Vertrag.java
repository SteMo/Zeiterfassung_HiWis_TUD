package de.tud.cs.tk.zeiterfassung.entities;

import java.util.Date;

import java.util.List;
import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity
public class Vertrag {

	@Id
	@GeneratedValue
	public long id;
	
	@ManyToOne
	public Person vertragssteller;
        
        @ManyToOne
        public Person vertragspartner;
	
	@ManyToOne
	private Tarif tarif;

	@Basic
	public Date start;
	
	@Basic
	public Date ende;
	
	@Basic
	public int stundenProMonat;

	public Tarif getTarif() {
		return tarif;
	}
	
	public void setTarif(Tarif tarif) {
		tarif.vertraege.add(this);
		this.tarif = tarif;
	}
	
}
