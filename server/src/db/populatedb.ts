#! /usr/bin/env node
import dotenv from "dotenv";
dotenv.config();
import config from "../config/config.js";
import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS brands (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS materials (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS colors (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS countries (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR (30) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS shoes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gender VARCHAR (20) NOT NULL CHECK (gender IN ('Men', 'Women')),
  season VARCHAR (20) NOT NULL CHECK (season IN ('Summer', 'Winter', 'Demi-season')),

  category_id INT NOT NULL REFERENCES categories(id),
  brand_id INT NOT NULL REFERENCES brands(id),
  material_id INT NOT NULL REFERENCES materials(id),
  color_id INT NOT NULL REFERENCES colors(id),
  country_id INT NOT NULL REFERENCES countries(id)
);

CREATE TABLE IF NOT EXISTS sizes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  eu_size DECIMAL (3,1) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS quantity_in_stock (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  quantity INT NOT NULL DEFAULT 0,
  
  shoe_id INT NOT NULL REFERENCES shoes(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,
  size_id INT NOT NULL REFERENCES sizes(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE
);

INSERT INTO categories (name) 
VALUES
  ('Boots'),
  ('Heels'),
  ('Sneakers');

INSERT INTO brands (name) 
VALUES
  ('Adidas'),
  ('New Balance'),
  ('Gucci');

INSERT INTO materials (name) 
VALUES
  ('Leather'),
  ('Suede');

INSERT INTO colors (name) 
VALUES
  ('Black'),
  ('Grey'),
  ('Brown'),
  ('Beige'),
  ('White');

INSERT INTO countries (name) 
VALUES
  ('US'),
  ('Italy');

INSERT INTO shoes (gender, season, category_id, brand_id, material_id, color_id, country_id) 
VALUES
  ('Women', 'Summer', 3, 1, 1, 1, 1),
  ('Men', 'Summer', 3, 1, 1, 5, 1),
  ('Women', 'Demi-season', 1, 3, 1, 3, 2),
  ('Women', 'Summer', 2, 3, 2, 4, 2),
  ('Men', 'Demi-season', 3, 2, 1, 1, 1);

INSERT INTO sizes (eu_size) 
VALUES
  (36),
  (37),
  (37.5),
  (38),
  (38.5),
  (39),
  (39.5),
  (40),
  (40.5),
  (41),
  (41.5),
  (42),
  (42.5),
  (43);

INSERT INTO quantity_in_stock (quantity, shoe_id, size_id) 
VALUES
  (1, 1, 2),
  (3, 1, 4),
  (2, 2, 6),
  (1, 3, 4),
  (4, 4, 5),
  (5, 5, 8);

CREATE OR REPLACE VIEW view_shoes AS
SELECT 
    s.id,
    s.gender,
    s.season,
    c.name AS category,
    b.name AS brand,
    m.name AS material,
    col.name AS color,
    co.name AS country
FROM shoes s
LEFT JOIN categories c ON s.category_id = c.id
LEFT JOIN brands b ON s.brand_id = b.id
LEFT JOIN materials m ON s.material_id = m.id
LEFT JOIN colors col ON s.color_id = col.id
LEFT JOIN countries co ON s.country_id = co.id;

CREATE OR REPLACE VIEW view_quantity_in_stock AS
SELECT 
    q.id,
    q.quantity,
    v_s.id AS shoe_id,
    v_s.gender,
    v_s.season,
    v_s.category,
    v_s.brand,
    v_s.material,
    v_s.color,
    v_s.country,
    sizes.eu_size AS eu_size
FROM quantity_in_stock q
LEFT JOIN view_shoes v_s ON q.shoe_id = v_s.id
LEFT JOIN sizes ON q.size_id = sizes.id;
`;

const { roleName, rolePassword, dbHost, dbPort, dbName } = config.db;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${roleName}:${rolePassword}@${dbHost}:${dbPort}/${dbName}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
