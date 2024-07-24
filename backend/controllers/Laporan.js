import Laporan from '../models/Laporan.js';
import BarangMasuk from '../models/BarangMasuk.js';
import BarangKeluar from '../models/BarangKeluar.js';

export const Me = async (req, res) => {
    return res.json({ Status: "Success", name: req.name, role: req.role });
}

export const TampilBarangMasuk = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.find().populate('id_barang').populate('id_supplier');
        return res.json(barangMasuk);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}

export const TampilBarangKeluar = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.find().populate('id_barang').populate('id_customer');
        return res.json(barangKeluar);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}

export const CetakBarangMasuk = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.find().populate('id_barang').populate('id_supplier');
        if (barangMasuk.length > 0) {
            return res.json(barangMasuk);
        } else {
            return res.status(404).json({ message: "No data found" });
        }
    } catch (err) {
        return res.status(500).json({ Error: "Error inside server", details: err.message });
    }
}

export const CetakBarangKeluar = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.find().populate('id_barang').populate('id_customer');
        return res.json(barangKeluar);
    } catch (err) {
        return res.json({ Error: "Error inside server" });
    }
}

export const getBarangData = (req, res) => {
    const data = [
        { year: 2020, barangMasuk: 100, barangKeluar: 50, uangMasuk: 1000000, uangKeluar: 500000 },
        { year: 2021, barangMasuk: 150, barangKeluar: 100, uangMasuk: 1500000, uangKeluar: 1000000 },
        { year: 2022, barangMasuk: 200, barangKeluar: 150, uangMasuk: 2000000, uangKeluar: 1500000 },
        // Tambahkan data sesuai kebutuhan
    ];
    res.json(data);
}

export const createLaporan = async (req, res) => {
    const laporan = new Laporan({
        nama_laporan: req.body.nama_laporan,
        // Tambahkan field lain yang relevan
    });

    try {
        const newLaporan = await laporan.save();
        return res.json(newLaporan);
    } catch (err) {
        return res.json({ Error: err.message });
    }
}
