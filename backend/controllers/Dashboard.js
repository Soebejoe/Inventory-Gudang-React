import User from '../models/User.js';
import Supplier from '../models/Supplier.js';
import Barang from '../models/Barang.js';
import Customer from '../models/Customer.js';
import BarangMasuk from '../models/BarangMasuk.js';
import BarangKeluar from '../models/BarangKeluar.js';

// Endpoint to get the user count
export const getUserCount = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        res.json({ count: usersCount });
    } catch (error) {
        res.status(500).json({ error: "Error fetching user count" });
    }
};

// Endpoint to get the supplier count
export const getSupplierCount = async (req, res) => {
    try {
        const suppliersCount = await Supplier.countDocuments();
        res.json({ count: suppliersCount });
    } catch (error) {
        res.status(500).json({ error: "Error fetching supplier count" });
    }
};

// Endpoint to get the customer count
export const getCustomerCount = async (req, res) => {
    try {
        const customersCount = await Customer.countDocuments();
        res.json({ count: customersCount });
    } catch (error) {
        res.status(500).json({ error: "Error fetching customer count" });
    }
};

export const getBarangMasukCount = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.aggregate([
            {
                $group: {
                    _id: "$id_barang",
                    totalQty: { $sum: "$jumlah" }
                }
            }
        ]);

        let totalNominal = 0;

        for (const item of barangMasuk) {
            const barang = await Barang.findById(item._id);
            if (barang) {
                totalNominal += item.totalQty * barang.harga;
            }
        }

        const totalQty = barangMasuk.reduce((sum, item) => sum + item.totalQty, 0);

        res.json({ totalQty, totalNominal });
    } catch (error) {
        console.error("Error fetching barang masuk count:", error);
        res.status(500).json({ error: "Gagal mendapatkan jumlah barang masuk" });
    }
};

export const getBarangKeluarCount = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.aggregate([
            {
                $group: {
                    _id: "$id_barang",
                    totalQty: { $sum: "$jumlah" }
                }
            }
        ]);

        let totalNominal = 0;

        for (const item of barangKeluar) {
            const barang = await Barang.findById(item._id);
            if (barang) {
                totalNominal += item.totalQty * barang.harga;
            }
        }

        const totalQty = barangKeluar.reduce((sum, item) => sum + item.totalQty, 0);

        res.json({ totalQty, totalNominal });
    } catch (error) {
        console.error("Error fetching barang keluar count:", error);
        res.status(500).json({ error: "Gagal mendapatkan jumlah barang keluar" });
    }
};


export const getBarangMasukPerBulan = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.aggregate([
            {
                $lookup: {
                    from: 'barangs',
                    localField: 'id_barang',
                    foreignField: '_id',
                    as: 'barang'
                }
            },
            { $unwind: '$barang' },
            {
                $group: {
                    _id: { $month: "$tanggal" },
                    totalQty: { $sum: "$jumlah" },
                    totalNominal: { $sum: { $multiply: ["$jumlah", "$barang.harga"] } }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.json(barangMasuk);
    } catch (error) {
        res.status(500).json({ error: "Gagal mendapatkan jumlah barang masuk per bulan" });
    }
};


export const getBarangKeluarPerBulan = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.aggregate([
            {
                $lookup: {
                    from: 'barangs',
                    localField: 'id_barang',
                    foreignField: '_id',
                    as: 'barang'
                }
            },
            { $unwind: '$barang' },
            {
                $group: {
                    _id: { $month: "$tanggal" },
                    totalQty: { $sum: "$jumlah" },
                    totalNominal: { $sum: { $multiply: ["$jumlah", "$barang.harga"] } }
                }
            },
            { $sort: { "_id": 1 } }
        ]);
        res.json(barangKeluar);
    } catch (error) {
        res.status(500).json({ error: "Gagal mendapatkan jumlah barang keluar per bulan" });
    }
};


export const getLatestBarangMasuk = async (req, res) => {
    try {
        const barangMasuk = await BarangMasuk.find().sort({ tanggal: -1 }).limit(5).populate('id_barang').populate('id_supplier');
        res.json(barangMasuk);
    } catch (error) {
        res.status(500).json({ error: "Gagal mendapatkan data barang masuk terbaru" });
    }
};

export const getLatestBarangKeluar = async (req, res) => {
    try {
        const barangKeluar = await BarangKeluar.find().sort({ tanggal: -1 }).limit(5).populate('id_barang').populate('id_customer');
        res.json(barangKeluar);
    } catch (error) {
        res.status(500).json({ error: "Gagal mendapatkan data barang keluar terbaru" });
    }
};