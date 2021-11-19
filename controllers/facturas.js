const { response } = require('express');
const Factura = require('../models/factura');

const getFacturas = async( req ,res = response ) => {

    const facturas = await Factura.find();

    res.json({
        ok:true,
        facturas
    })

}

const crearFactura = async(req, res = response) => {

    const { id } = req.body;
    try {
        
        const facturaExiste = await Factura.findOne({ id });

        if(facturaExiste) {
            return res.status(400).json({
                ok:false,
                msg: 'La Factua ya Existe'
            })
        }

        const factura = new Factura( req.body )
        
        //Guardar usuario
        await factura.save();

        res.json({
            ok:true,
            factura
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error'
        });
    }
}

const editarFactura = async(req, res = response) => {

    const fid = req.params.id;

    try {

        const facturaExiste = await Factura.findOne({ id: fid });

        if(!facturaExiste) {
            res.status(400).json({
                ok:false,
                msg: 'La Factura no Existe'
            });

        }

        const campos = req.body;
        delete campos.id;

        const facturaActualizado = await Factura.findByIdAndUpdate( facturaExiste._id , campos, { new:true} );  

        res.json({
            ok:true,
            facturaActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error'
        });
    }

}

const eliminarFactura = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const facturaExiste = await Factura.findOne({ id: uid });

            if(!facturaExiste) {
                res.status(400).json({
                    ok:false,
                    msg: 'La Factura no Existe'
                });

            }

        await Factura.findByIdAndDelete( facturaExiste._id );  

        res.json({
            ok:true,
            msg: 'Factura Eliminada'
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
    getFacturas,
    crearFactura,
    editarFactura,
    eliminarFactura
}