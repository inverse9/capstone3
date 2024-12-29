const db = require("../config/db.js");

const TABLE = "pura";

exports.getAllPura = (req, res) => {
  const sql = `SELECT * FROM ${TABLE}`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getPuraById = (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM ${TABLE} WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Pura not found" });
    res.json(result[0]);
  });
};

exports.addPura = (req, res) => {
  const { nama, deskripsi, lokasi } = req.body;
  const foto = req.file ? req.file.filename : null;

  if (!foto) return res.status(400).json({ error: "Photo upload is required" });

  const query = `INSERT INTO ${TABLE} (nama, deskripsi, foto, lokasi) VALUES (?, ?, ?, ?)`;

  db.query(query, [nama, deskripsi, foto, lokasi], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "insertion failed" });
    }
    res
      .status(201)
      .json({ id: results.insertId, nama, deskripsi, foto, lokasi });
  });
};

exports.updatePura = (req, res) => {
  const { id } = req.params;
  const { nama, deskripsi, lokasi } = req.body;
  const foto = req.file ? req.file.filename : null;

  let query = `UPDATE ${TABLE} SET nama = ?, deskripsi = ?, lokasi = ?`;
  const params = [nama, deskripsi, lokasi];

  if (foto) {
    query += ", foto = ?";
    params.push(foto);
  }

  query += " WHERE id = ?";
  params.push(id);

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: "Database update failed" });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Pura not found" });
    res.json({ message: "Pura updated successfully" });
  });
};

exports.deletePura = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM ${TABLE} WHERE id = ?`, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ error: "Pura not found" });

    res.json({ message: "Pura deleted successfully" });
  });
};
