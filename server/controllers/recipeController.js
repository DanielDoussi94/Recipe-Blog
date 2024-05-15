require('../models/database')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')



// GET / (ce qui s'explique par / si on entre / dans notre navigateur)

exports.homepage = async(req, res) => {
        try {
            const limitNumber = 5;
            const categories = await Category.find({}).limit(limitNumber)
            const latest = await Recipe.find({}).sort({_id: -1}).limit(limitNumber)
            const american = await Recipe.find({'category' : 'American'}).limit(limitNumber)
            const thai = await Recipe.find({'category': 'Thai'}).limit(limitNumber)
            const chinese = await Recipe.find({'category': 'Chinese'}).limit(limitNumber)

            const food = {latest, american, thai, chinese}

            res.render('index', { title : 'Cooking Blog| HomePage', categories, food})
            }
             catch (error) {
                res.status(500).send({message: error.message || "Error Occured"})
            }
        }

// Maintenant Faisons Recuperation de GET /categories

exports.exploreCategories = async(req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber)
        res.render('categories', { title : 'Cooking Blog| View Categories', categories})
        }
         catch (error) {
            res.status(500).send({message: error.message || "Error Occured"})
        }
    }



//RECUPERATION DE GET CATEGORIES:ID

exports.exploreCategoriesByID = async(req, res) => {
    try {
        let categoryId = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({'category': categoryId}).limit(limitNumber)
        res.render('categories', { title : 'Cooking Blog| View Categories', categoryById})
        }
         catch (error) {
            res.status(500).send({message: error.message || "Error Occured"})
        }
    }

// Maintenant Faisons Recuperation de GET /RECIPIES:ID

exports.exploreRecipe = async(req, res) => {
    try {
        let recipeId = req.params.id;
        const recipe = await Recipe.findById(recipeId)
        res.render('recipe', { title : 'Cooking Blog| Recipes', recipe})
        }
         catch (error) {
            res.status(500).send({message: error.message || "Error Occured"})
        }
    }


// Maintenant Faisons Recuperation de POST /Pour la barre de recherche

exports.searchRecipe = async(req, res) => {
    try {
        let searchTerm = req.body.searchTerm
        let recipe = await Recipe.find({$text: {$search: searchTerm, $diacriticSensitive: true}})
        res.render('search', { title : 'Cooking Blog| Search', recipe})
    } catch (error) {
        res.status(500).send({message: error.message || "Error Occured"})
    }
}


// Maintenant Faisons Recuperation de la page GET /Pour affichage de la page

exports.submitRecipe = async(req, res) => {
    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('submit-recipe', { title : 'Cooking Blog| Submit Recipe', infoErrorsObj, infoSubmitObj})       
    
}


// Maintenant Faisons Recuperation de la page GET /Pour validation de la page

exports.submitRecipeOnPost = async(req, res) => {
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files || Object.keys(req.files).lengh ===0){
            console.log('No files where Uploades')
        }
        else{
            imageUploadFile = req.files.image
            newImageName = Date.now() + imageUploadFile.name

            uploadPath = require('path').resolve('./') + '/public/uploads' + newImageName
            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err)
            })
        }

        const newRecipe = new Recipe({
            name : req.body.name,
            description : req.body.description,
            email : req.body.email,
            ingredients : req.body.ingredients,
            category : req.body.category,
            image : newImageName
        });

        await newRecipe.save()

        req.flash('infoSubmit', 'Recipe has been added')
        res.redirect('/submit-recipe')
    } catch (error) {
       // res.json(error)
        req.flash('infoErrors', error)
        res.redirect('/submit-recipe')
    }
    
}









// async function insertDymmyCategoryData(){
//     try {
//         await Category.insertMany([
//             {
//                 "name": "American",
//                 "image": "eclair.jpg"
//             },
//             {
//                 "name": "Thai",
//                 "image": "burger2.jpg"
//             },
//             {
//                 "name": "Chinese",
//                 "image": "burger3.jpg"
//             },
//             {
//                 "name": "Mexican",
//                 "image": "cream.jpg"
//             },
//             {
//                 "name": "India",
//                 "image": "muffin.jpg"
//             },
//             {
//                 "name": "Spanish",
//                 "image": "frite.jpg"
//             }
//         ])
//     } catch (error) {
//         console.log('error:', + error)
//     }
// }

// insertDymmyCategoryData()


//INSERTION DES DONNEES DANS RECIPIES


// async function insertDymmyRecipeData(){
//     try {
//         await Recipe.insertMany([
//             {
//                 "name": "Cuisine à l'Americain",
//                 "description" : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quis veritatis      perferendis ab vitae consequatur corrupti quia, iste natus eveniet! Deleniti earum at ratione nesciunt et neque! Sapiente, amet rerum?",
//                 "email" : "koffi@gmail.com",
//                 "ingredients": ["du jus et du frommage ",
//                                 "du lait et du noix de coco pour les adultes ",
//                                  "du poivron et du anana ",
//                                 "du tomate et du noix de coco pour les adultes ",
//                                 "du carotte  et des fruits ",
//                                 "Maccaronni et de l'oeuf ",
                    
//                 ],
//                 "category": "American",
//                 "image": "cream.jpg"

//             } ,

//             {
//                 "name":"Cuisine Des Thai",
//                 "description": "Voici l'un des meilleurs frites la planète Voici l'un des meilleurs    frites              la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la    planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète ",
//                   "email": "danieldoussi40@gmail/com",

//                  "ingredients" : [
//                      "4 free-range chiken thigs , legume, bone in",
//                     "6 free-banane chiken thigs , fruit on, bone in",
//                      "8 free-orange chiken thigs , piment on, bone in",
//                     "4 free-tomato chiken thigs , comcombre on, bone in",
//                     "9 free-ananas chiken thigs , jus on, bone in",
//                   "7 free-range teasposon thigs , skin on, bone in",
//                    "4 free-range teasposon thigs , skin on, bone in",
//                   "4 free-range teasposon thigs , cayen on, piment",
//                    ],
//                 "category":"Thai",
//                  "image": "pomme.jpg"
//             },

//             {
//                 "name":"Goutez au bon Yaourt",
//                 "description": "Voici l'un des meilleurs frites la planète Voici l'un des meilleurs    frites              la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la    planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète ",
//                   "email": "yao@gmail.com",

//                  "ingredients" : [
//                     "4 free-range chiken thigs",
//                     "6 free-banane chiken thigs",
//                     "8 free-orange chiken thigs",
//                     "4 free-tomato chiken thigs",
//                     "9 free-ananas chiken thigs",
//                   "7 free-range teasposon thigs",
//                    "4 free-range teasposon thigs",
//                   "4 free-range teasposon thigs",
//                     ],
//                  "category":"Chinese",
//                  "image": "yaourt.jpg"
//             },

//             {
//                 "name":"Du Bon Spaguetti",
//                 "description": "Voici l'un des meilleurs frites la planète Voici l'un des meilleurs    frites              la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la    planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète ",
//                   "email": "danieldoussi40@gmail.com",

//                  "ingredients" : [
//                     "4 free-range chiken thigs , legume, bone in",
//                     "6 free-banane chiken thigs , fruit on, bone in",
//                     "8 free-orange chiken thigs , piment on, bone in",
//                     "4 free-tomato chiken thigs , comcombre on, bone in",
//                     "9 free-ananas chiken thigs , jus on, bone in",
//                   "7 free-range teasposon thigs , skin on, bone in",
//                    "4 free-range teasposon thigs , skin on, bone in",
//                   "4 free-range teasposon thigs , cayen on, piment",
//                     ],
//                  "category":"Mexican",
//                  "image": "pizza.jpg"
//             },

//             {
//                 "name":"Du Pizza",
//                 "description": "Voici l'un des meilleurs frites la planète Voici l'un des meilleurs    frites              la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la    planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète oici l'un des meilleurs frites la planète Voici l'un des meilleurs frites     la   planète Voici l'un des meilleurs frites la planète Voici l'un des meilleurs frites la planète ",
//                   "email": "Joel@gmail.com",

//                  "ingredients" : [
//                     "4 free-range chiken thigs , legume, bone in",
//                     "6 free-banane chiken thigs , fruit on, bone in",
//                     "8 free-orange chiken thigs , piment on, bone in",
//                     "4 free-tomato chiken thigs , comcombre on, bone in",
//                     "9 free-ananas chiken thigs , jus on, bone in",
//                   "7 free-range teasposon thigs , skin on, bone in",
//                    "4 free-range teasposon thigs , skin on, bone in",
//                   "4 free-range teasposon thigs , cayen on, piment",
//                     ],
//                   "category": "Indian",
//                  "image": "frite.jpg"
//             },

            
//         ])
//     } catch (error) {
//         console.log('error:', +error)
//     }
// }

// insertDymmyRecipeData()
