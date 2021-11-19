require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear Servidor Express
const app = express();

// Configurar CORS
app.use( cors() );

//Lectura del Body
app.use( express.json() );

//Base de datos
dbConnection();

//Rutas

app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));
app.use( '/api/facturas', require('./routes/facturas'));

app.get('/', (req,res) => {

    res.json({
        ok:true,
        msg: 'Hola Mundo'
    })

});

app.listen( process.env.PORT, () => console.log('puerto'));
