import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const register = async () => {
    try {
      await api.post('/auth/register', { username, password });
      alert('สมัครสมาชิกสำเร็จ!');
      navigate('/login');
    } catch {
      alert('มีผู้ใช้นี้อยู่แล้ว หรือข้อมูลไม่ถูกต้อง');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>สมัครสมาชิก</h3>
      <input className="form-control mb-2" placeholder="ชื่อผู้ใช้"
        onChange={e => setUsername(e.target.value)} />
      <input className="form-control mb-2" placeholder="รหัสผ่าน" type="password"
        onChange={e => setPassword(e.target.value)} />
      <button className="btn btn-success" onClick={register}>สมัครสมาชิก</button>
    </div>
  );
}