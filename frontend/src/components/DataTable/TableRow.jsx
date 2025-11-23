import { useState } from 'react'

const TableRow = ({ row, columns, isSelected, onSelect, onAction, showCheckbox, editable = false, onEdit, onDelete }) => {
  const isNewRow = !row.vehicleId || row.vehicleId === ''
  const [editMode, setEditMode] = useState(editable && isNewRow)
  const [editedData, setEditedData] = useState(row)

  const handleEdit = (key, value) => {
    const updated = { ...editedData, [key]: value }
    setEditedData(updated)
  }

  const handleSave = () => {
    if (onEdit) {
      onEdit(row.id, editedData)
    }
    setEditMode(false)
  }

  const handleEditClick = () => {
    setEditMode(true)
  }

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      if (onDelete) {
        onDelete(row.id)
      }
    }
  }

  const handleCancel = () => {
    setEditedData(row)
    if (!isNewRow) {
      setEditMode(false)
    }
  }

  return (
    <tr className={isSelected ? 'selected' : ''}>
      {showCheckbox && (
        <td className="checkbox-col">
          <input type="checkbox" checked={isSelected} onChange={onSelect} />
        </td>
      )}
      {columns.map((col) => (
        <td key={col.key} className={col.className || ''}>
          {col.render ? (
            col.render(editedData, onAction)
          ) : editMode && col.key !== 'id' && col.key !== 'maintenanceId' ? (
            <input
              type={col.key.includes('Date') || col.key.includes('date') ? 'date' : 'text'}
              value={editedData[col.key] || ''}
              onChange={(e) => handleEdit(col.key, e.target.value)}
              placeholder={`Enter ${col.label}`}
              className="editable-input"
            />
          ) : (
            <span className="cell-content">{editedData[col.key] || '-'}</span>
          )}
        </td>
      ))}
      <td className="action-col">
        <div className="action-buttons">
          {editMode ? (
            <>
              <button 
                className="action-btn save-btn"
                onClick={handleSave}
                title="Save"
              >
                💾 SAVE
              </button>
              {!isNewRow && (
                <button 
                  className="action-btn cancel-btn"
                  onClick={handleCancel}
                  title="Cancel"
                >
                  ✖ CANCEL
                </button>
              )}
            </>
          ) : (
            <>
              <button 
                className="action-btn edit-btn"
                onClick={handleEditClick}
                title="Edit"
              >
                ✏️ EDIT
              </button>
              <button 
                className="action-btn delete-btn"
                onClick={handleDeleteClick}
                title="Delete"
              >
                🗑️ DELETE
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}

export default TableRow
