/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('barang',{
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        nama_barang: {
            type: 'VARCHAR(50)',
            notNull:true,
        },
        harga: {
            type: 'INTEGER',
            notNull: true,
        }
    });
};

exports.down = pgm => {
    pgm.dropTable('barang');
};
