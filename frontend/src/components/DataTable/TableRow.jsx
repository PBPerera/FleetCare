import { useState } from 'react'
import './Table.css'

const TableRow = ({ row, columns, isSelected, onSelect, onAction, showCheckbox, editable = false, onEdit }) => {
  // Check if this is a new empty row (no maintenanceId or vehicleId means it's new)
  const isNewRow = !row.vehicleId || row.vehicleId === ''
  const [editMode, setEditMode] = useState(editable && isNewRow)
  const [editedData, setEditedData] = useState(row)

  const handleEdit = (key, value) => {
    const updated = { ...editedData, [key]: value }
    setEditedData(updated)
    if (onEdit) {
      onEdit(row.id, updated)
    }
  }

  const handleDoubleClick = () => {
    if (editable && !isNewRow) {
      setEditMode(true)
    }
  }

  const handleBlur = () => {
    if (!isNewRow) {
      setEditMode(false)
    }
  }

  return (
    <tr className={isSelected ? 'selected' : ''} onDoubleClick={handleDoubleClick}>
      {showCheckbox && (
        <td className="checkbox-col">
          <input type="checkbox" checked={isSelected} onChange={onSelect} />
        </td>
      )}
      {columns.map((col) => (
        <td key={col.key} className={col.className || ''}>
          {col.render ? (
            // If column has custom render function (like dates or buttons)
            col.render(editedData, onAction)
          ) : editMode && col.key !== 'id' && col.key !== 'maintenanceId' ? (
            // Editable input for new rows or edit mode
            <input
              type={col.key.includes('Date') || col.key.includes('date') ? 'date' : 'text'}
              value={editedData[col.key] || ''}
              onChange={(e) => handleEdit(col.key, e.target.value)}
              onBlur={handleBlur}
              placeholder={`Enter ${col.label}`}
              className="editable-input"
            />
          ) : (
            // Display mode
            <span className="cell-content">{editedData[col.key] || '-'}</span>
          )}
        </td>
      ))}
    </tr>
  )
}

export default TableRow
