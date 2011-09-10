﻿DELETE FROM aufgabe;
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
    VALUES (3, 'Hiwi', 30);

INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id)
    VALUES (0, 'Fabian', 'Letzkus', 'bbb', 0, 0);
INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id)
    VALUES (1, 'Frau', 'Professor', 'aaa', 0, 1);

INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id, supervisor_id)
    VALUES (2, 'Herr', 'Mitarbeiter', 'ccc', 0, 2, 1);
INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id, supervisor_id)
    VALUES (3, 'Herr', 'Hiwi', 'https://www.google.com/accounts/o8/id?id=AItOawlgjtpP9YGHgZBjjt9PT9gExv6k-01clVU', 0, 0, 2);
