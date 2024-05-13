
const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: 'Ce champ est obligatoire'
    },
    image:{
        type: String,
        required : 'Ce champ est obligatoire'
    },
});

//Creation du modèle à partir du Schema
module.exports = mongoose.model('Category',categorySchema)