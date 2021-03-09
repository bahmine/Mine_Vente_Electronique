const bodyParser = require ('body-parser');
const express = require ('express');
const cors = require ('cors');

const app = express ();
const PORT = 4500;
const routes = express.Router ();

app.use ("/api",routes);

//cors
routes.use (cors ());

//bodye-parser
routes.use (bodyParser.urlencoded({extended: false}));
routes.use (bodyParser.json());

//get
routes.get ('/',(req,res)=> {
    res.send ('Salut poto!');
});

routes.get ('/produits',(req,res)=> {
    res.send ('Liste des produits');
});
app.listen (PORT, () => {
    console.log (`serveur démarré sur le port ${PORT}`);
});
