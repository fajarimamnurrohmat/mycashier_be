class BarangHandler {
    constructor(service, validator) {
        this._service = service;
        this._validator = validator;
        this.postBarangHandler = this.postBarangHandler.bind(this);
        this.getBarangHandler = this.getBarangHandler.bind(this);
        // this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
        // this.putUserByIdHandler = this.putUserByIdHandler.bind(this);
        this.deleteBarangByIdHandler = this.deleteBarangByIdHandler.bind(this);
    }
    async postBarangHandler(request, h) {
        try {
            this._validator.validateBarangPayload(request.payload);
            const { nama_barang, harga } = request.payload;
            const barangId = await this._service.addBarang({ nama_barang, harga});
            const response = h.response({
                status: "success",
                message: "Barang berhasil ditambahkan",
                data: {
                    barangId,
                },
            });
            response.code(201);
            return response;
        } 
        catch (error) {
            const response = h.response({
                status: "fail",
                message: error.message,
            });
            response.code(400);
            return response;
        }
    }
    async getBarangHandler() {
        const barang = await this._service.getBarang();
        return {
            status: "success",
            data: {
                barang,
            },
        };
    }
    // async getUserByIdHandler(request, h) {
    //     try {
    //         const { id } = request.params;
    //         const user = await this._service.getUserById(id);
    //         return {
    //             status: "success",
    //             data: {
    //                 user,
    //             },
    //         };
    //     } 
    //     catch (error) {
    //         const response = h.response({
    //             status: "fail",
    //             message: error.message,
    //         });
    //         response.code(404);
    //         return response;
    //     }
    // }
    // async putUserByIdHandler(request, h) {
    //     try {
    //         this._validator.validateUserPayload(request.payload);
    //         const { username, password, level } = request.payload;
    //         const { id } = request.params;
    //         await this._service.editUserById(id, { username, password, level });
    //         return {
    //             status: "success",
    //             message: "User berhasil diperbarui",
    //         };
    //     } 
    //     catch (error) {
    //         const response = h.response({
    //             status: "fail",
    //             message: error.message,
    //         });
    //         response.code(404);
    //         return response;
    //     }
    // }
    async deleteBarangByIdHandler(request, h) {
        try {
            const { id } = request.params;
            await this._service.deleteBarangById(id);
            return {
                status: "success",
                message: "Barang berhasil dihapus",
            };
        } 
        catch (error) {
            const response = h.response({
                status: "fail",
                message: "Barang gagal dihapus. Id tidak ditemukan",
            });
            response.code(404);
            return response;
        }
    }
}

module.exports = BarangHandler;