import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function CetakBarangKeluar() {
    const { id } = useParams();
    const [barangkeluar, setBarangKeluar] = useState({});
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'cetak-barang-keluar',
        // onAfterPrint: () => alert('Print Success')
    });

    const handleDownloadPDF = async () => {
        const input = componentRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("cetak-barang-keluar.pdf");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/cetakbarangkeluar/${id}`);
                setBarangKeluar(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div className="container mt-5">
            <div className="row mb-4">
                <div className="col-md-12 text-center">
                    <button className="btn btn-primary me-2" onClick={handlePrint}>Print</button>
                    <button className="btn btn-secondary" onClick={handleDownloadPDF}>Download PDF</button>
                </div>
            </div>
            <div className="row" ref={componentRef}>
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-body">
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td align="center">
                                            <span style={{ lineHeight: 1.6, fontWeight: "bold" }}>
                                                INVENTORY REACT
                                                <br />Surabaya
                                                <br />0812121212
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr style={{ border: "0", borderStyle: "inset", borderTop: "1px solid #000" }} />
                            <p align="center">CETAK BARANG KELUAR</p>
                            <hr />

                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='table-responsive'>
                                        <table className='table'>
                                            <tbody>
                                                <tr>
                                                    <th>Tgl Keluar</th>
                                                    <td>: {moment(barangkeluar.tanggal).format('DD/MM/YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <th>Nama Customer</th>
                                                    <td>: {barangkeluar.id_customer?.nama_customer}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className='table-responsive'>
                                        <table className='table'>
                                            <tbody>
                                                <tr>
                                                    <th>No Handphone</th>
                                                    <td>: {barangkeluar.id_customer?.nohp_customer}</td>
                                                </tr>
                                                <tr>
                                                    <th>Alamat</th>
                                                    <td>: {barangkeluar.id_customer?.alamat_customer}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
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
                                            <td>{barangkeluar.id_barang?.nama_barang}</td>
                                            <td>Rp. {parseInt(barangkeluar.id_barang?.harga || 0).toLocaleString()}</td>
                                            <td>{barangkeluar.jumlah} Pcs</td>
                                            <td>Rp. {(barangkeluar.jumlah * (barangkeluar.id_barang?.harga || 0)).toLocaleString()}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CetakBarangKeluar;
