import React from 'react';
import Button from './Buttons/Button';

const ExportPdfBtn = ({ data, filename = 'export' }) => {
  const handleExport = () => {
    // Simple CSV export for now
    const headers = Object.keys(data[0] || {});
    const csv = [
      headers.join(','),
      ...data.map(row => 
        headers.map(h => {
          const val = row[h];
          return typeof val === 'string' && val.includes(',') ? `"${val}"` : val;
        }).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.csv`;
    a.click();
  };

  return (
    <Button variant="primary" onClick={handleExport}>
      📄 Export PDF
    </Button>
  );
};

export default ExportPdfBtn;