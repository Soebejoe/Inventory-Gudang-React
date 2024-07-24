import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../layout/LayoutAdmin';
import axios from 'axios';
import moment from 'moment';

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

function LaporanBarangKeluar() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
        const initializeDataTable = () => {
            $('#example').DataTable();
        };
        setTimeout(initializeDataTable, 1000);

        return () => {
            // Clean up DataTable on component unmount
            $('#example').DataTable().destroy();
        };
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/laporanbarangkeluar');
            if (Array.isArray(response.data)) {
                setData(response.data);
            } else {
                console.error('Data is not an array:', response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="wrapper">
            <LayoutAdmin />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Data Laporan Barang Keluar</h4>
                            <ul className="breadcrumbs">
                                <li className="nav-home">
                                    <Link to="#">
                                        <i className="flaticon-home"></i>
                                    </Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Data Laporan</Link>
                                </li>
                                <li className="separator">
                                    <i className="flaticon-right-arrow"></i>
                                </li>
                                <li className="nav-item">
                                    <Link to="#">Barang Keluar</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Data Laporan Barang Keluar</h4>
                                            <Link className="btn btn-primary btn-round ml-auto" target="_blank" to="/cetakallbarangkeluar">
                                                <i className="fa fa-print"></i>
                                                Cetak Data
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id="example" className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Customer</th>
                                                        <th>Barang</th>
                                                        <th>Tgl Keluar</th>
                                                        <th>Stok Keluar</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{row.id_customer.nama_customer}</td>
                                                            <td>{row.id_barang.nama_barang}</td>
                                                            <td>{moment(row.tanggal).format('DD/MMMM/YYYY')}</td>
                                                            <td>{row.jumlah} Pcs</td>
                                                            <td>Rp. {(row.jumlah * row.id_barang.harga).toLocaleString()}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
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

export default LaporanBarangKeluar;
