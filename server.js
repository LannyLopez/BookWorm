const path = require('path');
const express = require('express');

const session = require('express-session');
const expHandlebars = require('express-handlebars');

const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const sess1 = {
  secret: 'Definitely super secret',
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess1));

const hbs = expHandlebars.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});