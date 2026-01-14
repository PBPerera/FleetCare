// src/components/DataTable/TableRow.jsx
import { useState } from 'react';

const TableRow = ({ 
  row, 
  columns, 
  isSelected, 
  onSelect, 
  onAction, 
  showCheckbox, 
  editable = false, 
  onEdit, 
  onDelete,
  showActions = true
}) => {
  // Use MongoDB _id instead of id for backend compatibility
  const rowId = row._id || row.id;
  const isNewRow = !row.vehicleId || row.vehicleId === '';
  const [editMode, setEditMode] = useState(editable && isNewRow);
  const [editedData, setEditedData] = useState(row);

  const handleEdit = (key, value) => {
    const updated = { ...editedData, [key]: value };
    setEditedData(updated);
  };

  const handleSave = () => {
    if (onEdit) {
      // Pass the MongoDB _id and the updated data
      onEdit(rowId, editedData);
    }
    setEditMode(false);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      if (onDelete) {
        onDelete(rowId);
      }
    }
  };

  const handleCancel = () => {
    setEditedData(row);
    if (!isNewRow) {
      setEditMode(false);
    }
  };

  // Format date fields for display
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    } catch {
      return dateString;
    }
  };

  const renderCellValue = (col) => {
    const value = editedData[col.key];
    
    // Format dates for display
    if ((col.key.includes('Date') || col.key.includes('date')) && value && !editMode) {
      return formatDate(value);
    }
    
    // Format cost
    if (col.key === 'cost' && value && !editMode) {
      return `$${Number(value).toFixed(2)}`;
    }
    
    return value || '-';
  };

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
          ) : editMode && col.key !== '_id' && col.key !== 'id' && col.key !== 'maintenanceId' ? (
            <input
              type={
                col.key.includes('Date') || col.key.includes('date') 
                  ? 'date' 
                  : col.key === 'cost' 
                  ? 'number' 
                  : 'text'
              }
              value={
                col.key.includes('Date') || col.key.includes('date')
                  ? (editedData[col.key] ? new Date(editedData[col.key]).toISOString().split('T')[0] : '')
                  : (editedData[col.key] || '')
              }
              onChange={(e) => handleEdit(col.key, e.target.value)}
              placeholder={`Enter ${col.label}`}
              className="editable-input"
              step={col.key === 'cost' ? '0.01' : undefined}
              min={col.key === 'cost' ? '0' : undefined}
            />
          ) : (
            <span className="cell-content">{renderCellValue(col)}</span>
          )}
        </td>
      ))}
      {showActions && (
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
      )}
    </tr>
  );
};

export default TableRow;