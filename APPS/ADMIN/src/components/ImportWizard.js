import React, { useState } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default function ImportWizard() {
  const [file, setFile] = useState(null);

  const upload = async () => {
    const data = new FormData();
    data.append('file', file);
    await API.post('/v1/people/bulk-import', data, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    });
    alert('Uploaded');
  };

  return (
    <div>
      <h2>Bulk Import</h2>
      <input type="file" accept=".csv,.xlsx" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>
    </div>
  );
}
