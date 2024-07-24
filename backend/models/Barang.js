import mongoose from 'mongoose';

const BarangSchema = new mongoose.Schema({
  nama_barang: { type: String, required: true },
  harga: { type: Number, required: true },
  stok: { type: Number, required: true },
  deskripsi: { type: String, required: true },
  gambar: { type: String, required: false }
});

const Barang = mongoose.model('Barang', BarangSchema);
export default Barang;
