/*
Farid Karadsheh
Ira Woodring
GVSU CIS 343-01
12-3-2018

Parts of this file were supplied by the projects creator, Jarred Parr, a fellow CS student.

*/


// The API toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = require('./programmers.json');

const utils = require("./utils");

// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
const port = 3000;

// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
  throw new Error('Could not find database of programmers!');
}


/*  Build our routes */
/* ================= */

// Responds with all available programmers.
app.get('/', (req, res) => {
  const pl = JSON.stringify(utils.getall());
  res.send(`Here are all of the the personal details of our programmers! <br> ${pl}`);
});

// Responds with a programmer's info if they are in the db.
app.get('/:id', (req, res) => {
  const id = req.params.id;
  const prog = utils.find(id);
  if(prog) res.send(prog);
  else res.send(`No programmer found with ID: ${id}`);
});

/*
app.put('/:id', (req, res) => {
  const id = req.params.id;
  res.send(`Fill me in to update values with ID: ${id}`);
}); */

// Validates and adds and obj to the db.
app.post('/', (req, res) => {  
  const body = req.body; // Hold your JSON in here!
  res.send(utils.append(body));
});

// Handles routes that don't exsist
app.get('*', (req, res) => {
  res.send("page not found");
});

app.listen(port, () => {
  console.log(`She's alive on port ${port}`);
});
