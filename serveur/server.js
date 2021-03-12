const bodyParser = require ('body-parser'); //: déprécier maintenant
const express = require ('express');
const cors = require ('cors');
const MongoClient = require ('mongodb').MongoClient;



//utils
const app = express ();
const PORT = 3000;
const routes = express.Router ();

//définition de notre routes api
app.use ("/api",routes);

//cors
routes.use (cors ());

//bodye-parser
routes.use (bodyParser.urlencoded({extended: true}));
routes.use (bodyParser.json());
//routes.use (express.json ());
const jsonParser = bodyParser.json ();

//connexion au serveur : en définition de l'url
const madb = 'MineElecVente';

const uri = `mongodb+srv://sabry:sabry123@cluster0.jbkx7.mongodb.net/${madb}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect((err) => {
    if (err) {
        throw Error(err);
    }
    
    !err && console.log(`Connexion à la bd réussie`);
    const produits = client.db(madb).collection("produits");
    
    //cette route get: affiche la liste des produits
    routes.get("/produits",jsonParser,function (req, res) {
        produits
        .find({})
        .toArray((err,resultat)=> {
            if (err) return res.send (err);
            res.status (200).send ({resultat});
            //console.log (resultat);
        });
    });
    //cette route post pour rajouter un élément dans la base: pour cela on exécute insertOne ssur notre collection
    routes.post ('/produits/ajout',jsonParser,(req,res)=> {
        produits.insertOne (req.body,(err,result)=> {
            if (err) {
                console.log (err);
                return res.send (err);
            } 
            console.log (req.body);
            res.status (200).send (req.body);
        });
    });
});


/****Définition des routes*/
//route:'/'
routes.get ('/',(req,res)=> {
    res.send ('Salut poto!');
});
//création du serveur sur le ${PORT}
app.listen (PORT, () => {
    //if (err) throw err;
    console.log (`serveur démarré sur le port ${PORT}`);
});



