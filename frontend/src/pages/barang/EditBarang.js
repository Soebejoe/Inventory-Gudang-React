import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import LayoutAdmin from '../../layout/LayoutAdmin';

function EditBarang() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [values, setValues] = useState({
    nama_barang: '',
    harga: '',
    stok: '',
    deskripsi: ''
  });

  const [gambar, setGambar] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8081/editbarang/${id}`)
      .then(res => {
        setValues({
          nama_barang: res.data.nama_barang,
          harga: res.data.harga,
          stok: res.data.stok,
          deskripsi: res.data.deskripsi
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleFileChange = (event) => {
    setGambar(event.target.files[0]);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nama_barang', values.nama_barang);
    formData.append('harga', values.harga);
    formData.append('stok', values.stok);
    formData.append('deskripsi', values.deskripsi);
    if (gambar) {
      formData.append('gambar', gambar);
    }

    axios.put(`http://localhost:8081/updatebarang/${id}`, formData)
      .then(res => {
        Swal.fire({
          icon: "success",
          title: "SUCCESS",
          text: "Data Berhasil Diubah"
        });
        navigate('/barang');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="wrapper">
      <LayoutAdmin />

      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <div className="page-header">
              <h4 className="page-title">Edit Data Barang</h4>
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
                  <Link to="#">Edit Data</Link>
                </li>
                <li className="separator">
                  <i className="flaticon-right-arrow"></i>
                </li>
                <li className="nav-item">
                  <Link to="#">Barang</Link>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <div className="d-flex align-items-center">
                      <h4 className="card-title">Edit Data Barang</h4>
                    </div>
                  </div>
                  <form onSubmit={handleUpdate}>
                    <div className="card-body">
                      <div className="form-group">
                        <label>Nama Barang</label>
                        <input
                          type="text"
                          className="form-control"
                          name="nama_barang"
                          placeholder="Nama Barang ..."
                          value={values.nama_barang}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Harga</label>
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Rp</span>
                          </div>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Harga ..."
                            name="harga"
                            value={values.harga}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Stok</label>
                        <div className="input-group mb-3">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Stok ..."
                            name="stok"
                            value={values.stok}
                            onChange={handleChange}
                            required
                          />
                          <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">Pcs</span>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Deskripsi</label>
                        <textarea
                          className="form-control"
                          rows="5"
                          name="deskripsi"
                          placeholder="Deskripsi ..."
                          value={values.deskripsi}
                          onChange={handleChange}
                          required
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label>Gambar</label>
                        <input
                          type="file"
                          className="form-control"
                          name="gambar"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-primary">
                        <i className="fa fa-save"></i> Save Changes
                      </button> &nbsp;
                      <Link to="/barang" className="btn btn-danger">
                        <i className="fa fa-undo"></i> Kembali
                      </Link>
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

export default EditBarang;
