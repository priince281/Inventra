import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (data, title, headers) => {
  const doc = new jsPDF();
  doc.text(`${title.toUpperCase()}`, 14, 15);
  doc.autoTable({
    head: [headers],
    body: data.map(item => Object.values(item)),
    startY: 20,
  });
  doc.save(`${title}.pdf`);
};

export const exportToExcel = (data, title) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
  XLSX.writeFile(workbook, `${title}.xlsx`);
};