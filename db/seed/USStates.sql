-- 1. Drop table if exists
DECLARE
  table_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'USSTATES';
  
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE USStates';
  END IF;
END;
/

-- 2. Create table with appropriate columns
CREATE TABLE USStates (
  ID NUMBER,
  State VARCHAR2(255),
  Abbreviation VARCHAR2(2)
);

-- 3. Insert data
BEGIN
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (1, 'Armed Forces Americas', 'AA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (2, 'Armed Forces Africa ', 'AE');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (3, 'Armed Forces Canada', 'AE');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (4, 'Armed Forces Europe', 'AE');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (5, 'Armed Forces Middle East', 'AE');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (6, 'ALASKA', 'AK');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (7, 'ALABAMA', 'AL');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (8, 'Armed Forces Pacific', 'AP');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (9, 'ARKANSAS', 'AR');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (10, 'AMERICAN SAMOA', 'AS');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (11, 'ARIZONA ', 'AZ');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (12, 'CALIFORNIA ', 'CA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (13, 'COLORADO ', 'CO');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (14, 'CONNECTICUT', 'CT');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (15, 'DISTRICT OF COLUMBIA', 'DC');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (16, 'DELAWARE', 'DE');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (17, 'FLORIDA', 'FL');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (18, 'FEDERATED STATES OF MICRONESIA', 'FM');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (19, 'GEORGIA', 'GA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (20, 'GUAM ', 'GU');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (21, 'HAWAII', 'HI');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (22, 'IOWA', 'IA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (23, 'IDAHO', 'ID');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (24, 'ILLINOIS', 'IL');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (25, 'INDIANA', 'IN');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (26, 'KANSAS', 'KS');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (27, 'KENTUCKY', 'KY');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (28, 'LOUISIANA', 'LA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (29, 'MASSACHUSETTS', 'MA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (30, 'MARYLAND', 'MD');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (31, 'MAINE', 'ME');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (32, 'MARSHALL ISLANDS', 'MH');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (33, 'MICHIGAN', 'MI');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (34, 'MINNESOTA', 'MN');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (35, 'MISSOURI', 'MO');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (36, 'NORTHERN MARIANA ISLANDS', 'MP');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (37, 'MISSISSIPPI', 'MS');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (38, 'MONTANA', 'MT');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (39, 'NORTH CAROLINA', 'NC');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (40, 'NORTH DAKOTA', 'ND');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (41, 'NEBRASKA', 'NE');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (42, 'NEW HAMPSHIRE', 'NH');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (43, 'NEW JERSEY', 'NJ');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (44, 'NEW MEXICO', 'NM');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (45, 'NEVADA', 'NV');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (46, 'NEW YORK', 'NY');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (47, 'OHIO', 'OH');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (48, 'OKLAHOMA', 'OK');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (49, 'OREGON', 'OR');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (50, 'PENNSYLVANIA', 'PA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (51, 'PUERTO RICO', 'PR');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (52, 'PALAU', 'PW');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (53, 'RHODE ISLAND', 'RI');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (54, 'SOUTH CAROLINA', 'SC');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (55, 'SOUTH DAKOTA', 'SD');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (56, 'TENNESSEE', 'TN');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (57, 'TEXAS', 'TX');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (58, 'UTAH', 'UT');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (59, 'VIRGINIA ', 'VA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (60, 'VIRGIN ISLANDS', 'VI');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (61, 'VERMONT', 'VT');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (62, 'WASHINGTON', 'WA');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (63, 'WISCONSIN', 'WI');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (64, 'WEST VIRGINIA', 'WV');
  INSERT INTO USStates (ID, State, Abbreviation) VALUES (65, 'WYOMING', 'WY');
  COMMIT;
END;