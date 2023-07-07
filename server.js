const path = require('path');
const express = require('express'); //yes
const session = require('express-session'); //yes
const webRoutes = require('./routes/webRoutes'); //controllers?
const exphbs = require('express-handlebars'); 
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);



// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers, extname: 'hbs' });

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup (Handlebars)
// Inform Express.js on which template engine to use
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  }) //add to my project
};

app.use(session(sess));

// API routes
app.use(webRoutes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port: 'http://localhost:${PORT}`));
});
