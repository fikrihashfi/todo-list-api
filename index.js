const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const path = require('path');
const db = require('./models/db');
require('dotenv').config();


const app = express();

const port = process.env.PORT || 5000;

db.create_db_collection();
// mongoose.connect(process.env.DB_URI_Local, { useNewUrlParser: true })
//   .then(() => {
//     console.log(`Database connected successfully`)
//     console.log(process.env.DB_URI_Local);
//   })
//   .catch(err => console.log(err));

// mongoose.Promise = global.Promise;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.use('/api', routes);

app.use('/',(req, res, next) => {

    res.send("API SERVER!");
  });

app.use((err, req, res, next) => {
    console.log(err);
    next();
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  });