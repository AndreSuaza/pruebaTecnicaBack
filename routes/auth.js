/*
    Ruta: /routes/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { login, validarToken } = require('../controllers/auth')
const router = Router();

router.post(
    '/', 
    [
        check('password', 'Password Obligatorio').not().isEmpty(),
        check('email', 'Email Obligatorio').isEmail(),
        validarCampos
    ], 
    login
);

router.get('/', 
[
    validarJWT
], 
    validarToken );

module.exports = router;