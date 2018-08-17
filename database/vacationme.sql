
-- run cqlsh < database/vacationme.cql

-- DROP DATABASE IF EXISTS vacation_me;

CREATE DATABASE IF NOT EXISTS vacation_me;

\c vacation_me;

DROP TABLE IF EXISTS amenities CASCADE;
DROP TABLE IF EXISTS hosts CASCADE;
DROP TABLE IF EXISTS listing_types CASCADE;
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS house_rules CASCADE;
DROP TABLE IF EXISTS highlights CASCADE;
DROP TABLE IF EXISTS cancellation_policies CASCADE;


CREATE TABLE amenities(
  id INT PRIMARY KEY,
  name VARCHAR(255),
  icon TEXT
);

CREATE TABLE hosts(
  id INT PRIMARY KEY,
  name VARCHAR(255),
  avatar TEXT
);

CREATE TABLE listing_types(
  id INT PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE listings(
  listingId INT PRIMARY KEY,
  typeId INT,
  hostId INT,
  city VARCHAR(255),
  guests INT,
  bedrooms INT,
  beds INT,
  bathrooms INT,
  description TEXT,
  additionalDescription TEXT,
  FOREIGN KEY (hostId) REFERENCES hosts (id),
  FOREIGN KEY (typeId) REFERENCES listing_types (id)
);

CREATE TABLE cancellation_policies(
  id uuid PRIMARY KEY,
  name VARCHAR(255),
  overview VARCHAR(255),
  description TEXT,
  listingId INT REFERENCES listings ON DELETE CASCADE
);
CREATE INDEX ON cancellation_policies (listingId);

CREATE TABLE highlights(
  id uuid PRIMARY KEY,
  tagline VARCHAR(255),
  description TEXT,
  upvotes INT,
  listingId INT REFERENCES listings ON DELETE CASCADE
);
CREATE INDEX ON highlights (listingId);

CREATE TABLE house_rules(
  id uuid PRIMARY KEY,
  rule VARCHAR(255),
  listingId INT REFERENCES listings ON DELETE CASCADE
);
CREATE INDEX ON house_rules (listingId);

COPY amenities FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/Amenities.csv' DELIMITER ',' CSV HEADER;
COPY hosts FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/Hosts.csv' DELIMITER ',' CSV HEADER;
COPY listing_types FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/ListingTypes.csv' DELIMITER ',' CSV HEADER;
COPY listings FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/Listings.csv' DELIMITER ',' CSV HEADER;

COPY house_rules FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/houseRules1.csv' DELIMITER ',' CSV HEADER;
COPY house_rules FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/houseRules2.csv' DELIMITER ',' CSV HEADER;
COPY house_rules FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/houseRules3.csv' DELIMITER ',' CSV HEADER;
COPY house_rules FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/houseRules4.csv' DELIMITER ',' CSV HEADER;


COPY highlights FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/highlights1.csv' DELIMITER ',' CSV HEADER;
COPY highlights FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/highlights2.csv' DELIMITER ',' CSV HEADER;
COPY highlights FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/highlights3.csv' DELIMITER ',' CSV HEADER;
COPY highlights FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/highlights4.csv' DELIMITER ',' CSV HEADER;


COPY cancellation_policies FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/CancellationPolicies1.csv' DELIMITER ',' CSV HEADER;
COPY cancellation_policies FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/CancellationPolicies2.csv' DELIMITER ',' CSV HEADER;
COPY cancellation_policies FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/CancellationPolicies3.csv' DELIMITER ',' CSV HEADER;
COPY cancellation_policies FROM '/Users/marcelinoornelas/Desktop/SDC/details/csv/CancellationPolicies4.csv' DELIMITER ',' CSV HEADER;

-- \timing;
-- \x on;

-- select * from listings l
--   left JOIN house_rules USING (listingid)
--   left JOIN cancellation_policies USING (listingid)
--   left JOIN highlights USING (listingid)
--   where l.listingid = 50000;

