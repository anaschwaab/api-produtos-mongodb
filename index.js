require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const specs = require("./swagger");

// Configuração do App
const app = express();
app.use(express.json());


// Configuração do Banco de Dados
mongoose.connect(process.env.MONGODB_URL);


// Rotas
const produtosRoutes = require("./routes/produtos");
app.use(produtosRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true}));

// Escuta de eventos
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});