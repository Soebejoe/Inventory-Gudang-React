import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutGudang';
import axios from 'axios';
import moment from 'moment';

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import $ from 'jquery';

function ListBarangMasuk() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();

        // Cleanup function to destroy DataTable on component unmount
        return () => {
            if ($.fn.DataTable.isDataTable('#example')) {
                $('#example').DataTable().destroy();
            }
        };
    }, []);

    useEffect(() => {
        // Initialize DataTable only when data is available
        if (data.length) {
            $('#example').DataTable({
                destroy: true,
                responsive: true,
                autoWidth: false,
                paging: true, // Enable pagination
                lengthMenu: [10, 25, 50, 75, 100], // Options for number of entries per page
            });
        }
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
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Data Barang Masuk</h4>
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
                                    <Link to="#">Data</Link>
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
                                            <h4 className="card-title">Data Barang Masuk</h4>
                                            <Link className="btn btn-primary btn-round ml-auto" to="/createBarangMasuk">
                                                <i className="fa fa-plus"></i>
                                                Tambah Data
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id="example" className="display table table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>No</th>
                                                        <th>Gambar</th>
                                                        <th>Supplier</th>
                                                        <th>Barang</th>
                                                        <th>Tgl Masuk</th>
                                                        <th>Stok Masuk</th>
                                                        <th>Total</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data.map((row, key) => (
                                                        <tr key={key}>
                                                            <td>{key + 1}</td>
                                                            <td>
                                                                <img src={`http://localhost:8081/uploads/${row.id_barang.gambar}`} alt={row.id_barang.nama_barang} width="50" />
                                                            </td>
                                                            <td>{row.id_supplier.nama_supplier}</td>
                                                            <td>{row.id_barang.nama_barang}</td>
                                                            <td>{moment(row.tanggal).format('DD/MM/YYYY')}</td>
                                                            <td>{row.jumlah} Pcs</td>
                                                            <td>Rp. {(row.jumlah * row.id_barang.harga).toLocaleString()}</td>
                                                            <td>
                                                                <Link to={`/detailBarangMasuk/${row._id}`} className='btn btn-xs btn-info'>
                                                                    <i className='fa fa-eye'></i>
                                                                </Link>
                                                                <Link to={`/cetakBarangMasuk/${row._id}`} target='_blank' className='btn btn-xs btn-secondary'>
                                                                    <i className='fa fa-print'></i>
                                                                </Link>
                                                            </td>
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

export default ListBarangMasuk;
