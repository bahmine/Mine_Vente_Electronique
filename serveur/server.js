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
/*routes.use (bodyParser.urlencoded({extended: false}));
routes.use (bodyParser.json());*/
routes.use (express.json ());


//connexion au serveur : en définition de l'url
const url = "mongodb+srv://bahm:1996bAH30@cluster0.jbkx7.mongodb.net/MineElecVente?retryWrites=true&w=majority";
/**On se connect à la base de données MineElecVente */
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
        if (err) throw Error(err);
        //on sélectionne la collection produit
       // const collection = client.db("MineElecVente").collection("produits");
        
        !err && console.log ('connected');
        client.close();
});


/****Définition des routes*/
//route:'/'
routes.get ('/',(req,res)=> {
    res.send ('Salut poto!');
});
//routes :'/produits'
routes.get ('/produits',(req,res)=> {
    res.send ('Liste des produits');
});


//création du serveur sur le ${PORT}
app.listen (PORT, () => {
    //if (err) throw err;
    console.log (`serveur démarré sur le port ${PORT}`);
});



