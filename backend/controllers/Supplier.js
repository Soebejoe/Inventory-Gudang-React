import Supplier from '../models/Supplier.js';

export const Me = async (req, res) => {
  return res.json({ Status: "Success", name: req.name, role: req.role });
}

export const Tampil = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    return res.json(suppliers);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Tambah = async (req, res) => {
  try {
    const newSupplier = new Supplier({
      nama_supplier: req.body.nama_supplier,
      nohp_supplier: req.body.nohp_supplier,
      email_supplier: req.body.email_supplier,
      alamat_supplier: req.body.alamat_supplier,
    });
    const savedSupplier = await newSupplier.save();
    return res.json(savedSupplier);
  } catch (err) {
    return res.json({ Error: err.message });
  }
}

export const Edit = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.json({ Error: "Supplier not found" });
    return res.json(supplier);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Update = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      {
        nama_supplier: req.body.nama_supplier,
        nohp_supplier: req.body.nohp_supplier,
        email_supplier: req.body.email_supplier,
        alamat_supplier: req.body.alamat_supplier,
      },
      { new: true }
    );
    if (!updatedSupplier) return res.json({ Error: "Supplier not found" });
    return res.json(updatedSupplier);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Delete = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!deletedSupplier) return res.json({ Error: "Supplier not found" });
    return res.json({ Message: "Supplier deleted" });
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}
