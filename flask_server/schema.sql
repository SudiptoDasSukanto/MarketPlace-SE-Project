DROP TABLE IF EXISTS AddJob;
CREATE TABLE AddJob (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255),
    jobTitle VARCHAR(255),
    category VARCHAR(255),
    priceRange VARCHAR(255),
    shortDescription VARCHAR(400),
    deadline DATE
);

DROP TABLE IF EXISTS BidJob;
CREATE TABLE BidJob (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jobid INTEGER,
    ownerEmail VARCHAR(255),
    userEmail VARCHAR(255),
    price INTEGER,
    deadline DATE,
    jobTitle VARCHAR(255),
    statuss VARCHAR(255)
    
);


