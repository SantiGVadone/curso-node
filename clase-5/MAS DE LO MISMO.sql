SELECT title, year, director , duration, poster, rate, BIN_TO_UUID(id) id FROM movie where title='The Godfather';

SELECT title, year, director , duration, poster, rate, BIN_TO_UUID(id) id FROM movie where id = BIN_TO_UUID(id);

--
--
--
--


SET SQL_SAFE_UPDATES = 1; -- SACA Y PONE EL MODO SEGURO CON UN 1 O UN 0 

DELETE FROM movie WHERE title = 'The Godfather';
