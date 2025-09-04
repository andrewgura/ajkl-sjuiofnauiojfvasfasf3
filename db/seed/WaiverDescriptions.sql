-- 1. Drop table if exists
DECLARE
  table_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'WAIVERDESCRIPTIONS';
  
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE WaiverDescriptions';
  END IF;
END;
/

-- 2. Create table with appropriate columns
CREATE TABLE WaiverDescriptions (
  ID NUMBER,
  Type VARCHAR2(255),
  Abbreviation VARCHAR2(10),
  Sort_order NUMBER,
  Description CLOB,
  Footer CLOB,
  Load_By VARCHAR2(255),
  Load_Date DATE,
  Update_By VARCHAR2(255),
  Update_Date DATE,
  Inactive NUMBER(1) DEFAULT 0
);

-- 3. Insert data
BEGIN
  -- DASSP
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (4, 'DASSP', 'DAS', 0, 
    'For authorized participants in the DCA Access Standard Security Program (DASSP) only, to request a TSA Flight Authorization to access Ronald Reagan Washington National Airport',
    'detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, AND 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).',
    'System Administrator', TO_DATE('01/01/2011 00:00', 'MM/DD/YYYY HH24:MI'),
    'System Administrator', TO_DATE('05/14/2025 13:18', 'MM/DD/YYYY HH24:MI'), 0);
    
  -- DASSP One Way
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (12, 'DASSP One Way', 'DAO', 1, 
    'For authorized participants in the DCA Access Standard Security Program (DASSP) only, to request a TSA Flight Authorization to access Ronald Reagan Washington National Airport',
    'detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, AND 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).',
    'System Administrator', TO_DATE('05/14/2025 13:18', 'MM/DD/YYYY HH24:MI'),
    NULL, NULL, 0);
    
  -- Disney
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (5, 'Disney', 'DIS', 2, 
    'Request a waiver to access restricted airspace',
    'detailed in FDC NOTAM 4/3634 or 4/3635 pertaining to Walt Disney Theme Parks.',
    'System Administrator', TO_DATE('01/01/2011 00:00', 'MM/DD/YYYY HH24:MI'),
    NULL, NULL, 0);
    
  -- Domestic
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (1, 'Domestic', 'DOM', 3, 
    'Request a waiver to access the Washington DC Special Flight Rules Area (SFRA) Flight Restricted Zone (FRZ), including non-DASSP applications for access to Ronald Reagan Washington National Airport',
    'detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, AND 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).',
    'System Administrator', TO_DATE('01/01/2011 00:00', 'MM/DD/YYYY HH24:MI'),
    'Tony Ngo', NULL, 0);
    
  -- International
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (3, 'International', 'INT', 4, 
    'Request a waiver for access to Territorial United States airspace pursuant to the temporary flight restrictions',
    'detailed in FDC NOTAM 1/5060.',
    'System Administrator', TO_DATE('01/01/2011 00:00', 'MM/DD/YYYY HH24:MI'),
    'Tony Ngo', TO_DATE('12/06/2021 18:34', 'MM/DD/YYYY HH24:MI'), 0);
    
  -- Moored Balloon
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (7, 'Moored Balloon', 'BAL', 5, 
    'Request a waiver for moored balloons to access the Washington DC Special Flight Rules Area (SFRA) Flight Restricted Zone (FRZ)',
    'detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, AND 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).',
    'System Administrator', TO_DATE('02/25/2013 00:00', 'MM/DD/YYYY HH24:MI'),
    'Tony Ngo', NULL, 0);
    
  -- Special Event
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (6, 'Special Event', 'SPE', 6, 
    'Request a waiver to access restricted airspace over a short duration special event.',
    NULL,
    'System Administrator', TO_DATE('01/01/2011 00:00', 'MM/DD/YYYY HH24:MI'),
    NULL, NULL, 0);
    
  -- Sporting Event
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (2, 'Sporting Event', 'SPT', 7, 
    'Request a waiver to access restricted airspace over major sporting events',
    'detailed in FDC NOTAM 0/0367.',
    'System Administrator', TO_DATE('01/01/2011 00:00', 'MM/DD/YYYY HH24:MI'),
    NULL, NULL, 0);
    
  -- Unmanned Aircraft System
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (10, 'Unmanned Aircraft System', 'UAS', 8, 
    'Request a waiver for unmanned aircraft systems to access the Washington DC Special Flight Rules Area (SFRA) Flight Restricted Zone (FRZ)',
    'detailed in FDC NOTAM 4/2565 and PURSUANT TO 14 CODE OF FEDERAL REGULATIONS (CFR) SECTIONS 93.335, 93.337, 93.339, 93.341, 93.343, 93.345, AND 99.7, 49 UNITED STATES CODE (USC) SECTION 40103(B)(3).',
    'System Administrator', TO_DATE('09/13/2019 01:23', 'MM/DD/YYYY HH24:MI'),
    'Tony Ngo', NULL, 0);
    
  -- FAA
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (8, 'FAA', 'FAA', 9, 
    'The FAA, at its discretion, may grant waivers for flight activities inside restricted airspace not covered by one of the other categories listed above. For directions on how to access this waiver type, call the SOSC at (202) 267-8276, Monday through Friday, 0600-2100 local.',
    NULL,
    'System Administrator', TO_DATE('06/12/2014 00:00', 'MM/DD/YYYY HH24:MI'),
    NULL, NULL, 0);
    
  -- Prohibited Area
  INSERT INTO WaiverDescriptions (ID, Type, Abbreviation, Sort_order, Description, Footer, Load_By, Load_Date, Update_By, Update_Date, Inactive)
  VALUES (9, 'Prohibited Area', 'PAA', 10, 
    'Request a waiver to access Prohibited Area airspace throughout the National Airspace System. For directions on how to access this waiver type, call the SOSC at (202) 267-8276, Monday through Friday, 0600-2100 local.',
    NULL,
    'System Administrator', TO_DATE('06/12/2014 00:00', 'MM/DD/YYYY HH24:MI'),
    NULL, NULL, 0);
    
  COMMIT;
END;
/