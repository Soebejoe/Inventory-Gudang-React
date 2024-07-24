import User from '../models/User.js';
import bcrypt from 'bcrypt';

const salt = 10;

export const Me = async (req, res) => {
  return res.json({ Status: "Success", id: req.id, nama_user: req.nama_user, role: req.role });
}

export const Tampil = async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Tambah = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), salt);
    const user = new User({
      nama_user: req.body.nama_user,
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role
    });
    const newUser = await user.save();
    return res.json({ Status: "Success", user: newUser });
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Edit = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ Error: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Update = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), salt);
    const user = await User.findByIdAndUpdate(req.params.id, {
      nama_user: req.body.nama_user,
      username: req.body.username,
      password: hashedPassword,
      role: req.body.role
    }, { new: true });
    if (!user) return res.json({ Error: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}

export const Delete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.json({ Error: "User not found" });
    return res.json({ Message: "User deleted" });
  } catch (err) {
    return res.json({ Error: "Error inside server" });
  }
}


export const getUserProfile = async (req, res) => {
  try {
      const user = await User.findById(req.userId).select('-password');
      if (!user) {
          return res.status(404).json({ Status: "Error", Error: "User not found" });
      }
      res.json({ Status: "Success", user });
  } catch (error) {
      res.status(500).json({ Status: "Error", Error: "Server error" });
  }
};


export const updateProfile = async (req, res) => {
  const { nama_user, email, oldPassword, newPassword } = req.body;
  const profilePhoto = req.file ? req.file.filename : null;

  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ Status: "Error", Error: "User not found" });
    }

    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ Status: "Error", Error: "Incorrect old password" });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    user.nama_user = nama_user || user.nama_user;
    user.email = email || user.email;

    if (profilePhoto) {
      // Hapus foto lama jika ada
      if (user.profilePhoto) {
        fs.unlinkSync(path.join('./uploads/', user.profilePhoto));
      }
      user.profilePhoto = profilePhoto;
    }

    await user.save();
    res.json({ Status: "Success", Message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ Status: "Error", Error: error.message });
  }
};