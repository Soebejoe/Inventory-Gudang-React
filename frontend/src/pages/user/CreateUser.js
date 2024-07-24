import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LayoutAdmin from '../../layout/LayoutAdmin';
import axios from 'axios';
import Swal from 'sweetalert2';

function CreateUser() {
  const [values, setValues] = useState({
    nama_user: '',
    username: '',
    password: '',
    role: ''
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting form with values:', values);
    axios.post('http://localhost:8081/users', values)
      .then(res => {
        console.log('Response from server:', res);
        Swal.fire({
          icon: "success",
          title: "SUCCESS",
          text: "Data Berhasil Disimpan"
        });
        navigate('/user');
      })
      .catch(err => {
        console.log('Error from server:', err);
        Swal.fire({
          icon: "error",
          title: "ERROR",
          text: "Data Gagal Disimpan"
        });
      });
  };

  return (
    <div className="wrapper">
      <LayoutAdmin />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <div className="page-header">
              <h4 className="page-title">Create Data User</h4>
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
                  <Link to="#">User</Link>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex align-items-center">
                      <h4 className="card-title">Create Data user</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" className="form-control" name="nama_user" placeholder="Nama Lengkap ..." 
                        onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="username" placeholder="Username ..." 
                        onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" placeholder="Password ..." 
                        onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Role</label>
                        <select className="form-control" name="role" onChange={handleChange} required>
                          <option value="" hidden>-- Pilih Role --</option>
                          <option value="admin">Admin</option>
                          <option value="gudang">Gudang</option>
                        </select>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary"><i className="fa fa-save"></i> Save Changes</button> &nbsp;
                      <Link to="/user" className="btn btn-danger"><i className="fa fa-undo"></i> Kembali</Link>
                    </div>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateUser;
