import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function CetakBarangMasuk() {
  const { id } = useParams();
  const [barangmasuk, setBarangMasuk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const componentRef = useRef();
  
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'cetak-barang-masuk',
  });

  const fetchData = useCallback(() => {
    axios.get(`http://localhost:8081/cetakbarangmasuk/${id}`)
      .then(res => {
        setBarangMasuk(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data.');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDownloadPDF = async () => {
    const input = componentRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 0, 0);
    pdf.save("cetak-barang-masuk.pdf");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
                            <p align="center">BARANG MASUK</p>
                            <hr />

                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='table-responsive'>
                                        <table className='table'>
                                            <tbody>
                                                <tr>
                                                    <th>Tgl Masuk</th>
                                                    <td>: {moment(barangmasuk.tanggal).format('DD/MM/YYYY')}</td>
                                                </tr>
                                                <tr>
                                                    <th>Nama Customer</th>
                                                    <td>: {barangmasuk.id_supplier?.nama_supplier}</td>
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
                                                    <td>: {barangmasuk.supplier?.nohp_supplierr}</td>
                                                </tr>
                                                <tr>
                                                    <th>Alamat</th>
                                                    <td>: {barangmasuk.id_supplier?.alamat_supplier}</td>
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
                                            <th>Stok Masuk</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                        <td>{barangmasuk.id_barang.nama_barang}</td>
                      <td>Rp. {parseInt(barangmasuk.id_barang.harga).toLocaleString()}</td>
                      <td>{barangmasuk.jumlah} Pcs</td>
                      <td>Rp. {(barangmasuk.jumlah * barangmasuk.id_barang.harga).toLocaleString()}</td>
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


export default CetakBarangMasuk;
