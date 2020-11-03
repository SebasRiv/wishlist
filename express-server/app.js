const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
    console.log('Server running in port 3000')
});

app.get('/url', (req, res, next) => {
    res.json(["paris", "barcelona", "barranquilla", "Montevideo", "Santiago de chile"]);
});

const ciudades = ['Paris', "Barcelona", "Barranquilla", "Montevideo", "Santiago de chile", "Mexico DF", "New York"]
app.get('/ciudades', (req, res, next) => res.json(ciudades.filter(c => c.toLowerCase().indexOf(req.query.q.toString().toLowerCase()) > -1)));

let misDestinos = [];

app.get('/my', (req, res, next) => {
    res.json(misDestinos);
});

app.post('/my', (req, res, next) => {
    console.log(req.body);
    misDestinos.push(req.body.nuevo);
    res.json(misDestinos);
});

app.get('/api/translation', (req, res) => res.json([
    { lang: req.query.lang, key: 'HOLA', value: 'HOLA ' + req.query.lang }
]));