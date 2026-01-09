# Inventory Application

## Description

An inventory management app for an imaginary shoe store. All CRUD operations are implemented: users can Create, Read, Update or Delete any shoe item.

Technologies: TypeScript, React, Express, PostgreSQL.

## Main Features

- Browse all shoes with **pagination**
- Filter by **category**
- View detailed information about a shoe
- Create, update and delete shoes
- Validation is handled on server and client using **Zod**

## Server Testing

- All endpoints were tested in **Postman**
- Returns standard HTTP responses:
  - `200 OK` - successful requests
  - `201 Created` - successful item creation
  - `204 No Content` - successful item deletion
  - `400 Bad Request` - validation error
  - `404 Not Found` - an item with the provided ID cannot be found
  - `500 Internal Server Error` - unexpected error

## Technologies used

### Client:

- React + TypeScript
- React Router v6
- SCSS
- Zod for forms validation

### Server:

- Express + TypeScript
- PostgreSQL database
- Zod for request validation

### Other tools:

- ESLint, Prettier, Vite

## Build

```
# Clone the repository
git clone git@github.com:ttpavlova/inventory-application.git
```

### Server

```
# Install dependencies
cd server
npm install

# Run in dev mode
npm run dev

# Create a production build
npm run build
npm start

# Populate the database with initial data
npm run populatedb
```

### Client

```
# Install dependencies
cd client
npm install

# Create a production build
npm run build

# Run in dev mode
npm run dev
```
