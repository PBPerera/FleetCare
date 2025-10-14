
import React from 'react'
export default function Drivers(){
  const rows = Array.from({length:6}, (_,i)=>({id:i+1,name:`Sample Drivers ${i+1}`, status: i%2===0 ? 'Active':'Pending'}))
  return (
    <div>
      <h3>Driver Management</h3>
      <div style={{marginTop:12}}>
        <table className="table">
          <thead><tr><th>ID</th><th>Driver</th><th>Status</th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.name}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
