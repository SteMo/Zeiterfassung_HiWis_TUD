package de.tud.cs.tk.zeiterfassung.test;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import de.tud.cs.tk.zeiterfassung.jopenid.OpenIdPrincipal;

/**
 * Minimal servlet reacting on user principal either being set or not. 
 * @author Hartle
 *
 */
public class JOpenIdTest extends HttpServlet {
	
	private static final long serialVersionUID = 2881934138221267672L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		OutputStream outputStream = null;
		Writer writer = null;
		OpenIdPrincipal principal = null;
		
		// Get principal, if any
		if (request.getUserPrincipal() instanceof OpenIdPrincipal) {
			principal = (OpenIdPrincipal)request.getUserPrincipal();
		}
		
		// Send the processed feed
		response.setContentType("text/html");
		outputStream = response.getOutputStream();
		writer = new PrintWriter(outputStream);

		writer.write("<html>");
		writer.write("<body>");
		
		if (principal != null) {
			writer.write("Got authenticated principal " + principal.getName() + " from " + principal.getEmail() + " with identity "+principal.getIdentity());
			
		} else {
			writer.write("Got no principal.");
		}
		
		writer.write("</body>");
		writer.write("</html>");
		writer.close();
	}	
}
