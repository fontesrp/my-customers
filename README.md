# Customer Info

An application that allows a company to see their customer information.

# Running

## Prerequisites

To run this project you will need to have the following programs installed:

```bash
$ node -v
v8.12.0

$ npm -v
6.4.1

$ yarn -v
1.9.4

$ psql --version
psql (PostgreSQL) 10.5

$ createdb --version
createdb (PostgreSQL) 10.5
```

Make sure PostgreSQL is running and listoning to port 5432 on localhost.

## Installing

To install al dependencies, clone the repository and run

```bash
$ createdb my_customers
$ yarn setup
```

on the project's root folder.

## Running

To run, you just have to execute

```bash
yarn start
```

on the project's root. This should start the Express server on port 3001 and the React development server on port 3000.

