const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());


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

app.get("/api/persons", (req, res) => res.json(phoneBook));

app.get("/api/info", (req, res) => {
    const resText = `Phonebook has info for ${phoneBook.length} people!<br/>${Date(Date.now).toString()}`;
    res.send(resText);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phoneBook.find(person => person.id === id);
  if(person)
    res.json(person)
  else
    res.status(404).end();
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  phoneBook = phoneBook.filter(person => person.id !== id)

  res.status(204).end();
})

app.post("/api/persons", (req, res) => {
  const person = req.body;
  person.id = Math.floor(Math.random() * 10000);
  console.log(person);
  phoneBook = phoneBook.concat(person);
  res.json(person);
})

const PORT = 3001;
app.listen(PORT, () => `Server listening on port ${PORT}`);