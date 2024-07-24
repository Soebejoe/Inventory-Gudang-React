import mongoose from 'mongoose';

const BarangMasukSchema = new mongoose.Schema({
    id_barang: { type: mongoose.Schema.Types.ObjectId, ref: 'Barang', required: true },
    id_supplier: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
    jumlah: { type: Number, required: true },
    tanggal: { type: Date, default: Date.now }
});

const BarangMasuk = mongoose.model('BarangMasuk', BarangMasukSchema);
export default BarangMasuk;
