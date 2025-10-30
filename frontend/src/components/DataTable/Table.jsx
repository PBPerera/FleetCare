import { useState } from 'react'
import TableRow from './TableRow.jsx'


const Table = ({ columns, rows, onAction, showCheckbox = false, editable = false, onEdit }) => {
  const [selectedRows, setSelectedRows] = useState([])

  const toggleSelectAll = () => {
    if (selectedRows.length === rows.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(rows.map((_, idx) => idx))
    }
  }

  const toggleRowSelect = (idx) => {
    if (selectedRows.includes(idx)) {
      setSelectedRows(selectedRows.filter((i) => i !== idx))
    } else {
      setSelectedRows([...selectedRows, idx])
    }
  }

  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {showCheckbox && (
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={selectedRows.length === rows.length && rows.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
            )}
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, idx) => (
              <TableRow
                key={row.id || idx}
                row={row}
                columns={columns}
                isSelected={selectedRows.includes(idx)}
                onSelect={() => toggleRowSelect(idx)}
                onAction={(action) => onAction(action, row)}
                showCheckbox={showCheckbox}
                editable={editable}
                onEdit={onEdit}
              />
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + (showCheckbox ? 1 : 0)} className="no-data">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table