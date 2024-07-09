// utils/readExcelFile.js
import XLSX from 'xlsx';

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      resolve(data);
    };
    reader.onerror = (evt) => reject(evt);
    reader.readAsBinaryString(file);
  });
};
