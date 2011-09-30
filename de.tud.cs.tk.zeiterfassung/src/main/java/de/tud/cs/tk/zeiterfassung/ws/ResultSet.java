/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package de.tud.cs.tk.zeiterfassung.ws;

import java.util.List;

/**
 *
 * @author letzkus
 */
public class ResultSet<T> {
    
    public boolean success;
        public int total;
        public List<T> results;
    
}
