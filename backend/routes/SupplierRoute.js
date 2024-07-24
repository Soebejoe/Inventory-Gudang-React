import express from "express";
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete
} from "../controllers/Supplier.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/me', verifyUser, Me);

router.get('/suppliers', verifyUser, Tampil);
router.post('/suppliers', verifyUser, Tambah);
router.get('/suppliers/:id', verifyUser, Edit);
router.put('/suppliers/:id', verifyUser, Update);
router.delete('/suppliers/:id', verifyUser, Delete);

export default router;
