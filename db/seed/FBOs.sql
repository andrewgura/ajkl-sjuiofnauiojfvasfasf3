-- 1. Drop table if exists
DECLARE
  table_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'FBOS';
  
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE FBOs';
  END IF;
END;
/

-- 2. Create table with appropriate columns
CREATE TABLE FBOs (
  ID NUMBER,
  ICAO VARCHAR2(10),
  Name VARCHAR2(255),
  Type VARCHAR2(255),
  Load_Date DATE,
  Load_By VARCHAR2(50),
  Inactive VARCHAR2(1),
  Inactive_Date DATE,
  Inactive_By VARCHAR2(50)
);

-- 3. Insert data and commit
BEGIN
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (238, 'KPHL', 'Philadelphia International Airport', 'The Lincoln National Life Insurance Company', TO_DATE('26-OCT-18', 'DD-MON-RR'), 'reginald.mccowan', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (219, 'KFLL', 'Fort Lauderdale International Airport', 'National Jet', TO_DATE('03-AUG-17', 'DD-MON-RR'), 'reginald.mccowan', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (248, 'KSTP', 'St. Paul Downtown Airport Holman', 'United Healthcare Services Inc', TO_DATE('17-OCT-19', 'DD-MON-RR'), 'reginald.mccowan', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (231, 'KANC', 'Ted Stevens International Airport ', 'ANC AK Holdings LLC dba Ross Aviation Anchorage', TO_DATE('08-JUN-18', 'DD-MON-RR'), 'reginald.mccowan', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (226, 'KLAS', 'McCarran International Airport', 'Wynn Resorts Limited/Las Vegas Jet ', TO_DATE('02-NOV-17', 'DD-MON-RR'), 'reginald.mccowan', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (139, 'KPVD', 'T. F. Green Airport ', 'Lynx FBO Providence, LLC', TO_DATE('13-SEP-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (140, 'KMSP', 'MN St. Paul International ', 'Xcel Energy ', TO_DATE('13-SEP-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (144, 'KOAK', 'Metropolitan Oakland International Airport ', 'Signature', TO_DATE('22-NOV-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (149, 'KDAL', 'Dallas Love', 'Hill Air Corporation', TO_DATE('23-JAN-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (151, 'KHIO', 'Portland-Hillsboro Airport', 'Global Aviation Inc.', TO_DATE('18-FEB-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (153, 'KSWF', 'Stewart International Airport', 'Atlantic Aviation', TO_DATE('27-FEB-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (154, 'KFMY', 'Page Field Airport', 'Lee County Port Authority', TO_DATE('19-MAR-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (155, 'KTTN', 'Trenton-Mercer Airport', 'Signature', TO_DATE('03-APR-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (158, 'KAFW', 'Fort Worth Alliance Airport', 'Hillwood Airways', TO_DATE('13-JUN-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (159, 'KTOL', 'Toledo Express Airport ', 'Owens Corning', TO_DATE('08-JUL-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (160, 'KIAH', 'Houston Bush International', 'Halliburton Energy Services', TO_DATE('22-JUL-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (163, 'KBJC', 'Rocky Mountain Metropolitan Airport', 'Ball Corporation', TO_DATE('14-NOV-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (164, 'KOMA', 'Eppley Airfield Airport', 'Truman Arnold Companies DBA TAC Air', TO_DATE('18-NOV-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (167, 'KADS', 'Addison Airport', 'RR Investments Inc.', TO_DATE('29-JAN-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (168, 'KMMU', 'Morristown Municipal Airport', 'Verizon Corp. Services Group Inc.', TO_DATE('06-FEB-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (170, 'KPBI', 'Palm Beach International Airport', 'Jet Aviation Associates LTD', TO_DATE('03-MAR-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (171, 'KSJC', 'Mineta San José International Airport', 'Atlantic Aviation ', TO_DATE('05-MAR-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (175, 'KOAK', 'Metropolitan Oakland International ', 'Kaiser Air', TO_DATE('08-APR-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (176, 'KCAK', 'Akron-Canton Airport', 'Avflight Akron Canton Corporation', TO_DATE('08-APR-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (136, 'KDET', 'Coleman A. Young Municipal Airport ', 'AvFlight Corporation', TO_DATE('03-SEP-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (138, 'KPSP', 'Palm Springs Municipal Airport', 'Palms Spring FBO, LLC dba Atlantic Aviation', TO_DATE('11-SEP-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (141, 'KBCT', 'Boca Raton Airport', 'Signature', TO_DATE('30-SEP-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (145, 'KSDF', 'Louisville International Airport', 'Humana Inc.', TO_DATE('02-DEC-13', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('15-SEP-15', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (150, 'KBFI', 'Boeing Field International ', 'Mente LLC', TO_DATE('27-JAN-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (157, 'KBDL', 'Bradley', 'Mass Mutual', TO_DATE('11-JUN-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (177, 'KFDK', 'Frederick Municipal Airport', 'Whirlwind Aviation Inc', TO_DATE('15-APR-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (137, 'KAUS', 'Austin-Bergstrom International Airport', 'Jet Aviation', TO_DATE('11-SEP-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (143, 'KOMA', 'Eppley Airfield Airport ', 'Signature', TO_DATE('22-NOV-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (146, 'KMSN', 'Dane County Airport', 'American Family Insurance', TO_DATE('06-DEC-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (148, 'KLAN', 'Capital Region International Airport', ' AvFlight Corporation', TO_DATE('18-DEC-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (152, 'KPDX', 'Portland International Airport', 'Atlantic Aviation', TO_DATE('20-FEB-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (162, 'KSRQ', 'Sarasota–Bradenton International Airport', 'Ross Rectrix SRQ, LLC dba Ross Aviation', TO_DATE('10-OCT-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (165, 'KELM', 'Elmira/Corning Regional Airport', 'Corning Aviation', TO_DATE('18-NOV-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (169, 'KTEB', 'Teterboro', 'American International Group, Inc.', TO_DATE('06-FEB-15', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('19-SEP-22', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (172, 'KBUF', 'Buffalo Niagara International Airport', 'Prior Aviation Services', TO_DATE('17-MAR-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (142, 'K4MD', 'Pier 7 Heliport', 'Baltimore Helicopter Services', TO_DATE('22-OCT-13', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (147, 'KMMU', 'Morristown Municipal Airport', 'Becton Dickinson  Co. ', TO_DATE('17-DEC-13', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('19-SEP-22', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (156, 'KCOS', 'Colorado Springs Municipal Airport', 'Cutter Aviation', TO_DATE('03-JUN-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (161, 'KPIT', 'Pittsburgh International Airport', 'MP Air', TO_DATE('12-SEP-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (166, 'KSUA', 'Witham Field Airport', 'Stuart Jet Center LLC', TO_DATE('19-NOV-14', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (179, 'KCLE', 'Cleveland Hopkins International Airport', 'Atlantic Aviation', TO_DATE('04-JUN-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (182, 'KPIT', 'Pittsburgh International Airport', 'MacQuarie Aviation North America 2 dba Atlantic Aviation', TO_DATE('14-JUL-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (186, 'KSTS', 'Charles M. Schulz–Sonoma County Airport', 'Kaiser Air, Inc.', TO_DATE('06-NOV-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (187, 'KGMW', 'Morgantown Municipal Airport-Walter L. Bill Hart Field', 'Morgantown Municipal Airport', TO_DATE('02-DEC-15', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (189, 'KFLL', 'Fort Lauderdale-Hollywood Int''l Airport', 'Signature', TO_DATE('14-JAN-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (193, 'KGAI', 'Montgomery County Airpark', 'Montgomery County Airpark LLC dba DC Metro Aviation Services', TO_DATE('25-MAR-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (194, 'KMDT', 'Harrisburg International Airport', 'The Hershey Company', TO_DATE('12-APR-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (195, 'KPHF', 'Newport News/Williamsburg International Airport', 'Mercury Air Center dba Atlantic Aviation', TO_DATE('13-MAY-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (200, 'KSTS', 'Charles M. Schulz–Sonoma County Airport', 'Sonoma Jet Center', TO_DATE('02-SEP-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (202, 'KDAL', 'Dallas Love', 'Signature Flight Support T3', TO_DATE('29-SEP-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (207, 'KTPA', 'Tampa International Airport', 'Signature Flight Services', TO_DATE('08-MAR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (209, 'KGEG', 'Spokane International Airport', 'Signature Flight Support', TO_DATE('17-MAR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (211, 'KLGB', 'Long Beach', 'Ross Aviation', TO_DATE('04-APR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (212, 'KSWF', 'Stewart International Airport ', 'Signature Flight Support', TO_DATE('07-APR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (213, 'KFWA', 'Fort Wayne International Airport ', 'Fort Wayne Aero Center', TO_DATE('07-APR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (215, 'KTRI', 'Tri-Cities Regional Airport', 'Eastman Chemical Company ', TO_DATE('15-JUN-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (217, 'KMQS', 'Chester County G O Carlson Airport', 'Signature Flight Support', TO_DATE('21-JUL-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (222, 'KMKE', 'General Mitchell International Airport', 'Rockwell Automation ', TO_DATE('24-AUG-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (224, 'KLAN', 'Capital Region International Airport', 'Jackson National ', TO_DATE('22-SEP-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (225, 'KBNA', 'Nashville International Airport', 'Hospital Corporation of America', TO_DATE('26-OCT-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (229, 'KSTP', 'St. Paul Downtown Airport Holman Field', 'US Bank', TO_DATE('16-MAR-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (230, 'KEFD', 'Ellington Field Airport', 'FlightAware LLC ', TO_DATE('07-MAY-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (232, 'KPSM', 'Portsmouth International Airport', 'Port City Air', TO_DATE('19-JUN-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (233, 'KHPN', 'Westchester', 'White Cloud Charter LLC ', TO_DATE('25-JUN-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (236, 'KSLC', 'Salt Lake City International Airport', 'Atlantic Aviation-Salt Lake City, LLC', TO_DATE('25-SEP-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (239, 'KFTW', 'Fort Worth Meacham', 'American Aero LLC dba Modern Aviation', TO_DATE('02-NOV-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (180, 'KEUG', 'Mahlon Sweet Field Airport', 'Atlantic Aviation ', TO_DATE('16-JUN-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (181, 'KRNO', 'Reno/Tahoe International Airport', 'Mercury Air Center-Reno, LLC dba Atlantic Aviation', TO_DATE('16-JUN-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (183, 'KGYY', 'Gary/Chicago International Airport', 'B. Coleman Aviation', TO_DATE('28-AUG-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (197, 'KOAK', 'Metropolitan Oakland International ', 'Chevron USA', TO_DATE('15-JUL-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (198, 'KBDL', 'Bradley', 'The Travelers Indemnity Company', TO_DATE('26-JUL-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (199, 'KMMU', 'Morristown Municipal Airport', 'Allergan USA', TO_DATE('09-AUG-16', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('28-OCT-20', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (205, 'KRIC', 'Richmond International', 'HeloAir, Inc.', TO_DATE('13-FEB-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (208, 'KBED', 'Bedford Hanscom', 'Rectrix Aerodrome Centers', TO_DATE('15-MAR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (214, 'KPTK', 'Oakland County International ', 'Corporate Eagle Management Services, Inc.', TO_DATE('13-APR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (218, 'KBFM', 'Mobile Downtown Airport', 'Signature Flight Support', TO_DATE('24-JUL-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (220, 'KSUS', ' Chesterfield Spirit', 'Monsanto', TO_DATE('14-AUG-17', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('03-JUN-20', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (234, 'KFRG', 'Republic Airport', 'Aviation Services', TO_DATE('19-JUL-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (235, 'KBHM', 'Birmingham-Shuttlesworth International Airport', 'Encompass Health Aviation, LLC', TO_DATE('19-SEP-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (178, 'KSTP', 'St. Paul Downtown Airport Holman Field', '3M Company', TO_DATE('19-MAY-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (184, 'KADS', 'Addison Airport', 'RNS Aircraft LLC', TO_DATE('15-SEP-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (185, 'KLIT', 'Bill and Hillary Clinton National Airport', 'Stephens, Inc.', TO_DATE('30-OCT-15', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('07-MAY-25', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (188, 'KTPA', 'Tampa International Airport', 'Black Diamond Aviation', TO_DATE('02-DEC-15', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (190, 'KYNG', 'Youngstown-Warren Regional Airport', 'Winner Aviation', TO_DATE('29-JAN-16', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (191, 'KCMH', 'Port Columbus International Airport', 'Nationwide Mutual Insurance Company ', TO_DATE('29-JAN-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (192, 'KILG', 'Wilmington Airport', 'Atlantic Aviation', TO_DATE('11-FEB-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (196, 'KROC', 'Greater Rochester International Airport', 'Avflight Rochester Corporation', TO_DATE('22-JUN-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (201, 'KIAH', 'Houston Bush International', 'Exxon Mobil Aviation', TO_DATE('20-SEP-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (203, 'KDTW', 'Detroit Metropolitan Airport', 'Signature', TO_DATE('19-DEC-16', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (204, 'KPIE', 'St. Pete–Clearwater International Airport ', 'Signature', TO_DATE('11-JAN-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (206, 'KMHT', 'Manchester-Boston Regional Airport', 'Port City Air', TO_DATE('08-MAR-17', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('19-JUN-18', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (210, 'KESN', 'Easton Airport', 'Flight Support Services, LLC dba Maryland Air', TO_DATE('17-MAR-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (216, 'KCLT', 'Charlotte/Douglas International Airport', 'Duke Energy', TO_DATE('21-JUL-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (221, 'KSJC', 'Mineta San José International Airport', 'Signature Flight Support ', TO_DATE('24-AUG-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (223, 'KROG', 'Rogers Executive Airport - Carter Field', 'Beaver Lake Aviation', TO_DATE('30-AUG-17', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (227, 'KTEB', 'Teterboro', 'Atlantic Aviation', TO_DATE('11-JAN-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (228, 'KLUK', 'Cincinnati Municipal Airport', 'Procter and Gamble', TO_DATE('01-MAR-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (237, 'KCMH', 'Port Columbus International Airport', 'American Electric Power Service Corporation', TO_DATE('17-OCT-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (240, 'KCHS', 'Charleston International Airport', 'Cerulean Aviation ', TO_DATE('13-NOV-18', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (242, 'KRSW', 'Southwest Florida International Airport', 'PrivateSky Aviation Services Inc.', TO_DATE('22-FEB-19', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('28-MAY-24', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (243, 'KIXD', 'New Century Aircenter Airport', 'Garmin International ', TO_DATE('01-MAR-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (244, 'KIND', 'Indianapolis International Airport', 'Eli Lilly and Company', TO_DATE('15-MAY-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (245, 'KFRG', 'Republic Airport', 'Northeastern Aviation Corp.', TO_DATE('31-MAY-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (247, 'KHPN', 'Westchester', 'Million Air-White Plains Aviation Partners', TO_DATE('26-AUG-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (250, 'KABQ', 'Albuquerque International Sunport', 'Cutter Aviation', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (251, 'KFAT', 'Fresno Yosemite International Airport', 'Signature', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (254, 'KGSP', 'Greenville–Spartanburg International Airport ', 'Cerulean Aviation', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (255, 'KMGW', 'Morgantown Municipal Airport', 'Morgantown Municipal Airport', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (259, 'KSTP', 'St. Paul Downtown Airport Holman Field', 'Midwest Aero Club DBA Best Jet International', TO_DATE('16-DEC-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (241, 'KATW', 'Appleton International Airport', 'Appleton International Airport dba Platinum Flight Center', TO_DATE('05-DEC-18', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (246, 'KMKE', 'General Mitchell International Airport', 'Harley Davidson', TO_DATE('24-JUL-19', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('15-AUG-24', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (249, 'KSDF', 'Louisville International Airport', 'Crew Aviation, LLC', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (252, 'KFLL', 'Fort Lauderdale-Hollywood Int''l Airport', 'Sheltair Aviation Services', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (253, 'KGRR', 'Gerald Ford International', 'Northern Jet Management', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (256, 'KSPI', 'Abraham Lincoln Capital Airport', 'Abraham Lincoln Capital Airport', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (257, 'KTUL', 'Tulsa International Airport', 'Williams Companies, Inc.', TO_DATE('04-NOV-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (258, 'KCMH', 'Port Columbus International Airport', 'Netjets Inc.', TO_DATE('05-NOV-19', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (260, 'KMKE', 'General Mitchell International Airport', 'Avflight Milwaukee Corporation', TO_DATE('24-JAN-20', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (261, 'KSBN', 'South Bend', 'Signature Flight', TO_DATE('20-APR-20', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (262, 'KRAC', 'Batten International Airport', 'SC Johnson  Son, Inc.', TO_DATE('02-JUN-20', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (263, 'KTUS', 'Tucson International Airport', 'Trajen Flight Support, LP dba Atlantic Aviation Tucson', TO_DATE('03-JUN-20', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (265, 'KPTK', 'Oakland County International', 'Act Two Inc.', TO_DATE('23-FEB-21', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (270, 'KGRR', 'Gerald Ford International', 'Meijer Distribution Inc.', TO_DATE('09-MAR-22', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (271, 'KHPN', 'Westchester', 'Blackrock', TO_DATE('21-MAR-22', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (272, 'KPBI', 'Palm Beach International Airport', 'Carrier Global Corporation ', TO_DATE('25-MAR-22', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (276, 'KCSG', 'Columbus Airport', 'Columbus Airport Commission dba Flightways Columbus', TO_DATE('08-MAR-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (277, 'KTTN', 'Trenton-Mercer Airport', 'Johnson  Johnson Aviation', TO_DATE('25-APR-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (278, 'KTTN', 'Trenton-Mercer Airport', 'Merck Aviation', TO_DATE('25-APR-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (283, 'KHYA', 'Cape Cod Gateway Airport', 'Ross Rectrix HYA, LLC (d/b/a Atlantic Aviation)', TO_DATE('13-MAR-24', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (284, 'KICT', 'Wichita Dwight D. Eisenhower National Airport', 'Textron Aviation', TO_DATE('13-MAR-24', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (288, 'KDAL', 'Dallas Love', 'Business Jet Services Ltd.', TO_DATE('30-APR-25', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('01-MAY-25', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (264, 'KTKI', 'McKinney National Airport', 'AirFlite Inc.', TO_DATE('24-NOV-20', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (266, 'KSNA', 'John Wayne Airport', 'ACI Jet', TO_DATE('12-MAY-21', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (267, 'KSGR', 'Sugar Land Regional Airport', 'MCBU Aircraft Operations', TO_DATE('23-JUL-21', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (268, 'KILG', 'Wilmington Airport', 'Corteva Agriscience ', TO_DATE('13-AUG-21', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (269, 'KTKI', 'McKinney National Airport', 'McKinney Air Center', TO_DATE('25-JAN-22', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (273, 'KORF', 'Norfolk International Airport', 'Signature', TO_DATE('02-MAY-22', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (274, 'KCLE', 'Cleveland Hopkins International Airport', 'Redwood Aviation Company ', TO_DATE('19-JAN-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (275, 'KTYS', 'McGhee Tyson Airport', 'Signature', TO_DATE('01-MAR-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (279, 'KTTN', 'Trenton-Mercer Airport', 'Pfizer, Inc', TO_DATE('25-APR-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (280, 'KDAL', 'Dallas Love', 'Hunt Consolidated, Inc.', TO_DATE('26-MAY-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (281, 'KPBI', 'Palm Beach International Airport', 'Atlantic Aviation', TO_DATE('03-NOV-23', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (282, 'KBED', 'Bedford Hanscom', 'Ross Rectrix HYA, LLC d/b/a Atlantic Aviation', TO_DATE('04-DEC-23', 'DD-MON-RR'), 'ada.johnson', 'Y', TO_DATE('06-MAR-25', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (285, 'KCLT', 'Charlotte/Douglas International Airport', 'Truist Bank', TO_DATE('07-JUN-24', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (286, 'KSJC', 'Mineta San José International Airport', 'Gilead Sciences, Inc.', TO_DATE('11-APR-25', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (287, 'KPIT', 'Pittsburgh International Airport', 'PNC Financial Services Group Inc.', TO_DATE('28-APR-25', 'DD-MON-RR'), 'ada.johnson', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (109, 'KRDU', 'Raleigh-Durham International ', 'Signature Flight Support', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (110, 'KRDU', 'Raleigh-Durham International ', 'Innovation Air LLC', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (111, 'KRDU', 'Raleigh-Durham International ', 'UNC Medical Air', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (112, 'KRIC', 'Richmond International ', 'Altria Client Services Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (113, 'KRIC', 'Richmond International ', 'Dominion Resources Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (114, 'KRIC', 'Richmond International ', 'Richmond Jet Center Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('18-NOV-22', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (115, 'KRST', 'Rochester Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (45, 'KHPN', 'Westchester', 'HPN NY Holdings, LLC dba Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (46, 'KHPN', 'Westchester', 'PepsiCo', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (47, 'KHPN', 'Westchester', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('12-MAY-15', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (48, 'KHPN', 'Westchester', 'Signature West', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (49, 'KHPN', 'Westchester', 'Executive Jet Management', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (50, 'KHPN', 'Westchester', 'JPMorgan Chase  Co.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (51, 'KHPN', 'Westchester', 'Citigroup', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (52, 'KHPN', 'Westchester', 'Intertaken Capital Aviation Services', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (53, 'KHPN', 'Westchester', 'IBM', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (54, 'KHSV', 'Huntsville International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (55, 'KHXD', 'Hilton Head Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (56, 'KHYA', 'Barnstable Airport', 'Barnstable Airport', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (57, 'KIAD', 'Dulles', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (58, 'KIAH', 'Houston Bush International', 'Phillips 66', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (59, 'KIAH', 'Houston Bush International', 'Anadarko Petroleum Corporation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (60, 'KIAH', 'Houston Bush International', 'Atlantic Aviation Services', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (61, 'KIAH', 'Houston Bush International', 'Conoco Phillips Co.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (62, 'KIAH', 'Houston Bush International', 'Apache Corporation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (63, 'KICT', 'Wichita Dwight D. Eisenhower National Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (64, 'KIND', 'Indianapolis International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (65, 'KISP', 'Long Island MacArthur Airport', 'Hawthorne Global Aviation Services', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (66, 'KISP', 'Long Island MacArthur Airport', 'Liberty Jet', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (67, 'KJAX', 'Jacksonville International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (68, 'KLAS', 'McCarran International Airport', 'Las Vegas Sands Corp.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (69, 'KLAS', 'McCarran International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (70, 'KLAX', 'Los Angeles Inernational', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (71, 'KLBE', 'Arnold Palmer Regional', 'L.J. Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (72, 'KLEX', 'Blue Grass Airport', 'TAC Air', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (73, 'KLGA', 'LaGuardia', 'Modern Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (74, 'KLGB', 'Long Beach', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (75, 'KLGB', 'Long Beach', 'AirFlite', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (76, 'KLUK', 'Cincinnati Municipal Airport', 'Executive Jet Management', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (77, 'KMBS', 'Saginaw', 'AvFlight Corporation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (78, 'KMBS', 'Saginaw', 'Dow Chemical', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (79, 'KMCI', 'Kansas City International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (80, 'KMCO', 'Orlando', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (81, 'KMCO', 'Orlando', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (82, 'KMDW', 'Chicago Midway', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (83, 'KMEM', 'Memphis International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (84, 'KMEM', 'Memphis International Airport', 'Wilson Air Center', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (85, 'KMHT', 'Manchester-Boston Regional Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (86, 'KMKE', 'General Mitchell International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (87, 'KMLB', 'Melbourne International Airport', 'L3Harris Technologies, Inc. ', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (88, 'KMMU', 'Morristown Municipal Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (89, 'KCLT', 'Charlotte/Douglas International Airport', 'Honeywell International', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (90, 'KMMU', 'Morristown Municipal Airport', '17 Airport Road LLC', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (91, 'KMSN', 'Dane County Airport', 'Wisconsin Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (92, 'KMSP', 'MN St. Paul International ', 'Target', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (93, 'KMSP', 'MN St. Paul International ', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (94, 'KMSP', 'MN St. Paul International ', 'General Mills', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (95, 'KMSP', 'MN St. Paul International ', 'Cargill Incorporated', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (96, 'KMSY', 'Louis Armstrong New Orleans International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (97, 'KOKC', 'Will Rogers World Airport', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (98, 'KORD', 'Chicago O''Hare', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (99, 'KPBI', 'Palm Beach International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (100, 'KPHL', 'Philadelphia International Airport', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (101, 'KPHX', 'Phoenix Sky Harbor International ', 'Cutter Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (102, 'KPIA', 'Peoria International Airport', 'Caterpillar Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (103, 'KPIT', 'Pittsburgh International Airport', 'US Steel', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (104, 'KPIT', 'Pittsburgh International Airport', 'Pittsburgh Int''l Airport', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (105, 'KPSP', 'Palm Springs Municipal Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (106, 'KPTK', 'Oakland County International ', 'Pentastar Aviation LLC', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (107, 'KPVD', 'T. F. Green Airport', 'CVS Caremark', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (108, 'KPVD', 'T. F. Green Airport', 'Textron Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (116, 'KSAT', 'San Antonio International Airport', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (117, 'KSAT', 'San Antonio International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (118, 'KSAV', 'Savannah/Hilton Head International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (119, 'KSBA', 'Santa Barbara Muni Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (120, 'KSBN', 'South Bend', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (121, 'KSDF', 'Louisville International Airport', 'Yum Brands Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (122, 'KSDF', 'Louisville International Airport', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (123, 'KSDL', 'Scottsdale Airport', 'Scottsdale Air Center', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('07-MAR-14', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (124, 'KSEA', 'Seattle Tacoma International Airport', 'Aircraft services', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('28-APR-14', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (125, 'KSFO', 'San Francisco International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (126, 'KSNA', 'John Wayne Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('16-MAY-17', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (127, 'KSNA', 'John Wayne Airport', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (128, 'KSTL', 'Lambert-St. Louis', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (129, 'KSTP', 'St. Paul Downtown Airport Holman Field', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (130, 'KSUS', 'Chesterfield Spirit', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (131, 'KTEB', 'Teterboro', 'Signature South', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (132, 'KTEB', 'Teterboro', 'Jet Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (133, 'KTEB', 'Teterboro', 'R.O.P. Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('19-SEP-22', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (134, 'KTEB', 'Teterboro', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (135, 'KTEB', 'Teterboro', 'Meridian-Teterboro', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('17-JUN-24', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (1, 'KANC', 'Ted Stevens International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (2, 'KAPA', 'Centennial Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (3, 'KAUS', 'Austin-Bergstrom International Airport', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (4, 'KAUS', 'Austin-Bergstrom International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (5, 'KBDL', 'Bradley', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (6, 'KBDL', 'Bradley', 'Cigna Corporation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (7, 'KBED', 'Bedford Hanscom', 'Jet Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (8, 'KBED', 'Bedford Hanscom', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (9, 'KBFI', 'Boeing Field International ', 'King County Int''l Airport', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (10, 'KBNA', 'Nashville International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (11, 'KBOS', 'Boston Logan', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (12, 'KBTV', 'Burlington International Airport', 'Heritage Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (13, 'KBUR', 'Bob Hope Airport', 'Million Air Burbank', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (14, 'KBWI', 'Thurgood Marshall Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (15, 'KBZN', 'Bozeman Yellowstone International ', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (16, 'KCLT', 'Charlotte/Douglas International Airport', 'Wilson Air', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (17, 'KCMH', 'Port Columbus International Airport', 'Lane Aviation Corp.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (18, 'KCRP', 'Corpus Christi International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (19, 'KDAL', 'Dallas Love', 'ATT Services, Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (20, 'KDAL', 'Dallas Love', 'Business Jet Center', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (21, 'KDAL', 'Dallas Love', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (22, 'KDAL', 'Dallas Love', 'JC Penney Corporation, Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (23, 'KDCA', 'Ronald Reagan Washington National Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (24, 'KDEC', 'Decatur Municiple Airport', 'Decatur Park District', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('02-FEB-24', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (25, 'KDEN', 'Denver International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (26, 'KDFW', 'Dalls Fort Worth International ', 'Caris Air Services', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (27, 'KDSM', 'Des Moines International Airport', 'Elliott Aviation Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-AUG-23', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (28, 'KDSM', 'Des Moines International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (29, 'KDVT', 'Phoenix Deer Valley Airport', 'Cutter Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (30, 'KELP', 'El Passo International Airport', 'Cutter Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (31, 'KEWR', 'Newark Liberty International Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (32, 'KFRG', 'Republic Airport', 'SheltAir Aviation Services', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (33, 'KFRG', 'Republic Airport', 'Republic Jet Center', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (34, 'KFTW', 'Fort Worth Meacham', 'UNC Medical Air', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (35, 'KFTW', 'Fort Worth Meacham', 'Texas Jet', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (36, 'KFTW', 'Fort Worth Meacham', 'Group Holdings Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (37, 'KFTW', 'Fort Worth Meacham', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'Y', TO_DATE('30-OCT-19', 'DD-MON-RR'), 'ada.johnson');
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (38, 'KGRR', 'Gerald Ford International ', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (39, 'KGRR', 'Gerald Ford International ', 'Bissell, Inc.', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (40, 'KGRR', 'Gerald Ford International ', 'Amway', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (41, 'KHNL', 'Honolulu Airport', 'Sky River Management', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (42, 'KHOU', 'William P. Hobby Airport', 'Signature', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (43, 'KHOU', 'William P. Hobby Airport', 'Wilson Air Center', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  INSERT INTO FBOs (ID, ICAO, Name, Type, Load_Date, Load_By, Inactive, Inactive_Date, Inactive_By) 
    VALUES (44, 'KHOU', 'William P. Hobby Airport', 'Atlantic Aviation', TO_DATE('28-AUG-13', 'DD-MON-RR'), 'Sys.Admin', 'N', NULL, NULL);
  
  COMMIT;
END;