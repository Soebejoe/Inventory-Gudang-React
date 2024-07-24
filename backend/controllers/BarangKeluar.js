import BarangKeluar from '../models/BarangKeluar.js';
import Barang from '../models/Barang.js';
import Customer from '../models/Customer.js';

export const Me = async (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
}

export const Tampil = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.find().populate('id_barang').populate('id_customer');
        return res.json(barangKeluar);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}

export const TampilBarang = async (req, res) => {
    try {
        const barang = await Barang.find();
        return res.json(barang);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}

export const TampilCustomer = async (req, res) => {
    try {
        const customer = await Customer.find();
        return res.json(customer);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}

export const Tambah = async (req, res) => {
    const barangKeluar = new BarangKeluar({
        id_barang: req.body.id_barang,
        id_customer: req.body.id_customer,
        jumlah: req.body.jumlah,
        tanggal: req.body.tanggal
    });

    try {
        const newBarangKeluar = await barangKeluar.save();
        return res.json({ status: "Success", data: newBarangKeluar });
    } catch (err) {
        return res.status(500).json({ status: "Error", message: err.message });
    }
};

export const Detail = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.findById(req.params.id).populate('id_barang').populate('id_customer');
        if (!barangKeluar) return res.json({ Error: "Barang Keluar not found" });
        return res.json(barangKeluar);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}

export const Cetak = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.findById(req.params.id).populate('id_barang').populate('id_customer');
        if (!barangKeluar) return res.json({ Error: "Barang Keluar not found" });
        return res.json(barangKeluar);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}


