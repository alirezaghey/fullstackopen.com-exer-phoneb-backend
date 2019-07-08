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


// app.use(morgan('tiny'));


let phoneBook =
[
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      },
      {
        "name": "lalagah",
        "number": "4456704",
        "id": 6
      },
      {
        "name": "alireza ghey",
        "number": "304394934034",
        "id": 8
      },
      {
        "name": "Robin Hood",
        "number": "5566066-454545",
        "id": 9
      },
      {
        "name": "az gh",
        "number": "550550505",
        "id": 10
      },
      {
        "name": "salomon",
        "number": "3040343456",
        "id": 15
      }
    ];

const url = process.env.MONGODB_URI;

app.get("/api/persons", (req, res) => {
  personDB.getAllPersons(url).then(persons => {
    res.json(persons.map(per => {return {id: per._id, name: per.name, number: per.number}}));
  });
});

app.get("/api/info", (req, res) => {
    // const resText = `Phonebook has info for ${phoneBook.length} people!<br/>${Date(Date.now).toString()}`;
    // res.send(resText);
    personDB.getPersonsCount(url).then(count => {
      const resText = `Phonebook has info for ${count} people!<br/>${Date(Date.now).toString()}`
      res.send(resText);
    })
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  // const person = phoneBook.find(person => person.id === id);
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
  if (phoneBook.some(el => el.name.toLocaleLowerCase() === person.name.toLocaleLowerCase()))
    return res.status(400).json({error: "name already exists!"});
  
  person.id = Math.floor(Math.random() * 10000);
  phoneBook = phoneBook.concat(person);
  res.json(person);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => `Server listening on port ${PORT}`);
