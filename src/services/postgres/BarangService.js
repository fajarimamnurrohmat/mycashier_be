const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const NotFoundError = require("../../exeptions/NotFoundError")
const InvariantError = require("../../exeptions/InvariantError");

class BarangService {
  constructor() {
    this._pool = new Pool();
  }

  async addBarang({ nama_barang, harga}) {
    const id = nanoid(16);
    const query = {
      text: "INSERT INTO barang VALUES($1, $2, $3) RETURNING id",
      values: [id, nama_barang, harga],
    };
    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError("Barang gagal ditambahkan");
    }
    return result.rows[0].id;
  }

  async getBarang() {
    const result = await this._pool.query("SELECT * FROM barang");
    return result;
  }

  async getBarangById(id) {
      const query = {
          text: "SELECT * FROM barang WHERE id = $1",
          values: [id],
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {
          throw new NotFoundError("Barang tidak ditemukan");
      }
      return result.rows[0];
  }

  async editBarangById(id, { nama_barang, harga }) {
      const query = {
          text: "UPDATE barang SET nama_barang = $1, harga = $2 WHERE id = $3 RETURNING id",
          values: [nama_barang, harga, id],
      };

      const result = await this._pool.query(query);

      if (!result.rows.length) {
          throw new NotFoundError("Gagal memperbarui barang. Id tidak ditemukan");
      }
  }

  async deleteBarangById(id) {
      const query = {
          text: "DELETE FROM barang WHERE id = $1 RETURNING id",
          values: [id],
      };
      const result = await this._pool.query(query);
      if (!result.rows.length) {
          throw new NotFoundError("Barang gagal dihapus. Id tidak ditemukan");
      }
  }
}
module.exports = BarangService;
