const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const personDB = require('./personDB');
require('dotenv').config();

app.use(bodyParser.json());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :response-time ms :body'));

app.use(cors());
app.use(express.static('build'));

const url = process.env.MONGODB_URI;

app.get("/api/persons", (req, res) => {
  personDB.getAllPersons(url).then(persons => {
    res.json(persons.map(per => {return {id: per._id, name: per.name, number: per.number}}));
  });
});

app.get("/api/info", (req, res) => {
    personDB.getPersonsCount(url).then(count => {
      const resText = `Phonebook has info for ${count} people!<br/>${Date(Date.now).toString()}`
      res.send(resText);
    })
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  personDB.getPersonByID(url, id).then(person => {
    if(person)
      res.json(person)
    else
      res.status(404).end();
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phoneBook = phoneBook.filter(person => person.id !== id)
  res.status(204).end();
})

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (person.name === "")
    return res.status(400).json({error: "name missing!"});
  if (person.number === "")
    return res.status(400).json({error: "number missing!"});
  personDB.addPerson(url, person.name, person.number).then(person => res.json(person));
})

app.put("/api/persons/:id", (req, res) => {
  personDB.updatePerson(url, req.body.id, req.body.number).then(person => res.json(person));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => `Server listening on port ${PORT}`);
