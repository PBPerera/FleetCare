// src/components/DataTable/TableRow.jsx
import { useState, useEffect } from 'react';

// Dropdown options for enum fields
const FIELD_OPTIONS = {
  status: ['Pending', 'Approved', 'Rejected', 'In Progress', 'Completed'],
  priority: ['Low', 'Medium', 'High', 'Critical'],
  procurementStage1: ['', 'Pending', 'Approved', 'Rejected'],
  procurementStage2: ['', 'Pending', 'Approved', 'Rejected'],
  tenderCall: ['', 'Not Started', 'In Progress', 'Completed']
};

// Column keys that are never part of "fill me in order" progression -
// they're either identifiers or auto-generated, not user-entered.
const PROGRESS_EXCLUDED_KEYS = ['_id', 'id', 'maintenanceId'];

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
  showActions = true,
  // When true, a column can only be filled in once every column before it
  // (left to right) already has a value. Off by default so existing tables
  // (Vehicles, Driver Management, Trip Scheduling, Audit Log) keep working
  // exactly as they did before.
  progressiveFill = false,
  // Optional (col, rowData) => boolean. Return true to force a column to
  // stay locked (read-only) regardless of progressiveFill - e.g. keeping
  // the Repair table's later columns locked until an approval process
  // has finished. Defaults to "never locked".
  columnLock = null,
}) => {
  const rowId = row._id || row.id;
  const isNewRow = !row.vehicleId || row.vehicleId === '';
  const [editMode, setEditMode] = useState(editable && isNewRow);
  const [editedData, setEditedData] = useState(row);

  // editedData only starts out equal to `row` - it never updates again on
  // its own. So when the underlying record changes for a reason outside
  // this row's own edit form (Approve/Reject, a background refetch, an
  // update made elsewhere), the row kept showing whatever it looked like
  // when it first mounted. Re-sync it whenever the server data changes,
  // as long as the user isn't mid-edit (so we never clobber unsaved
  // input).
  useEffect(() => {
    if (!editMode) {
      setEditedData(row);
    }
  }, [row, editMode]);

  const isFilled = (val) => val !== undefined && val !== null && val !== '';

  const progressFillableColumns = columns.filter(
    (c) => !c.render && !PROGRESS_EXCLUDED_KEYS.includes(c.key)
  );

  const isProgressLocked = (col) => {
    if (!progressiveFill || col.render) return false;
    const idx = progressFillableColumns.findIndex((c) => c.key === col.key);
    if (idx <= 0) return false;
    return progressFillableColumns
      .slice(0, idx)
      .some((c) => !isFilled(editedData[c.key]));
  };

  const isColumnLocked = (col) => {
    if (col.render) return false;
    if (isProgressLocked(col)) return true;
    if (columnLock) return !!columnLock(col, editedData);
    return false;
  };

  const handleEdit = (key, value) => {
    const updated = { ...editedData, [key]: value };

    // If this table tracks a completeDate and the status is being moved to
    // "Completed", auto-fill today's date when one hasn't been set yet.
    // This is what makes the record show up in the Audit Log.
    const hasCompleteDateColumn = columns.some((c) => c.key === 'completeDate');
    if (key === 'status' && value === 'Completed' && hasCompleteDateColumn && !updated.completeDate) {
      updated.completeDate = new Date().toISOString().split('T')[0];
    }

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
      return `Rs ${Number(value).toFixed(2)}`;
    }
    
    return value || '-';
  };

  const renderEditableField = (col) => {
    const fieldKey = col.key;
    const value = editedData[fieldKey];

    // A column can supply its own `options` list (e.g. to narrow the
    // Status dropdown for a particular table) which takes precedence
    // over the shared FIELD_OPTIONS defaults used elsewhere.
    const dropdownOptions = col.options || FIELD_OPTIONS[fieldKey];

    // Check if this field has dropdown options
    if (dropdownOptions) {
      return (
        <select
          value={value || ''}
          onChange={(e) => handleEdit(fieldKey, e.target.value)}
          className="editable-select"
        >
          {dropdownOptions.map((option) => (
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
          className="editable-input cost-input"
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
      {columns.map((col) => {
        const locked = editMode && isColumnLocked(col);
        return (
          <td key={col.key} className={col.className || ''}>
            {col.render ? (
              // Custom-rendered columns (e.g. Approve/Reject) always reflect
              // the true server state, never the local edit-in-progress copy.
              col.render(row, onAction)
            ) : editMode && col.key !== '_id' && col.key !== 'id' && col.key !== 'maintenanceId' ? (
              locked ? (
                <span className="cell-content locked-cell" title="Complete the previous fields first">
                  {renderCellValue(col)}
                </span>
              ) : (
                renderEditableField(col)
              )
            ) : (
              <span className="cell-content">{renderCellValue(col)}</span>
            )}
          </td>
        );
      })}
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
      )}
    </tr>
  );
};

export default TableRow;