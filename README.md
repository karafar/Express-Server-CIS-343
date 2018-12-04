# Express Server, CIS 343

### Getting Started

The only requirements are:
* Having node installed. `sudo apt-get install nodejs`.
* Downloading this repository.
* Having curl installed. `sudo apt-get install curl`.

When ready, run the following command `npm start`, and then open a second terminal.
Alternatively, use `npm start &` to run the server in the background then there is no need for a second terminal. Just be prepared to kill the job afterward.

#### Sending commands to our server.

##### Getting all of our programmers

Now that we have our server up and running we can use curl to send some commands. Our server is set up to return all of the programmers within our 'database' (json file).
```
curl -X GET http://localhost:3000
```
We should see the contents of our JSON file returned.

Alternatively, we could have gone to the browser and typed `localhost:3000`.

##### Getting a specific programmer by ID

To get a specific programmer use the following command.
```
curl -X GET http://localhost:3000/00000-000000-00000
```

If the programmer exists, then we will see their details. Otherwise, a small message will be returned.


##### We can add a programmer with a post request.

The validation for the JSON is quite strict, so I'd reccomend looking at the `utils.js` file. That is where the schema is located.

```
curl -X POST -H 'Content-Type:application/json' http://localhost:3000 -d '{"firstName":"babagoy","lastName":"sinclair","homeAddress":"1234 burrito bld","SID":"12345-000000-00000","goodSlave":"true","beatingsToDate":9999,"family":{"husband":{"firstName":"Torfelvin","lastName":"burt","homeAddress":"1234 Mayberry Lane","SID":"NS","goodSlave":"NS","beatingsToDate":-1},"children":[{"Designation":"Jeff Jr."},{"Designation":"Turtle Person"},{"Designation":"REDACTED"}]}}'
```


