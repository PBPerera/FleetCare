// src/components/DataTable/TableRow.jsx
import { useState } from 'react';

// Dropdown options for enum fields
const FIELD_OPTIONS = {
  status: ['Pending', 'Approved', 'Rejected', 'In Progress', 'Completed'],
  priority: ['Low', 'Medium', 'High', 'Critical'],
  procurementStage1: ['', 'Pending', 'Approved', 'Rejected'],
  procurementStage2: ['', 'Pending', 'Approved', 'Rejected'],
  tenderCall: ['', 'Not Started', 'In Progress', 'Completed']
};

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
    
    if ((col.key.includes('Date') || col.key.includes('date')) && value && !editMode) {
      return formatDate(value);
    }
    
    if (col.key === 'cost' && value && !editMode) {
      return `$${Number(value).toFixed(2)}`;
    }
    
    return value || '-';
  };

  const renderEditableField = (col) => {
    const fieldKey = col.key;
    const value = editedData[fieldKey];

    // Check if this field has dropdown options
    if (FIELD_OPTIONS[fieldKey]) {
      return (
        <select
          value={value || ''}
          onChange={(e) => handleEdit(fieldKey, e.target.value)}
          className="editable-select"
        >
          {FIELD_OPTIONS[fieldKey].map((option) => (
            <option key={option} value={option}>
              {option || '-- Select --'}
            </option>
          ))}
        </select>
      );
    }

    // Date fields
    if (fieldKey.includes('Date') || fieldKey.includes('date')) {
      return (
        <input
          type="date"
          value={value ? new Date(value).toISOString().split('T')[0] : ''}
          onChange={(e) => handleEdit(fieldKey, e.target.value)}
          className="editable-input"
        />
      );
    }

    // Number fields
    if (fieldKey === 'cost') {
      return (
        <input
          type="number"
          value={value || ''}
          onChange={(e) => handleEdit(fieldKey, e.target.value)}
          placeholder={`Enter ${col.label}`}
          className="editable-input"
          step="0.01"
          min="0"
        />
      );
    }

    // Text fields
    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => handleEdit(fieldKey, e.target.value)}
        placeholder={`Enter ${col.label}`}
        className="editable-input"
      />
    );
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
            renderEditableField(col)
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
<<<<<<< HEAD
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
                onClick={() => onAction && onAction('delete', row)}
                title="Delete"
              >
                🗑️ DELETE
              </button>
            </>
          )}
        </div>
      </td>
=======
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
>>>>>>> 3af2a90d432a9ab42d92346f737d3ed164cb5c77
    </tr>
  );
};

export default TableRow;