const express = require('express');
const app = express();


const phoneBook =
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

app.get("/api/persons", (req, res) => res.json(phoneBook))

const PORT = 3001;
app.listen(PORT, () => `Server listening on port ${PORT}`);