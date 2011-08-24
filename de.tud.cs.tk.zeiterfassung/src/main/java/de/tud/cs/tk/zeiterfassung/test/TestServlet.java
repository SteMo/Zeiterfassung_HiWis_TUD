package de.tud.cs.tk.zeiterfassung.test;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.internal.JUnitSystem;
import org.junit.runner.JUnitCore;

public class TestServlet extends HttpServlet {

	private static final long serialVersionUID = -3221196815057917664L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if (request.getParameter("class") != null && !request.getParameter("class").isEmpty()) {
			String className = request.getParameter("class");
			response.setContentType("text/plain");
			OutputStream out = response.getOutputStream();
			final PrintStream pout = new PrintStream(out);
			new JUnitCore().runMain(new JUnitSystem() {
				public PrintStream out() {
					return pout;
				}

				public void exit(int arg0) {
				}
			}, className);
			out.close();			
		}
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}
	
}
