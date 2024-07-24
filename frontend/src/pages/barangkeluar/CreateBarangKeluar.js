import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutGudang from '../../layout/LayoutGudang';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

function CreateBarangKeluar() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        id_customer: '',
        id_barang: '',
        tgl_keluar: '',
        jumlah: ''
    });

    const [barangList, setBarang] = useState([]);
    const [customerList, setCustomer] = useState([]);

    useEffect(() => {
        fetchBarang();
        fetchCustomer();
    }, []);

    const fetchBarang = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getbarang');
            setBarang(response.data.map(barang => ({
                label: barang.nama_barang,
                value: barang._id
            })));
        } catch (error) {
            console.error('Error fetching barang:', error);
        }
    };

    const fetchCustomer = async () => {
        try {
            const response = await axios.get('http://localhost:8081/getcustomer');
            setCustomer(response.data.map(customer => ({
                label: customer.nama_customer,
                value: customer._id
            })));
        } catch (error) {
            console.error('Error fetching customer:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted values:', values);
        axios.post('http://localhost:8081/tambahbarangkeluar', values)
            .then(res => {
                console.log('Server response:', res);
                if (res.data.status === "Success") {
                    Swal.fire({
                        icon: "success",
                        title: "SUCCESS",
                        text: "Data Berhasil Disimpan"
                    });
                    navigate('/barangkeluar');
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "ERROR",
                        text: res.data.message
                    });
                }
            })
            .catch(err => {
                console.error('Error submitting data:', err);
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: "Something went wrong!"
                });
            });
    };

    return (
        <div className="wrapper">
            <LayoutGudang />
            <div className="main-panel">
                <div className="content">
                    <div className="page-inner">
                        <div className="page-header">
                            <h4 className="page-title">Create Data Barang Keluar</h4>
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
                                    <Link to="#">Create Data</Link>
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
                                            <h4 className="card-title">Create Data Barang Keluar</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label>Nama Customer</label>
                                                <select className="form-control" name="id_customer" onChange={handleChange} required>
                                                    <option value="" hidden>-- Pilih Customer --</option>
                                                    {customerList.map(customer =>
                                                        <option key={customer.value} value={customer.value}>{customer.label}</option>
                                                    )}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Nama Barang</label>
                                                <select className="form-control" name="id_barang" onChange={handleChange} required>
                                                    <option value="" hidden>-- Pilih Barang --</option>
                                                    {barangList.map(barang =>
                                                        <option key={barang.value} value={barang.value}>{barang.label}</option>
                                                    )}
                                                </select>
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
                                            <div className="form-group">
                                                <label>Stok Keluar</label>
                                                <div className="input-group mb-3">
                                                    <input type="number" className="form-control" placeholder="Stok Keluar ..." name="jumlah"
                                                        onChange={handleChange} required />
                                                    <div className="input-group-prepend">
                                                        <span className="input-group-text" id="basic-addon1">Pcs</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Save Changes</button> &nbsp;
                                            <Link to="/barangkeluar" className="btn btn-danger"><i className="fa fa-undo"></i> Kembali</Link>
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

export default CreateBarangKeluar;
