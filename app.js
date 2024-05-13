const express = require('express')
const expressLayout = require('express-ejs-layouts')
const fileUpload = require('express-fileupload')
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')
const app = express()
const database = require('./server/models/database') //Exportation de la base de donnés
const port = process.env.PORT || 4000;

require('dotenv').config();


app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(expressLayout); // Pour appeler expressLayout pour les mise en page
app.set('view engine', 'ejs'); //Configuration du moteur de template

app.use(cookieParser('CookingBlogSecure'))//Configuration de du midleware Cookie-Parser

// Configuration de express-session
app.use(session({
    secret: 'CookingBlogSecretSession',
    resave: true,
    saveUninitialized: true
  }));

  // Configuration de connect-flash
app.use(flash());

// Configuration de express-fileupload
app.use(fileUpload());

//Définition de l'emplacement des fichiers de mise en page (layout)
app.set('layout', 'layouts/main');

//appelation des routes
const routes = require('./server/routes/recipeRoutes')
app.use('/', routes)

app.listen(port, ()=>{
    console.log(`Le port est ecouté sur ${port}`)
})


