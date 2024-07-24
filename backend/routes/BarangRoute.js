import express from 'express';
import { Me, Tampil, Edit, Update, Delete, Tambahbarang } from '../controllers/Barang.js';
import { verifyUser } from '../middleware/AuthUser.js';
import upload from '../middleware/MulterSetup.js'; // Path ke file middleware multer Anda

const router = express.Router();

router.get('/', verifyUser, Me);
router.get('/barang', verifyUser, Tampil);
router.post('/Tambahbarang', verifyUser, upload, Tambahbarang);
router.get('/editbarang/:id', verifyUser, Edit);
router.put('/updatebarang/:id', verifyUser, upload, Update);
router.delete('/deletebarang/:id', verifyUser, Delete);

export default router;
