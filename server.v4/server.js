const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require('fs');

require("dotenv").config({ path: "./config.env" });

const config = require("./config.json");

const port = config.port || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(require("./routes/record"));

// get driver connection
const dbo = require("./db/conn");

const corsOrigin = config.cors_origins;
app.use(cors({
  origin: '*', // Isso permite acesso de todas as origens
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

let id;
app.post('/fuck-the-id', (req, res) => {
  id = req.body.value;
})

dbo.connectToServer(function (err) {
  if (err) {
    console.error('Erro ao conectar com o banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida com o banco de dados!');
  }
});

https.createServer({
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem"),
}, app).listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

