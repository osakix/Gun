import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar';
import api from '../services/api';

export default function AdminPanel() {
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    avatar: '',
    links: [{ label: '', url: '' }],
    theme: 'system',
  });

  useEffect(() => {
    api.get('/users/me').then(res => setProfile(res.data));
  }, []);

  const updateProfile = async () => {
    await api.put('/users/profile', profile);
    alert('Updated!');
  };

  const addLink = () => {
    setProfile({ ...profile, links: [...profile.links, { label: '', url: '' }] });
  };

  return (
    <div className="container mt-5">
    <NavBar />
      <h2>Edit Profile</h2>
      <input className="form-control mb-2" placeholder="Name" value={profile.name}
        onChange={e => setProfile({ ...profile, name: e.target.value })} />
      <input className="form-control mb-2" placeholder="Bio" value={profile.bio}
        onChange={e => setProfile({ ...profile, bio: e.target.value })} />
      <input className="form-control mb-2" placeholder="Avatar URL" value={profile.avatar}
        onChange={e => setProfile({ ...profile, avatar: e.target.value })} />
      <select className="form-select mb-2" value={profile.theme}
        onChange={e => setProfile({ ...profile, theme: e.target.value })}>
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>

      <h4>Links</h4>
      {profile.links.map((l, i) => (
        <div key={i} className="d-flex gap-2 mb-2">
          <input className="form-control" placeholder="Label" value={l.label}
            onChange={e => {
              const links = [...profile.links];
              links[i].label = e.target.value;
              setProfile({ ...profile, links });
            }} />
          <input className="form-control" placeholder="URL" value={l.url}
            onChange={e => {
              const links = [...profile.links];
              links[i].url = e.target.value;
              setProfile({ ...profile, links });
            }} />
        </div>
      ))}
      <button className="btn btn-secondary mb-2" onClick={addLink}>Add Link</button>
      <br />
      <button className="btn btn-primary" onClick={updateProfile}>Save</button>
    </div>
  );
}