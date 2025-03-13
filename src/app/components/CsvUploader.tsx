import React, { useState } from "react";
import Papa from "papaparse";

interface CsvRow {
  date: string;
  title: string;
  amount: string;
}

const CsvUploader: React.FC = () => {
  const [data, setData] = useState<CsvRow[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.type !== "text/csv") {
        alert("Por favor, selecione um arquivo CSV.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target?.result) return;

        const csvData = Papa.parse<CsvRow>(e.target.result as string, {
          header: true, // Converte a primeira linha em chave dos objetos
          skipEmptyLines: true,
        });

        setData(csvData.data);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      
      {data.length > 0 && (
        <table border={1} style={{ marginTop: "20px", width: "100%" }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.title}</td>
                <td>{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CsvUploader;
