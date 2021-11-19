/*
Route api/Usuarios
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getUsuarios, crearUsuario } = require('../controllers/usuarios');
const { validarJWT, validarRol } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getUsuarios);
router.post(
    '/',
    [
        validarJWT,
        validarRol,
        check('nombre', 'Nombre Obligatorio').not().isEmpty(),
        check('password', 'Password Obligatorio').not().isEmpty(),
        check('email', 'Email Obligatorio').isEmail(),
        check('rol', 'Rol Obligatorio').isEmail(),
        validarCampos
    ],
    crearUsuario
);

module.exports = router;



