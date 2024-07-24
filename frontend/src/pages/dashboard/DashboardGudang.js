import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { Link } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutGudang';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function GudangDashboard() {
    const [barangMasukData, setBarangMasukData] = useState([]);
    const [barangKeluarData, setBarangKeluarData] = useState([]);
    const [latestBarangMasuk, setLatestBarangMasuk] = useState([]);
    const [latestBarangKeluar, setLatestBarangKeluar] = useState([]);

    useEffect(() => {
        fetchDashboardData();
        fetchLatestData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [barangMasukResponse, barangKeluarResponse] = await Promise.all([
                axios.get('http://localhost:8081/dashboard/barangmasukperbulan'),
                axios.get('http://localhost:8081/dashboard/barangkeluarperbulan')
            ]);

            setBarangMasukData(barangMasukResponse.data);
            setBarangKeluarData(barangKeluarResponse.data);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        }
    };

    const fetchLatestData = async () => {
        try {
            const [latestBarangMasukResponse, latestBarangKeluarResponse] = await Promise.all([
                axios.get('http://localhost:8081/dashboard/latestbarangmasuk'),
                axios.get('http://localhost:8081/dashboard/latestbarangkeluar')
            ]);

            setLatestBarangMasuk(latestBarangMasukResponse.data);
            setLatestBarangKeluar(latestBarangKeluarResponse.data);
        } catch (error) {
            console.error("Error fetching latest data:", error);
        }
    };

    const prepareChartData = (data) => {
        const labels = monthNames;
        const totalQty = new Array(12).fill(0);
        const totalNominal = new Array(12).fill(0);

        data.forEach(item => {
            const monthIndex = item._id - 1; // Assuming _id is the month number (1-12)
            totalQty[monthIndex] = item.totalQty;
            totalNominal[monthIndex] = item.totalNominal;
        });

        return {
            labels,
            datasets: [
                {
                    label: 'Total Quantity',
                    data: totalQty,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    yAxisID: 'y-axis-qty',
                },
                {
                    label: 'Total Nominal',
                    data: totalNominal,
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                    yAxisID: 'y-axis-nominal',
                },
            ],
        };
    };

    const dataMasuk = prepareChartData(barangMasukData);
    const dataKeluar = prepareChartData(barangKeluarData);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        scales: {
            'y-axis-qty': {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Quantity',
                },
            },
            'y-axis-nominal': {
                type: 'linear',
                position: 'right',
                title: {
                    display: true,
                    text: 'Nominal',
                },
            },
        },
    };

    const chartsStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    };

    const chartContainerStyle = {
        width: '49%',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        height: '500px',  // Set a fixed height for the chart container
    };

    const chartHeaderStyle = {
        textAlign: 'center',
        marginBottom: '5px',
    };

    const latestDataStyle = {
        width: '49%',
        backgroundColor: '#fff',
        border: '1px solid #ddd',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        height: 'auto',
        marginTop: '20px',
    };

    const renderLatestBarangMasuk = () => (
        <div style={latestDataStyle}>
            <h3 style={chartHeaderStyle}> Barang Masuk Terbaru</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Barang</th>
                        <th>Supplier</th>
                        <th>Jumlah</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {latestBarangMasuk.map(item => (
                        <tr key={item._id}>
                            <td>{item.id_barang.nama_barang}</td>
                            <td>{item.id_supplier.nama_supplier}</td>
                            <td>{item.jumlah}</td>
                            <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'center',  opacity: "0.3"}}>
                <Link to="/barangmasuk" className="btn btn-primary">View More </Link>
            </div>
        </div>
    );

    const renderLatestBarangKeluar = () => (
        <div style={latestDataStyle}>
            <h3 style={chartHeaderStyle}> Barang Keluar Terbaru</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nama Barang</th>
                        <th>Customer</th>
                        <th>Jumlah</th>
                        <th>Tanggal</th>
                    </tr>
                </thead>
                <tbody>
                    {latestBarangKeluar.map(item => (
                        <tr key={item._id}>
                            <td>{item.id_barang.nama_barang}</td>
                            <td>{item.id_customer.nama_customer}</td>
                            <td>{item.jumlah}</td>
                            <td>{new Date(item.tanggal).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ textAlign: 'center',  opacity: "0.3" }}>
                <Link to="/barangkeluar" className="btn btn-primary">View More</Link>
            </div>
        </div>
    );

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content" style={{ marginLeft: '30px', marginTop: '90px', marginRight: '30px' }}>
                    <div className="page-header">
                        <h4 className="page-title">Dashboard</h4>
                        <ul className="breadcrumbs">
                            <li className="nav-home">
                                <Link to="/">
                                    <i className="flaticon-home"></i>
                                </Link>
                            </li>
                            <li className="separator">
                                <i className="flaticon-right-arrow"></i>
                            </li>
                            <li className="nav-item">
                                <Link to="/dashboardgudang">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={chartsStyle}>
                        <div style={chartContainerStyle}>
                            <h3 style={chartHeaderStyle}>Barang Masuk</h3>
                            <Bar data={dataMasuk} options={options} height={200} width={400} />
                        </div>
                        <div style={chartContainerStyle}>
                            <h3 style={chartHeaderStyle}>Barang Keluar</h3>
                            <Bar data={dataKeluar} options={options} height={200} width={400} />
                        </div>
                    </div>
                    <div style={chartsStyle}>
                        {renderLatestBarangMasuk()}
                        {renderLatestBarangKeluar()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GudangDashboard;
