const express         = require('express');
const cors            = require('cors');
const { readdirSync } = require('fs');

const app = express();

const sequelize = require('./db');
sequelize;

app.use(cors());
app.use(express.json({ limit: '50MB' }));
app.use(express.urlencoded({ extended: true, limit: '50MB' }));

const crudFiles  = readdirSync('/projects/biblioteca/src/versions/v1/');
const modelFiles = readdirSync('/projects/biblioteca/src/models/');

// pre-load all controllers with express and all models from sequelize
for(let file of crudFiles){
  const crudFile = require(`/projects/biblioteca/src/versions/v1/${file}`);

  for(let model of modelFiles){
    const modelFile = require(`/projects/biblioteca/src/models/${model}`);
    crudFile(app, modelFile, sequelize);
  }
}

app.use('./versions/v1/crud/*', (req, res, next)=>{ next() });

app.listen(3000, (err) => {
  if(err){
    console.error('Failed on startup', err.message);
  }

  console.log('Server running on 3000');
});
