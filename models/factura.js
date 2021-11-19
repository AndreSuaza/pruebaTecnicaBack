const { Schema, model} = require('mongoose')

const FacturaSchema = Schema({

    id: {
        type: Number,
        require: true,
        unique: true
    },
    valorTotal: {
        type: Number,
        require: true,
    },
    ivaTotal: {
        type: Number,
        require: true,
    },
    pagada: {
        type: Boolean,
        require: true,
    },
    productos: {
        type: Array,
        require: true
    }

});


module.exports = model( 'Factura', FacturaSchema );