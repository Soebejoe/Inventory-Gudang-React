import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  nama_customer: {
    type: String,
    required: true,
  },
  nohp_customer: {
    type: String,
    required: true,
  },
  email_customer: {
    type: String,
    required: true,
  },
  alamat_customer: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;
