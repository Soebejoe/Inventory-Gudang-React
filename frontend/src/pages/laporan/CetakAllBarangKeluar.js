import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function CetakAllBarangKeluar() {
    const [data, setData] = useState([]);
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'cetak-laporan-barang-keluar',
    });

    const handleDownloadPDF = async () => {
        const input = componentRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save("cetak-laporan-barang-keluar.pdf");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8081/cetakallbarangkeluar');
                console.log('Response Data:', response.data);
                if (response.data && response.data.length > 0) {
                    setData(response.data);
                    handlePrint();
                } else {
                    console.error('Data is empty or not an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

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
                            <p align="center">LAPORAN BARANG KELUAR</p>
                            <hr />

                            <div className='table-responsive'>
                                <table className='table table-bordered'>
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
                                        {data.length > 0 ? data.map((row, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{row.id_customer ? row.id_customer.nama_customer : 'N/A'}</td>
                                                <td>{row.id_barang ? row.id_barang.nama_barang : 'N/A'}</td>
                                                <td>{moment(row.tanggal).format('DD/MM/YYYY')}</td>
                                                <td>{row.jumlah ? `${row.jumlah} Pcs` : 'N/A'}</td>
                                                <td>Rp. {(row.jumlah * (row.id_barang ? row.id_barang.harga : 0)).toLocaleString()}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
                                            </tr>
                                        )}
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

export default CetakAllBarangKeluar;
