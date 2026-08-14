CREATE USER 'store_manager'@'localhost'
IDENTIFIED BY 'password123';

GRANT SELECT, INSERT, UPDATE
ON task4.*
TO 'store_manager'@'localhost';

REVOKE UPDATE
ON task4.*
FROM 'store_manager'@'localhost';

GRANT DELETE
ON task4.SALES
TO 'store_manager'@'localhost';