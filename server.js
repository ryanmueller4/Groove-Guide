// Import necessary modules
const path = require ('path');
const express = require ('express')
const session = require('express-session');
const exphbs = require('express-handlebars')
const router = require('./controllers')

const sequelize = require('./config/connection')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Import the logoutRoutes module
// const logoutRoutes = require('./controllers/logoutRoutes')

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 3000;

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Set up Handlebars as the template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Use the logoutRoutes middleware
// app.use(logoutRoutes);

app.use(router)

// Sync the Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })});