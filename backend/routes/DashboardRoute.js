import express from 'express';
import { getUserCount, getSupplierCount, getCustomerCount, getBarangMasukCount, getBarangKeluarCount,
    getBarangMasukPerBulan, getBarangKeluarPerBulan, getLatestBarangMasuk, getLatestBarangKeluar } from '../controllers/Dashboard.js';
import { verifyUser } from '../middleware/AuthUser.js';

const router = express.Router();

router.get('/dashboard/users', verifyUser, getUserCount);
router.get('/dashboard/suppliers', verifyUser, getSupplierCount);
router.get('/dashboard/customers', verifyUser, getCustomerCount);
router.get('/dashboard/barangmasuk', verifyUser, getBarangMasukCount);
router.get('/dashboard/barangkeluar', verifyUser, getBarangKeluarCount);

router.get('/dashboard/barangmasukperbulan', verifyUser, getBarangMasukPerBulan);
router.get('/dashboard/barangkeluarperbulan', verifyUser, getBarangKeluarPerBulan);

router.get('/dashboard/latestbarangmasuk', getLatestBarangMasuk);
router.get('/dashboard/latestbarangkeluar', getLatestBarangKeluar);


export default router;
