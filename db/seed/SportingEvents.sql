-- 1.Drop table if exists
DECLARE
  table_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'SPORTINGEVENTS';
  
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE SportingEvents';
  END IF;
END;
/

-- 2. Create table with appropriate columns
CREATE TABLE SportingEvents (
  ID NUMBER,
  Title VARCHAR2(255),
  Sport VARCHAR2(50)
);

-- 3. Insert data
BEGIN
  INSERT INTO SportingEvents (ID, Title, Sport) 
    VALUES (1, 'NFL Football Game', 'NFL');
  
  INSERT INTO SportingEvents (ID, Title, Sport) 
    VALUES (2, 'NCAA Football Game', 'NCAA');
  
  INSERT INTO SportingEvents (ID, Title, Sport) 
    VALUES (3, 'MLB Game', 'MLB');
  
  INSERT INTO SportingEvents (ID, Title, Sport) 
    VALUES (4, 'NASCAR Event', 'NASCAR');
  
  INSERT INTO SportingEvents (ID, Title, Sport) 
    VALUES (5, 'INDY Racing League', 'IndyCar');
  
  COMMIT;
END;