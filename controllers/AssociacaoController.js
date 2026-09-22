const { Produto, Fornecedor } = require('../models/index');

const AssociacaoController = {
  // Associar um produto a um fornecedor
  async associar(req, res) {
    try {
      const { produtoId, fornecedorId } = req.body;
      const produto = await Produto.findByPk(produtoId);
      const fornecedor = await Fornecedor.findByPk(fornecedorId);

      if (!produto || !fornecedor) {
        return res.status(404).json({ error: 'Produto ou Fornecedor não encontrado' });
      }

      await produto.addFornecedor(fornecedor); // O Sequelize cria o vínculo automático
      return res.json({ message: 'Associação realizada com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar associação' });
    }
  },

  // Consultar fornecedores de um determinado produto
  async listarFornecedoresDoProduto(req, res) {
    try {
      const { id } = req.params;
      const produto = await Produto.findByPk(id, { include: Fornecedor });
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado' });
      }
      return res.json(produto.Fornecedors);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao consultar fornecedores' });
    }
  }
};

module.exports = AssociacaoController;
