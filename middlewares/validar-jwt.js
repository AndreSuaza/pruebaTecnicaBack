const {response} = require('express');
const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario')

const validarJWT = (req, res = response, next) => {
    
    //Leer Token 
    const token = req.header('x-token');

    if ( !token ) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token'
            });
    }

    try {

        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;
        console.log('pas ',req.uid)
        next();

    } catch (error) {
        return res.status(401).json({
                ok:false,
                msg: 'Token no valido'
        });
    }

    

}


const validarRol = async(req, res, next) => {

    const token = req.header('x-token');
    const { uid } = jwt.verify( token, process.env.JWT_SECRET );

    try {

        const usuarioDB = await usuario.findById(uid);
        if( !usuarioDB ) {
            return res.status(404).json({
                ok:false,
                msg: 'Usuario no Existe'
            });
        }

        if(usuarioDB.role != 'ADMIN_ROL') {
            return res.status(403).json({
                ok:false,
                msg: 'No tiene provilegios'
            });
        }

        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
                ok:false,
                msg: 'Cominiquece con el Administrador'
        });
    }

}


module.exports = {
    validarJWT,
    validarRol
}