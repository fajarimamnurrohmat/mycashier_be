const Joi = require("joi");
const BarangPayloadSchema = Joi.object({
    nama_barang: Joi.string().required(),
    harga: Joi.number().required()
});
module.exports = { BarangPayloadSchema };
