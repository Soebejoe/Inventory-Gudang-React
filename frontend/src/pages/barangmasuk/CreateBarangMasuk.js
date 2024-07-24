import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutGudang';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

function CreateBarangMasuk() {
    const [barangOptions, setBarangOptions] = useState([]);
    const [supplierOptions, setSupplierOptions] = useState([]);
    const [values, setValues] = useState({
        id_barang: '',
        id_supplier: '',
        jumlah: '',
        tanggal: moment().format('YYYY-MM-DD')
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBarang();
        fetchSupplier();
    }, []);

    const fetchBarang = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getbarang');
            setBarangOptions(response.data);
        } catch (error) {
            console.error('Error fetching barang options:', error);
        }
    };

    const fetchSupplier = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getsupplier');
            setSupplierOptions(response.data);
        } catch (error) {
            console.error('Error fetching supplier options:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!values.id_barang || !values.id_supplier || !values.jumlah || !values.tanggal) {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "Semua field harus diisi!"
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8081/tambahbarangmasuk', values);
            if (response.data.status === "Success") {
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: "Data Berhasil Disimpan"
                });
                navigate('/barangmasuk');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: response.data.error
                });
            }
        } catch (error) {
            console.error('Error submitting data:', error);
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "Something went wrong!"
            });
        }
    };

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Create Data Barang Masuk</h4>
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
                                    <Link to="#">Create Data</Link>
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
                                            <h4 className="card-title">Create Data Barang Masuk</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className='form-group'>
                                                <label>Barang</label>
                                                <select
                                                    className='form-control'
                                                    name='id_barang'
                                                    value={values.id_barang}
                                                    onChange={e => setValues({ ...values, id_barang: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Pilih Barang</option>
                                                    {barangOptions.map(barang => (
                                                        <option key={barang._id} value={barang._id}>{barang.nama_barang}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='form-group'>
                                                <label>Supplier</label>
                                                <select
                                                    className='form-control'
                                                    name='id_supplier'
                                                    value={values.id_supplier}
                                                    onChange={e => setValues({ ...values, id_supplier: e.target.value })}
                                                    required
                                                >
                                                    <option value="">Pilih Supplier</option>
                                                    {supplierOptions.map(supplier => (
                                                        <option key={supplier._id} value={supplier._id}>{supplier.nama_supplier}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className='form-group'>
                                                <label>Jumlah</label>
                                                <input
                                                    type='number'
                                                    className='form-control'
                                                    name='jumlah'
                                                    value={values.jumlah}
                                                    onChange={e => setValues({ ...values, jumlah: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label>Tanggal</label>
                                                <input
                                                    type='date'
                                                    className='form-control'
                                                    name='tanggal'
                                                    value={moment(values.tanggal).format('YYYY-MM-DD')}
                                                    onChange={e => setValues({ ...values, tanggal: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className='card-footer'>
                                            <button type='submit' className='btn btn-primary'><i className='fa fa-save'></i> Save Changes</button> &nbsp;
                                            <Link to="/barangmasuk" className='btn btn-danger'><i className='fa fa-undo'></i> Kembali</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateBarangMasuk;
