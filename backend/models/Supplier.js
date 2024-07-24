import mongoose from 'mongoose';

const SupplierSchema = new mongoose.Schema({
    nama_supplier: {
        type: String,
        required: true
    },
    nohp_supplier: {
        type: String,
        required: true
    },
    email_supplier: {
        type: String,
        required: true
    },
    alamat_supplier: {
        type: String,
        required: true
    }
});

const Supplier = mongoose.model('Supplier', SupplierSchema);
export default Supplier;
