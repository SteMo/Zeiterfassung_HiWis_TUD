# Zeiterfassungsportal für HiWis

## 1. Datenbank einrichten

* PostgreSQL-Server installieren
* Log-In-Rolle anlegen mit Benutzer `zeiterfassung` und Passwort `hiwi`
* Datenbank `Zeiterfassung` mit dem Eigentümer `zeiterfassung` erstellen

## 2. Eclipse einrichten

* [m2e 1.0][1] installieren
* [m2e-wtp][2] installieren

## 3. Projekt mit Git-Client nach Wahl auschecken

Für Mac beispielsweise [Tower][3], für Windows [SmartGit][4].

## 4. Projekt in Eclipse importieren

* Import -> Maven -> Existing Maven Projects
* Root-Directory: `de.tud.cs.tk.zeiterfassung`
* **WICHTIG:** Advanced -> Naming template: `[groupId].[artifactId]` auswählen


[1]: http://download.eclipse.org/technology/m2e/milestones/1.0
[2]: https://repository.sonatype.org/content/repositories/forge-sites/m2eclipse-wtp/0.13.0/S/0.13.0.20110623-0455
[3]: http://www.git-tower.com/
[4]: http://www.syntevo.com/smartgit/index.html