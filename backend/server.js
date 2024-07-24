import express from "express";
import cors from "cors";
import connectDB from "./config/Database.js"; // Mengimpor koneksi database
import cookieParser from 'cookie-parser';

import AuthRoute from "./routes/AuthRoute.js";
import UserRoute from "./routes/UserRoute.js";
import SupplierRoute from "./routes/SupplierRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
import BarangRoute from "./routes/BarangRoute.js";
import BarangMasukRoute from "./routes/BarangMasukRoute.js";
import BarangKeluarRoute from "./routes/BarangKeluarRoute.js";
import LaporanRoute from "./routes/LaporanRoute.js";
import DashboardRoute from "./routes/DashboardRoute.js";  // Tambahkan ini

// Inisiasi aplikasi express
const app = express();

// Koneksi ke MongoDB
connectDB();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use(AuthRoute);
app.use(UserRoute);
app.use(SupplierRoute);
app.use(CustomerRoute);
app.use(BarangRoute);
app.use(BarangMasukRoute);
app.use(BarangKeluarRoute);
app.use(LaporanRoute);
app.use(DashboardRoute);  // Tambahkan ini

app.listen(8081, () => {
    console.log("Running on port 8081...");
});
