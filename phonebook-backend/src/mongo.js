const Person = require('./personDB');

if (process.argv.length < 3)
    return console.log("You need to pass the mongodb password as first argument");

const password = process.argv[2];
const url = `mongodb+srv://admin:${password}@project0-io3zn.mongodb.net/phonebookTest?retryWrites=true&w=majority`;

if (process.argv.length === 3)
    return Person.getAllPersons(url);
else
    return Person.addPerson(url, process.argv[3], process.argv[4] || "");



