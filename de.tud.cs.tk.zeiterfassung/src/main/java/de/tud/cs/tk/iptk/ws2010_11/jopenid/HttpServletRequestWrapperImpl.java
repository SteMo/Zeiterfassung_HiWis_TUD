package de.tud.cs.tk.iptk.ws2010_11.jopenid;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;

public class HttpServletRequestWrapperImpl extends HttpServletRequestWrapper {
	protected Principal userPrincipal = null;

	public HttpServletRequestWrapperImpl(HttpServletRequest request) {
		super(request);
	}
	
	protected void setUserPrincipal(Principal userPrincipal) {
		this.userPrincipal = userPrincipal;
	}

	@Override
	public Principal getUserPrincipal() {
		return this.userPrincipal;
	}

	@Override
	public boolean isUserInRole(String role) {
		return super.isUserInRole(role);
	}
}
