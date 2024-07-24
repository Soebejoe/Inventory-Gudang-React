import BarangMasuk from '../models/BarangMasuk.js';
import Barang from '../models/Barang.js';
import Supplier from '../models/Supplier.js';

export const Me = async (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
};

export const Tampil = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.find().populate('id_barang').populate('id_supplier');
        return res.json(barangMasuk);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
};

export const TampilBarang = async (req, res) => {
    try {
        const barang = await Barang.find();
        return res.json(barang);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
};

export const TampilSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.find();
        return res.json(supplier);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
};

// Endpoint to add new barang masuk
export const Tambah = async (req, res) => {
    const { id_barang, id_supplier, jumlah, tanggal } = req.body;

    if (!id_barang || !id_supplier || !jumlah || !tanggal) {
        return res.status(400).json({ error: 'Semua field harus diisi!' });
    }

    try {
        const barangMasuk = new BarangMasuk({
            id_barang,
            id_supplier,
            jumlah,
            tanggal
        });

        const newBarangMasuk = await barangMasuk.save();
        return res.json({ status: "Success", data: newBarangMasuk });
    } catch (err) {
        console.error('Error inside server:', err);
        return res.status(500).json({ error: "Gagal menyimpan data barang masuk" });
    }
};

export const Detail = async (req, res) => {
    const id = req.params.id;

    try {
        // Temukan dokumen BarangMasuk berdasarkan ID dan populasi referensi ke Barang dan Supplier
        const barangMasuk = await BarangMasuk.findById(id)
            .populate('id_barang')
            .populate('id_supplier');

        // Jika dokumen tidak ditemukan, kirimkan pesan error
        if (!barangMasuk) {
            return res.status(404).json({ Error: "Barang Masuk not found" });
        }

        // Kirimkan dokumen yang ditemukan
        return res.json(barangMasuk);
    } catch (err) {
        // Tangani error dan kirimkan pesan error
        console.error('Error inside server:', err);
        return res.status(500).json({ Error: "Error inside server" });
    }
};

export const Cetak = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.findById(req.params.id).populate('id_barang').populate('id_supplier');
        if (!barangMasuk) return res.json({ Error: "Barang Masuk not found" });
        return res.json(barangMasuk);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
};


