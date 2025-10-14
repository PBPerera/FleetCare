import React from 'react';

export default function Vehicle(){
  const demo = [
    { id: 1, plate: 'AB-1234', model: 'Toyota Hiace', status: 'Active' },
    { id: 2, plate: 'BC-5678', model: 'Nissan Van', status: 'Maintenance' },
    { id: 3, plate: 'CD-9012', model: 'Ford Ranger', status: 'Active' }
  ];

  return (
    <div>
      <h3>Vehicle Management</h3>
      <p style={{color:'var(--muted)'}}>List of vehicles (demo)</p>
      <div style={{marginTop:12}}>
        <table className="table">
          <thead>
            <tr><th>#</th><th>Plate</th><th>Model</th><th>Status</th></tr>
          </thead>
          <tbody>
            {demo.map(v=>(
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.plate}</td>
                <td>{v.model}</td>
                <td>{v.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
