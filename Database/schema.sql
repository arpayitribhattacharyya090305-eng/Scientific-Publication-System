CREATE DATABASE scientific_publication_db;
USE scientific_publication_db;


CREATE TABLE Office (
  Office_Number INT PRIMARY KEY,
  Phone_Extension VARCHAR(10),
  Address VARCHAR(255)
);


CREATE TABLE Researcher (
  Employee_ID INT PRIMARY KEY,
  Name VARCHAR(100),
  Is_Editor_Chief BOOLEAN,
  Office_Number INT,
  FOREIGN KEY (Office_Number) REFERENCES Office(Office_Number)
);


CREATE TABLE Lab_Equipment (
  Equipment_ID INT PRIMARY KEY,
  Equipment_Name VARCHAR(100),
  Primary_Calibration VARCHAR(100)
);


CREATE TABLE Journal (
  Journal_ID INT PRIMARY KEY,
  Title VARCHAR(150),
  Volume_Identifier VARCHAR(50),
  Format VARCHAR(20),
  Publication_Date DATE,
  Editor_Chief_ID INT,
  FOREIGN KEY (Editor_Chief_ID) REFERENCES Researcher(Employee_ID)
);


CREATE TABLE Research_Paper (
  Paper_ID INT PRIMARY KEY,
  Title VARCHAR(150),
  Research_Area VARCHAR(100),
  Lead_Author_ID INT,
  Journal_ID INT,
  FOREIGN KEY (Lead_Author_ID) REFERENCES Researcher(Employee_ID),
  FOREIGN KEY (Journal_ID) REFERENCES Journal(Journal_ID)
);


CREATE TABLE Writes (
  Employee_ID INT,
  Paper_ID INT,
  Author_Role VARCHAR(50),
  PRIMARY KEY (Employee_ID, Paper_ID),
  FOREIGN KEY (Employee_ID) REFERENCES Researcher(Employee_ID),
  FOREIGN KEY (Paper_ID) REFERENCES Research_Paper(Paper_ID)
);


CREATE TABLE Skilled_in (
  Employee_ID INT,
  Equipment_ID INT,
  PRIMARY KEY (Employee_ID, Equipment_ID),
  FOREIGN KEY (Employee_ID) REFERENCES Researcher(Employee_ID),
  FOREIGN KEY (Equipment_ID) REFERENCES Lab_Equipment(Equipment_ID)
);


INSERT INTO Office (Office_Number, Phone_Extension, Address) VALUES
(101, 201, 'Block A, Floor 1'),
(102, 202, 'Block A, Floor 2'),
(103, 203, 'Block B, Floor 1'),
(104, 204, 'Block B, Floor 2'),
(105, 205, 'Block C, Floor 1'),
(106, 206, 'Block C, Floor 2'),
(107, 207, 'Block D, Floor 1'),
(108, 208, 'Block D, Floor 2'),
(109, 209, 'Block E, Floor 1'),
(110, 210, 'Block E, Floor 2');


INSERT INTO Researcher (Employee_ID, Name, Is_Editor_Chief, Office_Number) VALUES
(1, 'Dr. Meera Sharma', 1, 101),
(2, 'Dr. Rohan Patel', 0, 102),
(3, 'Dr. Kavya Singh', 0, 103),
(4, 'Dr. Anil Verma', 1, 104),
(5, 'Dr. Priya Iyer', 0, 105),
(6, 'Dr. Arjun Desai', 0, 106),
(7, 'Dr. Nisha Gupta', 1, 107),
(8, 'Dr. Mohit Sinha', 0, 108),
(9, 'Dr. Neha Bansal', 1, 109),
(10, 'Dr. Karan Malhotra', 0, 110);


INSERT INTO Lab_Equipment (Equipment_ID, Equipment_Name, Primary_Calibration) VALUES
(1, 'Spectrometer', '2024-01-15'),
(2, 'Microscope', '2024-02-05'),
(3, 'Centrifuge', '2024-03-10'),
(4, 'Thermal Cycler', '2024-03-20'),
(5, 'Gas Chromatograph', '2024-04-01'),
(6, 'pH Meter', '2024-04-15'),
(7, 'Autoclave', '2024-05-05'),
(8, 'UV Spectrophotometer', '2024-05-20'),
(9, 'DNA Sequencer', '2024-06-01'),
(10, 'Laminar Flow Hood', '2024-06-10');


INSERT INTO Journal (Journal_ID, Title, Volume_Identifier, Format, Publication_Date, Editor_in_Chief_ID) VALUES
(1, 'Journal of Molecular Biology', 'Vol-15', 'Print', '2025-01-15', 1),
(2, 'International Journal of AI Research', 'Vol-20', 'Online', '2025-02-10', 4),
(3, 'Journal of Environmental Science', 'Vol-9', 'Print', '2025-02-20', 7),
(4, 'Computational Physics Letters', 'Vol-5', 'Online', '2025-03-01', 4),
(5, 'Bioinformatics Today', 'Vol-7', 'Online', '2025-03-15', 1),
(6, 'Neuroscience Research Review', 'Vol-10', 'Print', '2025-04-05', 7),
(7, 'Organic Chemistry World', 'Vol-12', 'Online', '2025-04-15', 4),
(8, 'Renewable Energy Journal', 'Vol-6', 'Print', '2025-05-01', 7),
(9, 'AI and Robotics Review', 'Vol-11', 'Online', '2025-05-20', 4),
(10, 'Computing and Data Systems', 'Vol-8', 'Print', '2025-06-01', 7);


INSERT INTO Research_Paper (Paper_ID, Title, Research_Area, Lead_Author_ID, Journal_ID) VALUES
(1, 'AI for Protein Folding', 'Bioinformatics', 2, 1),
(2, 'Deep Learning in Medicine', 'Artificial Intelligence', 3, 2),
(3, 'Climate Change Impact', 'Environmental Science', 5, 3),
(4, 'Quantum Computing Basics', 'Computing', 6, 4),
(5, 'Gene Sequencing Automation', 'Biotechnology', 8, 5),
(6, 'Organic Compound Synthesis', 'Chemistry', 9, 7),
(7, 'Neural Network Optimization', 'AI', 10, 9),
(8, 'Solar Energy Storage', 'Energy', 4, 8),
(9, 'Autonomous Robot Vision', 'Robotics', 3, 9),
(10, 'Parallel Processing Framework', 'Computer Science', 2, 10);


INSERT INTO Skilled_in (Employee_ID, Equipment_ID) VALUES
(1, 1),
(9, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5),
(4, 6),
(4, 7),
(5, 8),
(6, 9),
(7, 10);


INSERT INTO Writes (Employee_ID, Paper_ID, Author_Role) VALUES
(1, 1, 'Co-Author'),
(2, 1, 'Lead Author'),
(3, 2, 'Lead Author'),
(3, 9, 'Lead Author'),
(4, 4, 'Lead Author'),
(5, 3, 'Lead Author'),
(6, 4, 'Co-Author'),
(8, 5, 'Lead Author'),
(9, 6, 'Lead Author'),
(10, 7, 'Lead Author');


