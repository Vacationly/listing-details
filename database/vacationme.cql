
-- run cqlsh < database/vacationme.cql

CREATE KEYSPACE IF NOT EXISTS vacation_me 
  WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor' : 1};

USE vacation_me;

DROP TABLE IF EXISTS amenities;
DROP TABLE IF EXISTS hosts;
DROP TABLE IF EXISTS listing_types;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS house_rules;
DROP TABLE IF EXISTS highlights;
DROP TABLE IF EXISTS cancellation_policies;


CREATE TABLE amenities(
  id INT PRIMARY KEY,
  name TEXT,
  icon TEXT
);

CREATE TABLE hosts(
  id INT PRIMARY KEY,
  name TEXT,
  avatar TEXT
);

CREATE TABLE listing_types(
  id INT PRIMARY KEY,
  name TEXT
);

CREATE TABLE listings(
  listingId INT PRIMARY KEY,
  typeId INT,
  hostId INT,
  city TEXT,
  guests INT,
  bedrooms INT,
  beds INT,
  bathrooms INT,
  description TEXT,
  additionalDescription TEXT
);

CREATE TABLE cancellation_policies(
  id uuid PRIMARY KEY,
  name TEXT,
  overview TEXT,
  description TEXT,
  listingId INT
);

CREATE TABLE highlights(
  id uuid PRIMARY KEY,
  tagline TEXT,
  description TEXT,
  upvotes INT,
  listingId INT
);

CREATE TABLE house_rules(
  id uuid PRIMARY KEY,
  rule TEXT,
  listingId INT,
);

COPY amenities (id, name, icon) FROM './csv/Amenities.csv' WITH HEADER=true;

COPY hosts (id, name, avatar) FROM './csv/Hosts.csv' WITH HEADER=true;

COPY listing_types (id, name) FROM './csv/ListingTypes.csv' WITH HEADER=true;

COPY listings (listingId, typeId, hostId, city, guests, bedrooms, beds, bathrooms, description, additionalDescription) FROM './csv/Listings.csv' WITH HEADER=true;

COPY house_rules (id, rule, listingId) FROM './csv/houseRules1.csv' WITH HEADER=true;
COPY house_rules (id, rule, listingId) FROM './csv/houseRules2.csv' WITH HEADER=true;
COPY house_rules (id, rule, listingId) FROM './csv/houseRules3.csv' WITH HEADER=true;
COPY house_rules (id, rule, listingId) FROM './csv/houseRules4.csv' WITH HEADER=true;


COPY highlights (id, tagline, description, upvotes, listingId) FROM './csv/highlights1.csv' WITH HEADER=true;
COPY highlights (id, tagline, description, upvotes, listingId) FROM './csv/highlights2.csv' WITH HEADER=true;
COPY highlights (id, tagline, description, upvotes, listingId) FROM './csv/highlights3.csv' WITH HEADER=true;
COPY highlights (id, tagline, description, upvotes, listingId) FROM './csv/highlights4.csv' WITH HEADER=true;


COPY cancellation_policies (id, name, overview, description, listingId) FROM './csv/CancellationPolicies1.csv' WITH HEADER=true;
COPY cancellation_policies (id, name, overview, description, listingId) FROM './csv/CancellationPolicies2.csv' WITH HEADER=true;
COPY cancellation_policies (id, name, overview, description, listingId) FROM './csv/CancellationPolicies3.csv' WITH HEADER=true;
COPY cancellation_policies (id, name, overview, description, listingId) FROM './csv/CancellationPolicies4.csv' WITH HEADER=true;



