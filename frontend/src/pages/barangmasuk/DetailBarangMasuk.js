import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutGudang';
import axios from 'axios';
import moment from 'moment';

function DetailBarangMasuk() {
    const { id } = useParams();
    const [barangMasuk, setBarangMasuk] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:8081/detailbarangmasuk/${id}`);
                if (res.data) {
                    setBarangMasuk(res.data);
                } else {
                    setError('Data not found');
                    console.error('Data not found:', res.data);
                }
            } catch (err) {
                setError('Failed to fetch data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchDetail();
        } else {
            console.error('ID is undefined');
            setError('ID is undefined');
            setLoading(false);
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!barangMasuk) {
        return <div>Data not found or error occurred.</div>;
    }

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Detail Data Barang Masuk</h4>
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
                                    <Link to="#">Barang Masuk</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center">
                                            <h4 className="card-title">Detail Data Barang Masuk</h4>
                                            <Link className="btn btn-primary btn-round ml-auto" to="/barangmasuk">
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
                                                                <th>Tgl Masuk</th>
                                                                <td>: {moment(barangMasuk.tanggal).format('DD/MM/YYYY')}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Nama Supplier</th>
                                                                <td>: {barangMasuk.id_supplier?.nama_supplier || 'N/A'}</td>
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
                                                                <td>: {barangMasuk.id_supplier?.nohp_supplier || 'N/A'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Alamat</th>
                                                                <td>: {barangMasuk.id_supplier?.alamat_supplier || 'N/A'}</td>
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
                                                        <th>Stok Masuk</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{barangMasuk.id_barang?.nama_barang || 'N/A'}</td>
                                                        <td>Rp. {parseInt(barangMasuk.id_barang?.harga || 0).toLocaleString()}</td>
                                                        <td>{barangMasuk.jumlah || 'N/A'} Pcs</td>
                                                        <td>Rp. {(barangMasuk.jumlah * (barangMasuk.id_barang?.harga || 0)).toLocaleString()}</td>
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

export default DetailBarangMasuk;
