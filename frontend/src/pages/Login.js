import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function Login() {
    const [values, setValues] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8081/login', values)
        .then(res => {
            if (res.data.Status === "Success") {
                Swal.fire({
                    icon: "success",
                    title: "SUCCESS",
                    text: "Login Berhasil"
                });
                localStorage.setItem('token', res.data.token); // Simpan token
                navigate('/home');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "ERROR",
                    text: res.data.Error
                });
            }
        })
        .catch(err => {
            console.error('Login error', err);
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: "Login gagal. Silahkan coba lagi."
            });
        });
    };

    return (
        <div className='login'>
            <div className="wrapper wrapper-login">
                <div className="container container-login animated fadeIn">
                    <h3 className="text-center">Silahkan Login</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="login-form">
                            <div className="form-group form-floating-label">
                                <input 
                                    id="username" 
                                    name="username" 
                                    type="text" 
                                    onChange={e => setValues({...values, username: e.target.value})} 
                                    className="form-control input-border-bottom" 
                                    required 
                                />
                                <label htmlFor="username" className="placeholder">Username</label>
                            </div>
                            <div className="form-group form-floating-label">
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    onChange={e => setValues({...values, password: e.target.value})} 
                                    className="form-control input-border-bottom" 
                                    required 
                                />
                                <label htmlFor="password" className="placeholder">Password</label>
                                <div className="show-password">
                                    <i className="flaticon-interface"></i>
                                </div>
                            </div>
                            <div className="form-action mb-3">
                                <button type='submit' className="btn btn-primary btn-rounded btn-login">Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
