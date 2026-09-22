const sequelize = require('../config/database');
// Mudamos para ./ para ele procurar na mesma pasta física
const Produto = require('./Produto'); 
const Fornecedor = require('./Fornecedor');

// Cria a tabela intermediária de associação automática ("Muitos para Muitos")
Produto.belongsToMany(Fornecedor, { through: 'ProdutoFornecedor' });
Fornecedor.belongsToMany(Produto, { through: 'ProdutoFornecedor' });

module.exports = {
  sequelize,
  Produto,
  Fornecedor
};