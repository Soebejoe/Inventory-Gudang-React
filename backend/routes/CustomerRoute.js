import express from "express";
import {
    Me,
    Tampil,
    Tambah,
    Edit,
    Update,
    Delete
} from "../controllers/Customer.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/me', verifyUser, Me);

router.get('/customers', verifyUser, Tampil);
router.post('/customers', verifyUser, Tambah);
router.get('/customers/:id', verifyUser, Edit);
router.put('/customers/:id', verifyUser, Update);
router.delete('/customers/:id', verifyUser, Delete);

export default router;
