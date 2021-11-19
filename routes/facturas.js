/*
Route api/Facturas
*/ 
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos')

const { getFacturas, crearFactura, editarFactura, eliminarFactura } = require('../controllers/facturas');
const { validarJWT, validarRol } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validarJWT, getFacturas);
router.post(
    '/',
    [
        validarJWT,
        validarRol,
        check('id', 'Identificacion debe ser Numerico').isNumeric(),
        check('valorTotal', 'valorTotal debe ser Numerico').isNumeric(),
        check('ivaTotal', 'ivaTotal debe ser Numerico').isNumeric(),
        check('pagada', 'pagada debe ser Obligatorio').isBoolean(),
        check('productos', 'Productos Obligatorios').not().isEmpty(),
        validarCampos
    ],
    crearFactura
);

router.put(
    '/:id',
    [ 
        validarJWT,
        validarRol,
        check('valorTotal', 'valorTotal debe ser Numerico').isNumeric(),
        check('ivaTotal', 'ivaTotal debe ser Numerico').isNumeric(),
        check('pagada', 'pagada debe ser Obligatorio').isBoolean(),
        check('productos', 'Productos Obligatorios').not().isEmpty(),
        validarCampos
    ],
    editarFactura
);

router.delete(
    '/:id',
    [   
        validarJWT,
        validarRol,
    ],
    eliminarFactura
);

module.exports = router;



