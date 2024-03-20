const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./src/database/models');
const cors = require('cors');
const userController = require('./src/controller/auth.controller');
const Router = require('./src/routes');
const app = express();
const port = 5000;
console.log('server.js');
//Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Route for user login

app.use('/', Router);
// Start the server
app.listen(port, async () => {
  try {
    // Synchronize Sequelize models with the database
    await sequelize.sync();
    console.log(`Server is listening at http://localhost:${port}`);
  } catch (error) {
    console.error('Error syncing Sequelize models:', error);
  }
});
