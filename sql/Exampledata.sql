DELETE FROM vertrag;
DELETE FROM tarif;
DELETE FROM aufgabedetails;
DELETE FROM aufgabe;
DELETE FROM vertrag;
DELETE FROM person;
DELETE FROM fachgebiet;
DELETE FROM rolle;

INSERT INTO fachgebiet(
            id, budget, "name", leiter, stellv)
    VALUES (0, 10000, 'TK', -1, -1);
INSERT INTO fachgebiet(
            id, budget, "name", leiter, stellv)
    VALUES (1, 10000, 'CMS', -1, -1);
INSERT INTO fachgebiet(
            id, budget, "name", leiter, stellv)
    VALUES (2, 10000, 'TS', -1, -1);

INSERT INTO rolle(
            id, "name", significance)
    VALUES (0, 'Administrator', 10);
INSERT INTO rolle(
            id, "name", significance)
    VALUES (1, 'Professor', 20);
INSERT INTO rolle(
            id, "name", significance)
    VALUES (2, 'Mitarbeiter', 30);
INSERT INTO rolle(
            id, "name", significance)
    VALUES (3, 'Hiwi', 40);

INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id)
    VALUES (0, 'Fabian', 'Letzkus', 'https://www.google.com/accounts/o8/id?id=AItOawlgjtpP9YGHgZBjjt9PT9gExv6k-01clVU', 2, 3);
INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id)
    VALUES (1, 'Frau', 'Professor', 'aaa', 0, 1);

INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id, supervisor_id)
    VALUES (2, 'Herr', 'Mitarbeiter', 'ccc', 0, 2, 1);
INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id, supervisor_id)
    VALUES (3, 'Herr', 'Hiwi', 'aaa', 0, 3, 0);
INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id, supervisor_id)
    VALUES (4, 'Stephan', 'M', 'https://www.google.com/accounts/o8/id?id=AItOawnHXIx1clex8SIcPQnK74vE8W4OJ4xSoUM', 0, 3, 2);

INSERT INTO aufgabe(
            id, assignedat, beschreibung, deadline, erledigt, priority, titel, 
            worked, assignedfrom_id, verantwortlicher_id)
    VALUES (0, '1999-01-08 04:05:06', 'Das ist die erste Aufgabe', '1999-01-08 04:05:06', false, 5, 'Die erste Aufgabe', 
            4, 2, 4);
INSERT INTO aufgabe(
            id, assignedat, beschreibung, deadline, erledigt, priority, titel, 
            worked, assignedfrom_id, verantwortlicher_id)
    VALUES (1, '1999-01-08 04:05:06', 'Das ist die zweite Aufgabe', '1999-01-08 04:05:06', false, 2, 'Die zweite Aufgabe', 
            4, 2, 3);
INSERT INTO aufgabe(
            id, assignedat, beschreibung, deadline, erledigt, priority, titel, 
            worked, assignedfrom_id, verantwortlicher_id)
    VALUES (2, '1999-01-08 04:05:06', 'Das ist die dritte Aufgabe', '1999-01-08 04:05:06', false, 4, 'Die dritte Aufgabe', 
            4, 0, 4);
INSERT INTO aufgabe(
            id, assignedat, beschreibung, deadline, erledigt, priority, titel, 
            worked, assignedfrom_id, verantwortlicher_id)
    VALUES (3, '1999-01-08 04:05:06', 'Das ist die vierte Aufgabe', '1999-01-08 04:05:06', false, 3, 'Die vierte Aufgabe', 
            4, 0, 3);

INSERT INTO aufgabedetails(
            id, beschreibung, datum, worked, aufgabe_id)
    VALUES (0, 'Aufgabendetails 1 zu A1', '1999-05-04', 4, 0);
INSERT INTO aufgabedetails(
            id, beschreibung, datum, worked, aufgabe_id)
    VALUES (1, 'Aufgabendetails 1 zu A2', '1999-05-04', 5, 1);

INSERT INTO tarif(
            id, "name", stufe, stundensatz)
    VALUES (0, 'Hiwi@9Euro', 0, 9);

INSERT INTO vertrag(
            id, ende, "start", stundenpromonat, tarif_id, vertragspartner_id, 
            vertragssteller_id)
    VALUES (0, '2011-09-30', '2011-09-01', 30, 0, 3, 
            2);
INSERT INTO vertrag(
            id, ende, "start", stundenpromonat, tarif_id, vertragspartner_id, 
            vertragssteller_id)
    VALUES (1, '2011-09-30', '2011-09-01', 30, 0, 4, 
            0);


