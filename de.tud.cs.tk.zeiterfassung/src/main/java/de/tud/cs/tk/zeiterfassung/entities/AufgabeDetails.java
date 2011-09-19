/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.entities;

import java.util.Date;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class AufgabeDetails {
    
    @Id
    @GeneratedValue
    public long id;
    
    @Basic
    public Date datum;
    
    @Basic
    public String beschreibung;
    
    @Basic
    public int worked;
    
    @ManyToOne
    public Aufgabe aufgabe;
        
}
