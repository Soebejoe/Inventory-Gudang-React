import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../layout/LayoutAdmin';
import axios from 'axios';
import moment from 'moment';

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

function LaporanBarangMasuk() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();

        // Initialize DataTable
        const initializeDataTable = () => {
            $('#example').DataTable({
                destroy: true,
                responsive: true,
                autoWidth: false
            });
        };

        if (data.length) {
            initializeDataTable();
        }

        // Cleanup DataTable on component unmount
        return () => {
            if ($.fn.DataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy();
            }
        };
    }, [data]);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8081/barangmasuk');
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
                            <h4 className="page-title">Data Laporan Barang Masuk</h4>
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
                                    <Link to="#">Barang Masuk</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Data Laporan Barang Masuk</h4>
                                            <Link className="btn btn-primary btn-round ml-auto" target="_blank" to="/cetakallbarangmasuk">
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
                                                        <th>Supplier</th>
                                                        <th>Barang</th>
                                                        <th>Tgl Masuk</th>
                                                        <th>Stok Masuk</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>{row.id_supplier.nama_supplier}</td>
                                                            <td>{row.id_barang.nama_barang}</td>
                                                            <td>{moment(row.tanggal).format('DD/MM/YYYY')}</td>
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

export default LaporanBarangMasuk;
