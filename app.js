const express = require('express');
const { sequelize } = require('./models/index');

// Importando os Controladores
const ProdutoController = require('./controllers/ProdutoController');
const FornecedorController = require('./controllers/FornecedorController');
const AssociacaoController = require('./controllers/AssociacaoController');

const app = express();
app.use(express.json()); // Permite que o servidor entenda dados em formato JSON

// ==========================================
// ROTAS DE PRODUTO
// ==========================================
app.post('/produtos', ProdutoController.criar);
app.get('/produtos', ProdutoController.listar);
app.put('/produtos/:id', ProdutoController.atualizar);
app.delete('/produtos/:id', ProdutoController.deletar);

// ==========================================
// ROTAS DE FORNECEDOR
// ==========================================
app.post('/fornecedores', FornecedorController.criar);
app.get('/fornecedores', FornecedorController.listar);
app.put('/fornecedores/:id', FornecedorController.atualizar);
app.delete('/fornecedores/:id', FornecedorController.deletar);

// ==========================================
// ROTAS DE ASSOCIAÇÃO (Muitos para Muitos)
// ==========================================
app.post('/associar', AssociacaoController.associar);
app.get('/produtos/:id/fornecedores', AssociacaoController.listarFornecedoresDoProduto);

// ==========================================
// INICIALIZAÇÃO DO SERVIDOR
// ==========================================
const PORT = 3000;

async function iniciarServidor() {
  try {
    // Sincroniza o banco sem apagar os dados existentes (altere para true apenas se quiser resetar o banco)
    await sequelize.sync({ force: false });
    
    app.listen(PORT, () => {
      console.log(`=========================================`);
      console.log(`🚀 BACKEND RODANDO EM http://localhost:${PORT}`);
      console.log(`💾 Banco de dados SQLite ativo e sincronizado!`);
      console.log(`=========================================`);
    });
  } catch (error) {
    console.error("❌ Erro ao iniciar o servidor:", error);
  }
}

iniciarServidor();
