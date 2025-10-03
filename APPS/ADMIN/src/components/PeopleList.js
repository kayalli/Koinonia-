import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export default function PeopleList() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await API.get('/v1/people', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      setPeople(res.data);
    })();
  }, []);

  return (
    <div>
      <h2>People</h2>
      <table>
        <thead>
          <tr><th>First</th><th>Last</th><th>Email</th></tr>
        </thead>
        <tbody>
          {people.map((p) => (
            <tr key={p.id}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
