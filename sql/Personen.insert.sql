INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id)
    VALUES (0, 'Fabian', 'Letzkus', 'bbb', 0, 0);
INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id)
    VALUES (1, 'Frau', 'Professor', 'aaa', 0, 1);

INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id, supervisor_id)
    VALUES (2, 'Herr', 'Mitarbeiter', 'https://www.google.com/accounts/o8/id?id=AItOawm5WavitC2u_8ZUrRS1ffyJStYdoWNf7TU', 0, 2, 1);
INSERT INTO person(
            id, firstname, givenname, principal, fachgebiet_id, rolle_id, supervisor_id)
    VALUES (3, 'Herr', 'Hiwi', 'ccc', 0, 3, 2);
