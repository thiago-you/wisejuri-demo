## Environment Requirements
- nodejs
- npm
- nodemon (development)

## Project Dependencies
- express.js: ^4.17.3
- ejs: ^3.1.9

#### Install nodemon
```
npm install nodemon -g
```

## Install project dependencies
```
npm install
```

## Run
Run project on port 3000 as default (localhost:3000).

```
node index.js
```

## Run with hot reload
Run project on port 3000 as default with hot reload mode (localhost:3000). Hot reload allow real time update into the init script (index.js).

```
nodemon index.js
```

## Run with hot reload
Run project on port 3000 as default with hot reload mode (localhost:3000). Hot reload allow real time update into the init script (index.js).

```
nodemon index.js
```

## Run using external API
Run project passing command line argument to use external API as data source.

```
node index.js http://externalapi.com
```

## Routes
- [GET] / -> Dashboard page (index)
- [GET] /rentalcompany/commissions -> Return list data
- [POST] /rentalcompany/commissions -> Save list data