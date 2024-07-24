import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Chart, registerables } from 'chart.js';
import LayoutAdmin from '../../layout/LayoutAdmin';

Chart.register(...registerables);

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function Dashboard() {
    const [userData, setUserData] = useState(0);
    const [supplierData, setSupplierData] = useState(0);
    const [customerData, setCustomerData] = useState(0);
    const [barangMasukData, setBarangMasukData] = useState([]);
    const [barangKeluarData, setBarangKeluarData] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const usersResponse = await axios.get('http://localhost:8081/dashboard/users');
            const suppliersResponse = await axios.get('http://localhost:8081/dashboard/suppliers');
            const customersResponse = await axios.get('http://localhost:8081/dashboard/customers');
            const barangMasukResponse = await axios.get('http://localhost:8081/dashboard/barangmasukperbulan');
            const barangKeluarResponse = await axios.get('http://localhost:8081/dashboard/barangkeluarperbulan');

            setUserData(usersResponse.data.count);
            setSupplierData(suppliersResponse.data.count);
            setCustomerData(customersResponse.data.count);
            setBarangMasukData(barangMasukResponse.data);
            setBarangKeluarData(barangKeluarResponse.data);

        } catch (error) {
            console.error('Error fetching dashboard data', error);
        }
    };

    const data = {
        labels: ['Users', 'Suppliers', 'Customers'],
        datasets: [
            {
                label: 'Count',
                data: [userData, supplierData, customerData],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1
            }
        ]
    };


    const prepareChartData = (data) => {
        const labels = monthNames;
        const totalQty = new Array(12).fill(0);
        const totalNominal = new Array(12).fill(0);

        data.forEach(item => {
            const monthIndex = item._id - 1;
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
                position: 'bottom'
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
        border: '0px solid #ddd',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        height: '400px',  // Set a fixed height for the chart container
    };

    const chartHeaderStyle = {
        textAlign: 'center',
        marginBottom: '5px',
    };


    return (
        <div className="wrapper">
            <LayoutAdmin />
        <div className="main-panel">
            <div className="content" style={{ marginTop: '5px' }}>
                <div className="page-inner">
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
                                <Link to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div style={{ height: '400px' }}>
                                        <Pie data={data} options={options} />
                                        </div>
                                        <div style={chartsStyle}>
                        <div style={chartContainerStyle}>
                            <h3 style={chartHeaderStyle}>Data Barang Masuk</h3>
                            <Bar data={dataMasuk} options={options} height={200} width={400} />
                        </div>
                        <div style={chartContainerStyle}>
                            <h3 style={chartHeaderStyle}>Data Barang Keluar</h3>
                            <Bar data={dataKeluar} options={options} height={200} width={400} />
                        </div>
                    </div>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
