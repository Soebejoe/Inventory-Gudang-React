import mongoose from 'mongoose';

const BarangKeluarSchema = new mongoose.Schema({
    id_barang: { type: mongoose.Schema.Types.ObjectId, ref: 'Barang', required: true },
    id_customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    jumlah: { type: Number, required: true },
    tanggal: { type: Date, default: Date.now }
});

const BarangKeluar = mongoose.model('BarangKeluar', BarangKeluarSchema);
export default BarangKeluar;
