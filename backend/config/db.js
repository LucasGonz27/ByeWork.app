const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'byework'
});

connection.connect((err) => {
    if (err){
        console.log("Erreur de connexion : " + err.stack);
        return;
    }
    console.log("Connexion réussie à la base");
});

module.exports = connection;