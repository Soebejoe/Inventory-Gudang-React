import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutGudang';
import axios from 'axios';
import moment from 'moment';

function DetailBarangKeluar() {
    const { id } = useParams();
    const [barangKeluar, setBarangKeluar] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/detailbarangkeluar/${id}`)
            .then(res => {
                if (res.data) {
                    setBarangKeluar(res.data);
                }
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!barangKeluar) {
        return <p>Loading...</p>;
    }

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Detail Data Barang Keluar</h4>
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
                                    <Link to="#">Detail Data</Link>
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
                                            <h4 className="card-title">Detail Data Barang Keluar</h4>
                                            <Link className="btn btn-primary btn-round ml-auto" to="/barangkeluar">
                                                <i className="fa fa-undo"></i>
                                                Kembali
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <tbody>
                                                            <tr>
                                                                <th>Tanggal Keluar</th>
                                                                <td>: {moment(barangKeluar.tanggal).format('DD/MM/YYYY')}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Nama Customer</th>
                                                                <td>: {barangKeluar.id_customer.nama_customer}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                        <tbody>
                                                            <tr>
                                                                <th>No Handphone</th>
                                                                <td>: {barangKeluar.id_customer.nohp_customer}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Alamat</th>
                                                                <td>: {barangKeluar.id_customer.alamat_customer}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="table-responsive">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>Nama Barang</th>
                                                        <th>Harga</th>
                                                        <th>Stok Keluar</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{barangKeluar.id_barang.nama_barang}</td>
                                                        <td>Rp. {parseInt(barangKeluar.id_barang.harga).toLocaleString()}</td>
                                                        <td>{barangKeluar.jumlah} Pcs</td>
                                                        <td>Rp. {parseInt(barangKeluar.jumlah * barangKeluar.id_barang.harga).toLocaleString()}</td>
                                                    </tr>
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

export default DetailBarangKeluar;
