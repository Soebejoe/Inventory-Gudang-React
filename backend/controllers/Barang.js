import Barang from '../models/Barang.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const Me = async (req, res) => {
  return res.json({ Status: "Success", name: req.name, role: req.role });
}

export const Tampil = async (req, res) => {
  try {
    const barang = await Barang.find();
    return res.json(barang);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Tambahbarang = async (req, res) => {
  const barang = new Barang({
    nama_barang: req.body.nama_barang,
    harga: req.body.harga,
    stok: req.body.stok,
    deskripsi: req.body.deskripsi,
    gambar: req.file.filename // Ambil nama file yang diupload dari multer
  });

  try {
    const newBarang = await barang.save();
    return res.json({ Status: 'Success', Data: newBarang });
  } catch (err) {
    return res.status(500).json({ Error: err.message });
  }
};

export const Edit = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);
    return res.json(barang);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Update = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama_barang, harga, stok, deskripsi } = req.body;

        // Find existing barang
        const barang = await Barang.findById(id);
        if (!barang) {
            return res.status(404).json({ message: 'Barang not found' });
        }

        // Update fields
        barang.nama_barang = nama_barang;
        barang.harga = harga;
        barang.stok = stok;
        barang.deskripsi = deskripsi;

        // Handle image upload
        if (req.file) {
            const oldImagePath = path.join(__dirname, '..', 'uploads', barang.gambar);
            // Delete old image if exists
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
            barang.gambar = req.file.filename;
        }

        await barang.save();
        res.json({ message: 'Barang updated successfully' });

    } catch (error) {
        console.error('Error updating barang:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const Delete = async (req, res) => {
  try {
    const barang = await Barang.findById(req.params.id);

    if (!barang) {
      return res.status(404).json({ error: 'Barang not found' });
    }

    if (barang.gambar) {
      fs.unlinkSync(path.join(__dirname, '..', 'uploads', barang.gambar));
    }

    await barang.remove();
    res.json({ message: 'Barang deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting barang' });
  }
}
