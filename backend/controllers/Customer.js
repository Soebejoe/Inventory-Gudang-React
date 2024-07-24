import Customer from '../models/Customer.js';

export const Me = async (req, res) => {
  return res.json({ Status: "Success", name: req.name, role: req.role });
}

export const Tampil = async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.json(customers);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Tambah = async (req, res) => {
  try {
    const newCustomer = new Customer({
      nama_customer: req.body.nama_customer,
      nohp_customer: req.body.nohp_customer,
      email_customer: req.body.email_customer,
      alamat_customer: req.body.alamat_customer,
    });
    const savedCustomer = await newCustomer.save();
    return res.json(savedCustomer);
  } catch (err) {
    return res.json({ Error: err.message });
  }
}

export const Edit = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.json({ Error: "Customer not found" });
    return res.json(customer);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Update = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      {
        nama_customer: req.body.nama_customer,
        nohp_customer: req.body.nohp_customer,
        email_customer: req.body.email_customer,
        alamat_customer: req.body.alamat_customer,
      },
      { new: true }
    );
    if (!updatedCustomer) return res.json({ Error: "Customer not found" });
    return res.json(updatedCustomer);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Delete = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) return res.json({ Error: "Customer not found" });
    return res.json({ Message: "Customer deleted" });
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}
