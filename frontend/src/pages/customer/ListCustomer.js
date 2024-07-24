import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LayoutAdmin from '../../layout/LayoutAdmin';
import axios from 'axios';
import Swal from 'sweetalert2';

import 'jquery/dist/jquery.min.js';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from 'jquery';

function ListCustomer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
    $(document).ready(function () {
      setTimeout(function () {
        $('#example').DataTable();
      }, 1000);
    });
  }, []);

  const fetchData = async () => {
    await axios.get('http://localhost:8081/customers')
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  };

  const handleDelete = async (id) => {
    const isConfirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    axios.delete(`http://localhost:8081/customers/${id}`)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "SUCCESS",
          text: "Data Berhasil Dihapus"
        });
        fetchData();
      }).catch(err => console.log(err));
  };

  return (
    <div className="wrapper">
      <LayoutAdmin />

      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <div className="page-header">
              <h4 className="page-title">Data Customer</h4>
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
                  <Link to="#">Customer</Link>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex align-items-center">
                      <h4 className="card-title">Data Customer</h4>
                      <Link className="btn btn-primary btn-round ml-auto" to="/createCustomer">
                        <i className="fa fa-plus"></i>
                        Tambah Data
                      </Link>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table id='example' className="display table table-striped table-hover">
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Customer</th>
                            <th>No Handphone</th>
                            <th>Email</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((row, key) => (
                            <tr key={key}>
                              <td>{key + 1}</td>
                              <td>{row.nama_customer}</td>
                              <td>{row.nohp_customer}</td>
                              <td>{row.email_customer}</td>
                              <td>
                                <Link to={`/editCustomer/${row._id}`} className='btn btn-xs btn-primary'><i className='fa fa-edit'></i> Edit</Link> &nbsp;
                                <button onClick={() => handleDelete(row._id)} className='btn btn-xs btn-danger'><i className='fa fa-trash'></i> Hapus</button>
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

export default ListCustomer;
