import mongoose from 'mongoose';

const LaporanSchema = new mongoose.Schema({
    // Sesuaikan dengan skema yang Anda butuhkan untuk laporan Anda
    nama_laporan: { type: String, required: true },
    tanggal: { type: Date, default: Date.now },
    // Tambahkan field lain yang relevan
});

const Laporan = mongoose.model('Laporan', LaporanSchema);
export default Laporan;
