const xlsx = require("xlsx");
const file = "./file.xlsx";
const express = require("express");
const lodash = require("lodash"); // Alterado para importar como _

const app = express();
const port = 7000;

app.get("/", (req, res) => {
  try {
    const wb = xlsx.readFile(file);

    if (!wb.Sheets["SAP-EXTRACT"]) {
      return res
        .status(404)
        .json({ error: "Planilha 'SAP-EXTRACT' não encontrada" });
    }

    const ws = wb.Sheets["SAP-EXTRACT"];
    const data = xlsx.utils.sheet_to_json(ws);

    // Simplificando a criação do objeto spec
    const spec = lodash.zipObject(lodash.range(data.length), data);

    res.json(spec);
  } catch (error) {
    console.error("Erro ao ler arquivo Excel:", error);
    res.status(500).json({ error: "Erro ao processar arquivo Excel" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
