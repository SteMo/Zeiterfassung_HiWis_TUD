package de.tud.cs.tk.zeiterfassung.test;

import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({
	FachgebietTest.class,
	AufgabeTest.class,
	TarifTest.class,
	VertragTest.class,
	PersonTest.class
})
public class TestSuite {}
