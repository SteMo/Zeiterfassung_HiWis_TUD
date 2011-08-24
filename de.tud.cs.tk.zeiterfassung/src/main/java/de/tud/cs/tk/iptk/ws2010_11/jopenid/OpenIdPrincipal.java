package de.tud.cs.tk.iptk.ws2010_11.jopenid;

import org.expressme.openid.Authentication;

public class OpenIdPrincipal implements java.security.Principal {
	protected Authentication authentication = null;

	protected OpenIdPrincipal(Authentication authentication) {
		this.authentication = authentication;
	}

	public String getName() {
		return this.authentication.getIdentity();
	}

	public String getFirstName() {
		return this.authentication.getFirstname();
	}
	
	public String getLastName() {
		return this.authentication.getLastname();
	}
	
	public String getLanguage() {
		return this.authentication.getLanguage();
	}
	
	public String getEmail() {
		return this.authentication.getEmail();
	}
	
	public String getGender() {
		return this.authentication.getGender();
	}
	
	public String getFullName() {
		return this.authentication.getFullname();
	}
	
	public String getIdentity() {
		return this.authentication.getIdentity();
	}
}
