-- 1. Drop table if exists
DECLARE
  table_exists NUMBER;
BEGIN
  SELECT COUNT(*) INTO table_exists FROM user_tables WHERE table_name = 'SPORTVENUES';
  
  IF table_exists > 0 THEN
    EXECUTE IMMEDIATE 'DROP TABLE SportVenues';
  END IF;
END;
/

-- 2. Create table with appropriate columns
CREATE TABLE SportVenues (
  ID NUMBER,
  Venue VARCHAR2(255),
  City VARCHAR2(100),
  State VARCHAR2(20),
  Sport VARCHAR2(50),
  Team VARCHAR2(255),
  Auth_Contact_Last VARCHAR2(100),
  Auth_Contact_First VARCHAR2(100),
  Auth_Contact_Phone VARCHAR2(50),
  Auth_Contact_Email VARCHAR2(255)
);

-- 3. Insert data
BEGIN
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (1, 'Aggie Memorial Stadium', 'Las Cruces', 'NM', 'NCAA', 'New Mexico State', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (2, 'Aloha Stadium', 'Honolulu', 'HI', 'NCAA', 'Hawai''i', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (3, 'Brigham Field at Huskie Stadium', 'DeKalb', 'IL', 'NCAA', 'Northern Illinois', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (4, 'Cajun Field', 'Lafayette', 'LA', 'NCAA', 'Louisiana-Lafayette', 'DeMuzio', 'Sam', '585-857-4822', 'sam.demuzio@louisiana.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (5, 'California Memorial Stadium', 'Berkeley', 'CA', 'NCAA', 'California Golden Bears', 'Brisbon', 'George', '5107106173', 'gbrisbon@berkeley.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (6, 'Carrier Dome', 'Syracuse', 'NY', 'NCAA', 'Syracuse', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (7, 'Citi Field', 'New York', 'NY', 'MLB', 'MLB Mets', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (8, 'Edward Jones Dome', 'St. Louis', 'MO', 'NFL', 'St. Louis Rams', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (9, 'FAU Stadium', 'Boca Raton', 'FL', 'NCAA', 'Florida Atlantic', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (10, 'Northwest Stadium', 'Washington', 'DC', 'NFL', 'Commanders', 'Smith', 'Darius', '612-772-1963', 'Darius.Smith@commanders.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (11, 'DATCU Stadium', 'Denton', 'TX', 'NCAA', 'University of North Texas', 'Witty', 'Matthew', '940-369-8817', 'Matt.witty@unt.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (12, 'Heinz Field', 'Pittsburg', 'PA', 'NFL', 'Pittsburg Steelers', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (13, 'Joe Aillet Stadium', 'Ruston', 'LA', 'NCAA', 'Louisiana Tech', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (14, 'Jonah Field at War Memorial Stadium', 'Laramie', 'WY', 'NCAA', 'Wyoming', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (15, 'Kibbie Dome', 'Moscow', 'ID', 'NCAA', 'Idaho', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (16, 'LaVell Edwards Stadium', 'Provo', 'UT', 'NCAA', 'BYU', 'Hutchins', 'Tyson', '(435) 841 0663', 'tyson_hutchins@byu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (17, 'Lincoln Financial Field', 'Philadelphia', 'PA', 'NCAA', 'Temple', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (18, 'Lucas Oil Raceway', 'Indianapolis', 'IN', 'NASCAR', 'N/A', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (19, 'Mackay Stadium', 'Reno', 'NV', 'NCAA', 'Nevada', 'Ratliff', 'Asta', '775 682-8619', 'astar@unr.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (20, 'Mansfield Motor Speedway', 'Mansfield', 'OH', 'NASCAR', 'N/A', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (21, 'LoanDepot Park', 'Miami', 'FL', 'MLB', 'MLB Marlins', 'Favata', 'Anthony', '9548813623', 'afavata@marlins.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (22, 'Memorial Stadium - Indiana', 'Bloomington', 'IN', 'NCAA', 'Indiana', 'Mayo', 'Eric', '317-278-4263', 'emayo@iu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (23, 'Memphis International Speedway', 'Millington', 'TN', 'NASCAR', 'N/A', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (24, 'Caesars Superdome', 'New Orleans', 'LA', 'NFL', 'New Orleans Saints', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (25, 'American Family Field', 'Milwaukee', 'WI', 'MLB', 'MLB Milwaukee Brewers ', 'Ethier', 'Steve', '(414) 902-4429', 'steve.ethier@brewers.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (26, 'Nashville Superspeedway', 'Lebanon', 'TN', 'IndyCar', 'N/A', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (27, 'Nationals Park', 'Washington', 'DC', 'MLB', 'MLB Nationals', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (28, 'Notre Dame Stadium', 'South Bend', 'IN', 'NCAA', 'Notre Dame', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (29, 'NRG Stadium', 'Houston', 'TX', 'NFL', 'Houston Texans', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (30, 'Olympic Stadium', 'Montreal', 'QC', 'MLB', 'MLB Expos', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (31, 'Peden Stadium', 'Athens', 'OH', 'NCAA', 'Ohio', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (32, 'Raymond James Stadium', 'Tampa', 'FL', 'NFL', 'Tampa Bay Buccaneers', 'GLOYNE', 'MEG', '813-350-6544', ' mgloyne@TampaSportsAuthority.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (33, 'Riccardo Silva Stadium', 'Miami', 'FL', 'NCAA', 'Florida International', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (34, 'Rogers Centre', 'Toronto', 'ON', 'MLB', 'MLB Blue Jays', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (35, 'San Diego County Credit Union Stadium', 'San Diego', 'CA', 'NCAA', 'San Diego State', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (36, 'Tropicana Field', 'Tampa Bay', 'FL', 'MLB', 'MLB Devil Rays', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (37, 'Yager Stadium', 'Oxford', 'OH', 'NCAA', 'Miami University', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (38, 'Yankee Stadium', 'New York', 'NY', 'MLB', 'MLB Yankees', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (39, 'Acura Grand Prix', 'Long Beach', ' CA', 'IndyCar', 'N/A', 'Michaelian', 'Jim', '562-490-4522', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (40, 'Harvard Stadium', 'Chestnut Hill', 'MA', 'NCAA', 'Boston College', 'Wong', 'Darin', '310-489-2378', 'Dwong1@fas.harvard.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (41, 'Amon G. Carter Stadium', 'Fort Worth', 'TX', 'NCAA', 'TCU', 'Payton', 'Quintin', '817-257-6108', 'quintin.payton@tcu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (42, 'Amon G. Carter Stadium', 'Fort Worth', 'TX', 'NCAA', 'TCU', 'Austin', 'Julie', '817-257-6658', 'julie.austin@tcu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (43, 'Amon G. Carter Stadium', 'Fort Worth', 'TX', 'NCAA', 'TCU', 'Rutledge', 'Rory', '817-257-4786', 'r.rutledge@tcu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (44, 'Amon G. Carter Stadium', 'Fort Worth', 'TX', 'NCAA', 'TCU', 'Brooke', 'Robinson', '817-343-1493', 'b.a.robinson@tcu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (45, 'Angel Stadium', 'Anaheim', 'CA', 'MLB', 'MLB Angels', 'KUHL', 'DENNIS', '714-940-2009', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (46, 'Arizona Stadium', 'Tucson', 'AZ', 'NCAA', 'Arizona', 'BROWN', 'MATT', '520-621-6706', 'lmbrown@arizona.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (47, 'Arrowhead Stadium', 'Kansas City', 'MO', 'NFL', 'Kansas City Chiefs', 'Alberino', 'Robert', '408-857-3725', 'roba@chiefs.nfl.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (48, 'AT&T Stadium', 'Arlington', 'TX', 'NFL', 'Dallas Cowboys', 'COOK', 'GARY', '817-991-0998', 'gcook@dallascowboys.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (49, 'Atlanta Motor Speedway', 'Hampton', 'GA', 'NASCAR', 'N/A', 'BIXBY', 'DUSTIN ', '770-946-3917', 'dustinb@atlantamotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (50, 'Auto Club Speedway', 'Fontana', 'CA', 'NASCAR', 'N/A', 'CORNETT', 'CHRIS', '623-463-5602', 'CCORNETT@NASCAR.COM');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (51, 'Autzen Stadium', 'Eugene', 'OR', 'NCAA', 'Oregon', 'BLOOD', 'WILLIAM', '541-346-4481', 'wblood@uoregon.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (52, 'Bank of America Stadium', 'Charlotte', 'NC', 'NFL', 'Carolina Panthers', 'VARGAS', 'MIGUEL', '201-961-3230', 'Miguel.vargas@panthers.nfl.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (53, 'Bank of America Stadium', 'Charlotte', 'NC', 'NFL', 'Carolina Panthers', 'LEVIN', 'EDDIE', '704-533-2502', 'eddie.levins@teppersportsentertainment.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (54, 'Barber Motorsports Park', 'Birmingham', 'AL', 'IndyCar', 'N/A', 'FORBES', 'RUTHIE', '205-699-7275', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (55, 'Beaver Stadium', 'University Park', 'PA', 'NCAA', 'Penn State', 'NACHTMAN', 'JIM', '814-865-7897', 'jtn3@psu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (56, 'Ben Hill Griffin Stadium', 'Gainesville', 'FL', 'NCAA', 'Florida', 'KNOWLES', 'BART', '352- 392-1560', 'bartknowles@ufl.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (57, 'Ben Hill Griffin Stadium', 'Gainesville', 'FL', 'NCAA', 'Florida', 'Howard', 'Chip', '352-375-4683', 'chiph@gators.ufl.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (58, 'Bill Snyder Family Football Stadium', 'Manhattan', 'KS', 'NCAA', 'Kansas State', 'SMOLLER', 'JONI', '785-532-5769', 'jsmoller@kstatesports.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (59, 'Bill Snyder Family Football Stadium', 'Manhattan', 'KS', 'NCAA', 'Kansas State', 'MULLER', 'JIM', '785-532-7602', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (60, 'Bill Snyder Family Football Stadium', 'Manhattan', 'KS', 'NCAA', 'Kansas State', 'Eakin', 'Brett', '785-532-5379', 'beakin@kstatesports.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (61, 'Bobby Bowden Field at Doak Campbell Stadium', 'Tallahassee', 'FL', 'NCAA', 'Florida State', 'MORRIS', ' CHARLES', '850-544-1752', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (62, 'Bobby Bowden Field at Doak Campbell Stadium', 'Tallahassee', 'FL', 'NCAA', 'Florida State', 'BRODER', 'JARRETT', '850-644-9961', 'jbroder@em.fsu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (63, 'Bobby Dodd Stadium at Historic Grant Field', 'Atlanta', 'GA', 'NCAA', 'Georgia Tech', 'Rountree', 'Mark', '404-894-4400', 'mrountree@athletics.gatech.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (64, 'Boone Pickens Stadium', 'Stillwater', 'OK', 'NCAA', 'Oklahoma State', 'Chandler', 'Colt', '4055704649', 'colt.chandler@okstate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (65, 'Bristol Motor Speedway', 'Bristol', 'TN', 'NASCAR', 'N/A', 'CALDWELL', 'JERRY', '423-989-6933', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (66, 'Albertsons Stadium', 'Boise', 'ID', 'NCAA', 'Boise State', 'Walsh', 'Michael', '208-921-7396 ', 'michaelwalsh1@boisestate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (67, 'Bryant-Denny Stadium', 'Tuscaloosa', 'AL', 'NCAA', 'Alabama', 'Fajack', 'Matthew', '205-348-4530', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (68, 'Valley Children''s Stadium', 'Fresno', 'CA', 'NCAA', 'Fresno State', 'PUCHER', 'FRANK', '559-278-8006', 'fpucher@csufresno.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (69, 'Busch Stadium', 'Saint Louis', 'MO', 'MLB', 'MLB Cardinals', 'WATERMON', 'RON', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (70, 'Camden Yards', 'Baltimore', 'MD', 'MLB', 'MLB Orioles', 'Scott', 'Troy', '410-547-6157', ' tscott@orioles.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (71, 'Camp Randall Stadium', 'Madison', 'WI', 'NCAA', 'Wisconsin', 'MCINTOSH', 'CHRISTOPHER', '608-265-0769', 'cpm@athletics.wisc.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (72, 'Camp Randall Stadium', 'Madison', 'WI', 'NCAA', 'Wisconsin', 'King', 'Jason', '608-262-7974', 'jwk@athletics.wisc.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (73, 'Canvas  Stadium', 'Fort Collins', 'CO', 'NCAA', 'Colorado State', 'PAQUETTE', 'MARK', '970-491-7414', 'mark.paquette@colostate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (74, 'SECU Stadium', 'College Park', 'MD', 'NCAA', 'Maryland', 'LOOBY', 'JORDAN', '301-314-7162', 'jlooby@umd.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (75, 'L&N Federal Credit Union Stadium', 'Louisville', 'KY', 'NCAA', 'Louisville', 'HEIRD', 'JOSH', '502-303-3049', 'Josh.heird@louisville.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (76, 'Carter-Finley Stadium', 'Raleigh', 'NC', 'NCAA', 'NC State', 'Evan', 'Arnold', '704-778-2894', 'eparnold@ncsu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (77, 'Carter-Finley Stadium', 'Raleigh', 'NC', 'NCAA', 'NC State', 'Orders', 'Amy', '919-795-1129', 'aborders@ncsu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (78, 'Centennial Bank Stadium', 'Jonesboro', 'AR', 'NCAA', 'Arkansas State', 'Munoz', 'Sarah', '479-445-5891', 'smunoz@astate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (79, 'Centennial Bank Stadium', 'Jonesboro', 'AR', 'NCAA', 'Arkansas State', 'BOWEN', 'Tom', '870-972-3983', 'tombowen@astate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (80, 'Charlotte Motor Speedway', 'Charlotte', 'NC', 'NASCAR', 'N/A', 'CREMER', 'DOUG', '704-455-3200', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (81, 'Chase Field', 'Phoenix', 'AZ', 'MLB', 'MLB Diamondbacks', 'Rock', 'Mike', '602-489-4445', 'mrock@dbacks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (82, 'Chicagoland Speedway', 'Joliet', 'IL', 'IndyCar', 'N/A', 'GREETHAM', 'TERRY', '815-722-5500', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (83, 'Chicagoland Speedway', 'Joliet', 'IL', 'NASCAR', 'CMS Productions', 'WENZ', 'JAMES', '704-264-4501', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (84, 'Chicagoland Speedway', 'Joliet', 'IL', 'NASCAR', 'N/A', 'GREETHAM', 'TERRY', '815-722-5500', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (85, 'Circuit of Americas', 'Austin', 'TX', 'IndyCar', 'N/A', 'Hammond', 'Bryan', '704-400-0099', 'bhammond@speedwaymotorsports.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (86, 'Circuit of Americas', 'Austin', 'TX', 'NASCAR', 'N/A', 'HOLLEY', 'REGAN', '512-655-6325', 'Regan.holley@thecircuit.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (87, 'Citizens Bank Park', 'Philadelphia', 'PA', 'MLB', 'MLB Phillies', 'Hartsell', 'Sarah', '215-237-0516', 'shartsell@phillis.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (88, 'Comerica Park', 'Detroit', 'MI', 'MLB', 'MLB Tigers', 'HARTNETT', 'MICHAEL', '313-471-7438 (DESK) 914-299-3401 (CELL)', 'Mike.Hartnett@olyent.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (89, 'Coors Field', 'Denver', 'CO', 'MLB', 'MLB Rockies', 'KHAN', 'KEVIN', '303-292-0200', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (90, 'Darlington Raceway', 'Darlington', 'SC', 'NASCAR', 'N/A', 'Harris', 'Joshua', '843-395-8803', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (91, 'Darrell K. Royal-Texas Memorial Stadium', 'Austin', 'TX', 'NCAA', 'Texas', 'DEL CONTE', 'CHRIS', '512-471-5757', 'AD@athletics.utexas.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (92, 'David Booth Kansas Memorial Stadium', 'Lawrence', 'KS', 'NCAA', 'Kansas', 'Girod', 'Douglas', '785-864-3133', 'kuchancellor@ku.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (93, 'Davis Wade Stadium', 'Starkville', 'MS', 'NCAA', 'Mississippi State', 'McAnally ', 'Spencer', '662-325-8040', 'SMcanally@athletics.msstate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (94, 'Daytona International Speedway', 'Daytona Beach', 'FL', 'NASCAR', 'N/A', 'BELGRADE', 'SEAN', '386-681-6746', 'sbelgrade@nascar.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (95, 'Daytona International Speedway', 'Daytona Beach', 'FL', 'NASCAR', 'N/A', 'Harris', 'Josh', '386-681-6060', 'jharris@daytonainternationalspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (96, 'Dix Stadium', 'Kent', 'OH', 'NCAA', 'Kent State', 'NIELSON', 'JOEL', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (97, 'Dodger Stadium', 'Los Angeles', 'CA', 'MLB', 'MLB Dodgers', 'BRAVERMAN', 'ERIK', '323-224-1548', 'erikb@ladodgers.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (98, 'Dodger Stadium', 'Los Angeles', 'CA', 'MLB', 'MLB Dodgers', 'CROWLEY', 'JOE', '347-820-0978', 'jcrowley@ladodgers.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (99, 'Donald W. Reynolds Razorback Stadium', 'Arkansas ', 'AR', 'NCAA', 'Arkansas', 'HAM', 'Richard', '479-657-3466', 'richardh@uark.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (100, 'Dover International Speedway', 'Dover', 'DE', 'NASCAR', 'N/A', 'HARDY', 'LEEANN', '302-883-6510', ' lhardy@dovermotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (101, 'Dowdy-Ficklen Stadium', 'Greenville', 'NC', 'NCAA', 'East Carolina', 'Gray', 'Malcolm', '252.737.4523', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (102, 'Doyt Perry Stadium', 'Bowling Green', 'OH', 'NCAA', 'Bowling Green', 'MOOSBRUGGER', 'BOB', '419-372-2401', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (103, 'Empower Field', 'Denver', 'CO', 'NFL', 'Denver Broncos', 'Coates', 'Liz', '303-905-5298', 'Liz.coates@broncos.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (104, 'Empower Field', 'Denver', 'CO', 'NFL', 'Denver Broncos', 'Agado', 'Michael', '720.258.3516', 'Michael.Agado@broncos.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (105, 'Falcon Stadium', 'Colorado Springs', 'CO', 'NCAA', 'Air Force', 'SOUZER', 'JESS', '719-333-6273', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (106, 'Faurot Field at Memorial Stadium', 'Columbia', 'MO', 'NCAA', 'Missouri Tigers', 'Schroeder', 'Michael', '573-884-7297', 'mschroeder@missouri.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (107, 'Faurot Field at Memorial Stadium', 'Columbia', 'MO', 'NCAA', 'Missouri Tigers', 'Elmore', 'Dennis', '573-882-7018; 573-445-0550 cell', 'elmored@missouri.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (108, 'Fenway Park', 'Boston', 'MA', 'MLB', 'MLB Red Sox', 'FRIEDMAN', 'DAVID', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (109, 'Cleveland Browns Stadium', 'Cleveland', 'OH', 'NFL', 'Cleveland Browns', 'Jufko', 'Omar', '216.215.3567', 'ojufko@clevelandbrowns.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (110, 'Folsom Field', 'Boulder', 'CO', 'NCAA', 'University of Colorado', 'HESSELIUS', 'DANIEL', '901-417-3808', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (111, 'Folsom Field', 'Boulder', 'CO', 'NCAA', 'University of Colorado', 'KHANNA', 'PREMA', '303-492-5343', 'prema.khanna@colorado.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (112, 'Ford Field', 'Detroit', 'MI', 'NFL', 'Detroit Lions', 'ARGUST', 'TODD', '313-262-2221', 'todd.argust@lion.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (113, 'Gateway International Raceway', 'Madison', 'IL', 'NASCAR', 'N/A', 'BLAIR', 'CHRIS', '618-215-8888', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (114, 'Gaylord Family Oklahoma Memorial Stadium', 'Norman', 'OK', 'NCAA', 'Oklahoma Sooners', 'Fournier', 'Caitlin', '850-607-3090', 'cfournier@ou.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (115, 'Gerald J. Ford Stadium', 'University Park', 'TX', 'NCAA', 'Southern Methodist University', 'CHEVES', 'BRAD', '214-768-2667', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (116, 'Gillette Stadium', 'Foxboro', 'MA', 'NFL', 'New England Patriot', 'CHRISTIANSEN', 'BILL', '508-543-0350', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (117, 'Gillette Stadium', 'Foxboro', 'MA', 'NFL', 'New England Patriot', 'PIEKARSKI', 'MATTHEW', '508-549-0507', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (118, 'Glass Bowl', 'Toledo', 'OH', 'NCAA', 'Toledo', 'BORGHETTI', 'E. J.', '412-648-8200', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (119, 'Global Life Field', 'Arlington', 'TX', 'MLB', 'MLB Rangers', 'MILLER', 'BLAKE', '817-273-5222', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (120, 'Great American Ball Park', 'Cincinnati', 'OH', 'MLB', 'MLB Reds', 'BONKOWSKI', 'ZACH', '513-765-7037', ' zbonkowski@reds.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (121, 'Guaranteed Rate Field', 'Chicago', 'IL', 'MLB', 'MLB White Sox', 'GOMEZ', 'MICHAEL', '312-674-5434', 'mgomez@chisox.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (122, 'Guaranteed Rate Field', 'Chicago', 'IL', 'MLB', 'MLB White Sox', 'Vasquez', 'Jonathan', '312-720-5640', 'jvasquez@chisox.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (123, 'Hard Rock Stadium', 'Miami', 'FL', 'NFL', 'Miami Dolphins', 'CICINI', 'JOE', '305-943-8000', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (124, 'Acrisure Stadium', 'Pittsburgh', 'PA', 'NCAA', 'Pittsburgh', 'Barto', 'Paul', '412-849-9468', 'pbarto@athletics.pitt.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (125, 'Highmark Stadium', 'Orchard Park', 'NY', 'NFL', 'Buffalo Bills', 'CLARK ', 'CHRISTOPHER', '716-312-8911', 'chris.clark@bills.nft.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (126, 'Homestead-Miami Speedway', 'Homestead', 'FL', 'IndyCar', 'N/A', 'Santa Cruz', 'Guillermo', '305-230-5118', 'gsantacruz@homesteadmiamispeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (127, 'Homestead-Miami Speedway', 'Homestead', 'FL', 'NASCAR', 'N/A', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (128, 'Homestead-Miami Speedway', 'Homestead', 'FL', 'NASCAR', 'N/A', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (129, 'Husky Stadium', 'Seattle', 'WA', 'NCAA', 'Washington', 'ERICKSON', 'DAN', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (130, 'Indianapolis Motor Speedway', 'Indianapolis', 'IN', 'IndyCar', 'N/A', 'BOLES', 'J. DOUGLAS', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (131, 'Indianapolis Motor Speedway', 'Indianapolis', 'IN', 'NASCAR', 'N/A', 'BOLES', 'J. DOUGLAS', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (132, 'Infineon Raceway', 'Sonoma', 'CA', 'IndyCar', 'N/A', 'LAMB', 'MELISSA', '707-933-3925', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (133, 'Iowa Speedway', 'Newton', 'IA', 'IndyCar/Nascar', 'N/A', 'Warren', 'Patrick', '913-526-9101', ' pwarren@nascar.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (134, 'ISM Raceway', 'Avondale', 'AZ', 'NASCAR', 'N/A', 'MAGGS', 'KRISTIE', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (135, 'Joan C. Edwards Stadium', 'Huntington', 'WV', 'NCAA', 'Marshall', 'GOEBBEL', 'AARON', '304-696-4375', 'goebbel@marshall.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (136, 'Johnny Red Floyd Stadium', 'Murfreesboro', 'TN', 'NCAA', 'Middle Tennessee', 'OWENS', 'Mark', '615-898-5057', 'owens@goblueraiders.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (137, 'Jones AT&T Stadium', 'Lubbock', 'TX', 'NCAA', 'Texas Tech', 'Giovannetti', 'Robert', '806-834-7842', 'Robert.giovannetti@ttu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (138, 'Jordan-Hare Stadium', 'Auburn', 'AL', 'NCAA', 'Auburn', 'STEELE', 'JEFF', '334-750-3127', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (139, 'Jordan-Hare Stadium', 'Auburn', 'AL', 'NCAA', 'Auburn', 'Thompson', 'Anna', '970.776.0055', 'gueriak@auburn.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (140, 'Jordan-Hare Stadium', 'Auburn', 'AL', 'NCAA', 'Auburn', 'Thompson', 'Earle', '334.596.3964', 'Earle.thompson@auburn.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (141, 'Kansas Speedway', 'Kansas City', 'KS', 'IndyCar', 'N/A', 'WARREN', 'PATRICK', '913-328-3300', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (142, 'Kansas Speedway', 'Kansas City', 'KS', 'NASCAR', 'N/A', 'WARREN', 'PATRICK', '913-328-3300', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (143, 'Kauffman Stadium', 'Kansas City', 'MO', 'MLB', 'MLB Royals', 'AVERSO', 'NICOLE', '816-504-4436', 'nicole.averso@royals.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (144, 'Kelly/Shorts Stadium', 'Mount Pleasant', 'MI', 'NCAA', 'Central Michigan', 'CAMPBELL', 'KEVIN', '989-774-1655', 'CAMPB1KM@CMICH.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (145, 'Kenan Stadium', 'Chapel Hill', 'NC', 'NCAA', 'North Carolina', 'SHARPE', 'JEREMY', '919-962-9135', 'Jsharpe7.unc.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (146, 'Kentucky Speedway', 'Sparta', 'KY', 'IndyCar', 'N/A', 'SIMENDINGER', 'MARK', '859-567-3400', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (147, 'Kentucky Speedway', 'Sparta', 'KY', 'NASCAR', 'N/A', 'SIMENDINGER', 'MARK', '859-567-3400', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (148, 'Kidd Brewer Stadium', 'Boone', 'NC', 'NCAA', 'Appalachian State University', 'Bridges', 'Spencer', '828-262-6554', 'bridgessj1@appstate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (149, 'Kidd Brewer Stadium', 'Boone', 'NC', 'NCAA', 'Appalachian State University', 'Jones', 'Joey', '828-262-2845', 'Jonesj7@appstate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (150, 'Kinnick Stadium', 'Iowa City', 'IA', 'NCAA', 'University of Iowa Hawkeyes', 'Visin ', 'David', '319 335 5022', 'dave-visin@uiowa.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (151, 'Kinnick Stadium', 'Iowa City', 'IA', 'NCAA', 'University of Iowa Hawkeyes', 'Bullock', 'Mark', '319 335 5022 ', 'Mark-bullock@uiowa.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (152, 'Kinnick Stadium', 'Iowa City', 'IA', 'NCAA', 'University of Iowa Hawkeyes', 'Wiederholt', 'Lucy', '319 335 5022 ', 'Lucy-wiederholt@uiowa.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (153, 'Kroger Field', 'Lexington', 'KY', 'NCAA', 'Kentucky', 'SCHWAKE', 'NATHAN', '859-509-4214', 'nschwake@uky.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (154, 'Kyle Field', 'College Station', 'TX', 'NCAA', 'Texas A&M', 'HURLEY', 'Kevin', '979-862-2575', 'khurley@athletics.tamu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (155, 'Lambeau Field', 'Green Bay', 'WI', 'NFL', 'Green Bay Packers', 'POLICY', 'EDWARD', '920-569-7314', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (156, 'Lane Stadium', 'Blacksburg', 'VA', 'NCAA', 'Virginia Tech', 'Marinik', 'Andrew', '540-449-9252', 'amarinik@vt.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (157, 'Lane Stadium', 'Blacksburg', 'VA', 'NCAA', 'Virginia Tech', 'Gavagan', 'Robert', '540-231-2515', 'gavb85@vt.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (158, 'Las Vegas Motor Speedway', 'Las Vegas', 'NV', 'NASCAR', 'N/A', 'STETZER', 'DAVID', '702-210-2941', ' dstetzer@lvms.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (159, 'Legion Field', 'Birmingham', 'AL', 'NCAA', 'University of Alabama Birmingham', 'KRAEBBER', 'ERIN', '205-934-1239', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (160, 'Levi''s Stadium', 'San Francisco', 'CA', 'NFL', 'San Francisco 49ers', 'Vaux', 'Jeremy', '(702)622-2639', 'jeremy.vaux@49ers-smc.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (161, 'Levi''s Stadium', 'San Francisco', 'CA', 'NFL', 'San Francisco 49ers', 'JOHNSON', 'LAURA', '408.673.2032', 'Laura.Johnson@49ers.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (162, 'Levi''s Stadium', 'San Francisco', 'CA', 'NFL', 'San Francisco 49ers', 'Hughes', 'Francine', '(669)249-0721', 'francine.hughes@49ers-smc.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (163, 'Simmons Bank Liberty Stadium', 'Memphis', 'TN', 'NCAA', 'University of Memphis', 'CARRIER', 'THOMAS', '901-277-5096', 'Thomas.Carrier@oakviewgroup.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (164, 'Lincoln Financial Field', 'Philadelphia', 'PA', 'NFL', 'Philadelphia Eagles', 'KOZUL', 'DENISE', '215-463-2500', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (165, 'Los Angeles Memorial Coliseum', 'Los Angeles', 'CA', 'NCAA', 'USC', 'Giel', 'Alissa', '323-401-2237', 'giel@usc.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (166, 'Lowe''s Motor Speedway', 'Concord', 'NC', 'NASCAR', 'N/A', 'MOTT', 'DAN ', '704-453-6867', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (167, 'Lucas Oil Stadium', 'Inidianapolis', 'IN', 'NFL', 'Indianapolis Colts', 'WARD', 'PETE', '317-710-2154', 'pete.ward@colts.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (168, 'hold-lumen field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'GOINES', 'ED', '425-203-8001', 'edg@seahawks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (169, 'M&T Bank Stadium', 'Baltimore', 'MD', 'NFL', 'Baltimore Ravens', 'Downs', 'Brad', '410-701-4115', 'Brad.downs@ravens.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (170, 'Malone Stadium', 'Monroe', 'LA', 'NCAA', 'Louisiana-Monroe', 'FLOYD', 'NICK', '318-342-5360', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (171, 'Martin Stadium', 'Pullman', 'WA', 'NCAA', 'Washington State', 'STEVENS', 'BILL', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (172, 'Martinsville Speedway', 'Martinsville', 'VA', 'NASCAR', 'N/A', 'CAMPBELL', 'W. CLAY', '276-956-7227', 'ccampbell@martinsvillespeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (173, 'McAfee Coliseum', 'Oakland', 'CA', 'NFL', 'Oakland Raiders', 'CHANDLER', 'LAUREN', '510-780-3018', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (174, 'McLane Stadium ', 'Waco', 'TX', 'NCAA', 'Baylor', 'KLEMPNAUER', 'CHAD', '254-710-1234', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (175, 'Memorial Stadium - Clemson', 'Clemson', 'SC', 'NCAA', 'Clemson', 'MONEY', 'MIKE', '864-656-2978', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (176, 'Memorial Stadium - Illinois', 'Champaign', 'IL', 'NCAA', 'Illinois Fighting Illini', 'Acton', 'Zach', '217-841-0052', 'zacton@illinois.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (177, 'Memorial Stadium - Nebraska', 'Lincoln', 'NE', 'NCAA', 'Nebraska', 'DAVIDSON', 'MATT', '402-472-1060', 'mdavidson@huskers.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (178, 'Mercedes-Benz Stadium', 'Atlanta', 'GA', 'NFL', 'Atlanta Falcons', 'MCDONOUGH', 'ROBERT', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (179, 'Metlife Stadium', 'East Rutherford', 'NJ', 'NFL', 'New York Giants', 'FRATTURA', 'KEVIN', '201-939-5330', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (180, 'Metlife Stadium', 'East Rutherford', 'NJ', 'NFL', 'New York Jets', 'Stefanacci', 'Chris', '201-460-4172', 'cstefanacci@njsea.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (181, 'Miami Orange Bowl', 'Miami', 'FL', 'NCAA', 'Miami', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (182, 'Michie Stadium', 'West Point', 'NY', 'NCAA', 'Army', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (183, 'Michigan International Speedway', 'Brooklyn', 'MI', 'NASCAR', 'N/A', 'Fowler', 'Joe', '517-592-1199', 'jfowler@nascar.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (184, 'Michigan Stadium', 'Ann Arbor', 'MI', 'NCAA', 'Michigan', 'Stocker', 'Jacob', '734-764-7091', 'jbstocke@umich.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (185, 'Mid-Ohio Sports Car Course', 'Lexington', 'OH', 'IndyCar', 'N/A', 'SAVOREE', 'D. KEVIN', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (186, 'Daikin Park', 'Houston', 'TX', 'MLB', 'MLB Astros', 'Braithwaite', 'Marcel', '713-259-8832', 'mbraithwaite@astros.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (187, 'Mountaineer Field at Milan Puskar Stadium', 'Morgantown', 'WV', 'NCAA', 'West Virginia', 'SWAN', 'JOE', '304-293-2821', 'joe.swan@mail.wvu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (188, 'Movie Gallery Stadium', 'Troy', 'AL', 'NCAA', 'Troy', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (189, 'Nashville Superspeedway', 'Lebanon', 'TN', 'NASCAR', 'N/A', 'Greci', 'Matt', '615-994-4416', 'mgreci@nashvillesuperspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (190, 'Navy-Marine Corps Memorial Stadium', 'Annapolis', 'MD', 'NCAA', 'Navy', 'MORGENTHALER', 'KRIS', '410-293-8739', 'whitacre@usna.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (191, 'New Hampshire Motor Speedway', 'Loudon', 'NH', 'NASCAR', 'N/A', 'MCGRATH', 'DAVID', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (192, 'Neyland Stadium', 'Knoxville', 'TN', 'NCAA', 'Tennessee', 'Delaney', 'Jimmy', '865-974-5888', 'jdelaney@tennessee.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (193, 'Nippert Stadium', 'Cincinnati', 'OH', 'NCAA', 'Cincinnati', 'THIEL GILLILAND', 'SABRINA', '513-556-1052', 'GILLILST@UC.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (194, 'Nippert Stadium', 'Cincinnati', 'OH', 'NCAA', 'Cincinnati', 'SEOLDO', 'ANDRE', '513-556-5186', 'SEOLDOAE@UC.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (195, 'Nippert Stadium', 'Cincinnati', 'OH', 'NCAA', 'Cincinnati', 'REYNOLDS', 'BRADLEY', '513-556-1081', 'REYNOBY@UC.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (196, 'Nippert Stadium', 'Cincinnati', 'OH', 'NCAA', 'Cincinnati', 'DI FINO', 'ANTHONY', '513-556-4603', 'DIFINOAF@UC.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (197, 'Nissan Stadium', 'Nashville', 'TN', 'NFL', 'Tennessee Titans', 'Stokely', 'Ashlee', '615.565.4834', 'ashlee.stokely@titans.nfl.com ');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (198, 'Oakland Coliseum', 'Oakland', 'CA', 'MLB', 'MLB Oakland Athletics', 'Bullard', 'Lisa', NULL, 'Lbullard@athletics.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (199, 'Oakland Coliseum', 'Oakland', 'CA', 'MLB', 'MLB Oakland Athletics', 'Aker', 'Catherine', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (200, 'Oakland Coliseum', 'Oakland', 'CA', 'MLB', 'MLB Oakland Athletics', 'Marshall', 'Justin', '928-451-2837', 'jmarshall@athletics.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (201, 'Ohio Stadium', 'Columbus', 'OH', 'NCAA', 'Ohio State', 'CLARK ', 'CALEB', '614-247-6536', 'clark.1365@osu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (202, 'Ohio Stadium', 'Columbus', 'OH', 'NCAA', 'Ohio State', 'Armstrong', 'Robert', '614-247-4276', 'armstrong.349@osu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (203, 'Ohio Stadium', 'Columbus', 'OH', 'NCAA', 'Ohio State', 'Spears-McNatt', 'Kimberly', '614-292-2121', 'Spears-McNatt.1@osu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (204, 'Oracle Park', 'San Francisco', 'CA', 'MLB', 'MLB Giants', 'Tellucci', 'Gene', '415-972-1522', 'gtelucci@sfgiants.com ');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (205, 'Paycor Stadium', 'Cincinnati', 'OH', 'NFL', 'Cincinnati Bengals', 'SCHWEPPE', 'ALEX', '513-919-8841', 'alex.schweppe@bengals.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (206, 'PETCO Park', 'San Diego', 'CA', 'MLB', 'MLB Padres', 'KAWACHI', 'KEN', '619-795-5325 (O) 619-778-4925(C)', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (207, 'Phoenix Raceway', 'Avondale', 'AZ', 'NASCAR', 'N/A', 'Hardy', 'Todd', '(386) 547-8813', 'thardy@phoenixraceway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (208, 'PNC Park', 'Pittsburgh', 'PA', 'MLB', 'MLB Pirates', 'Singer', 'Drew', '412-325-4960', 'drew.singer@pirates.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (209, 'Pocono Raceway', 'Long Pond', 'PA', 'NASCAR', 'N/A', 'PALLO', 'ROBERT', '570-646-2300', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (210, 'Pocono Raceway', 'Long Pond', 'PA', 'NASCAR', 'N/A', 'HENRY', 'KEVIN', '570-646-7160', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (211, 'Portland International Raceway', 'Portland', 'OR', 'IndyCar', 'N/A', 'SAVOREE', 'D. KEVIN', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (212, 'Progressive Field', 'Cleveland', 'OH', 'MLB', 'MLB Indians', 'GAMBONE', 'NICK', '330-575-3622', 'ngambone@indians.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (213, 'Protective Field at BJCC', 'Birmingham', 'AL', 'NCAA', 'University of Alabama Birmingham', 'CANFIELD', 'JAMES', '205-458-8491', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (214, 'Raymond James Stadium', 'Tampa', 'FL', 'NFL', 'Tampa Bay Buccaneers', 'MORGAN', 'ALEX', '813-387-6342', 'Amorgan@buccaneers.nfl.com ');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (215, 'Raymond James Stadium', 'Tampa', 'FL', 'NFL', 'Tampa Bay Buccaneers', 'MACKES', 'JIM', '813-870-2700', ' jmackes@buccaneers.nfl.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (216, 'Rentschler Field', 'East Hartford', 'CT', 'NCAA', 'Connecticut', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (217, 'Reser Stadium', 'Corvallis', 'OR', 'NCAA', 'Oregon State', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (218, 'Rice Stadium', 'Houston', 'TX', 'NCAA', 'Rice', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (219, 'Rice-Eccles Stadium', 'Salt Lake City', 'UT', 'NCAA', 'Utah', 'Eden', 'Brett', 'O 801-581-8298 C 801-367-1788', 'Brett.eden@utah.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (220, 'Richmond International Raceway', 'Richmond', 'VA', 'NASCAR', 'N/A', 'Waran', 'Lori', '804-363-6599', 'lwaran@richmondraceway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (221, 'Road America', 'Plymouth', 'WI', 'IndyCar', 'N/A', 'EWERT', 'JOHN', '920-893-4206', 'jewert@roadamerica.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (222, 'Roberts Stadium', 'Hattiesburg', 'MS', 'NCAA', 'Southern Miss', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (223, 'Maverik Stadium', 'Logan', 'UT', 'NCAA', 'Utah State', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (224, 'Rose Bowl', 'Pasadena', 'CA', 'NCAA', 'UCLA', 'JOHNSON', 'DANIEL', '310-206-0892', 'djohnson@athletics.ucla.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (225, 'Ross-Ade Stadium', 'West Lafayette', 'IN', 'NCAA', 'Purdue', 'Kebert', 'Mark', '765-412-1970', 'kebert@purdue.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (226, 'Rubber Bowl', 'Akron', 'OH', 'NCAA', 'Akron', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (227, 'Rutgers Stadium', 'Piscataway', 'NJ', 'NCAA', 'Rutgers', 'Keleman', 'Steven', '848-565-6861', 'Steven.Keleman@rutgers.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (228, 'Rutgers Stadium', 'Piscataway', 'NJ', 'NCAA', 'Rutgers', 'Ruiz', 'Alejandro', '973-420-2421', 'ruiz@rutgers.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (229, 'Ryan Field', 'Evanston', 'IL', 'NCAA', 'Northwestern', 'Gregg', 'Derrick', '847-491-8880', 'Derrick.gragg@northwestern.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (230, 'Rynearson Stadium', 'Ypsilanti', 'MI', 'NCAA', 'Eastern Michigan', 'ROWDON', 'ANDREW', '734-487-2327', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (231, 'Sam Boyd Stadium', 'Las Vegas', 'NV', 'NCAA', 'UNLV', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (232, 'Sanford Stadium', 'Athens', 'GA', 'NCAA', 'Georgia', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (233, 'Scheumann Stadium', 'Muncie', 'IN', 'NCAA', 'Ball State', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (234, 'Scott Stadium', 'Charlottesville', 'VA', 'NCAA', 'Virginia', 'Ward', 'Eric', '434-728-4536', 'warde@virginia.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (235, 'Skelly Field at H.A. Chapman Stadium', 'Tulsa', 'OK', 'NCAA', 'Tulsa', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (236, 'Sofi Stadium', 'Los Angeles', 'CA', 'NFL', 'Los Angeles Chargers', 'Benedict', 'Otto', '310-617-2516', 'Otto.Benedict@hollywoodparkca.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (237, 'Sofi Stadium', 'Los Angeles', 'CA', 'NFL', 'Los Angeles Rams', 'Benedict', 'Otto', '310-617-2516', 'Otto.Benedict@hollywoodparkca.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (238, 'Soldier Field', 'Chicago', 'IL', 'NFL', 'Chicago Bears', 'DRUM', 'JUSTIN', '847-739-5387', 'justin.drum@bears.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (239, 'Sonoma Raceway', 'Sonoma', 'CA', 'NASCAR', 'N/A', 'Gerhold', 'Emily', '(707)502-7909', 'egerhold@sonomaraceway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (240, 'Sonoma Raceway', 'Sonoma', 'CA', 'NASCAR', 'N/A', 'O''Gorman', 'Bobby', '(707)933-3906', 'bogorman@sonomaraceway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (241, 'Spartan Stadium', 'East Lansing', 'MI', 'NCAA', 'Michigan State', 'ABLAUF', 'DAVID', '734-764-6456', 'dablauf@umich.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (242, 'CEFCU Stadium', 'San Jose', 'CA', 'NCAA', 'San Jose State', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (243, 'FBC Mortgage Stadium', 'Orlando', 'FL', 'NCAA', 'UCF', 'HANSEN', 'DAVID', '407-823-3132', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (244, 'Stanford Stadium', 'Stanford', 'CA', 'NCAA', 'Stanford', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (245, 'State Farm Stadium', 'Phoenix', 'AZ', 'NFL', 'Arizona Cardinals', 'BIDWILL', 'MICHAEL', '602-379-1802', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (246, 'Streets of St. Petersburg', 'St. Petersburg', 'FL', 'IndyCar', 'N/A', 'SAVOREE', 'D. KEVIN', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (247, 'Sun Bowl Stadium', 'El Paso', 'TX', 'NCAA', 'UTEP', 'OLIVAS', 'BERNIE', '915-533-4416', 'mike.guerra@gmail.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (248, 'Mountain America Stadium', 'Tempe', 'AZ', 'NCAA', 'Arizona State', 'Chismar', 'Michael', '480-965-1287', 'michael.chismar@asu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (249, 'Talladega Superspeedway', 'Talladega', 'AL', 'NASCAR', 'N/A', 'BRANHAM', 'RUSSELL', '256-315-4556', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (250, 'Huntington Bank Stadium', 'Minneapolis', 'MN', 'NCAA', 'Minnesota', 'Wierzbicki', 'Mike', '814) 777-6308', 'mwierzbi@umn.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (251, 'TDECU Stadium', 'Houston', 'TX', 'NCAA', 'Houston', 'KEHOE', 'PAMELA', '713-504-8114', 'pwkehoe@central.uh.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (252, 'Texas Motor Speedway', 'Fort Worth', 'TX', 'IndyCar', 'N/A', 'Nelson', 'Kenton', '817-528-9348', 'knelson@texasmotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (253, 'Texas Motor Speedway', 'Fort Worth', 'TX', 'IndyCar', 'N/A', 'Nelson', 'Kenton', '817-528-9348', 'knelson@texasmotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (254, 'Texas Motor Speedway', 'Fort Worth', 'TX', 'NASCAR', 'N/A', 'Nelson', 'Kenton', '817-528-9348', 'knelson@texasmotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (255, 'The Milwaukee Mile', 'Milwaukee', 'WI', 'IndyCar', 'N/A', 'FORBES', 'RUTHIE', '317-258-5630', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (256, 'The Milwaukee Mile', 'West Allis', 'WI', 'NASCAR', 'N/A', 'FORBES', 'RUTHIE', '317-258-5630', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (257, 'The Raceway at Belle Isle Park', 'Detroit', 'MI', 'IndyCar', 'N/A', 'MONTRI', 'MICHAEL', '313-748-1850', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (258, 'TIAA Bank Field', 'Jacksonville', 'FL', 'NFL', 'Jacksonville Jaguars', 'TOY', 'JENN', '904-633-6000', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (259, 'Tiger Stadium', 'Baton Rouge', 'LA', 'NCAA', 'LSU Tigers', 'Haskin', 'Dave', '225-954-8209 ', 'dhaskin@lsu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (260, 'T-MOBILE Park', 'Seattle', 'WA', 'MLB', 'MLB Mariners', 'GOOBY', 'TREVOR', NULL, 'tgooby@mariners.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (261, 'T-MOBILE Park', 'Seattle', 'WA', 'MLB', 'MLB Mariners', 'RODRIGUEZ', 'JUAN', '206-664-3703   ', 'jrodriguez@mariners.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (262, 'T-MOBILE Park', 'Seattle', 'WA', 'MLB', 'MLB Mariners', 'REID-BATEMAN', 'JESSICA', NULL, 'jreidbateman@mariners.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (263, 'JackTrice Stadium', 'Ames', 'IA', 'NCAA', 'Iowa State Cyclones', 'Newton', 'Michael', '515-294-6762', 'mrnewton@iastate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (264, 'Truist Field', 'Winston-Salem', 'NC', 'NCAA', 'Wake Forest', 'Watkins', 'Daniel', '662-694-0098', 'hobartr@wfu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (265, 'Truist Field', 'Winston-Salem', 'NC', 'NCAA', 'Wake Forest', 'Adams', 'Emily', '636-312-1342', 'kreese@wfu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (266, 'Allegacy Federal Credit Union Stadium', 'Winston-Salem', 'NC', 'NCAA', 'Wake Forest', 'Penner', 'Lonnie', '316-841-9306', 'whelanc@wfu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (267, 'Truist Park', 'Atlanta', 'GA', 'MLB', 'MLB Braves', 'SCHILLER', 'DEREK', '404-614-1390', 'Derek.schiller@braves.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (268, 'Truist Park', 'Atlanta', 'GA', 'MLB', 'MLB Braves', 'CUNNINGHAM', 'SCOTT', '404-614-1498', 'Scott.cunningham@braves.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (269, 'U.S. Bank Stadium', 'Minneapolis', 'MN', 'NFL', 'Minnesota Vikings', 'LANGENSTEIN', 'BILLY', '612=777=8768', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (270, 'University at Buffalo Stadium', 'Amherst', 'NY', 'NCAA', 'Buffalo', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (271, 'University Stadium', 'Albuquerque', 'NM', 'NCAA', 'New Mexico', 'Price', 'Will', '505-925-5621', 'wprice1@unm.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (272, 'Vanderbilt Stadium', 'Nashville', 'TN', 'NCAA', 'Vanderbilt', 'Vanderpool', 'Johnny', '615-566-1119', 'Johnny.vanderpool@vanderbilt.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (273, 'Vaught-Hemingway Stadium', 'Oxford', 'MS', 'NCAA', 'Mississippi', 'Smith', 'Matthew', '662-832-0296', 'Mdsmit15@olemiss.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (274, 'Waldo Stadium', 'Kalamazoo', 'MI', 'NCAA', 'Western Michigan', 'SMITH', 'KEANAH', '269-387-3090', 'keanah.smith@wmich.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (275, 'Wallace Wade Stadium', 'Durham', 'NC', 'NCAA', 'Duke University', 'ALSTON', 'CHRIS', '919-681-9010', 'chris.alston@duke.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (276, 'Wallace Wade Stadium', 'Durham', 'NC', 'NCAA', 'Duke University', 'Wilusz', 'Rebecca', '919-943-3708', 'Rebecca.wilusz@duke.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (277, 'War Memorial Stadium', 'Arkansas', 'AR', 'NCAA', 'Arkansas', 'MOYA', 'ELVIS', '479-575-6055', 'ejmoya@uark.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (278, 'Watkins Glen International', 'Watkins Glen', 'NY', 'IndyCar', 'N/A', 'CORNETT', 'CHRIS', '607-535-2486', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (279, 'Watkins Glen International', 'Watkiins Glen', 'NY', 'NASCAR', 'N/A', 'GREEN', 'JOSEPH', '607-535-2486', 'jgreen@theglen.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (280, 'Williams-Brice Stadium', 'Columbia', 'SC', 'NCAA', 'South Carolina', 'WATERS', 'JOSH', NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (281, 'World Wide Technology Raceway', 'Madison', 'IL', 'NASCAR/Indy Car', 'N/A', 'Forbes', 'Ruthie', '317-258-5630', 'ruthie@grand-solutions.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (282, 'Wrigley Field', 'Chicago', 'IL', 'MLB', 'MLB Cubs', 'OBOIKOWITCH', 'JIM', '773-404-2827', 'JOBOIKOWITCH@cubs.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (283, 'Wrigley Field', 'Chicago', 'IL', 'MLB', 'MLB Cubs', 'RIOS', 'JOE', '773-858-5590', 'JRIOS@CUBS.COM');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (284, 'Yulman Stadium', 'New Orleans', 'LA', 'NCAA', 'Tulane', 'MARGHERIO', 'TONY', '504-247-1243', NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (285, 'Lucas Oil Stadium', 'Indianapolis', 'IN', 'NCAA', NULL, 'Neuburger', 'Eric', '317-224-6399', 'eric.neuburger@icclos.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (286, 'EverBank Stadium', 'Jacksonville', 'FL', 'NFL', 'Jacksonville Jaguars', 'Kenny', 'Michael', ' 904-803-9543', 'mikek@asmjax.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (287, 'Dover International Speedway', 'Dover', 'DE', 'NASCAR', 'N/A', 'Camp', 'Gary', '302-883-6560', 'gcamp@dovermotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (288, 'Dover International Speedway', 'Dover', 'DE', 'NASCAR', 'N/A', 'Hosfelt  ', 'John', '302-883-6516  ', 'jhosfelt@dovermotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (289, 'Gaylord Family Oklahoma Memorial Stadium', 'Norman', 'OK', 'NCAA', 'Oklahoma Sooners', 'Hall', ' Jacob', '405-325-5138 or 405-323-6793', ' hall@ou.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (290, 'Gaylord Family Oklahoma Memorial Stadium', 'Norman', 'OK', 'NCAA', 'Oklahoma Sooners', 'Ray', 'Kent', '405-325-5621', 'kray@ou.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (291, 'Great American Ball Park', 'Cincinnati', 'OH', 'MLB', 'MLB Reds', 'O''Connell', 'Timothy', '513-765-7060', 'toconnell@reds.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (292, 'Oracle Park', 'San Francisco', 'CA', 'MLB', 'MLB Giants', 'Costa', 'Jorge', '415-947-1520', 'jcosta@sfgiants.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (293, 'Oracle Park', 'San Francisco', 'CA', 'MLB', 'MLB Giants', 'Roney', 'Michael', '415-972-1523', 'mroney@sfgiants.com ');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (294, 'Raymond James Stadium', 'Tampa', 'FL', 'NFL', 'Tampa Bay Buccaneers', 'ROWAN', 'TOM', '813-554-1358', 'Trowan@buccaneers.nfl.com ');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (295, 'Iowa Speedway', 'Newton', 'IA', 'IndyCar/Nascar', 'N/A', 'Clement', 'Tyler', ' 641-417-9737', 'tclement@iowaspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (296, 'Target Field', 'Minneapolis', 'MN', 'MLB', 'MLB Twins', 'Rajeski', 'Heather', '(650) 302-2176', 'heatherrajeski@twins.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (297, 'Northwest Stadium', 'Washington', 'DC', 'NFL', 'Commanders', 'Gilbert', 'Ben', '202-809-5915', 'Ben.gilbert@commanders.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (298, 'Northwest Stadium', 'Washington', 'DC', 'NFL', 'Commanders', 'Bailey', 'Christopher', '410.533.3338', 'christopher.bailey@commanders.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (299, 'Raymond James Stadium-NCAA', 'Tampa', 'FL', 'NCAA', 'University of Southern Florida', 'Fee', 'Jim', '813-361-0241', ' fee@usf.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (300, 'California Memorial Stadium', 'Berkeley', 'CA', 'NCAA', 'California Golden Bears', 'Everett', 'Markeisha', '5103256754', 'meverett33@berkeley.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (301, 'LaVell Edwards Stadium', 'Provo', 'UT', 'NCAA', 'BYU', 'Durfey', 'Justin', '(801) 422 4764', 'Justin_durfey@byu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (302, 'LaVell Edwards Stadium', 'Provo', 'UT', 'NCAA', 'BYU', 'Childers', 'Darin', '(801) 422 5779', 'Darin.childers@byu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (303, 'Memorial Stadium - Indiana', 'Bloomington', 'IN', 'NCAA', 'Indiana', 'Hunter', 'Benjamin', '812-855-4296', 'bdhunter@iu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (304, 'Memorial Stadium - Indiana', 'Bloomington', 'IN', 'NCAA', 'Indiana', 'Seifers', 'Bradley', '812-855-2035', 'brdsfrs@iu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (305, 'Camping World Stadium', 'Orlando', 'FL', 'NCAA', NULL, 'Repchak', 'Matt', '407-423-2476', 'mrepchak@fcsports.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (306, 'Memorial Stadium - Illinois', 'Champaign', 'IL', 'NCAA', 'Illinois Fighting Illini', 'McCullough', 'Joseph', '217-369-1416', 'jmccull@illinois.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (307, 'Memorial Stadium - Illinois', 'Champaign', 'IL', 'NCAA ', 'Illinois Fighting Illini', 'Benoit', 'Robert', '217-202-9889', 'rbenoit@illinois.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (308, 'Kinnick Stadium', 'Iowa City', 'IA', 'NCAA', 'University of Iowa Hawkeyes', 'Tyrrell', 'Travis', '319-335-5022    ', 'travis-tyrrell@uiowa.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (309, 'Memorial Stadium - Clemson', 'Clemson', 'SC', 'NCAA', 'Clemson', 'Rzodkiewicz', 'Andrew', '(O)  864-656-9733 (C) 864-533-6622', 'Arzodki@Clemson.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (310, 'Memorial Stadium - Clemson', 'Clemson', 'SC', 'NCAA', 'Clemson', 'Wright', 'Jon', '(O) 864-656-9797 (C)864-314-1714', 'jcwrght@clemson.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (311, 'Kelly/Shorts Stadium', 'Mount Pleasant', 'MI', 'NCAA', 'Central Michigan', 'SIENKIEWICZ', 'MICHAEL', '989-774-3119', 'SIENK1MH@CMICH.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (312, 'Kelly/Shorts Stadium', 'Mount Pleasant', 'MI', 'NCAA', 'Central Michigan', 'WASSMAN', 'CAMERON', '989-774-7696', 'WASSM1CD@CMICH.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (313, 'Kelly/Shorts Stadium', 'Mount Pleasant', 'MI', 'NCAA', 'Central Michigan', 'MORROW', 'MICHAEL', '989-774-6440', 'MORRO1MA@CMICH.EDU');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (314, 'Albertsons Stadium', 'Boise', 'ID', 'NCAA', 'Boise State', 'Burk', 'Nathan', '208-617-9071', 'nathanburk@boisestate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (315, 'Mountain America Stadium', 'Tempe', 'AZ', 'NCAA', 'Arizona State', 'Wakely', 'Dan', '480-965-3301', 'ddwake@asu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (316, 'Daikin Park', 'Houston', 'TX', 'MLB', 'MLB Astros', 'Pippin', 'Roy', '713-259-8438', 'rpippin@astros.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (317, 'Arizona Stadium', 'Tucson', 'AZ', 'NCAA', 'Arizona', 'JENNINGS', 'ORVILLE', '520-621-4622', 'ojennings@arizona.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (318, 'Boone Pickens Stadium', 'Stillwater ', 'OK', 'NCAA ', 'Oklahoma State', 'Helt', 'Keith', '(405) 744-7030', 'khelt@okstate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (319, 'Boone Pickens Stadium', 'Stillwater', 'OK', 'NCAA', 'Oklahoma State', 'Fortney', 'Lance', '(405) 744-2742', 'fortney@okstate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (320, 'Las Vegas Motor Speedway', 'Las Vegas', 'NV', 'NASCAR', ' N/A', 'Powell', 'Chris', '702-210-2869', 'cpowell@lvms.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (321, 'Las Vegas Motor Speedway', 'Las Vegas', 'NV', 'NASCAR', 'N/A', 'Motley', 'Jeff', '702-210-4158', 'jmotley@lvms.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (322, 'Kinnick Stadium', 'Iowa City', 'IA', 'NCAA', 'University of Iowa Hawkeyes', 'Wilson', 'Marcus', '319-335-9247', ' marcus-m-wilson@hawkeyesports.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (323, 'Lincoln Financial Field', 'Philadelphia', 'PA', 'NFL', 'Philadelphia Eagles', 'Hayslip', 'J.P.', '215.901.9758', 'jhayslip@eagles.nfl.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (324, 'Michigan Stadium', 'Ann Arbor', 'MI', 'NCAA', 'Michigan', 'Ablauf', 'David', '734-323-2281', 'dablauf@umich.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (325, 'Mackay Stadium', 'Reno', 'NV', 'NCAA', 'Nevada', 'Shoji', 'Jeffrey', '206 947-9636', 'jshoji@unr.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (326, 'Autzen Stadium ', 'Eugene', 'OR', 'NCAA', 'Oregon', 'ROEDL', 'ERIC', '541-346-4481', 'roedl@uoregon.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (327, 'Allegiant Stadium', 'Paradise', 'NV', 'NFL', 'Raiders', NULL, NULL, NULL, NULL);
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (328, 'Bobcat Stadium', 'San Marcos', 'TX', 'NCAA', 'Texas State Bobcat', 'Miller', 'Bryan', '512-245-2022', 'bryanmiller@txstate.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (329, 'Yale Bowl', 'New Haven', 'CT', 'NCAA', 'Yale Bulldogs', 'Campbell', 'John', '203-584-1225', 'john.campbell@yale.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (330, 'Memorial Stadium - Clemson', 'Clemson', 'SC', 'NCAA', 'Clemson', 'Roh', 'Jaclyn', '586-738-1552', 'crummey@clemson.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (331, 'Atlanta Motor Speedway', 'Hampton', 'GA', 'NASCAR', 'N/A', 'HUTCHISON', 'BRANDON', '770-707-7851', 'brandonh@atlantamotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (332, 'Atlanta Motor Speedway', 'Hampton', 'GA', 'NASCAR', 'N/A', 'HOSFELT', 'JIM', '302-883-6516', 'jhosfelt@dovermotorspeedway.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (333, 'Camden Yards', 'Baltimore', 'MD', 'MLB', 'MLB Orioles', 'Cummings', 'Kevin', '202-345-7020', 'kcummings@orioles.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (334, 'Angel Stadium', 'Anaheim ', 'CA', 'MLB ', 'MLB Angels', 'Sanders', 'Brian', '714-940-2143', 'Brian.sanders@angels.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (335, 'Citizens Bank Park', 'Philadelphia', 'PA', 'MLB ', 'MLB Phillies', 'Romond', 'Laura', '215-218-5361', 'lromond@phillies.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (336, 'Snapdragon Stadium', 'San Diego', 'CA', 'NCAA Football', 'Aztecs', 'Mays', 'Joshua', '619.665.3569', 'jmays@sdsu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (337, 'Snapdragon Stadium', 'San Diego', 'CA', 'NCAA Football', 'Aztecs', 'Rentto', 'Jessica', '619.594.8640', 'jrentto@sdsu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (338, 'Mountaineer Field at Milan Puskar Stadium', 'Morgantown', 'WV', 'NCAA', 'West Virginia ', 'Smith', 'Noah', '304-293-3086', 'noah.smith3@mail.wvu.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (339, 'Jordan-Hare Stadium', 'Auburn', 'AL', 'NCAA', 'Auburn', 'Raville', 'Courtney', '334.844.3573', 'Car0046@auburn.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (340, 'Nissan Stadium', 'Nashville', 'TN', 'NFL', 'Tennessee Titans', 'Haywood', 'David', '615.565.4337', 'david.haywood@titans.nfl.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (341, 'Valley Children''s Stadium', 'Fresno', 'CA', 'NCAA', 'Fresno State', 'PUCHER', 'FRANK ', ' 559-278-8006 ', 'fpucher@csufresno.edu');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (342, 'EverBank Stadium', 'Jacksonville', 'FL', 'NFL/NCAA', NULL, 'Saban', 'Eray', '904-933-0873', 'esaban@asmjax.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (343, 'EverBank Stadium', 'Jacksonville', 'FL', 'NFL', NULL, 'Toy', 'Jenn', '904-633-6000', 'toyj@nfl.jaguars.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (344, 'Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Hensley', 'Zach', '(206) 381-7830', 'zachh@seahawksfgi.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (345, 'Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Agnew', 'Rob', '(206) 381-7850', 'roba@seahawksfgi.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (346, 'Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Young', 'David', '(206) 381-7515', 'davidy@seahawks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (347, 'Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Cofer', 'Tyler', '(425) 203-8373', 'tylerc@seahawks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (348, 'Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Hoover', 'Allison', '(425) 203-8042', 'allisonh@seahawks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (349, 'hold-Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Trageser', 'Tricia', '(425) 203-8076', 'triciat@seahawks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (350, 'Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Flandreau', 'Tyson', '(425) 203-8127', 'tysonf@seahawks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (351, 'Lumen Field', 'Seattle', 'WA', 'NFL', 'Seattle Seahawks', 'Dougherty', 'Kyle', '(425) 203-8108', 'kyled@seahawks.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (352, 'Camping World Stadium', 'Orlando', 'FL', 'NFL', NULL, 'Repchak', 'Matt', '407-423-2476', 'mrepchak@fcsports.com');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (353, 'State Farm Stadium', 'Phoenix', 'AZ', 'NCAA', NULL, 'Hymes', 'Charles', '318-401-0771', 'charles.hymes@shreveportla.gov');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (354, 'M&T Bank Stadium', 'Baltimore', 'MD', 'NFL', 'Baltimore Ravens', 'McDuffie', 'Devin', '410-701-4060', 'Devin.McDuffie@ravens.nfl.net');
  
  INSERT INTO SportVenues (ID, Venue, City, State, Sport, Team, Auth_Contact_Last, Auth_Contact_First, Auth_Contact_Phone, Auth_Contact_Email) 
    VALUES (355, 'Thermal Club', 'Thermal', 'CA', 'IndyCar', 'N/A', NULL, NULL, NULL, NULL);
  
  COMMIT;
END;