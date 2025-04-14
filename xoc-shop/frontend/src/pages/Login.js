import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      navigate('/admin');
    } catch {
      alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>เข้าสู่ระบบ</h3>
      <input className="form-control mb-2" placeholder="ชื่อผู้ใช้"
        onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" placeholder="รหัสผ่าน" type="password"
        onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-primary" onClick={login}>เข้าสู่ระบบ</button>
    </div>
  );
}