DROP USER IF EXISTS 'avmsuser'@'localhost';
CREATE USER 'avmsuser'@'localhost' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON avmsdb.* TO 'avmsuser'@'localhost';
FLUSH PRIVILEGES;
