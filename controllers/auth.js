const { response } = require("express");
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT }= require('../helpers/jwt')

const login = async( req, res = response) => {

    const { email, password } = req.body;  

    try {
        
        const usuarioDB = await Usuario.findOne({ email });
       
        //Verificar Email

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg: 'Email o Password invalida'
            });
        }

        //Verificar Contraseña

        const validarPassword = bcrypt.compareSync( password, usuarioDB.password );

        if(!validarPassword){
            return res.status(400).json({
                ok:false,
                msg: 'Email o Password invalida'
            });
        }

        delete usuarioDB._doc.password;

        //Generar Token 
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
            usuario: usuarioDB
        })


    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error Autenticacion'
        });

    }

}

const validarToken = async(req, res = response ) => {

    const id = req.uid;

    try {
        const usuario = await Usuario.findById(id);
        delete usuario._doc.password;

        res.json({
            ok: true,
            usuario
        });
        
    } catch (error) {
        console.log('Error', error) 
        res.status(500).json({
            ok : false,
            msg : "Error inesperado revisar logs"
        });
    }
}

module.exports = {
    login,
    validarToken
}