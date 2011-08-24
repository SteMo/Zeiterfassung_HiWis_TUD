package de.tud.cs.tk.iptk.ws2010_11.jopenid;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.expressme.openid.Association;
import org.expressme.openid.Authentication;
import org.expressme.openid.Endpoint;
import org.expressme.openid.OpenIdException;
import org.expressme.openid.OpenIdManager;

public class OpenIdAuthenticationFilter implements Filter {
	public static final String ATTRIBUTE_MAC = "de.tud.cs.tk.iptk.ws2010_11.jopenid.JOpenIDAuthenticationFilter.ATTRIBUTE_MAC";
	public static final String ATTRIBUTE_ALIAS = "de.tud.cs.tk.iptk.ws2010_11.jopenid.JOpenIDAuthenticationFilter.ATTRIBUTE_ALIAS";
	protected OpenIdManager manager = null;
	protected String endpointName = null;
	protected boolean strict = false; 
	
	public void init(FilterConfig config) throws ServletException {
		String returnTo = null;
		String realm = null;

		// Fetch parameters
		returnTo = config.getInitParameter("return-to");
		realm = config.getInitParameter("realm");
		this.endpointName = config.getInitParameter("endpoint-name");
		this.strict = Boolean.parseBoolean(config.getInitParameter("strict"));
		
        // Prepare OpenId manager
        this.manager = new OpenIdManager();
        this.manager.setReturnTo(returnTo);
        this.manager.setRealm(realm);
        
        // Set endpoint name to be used
        this.endpointName = "Google";
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {
		if (servletRequest instanceof HttpServletRequest) {
			HttpServletRequest httpServletRequest = null;
			HttpServletResponse httpServletResponse = null;
			HttpSession httpSession = null;
			byte[] mac = null;
			String alias = null;

			// Cast to the proper type
			httpServletRequest = (HttpServletRequest)servletRequest;
	        httpServletResponse = (HttpServletResponse)servletResponse;
	        httpSession = httpServletRequest.getSession();

	        // Try to get the authentication
	        mac = (byte[])httpSession.getAttribute(ATTRIBUTE_MAC);
	        alias = (String)httpSession.getAttribute(ATTRIBUTE_ALIAS);

	        // Are MAC or alias missing in the session?
	        if ((mac == null) || (alias == null)) {
	        	// Shall we enforce a redirection?
	        	if (this.strict) {
	        		// Redirect to the authentication page
	        		redirectToAuthentication(httpSession, httpServletResponse);
	        	} else {
	        		// Pass control to the next filter
	        		chain.doFilter(servletRequest, servletResponse);
	        	}
			} else {
				try {
					Authentication authentication = null;
					OpenIdPrincipal userPrincipal = null;
					HttpServletRequestWrapperImpl wrapper = null;
					
					// Try to obtain authentication of the request
					authentication = this.manager.getAuthentication(httpServletRequest, mac, alias);
					
					// Prepare an OpenId-based user principal
					userPrincipal = new OpenIdPrincipal(authentication);
					
					// Prepare wrapper with user principal
					wrapper = new HttpServletRequestWrapperImpl(httpServletRequest);
					wrapper.setUserPrincipal(userPrincipal);
					
					// Pass control to the next filter
					chain.doFilter(wrapper, servletResponse);
				} catch (OpenIdException e) {
					// Shall we handle this failure to authenticate strict?
					if (this.strict) {
						// Redirect to the authentication page
						redirectToAuthentication(httpSession, httpServletResponse);
					} else {
						// Pass control to the next filter
						chain.doFilter(servletRequest, servletResponse);
					}
				}
			}
		}
	}
	
	protected void redirectToAuthentication(HttpSession httpSession, HttpServletResponse httpServletResponse) throws IOException {
        Endpoint endpoint = null;
        Association association = null;
        String url = null;
        				
        // Prepare endpoint and association
        endpoint = this.manager.lookupEndpoint(this.endpointName);        
        association = this.manager.lookupAssociation(endpoint);
        
        // Store MAC and alias in the session
        httpSession.setAttribute(ATTRIBUTE_MAC, association.getRawMacKey());
        httpSession.setAttribute(ATTRIBUTE_ALIAS, endpoint.getAlias());

        // Redirect the user to the respective authentication
        url = this.manager.getAuthenticationUrl(endpoint, association);
        httpServletResponse.sendRedirect(url);		
	}

	public void destroy() {
		
	}
}
