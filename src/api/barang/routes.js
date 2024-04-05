const routes = (handler) => [
    {
        method: "POST",
        path: "/barang",
        handler: handler.postBarangHandler,
    },
    {
        method: "GET",
        path: "/barang",
        handler: handler.getBarangHandler,
    },
    // {
    //     method: "GET",
    //     path: "/users/{id}",
    //     handler: handler.getUserByIdHandler,
    // },
    // {
    //     method: "PUT",
    //     path: "/users/{id}",
    //     handler: handler.putUserByIdHandler,
    // },
    {
        method: "DELETE",
        path: "/barang/{id}",
        handler: handler.deleteBarangByIdHandler,
    },
  ];
module.exports = routes;
  