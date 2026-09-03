'use client';

import React from 'react';
import * as XLSX from 'xlsx';
import { Download } from 'lucide-react';

interface ExportExcelButtonProps {
  data: any[];
  fileName: string;
  buttonText?: string;
}

export default function ExportExcelButton({ data, fileName, buttonText = 'Exportar a Excel' }: ExportExcelButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert('No hay datos disponibles para exportar.');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte');
    XLSX.writeFile(workbook, `${fileName}_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <button onClick={handleExport} className="btn-admin btn-admin-excel">
      <Download size={16} />
      <span>{buttonText}</span>
    </button>
  );
}
