import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutAdmin from '../layout/LayoutAdmin';
import LayoutGudang from '../layout/LayoutGudang';
import axios from 'axios';
import Dashboard from './dashboard/Dashboard';
import DashboardGudang from './dashboard/DashboardGudang';

function Home() {
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [nama_user, setNama] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8081')
            .then(res => {
                if (res.data.Status === "Success") {
                    setAuth(true);
                    setNama(res.data.nama_user);
                    setRole(res.data.role);
                } else {
                    setAuth(false);
                    navigate('/login');
                }
            })
            .catch(err => console.log(err));
    }, [navigate]);

    return (
        <div className="wrapper">
            {role === "admin" && <LayoutAdmin />}
            {role === "admin" &&<Dashboard />}
            {role === "gudang" && <LayoutGudang />}
            {role === "gudang" && <DashboardGudang />}
        </div>
    );
}

export default Home;
