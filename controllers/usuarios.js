const { response } = require('express');

const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async(req,res) => {

    const usuarios = await Usuario.find({}, 'nombre email role');

    res.json({
        ok:true,
        usuarios,
    })

}

const crearUsuario = async(req, res = response) => {

    const { password } = req.body;    

    try {
        
        const usuario = new Usuario( req.body );
        
        //Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        
        //Guardar usuario
        await usuario.save();

        res.json({
            ok:true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error'
        });
    }


    

}


module.exports = {
    getUsuarios,
    crearUsuario,

}