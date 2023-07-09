const path = require('path');
const express = require('express');
const session = require('express-session');
const webRoutes = require('./routes/webRoutes');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const bcrypt = require('bcrypt');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const hbs = exphbs.create({ helpers, extname: 'hbs' });

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));


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
  })
};

app.use(session(sess));

app.use(webRoutes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port: 'http://localhost:${PORT}`));
});
