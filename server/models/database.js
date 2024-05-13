const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://leinad:leinad2024@cluster0.fgtim8c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connecté avec succes à la base de données')
})
.catch((error)=>{
    console.log('erreur de connexion à la base de données ' +error)
})


//Models
require('./Category')
require('./Recipe')
