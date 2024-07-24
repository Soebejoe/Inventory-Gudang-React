import express from 'express';
import { Me, Tampil, Tambah, Edit, Update, Delete, updateProfile } from '../controllers/User.js';
import upload from '../middleware/MulterSetup.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/me', verifyUser, Me);
router.get('/users', Tampil);
router.post('/users', Tambah);
router.get('/users/:id', Edit);
router.put('/users/:id', Update);
router.delete('/users/:id', Delete);

// Route untuk update profil
router.put('/profile/update', verifyUser, (req, res, next) => {
  upload.single('profilePhoto')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ Error: err.message });
    } else if (err) {
      return res.status(400).json({ Error: err });
    }
    next();
  });
}, updateProfile);

export default router;
