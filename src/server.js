require('dotenv').config();
const Hapi = require("@hapi/hapi");

//barang
const barang = require("./api/barang");
const BarangService = require("./services/postgres/BarangService");
const BarangValidator = require("./validator/barang")

const init = async () => {
    const barangService = new BarangService();
    const server = Hapi.server({
        port: 5000,
        host: "localhost",
        routes: {
        cors: {
            origin: ["*"],
        },
        },
    });
    await server.register({
        plugin: barang,
        options: {
            service: barangService,
            validator: BarangValidator,
        },
    });


    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
init();
