/*
Farid Karadsheh
Ira Woodring
GVSU CIS 343-01
12-3-2018

Purpose: Utilties for reading/writing from/to our 'database' (text file).
*/

const Joi = require('joi');
const fs = require('fs');
const db = "./programmers.json";

module.exports.validate = validate;
module.exports.getall = getall;
module.exports.find = find;
module.exports.append = append;

/* This is a bit rough since I did this in a hour while reading the Joi documentation.
   I wanted to preserve the original object as much as possible, but one change I made
   was only allowing either the husband or the wife. I think just having a 'spouse' key
   would have made more sense. Anyways, an obj with a wife and a husband is not valid, so
   just omit the other if one is present.

   This is the schema for a 'programmer'. If an obj does not meet this schema's criteria, then
   it is considered invalid.
*/
const progSchema = Joi.object().keys({
	firstName: Joi.string().regex(/^([A-Za-z]+)$/).required(),
	lastName: Joi.string().regex(/^([A-Za-z]+)$/).required(),
	homeAddress: Joi.string().regex(/^[#.0-9a-zA-Z\s,-]+$/).required(),
	SID: Joi.string().regex(/^([0-9]{5}-[0-9]{6}-[0-9]{5})|(NS)$/).required(),
	goodSlave: Joi.string().regex(/^(true)|(false)|(NS)$/).required(),
	beatingsToDate: Joi.alternatives().try(Joi.number(), Joi.string().regex(/^(NS)$/)),
	family: Joi.object().keys({
	  wife: Joi.object().keys({
	    firstName: Joi.string().regex(/^([A-Za-z]+)$/),
	    lastName: Joi.string().regex(/^([A-Za-z]+)$/),
	    homeAddress: Joi.string().regex(/^[#.0-9a-zA-Z\s,-]+$/),
        SID: Joi.string().regex(/^([0-9]{5}-[0-9]{6}-[0-9]{5})|(NS)$/),
	    goodSlave: Joi.string().regex(/^(true)|(false)|(NS)$/),
	    beatingsToDate: Joi.alternatives().try(Joi.number(), Joi.string().regex(/^(NS)$/)),
	  }).with('firstName', ['lastName', 'homeAddress']).with('SID', ['goodSlave', 'beatingsToDate']),
	  husband: Joi.object().keys({
	    firstName: Joi.string().regex(/^([A-Za-z]+)$/),
	    lastName: Joi.string().regex(/^([A-Za-z]+)$/),
	    homeAddress: Joi.string().regex(/^[#.0-9a-zA-Z\s,-]+$/),
        SID: Joi.string().regex(/^([0-9]{5}-[0-9]{6}-[0-9]{5})|(NS)$/),
	    goodSlave: Joi.string().regex(/^(true)|(false)|(NS)$/),
	    beatingsToDate: Joi.alternatives().try(Joi.number(), Joi.string().regex(/^(NS)$/)),
	  }).with('firstName', ['lastName', 'homeAddress']).with('SID', ['goodSlave', 'beatingsToDate']),
          children: Joi.array().items().label('Designation'),
	}).without('wife', 'husband'),
});

/* Attempt to validate the obj. Return the obj on success. Return the details of the err on failure.*/
function validate(obj) {
	try {
		return Joi.validate(obj, progSchema, (err, val) => {
			if(err) {
			console.log(err);
				throw err;
			}
			else {
				return val;
			}
		});
	} catch(err) {
		return err.details;
	}
}

/* Private helper that reads the "./programmers.json" file.*/
function readDB() {
	return JSON.parse(fs.readFileSync(db));
}

/* Returns an array of all of the programmers.
   This is basically the same as readDB, but this semantically
   makes more sense as an exported function. */
function getall() {
	return readDB();
}

/* Searches through the database for an obj that matches the supplied sid. All SIDs are a string
   of the following format: "00000-000000-00000". The SID is always be 5x6x5.
   Returns null if nothing is found.*/
function find(sid) {
	// Programmer list
	const pl = readDB();
	for(let i = 0; i < pl.length; i++) {
		if( pl[i].SID === sid) return pl[i];
		else return null;
	}
}

// Validates and adds a programmer to the list.
function append(obj) {
	// Programmer list
	let pl = readDB();
	const temp = validate(obj);
	// Dirty comparison.
	if(JSON.stringify(temp) === JSON.stringify(obj)) {
		pl.push(obj);
		fs.writeFile(db, JSON.stringify(pl), (err) => {
		    return err;
		});
	} else {
		return temp;
	}
}
