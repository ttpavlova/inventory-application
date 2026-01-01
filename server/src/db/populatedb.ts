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

CREATE TABLE IF NOT EXISTS category_gender (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gender VARCHAR(10) NOT NULL CHECK (gender IN ('Men', 'Women')),

  category_id INT NOT NULL REFERENCES categories(id)
  ON UPDATE CASCADE
  ON DELETE CASCADE,

  UNIQUE (gender, category_id)
);

CREATE TABLE IF NOT EXISTS shoes (
  id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  season VARCHAR (20) NOT NULL CHECK (season IN ('Summer', 'Winter', 'Demi-season')),

  category_gender_id INT NOT NULL REFERENCES category_gender(id),
  brand_id INT NOT NULL REFERENCES brands(id),
  material_id INT NOT NULL REFERENCES materials(id),
  color_id INT NOT NULL REFERENCES colors(id)
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

INSERT INTO category_gender (gender, category_id)
VALUES
  ('Men', 1),
  ('Women', 1),
  ('Women', 2),
  ('Men', 3),
  ('Women', 3);

INSERT INTO shoes (season, category_gender_id, brand_id, material_id, color_id) 
VALUES
  ('Summer', 5, 1, 1, 1),
  ('Summer', 4, 1, 1, 5),
  ('Demi-season', 2, 3, 1, 3),
  ('Summer', 3, 3, 2, 4),
  ('Demi-season', 4, 2, 1, 1),
  ('Summer', 5, 1, 1, 2),
  ('Summer', 4, 1, 1, 1),
  ('Demi-season', 2, 3, 1, 4),
  ('Summer', 3, 3, 2, 5),
  ('Demi-season', 4, 2, 1, 2),
  ('Summer', 5, 1, 1, 1),
  ('Summer', 4, 1, 1, 5),
  ('Demi-season', 2, 3, 1, 3),
  ('Summer', 3, 3, 2, 4),
  ('Demi-season', 4, 2, 1, 1),
  ('Summer', 5, 1, 1, 2),
  ('Summer', 4, 1, 1, 1),
  ('Demi-season', 2, 3, 1, 4),
  ('Summer', 3, 3, 2, 5),
  ('Demi-season', 4, 2, 1, 2);

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
  (5, 5, 8),
  (1, 6, 2),
  (3, 6, 4),
  (2, 7, 6),
  (1, 8, 4),
  (4, 9, 5),
  (5, 10, 8);

CREATE OR REPLACE VIEW view_category_gender AS
SELECT 
    c_g.id,
    c_g.gender,
    c.name AS category
FROM category_gender c_g
JOIN categories c ON c_g.category_id = c.id;

CREATE OR REPLACE VIEW view_shoes AS
SELECT 
    s.id,
    c_g.gender,
    s.season,
    c.name AS category,
    b.name AS brand,
    m.name AS material,
    col.name AS color
FROM shoes s
JOIN category_gender c_g ON s.category_gender_id = c_g.id
JOIN categories c ON c_g.category_id = c.id
JOIN brands b ON s.brand_id = b.id
JOIN materials m ON s.material_id = m.id
JOIN colors col ON s.color_id = col.id;

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
    sizes.eu_size AS eu_size
FROM quantity_in_stock q
JOIN view_shoes v_s ON q.shoe_id = v_s.id
JOIN sizes ON q.size_id = sizes.id;
`;

const { dbUrl } = config.db;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: dbUrl,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
