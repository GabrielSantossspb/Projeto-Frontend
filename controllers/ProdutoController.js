const { Produto } = require('../models/index');

const ProdutoController = {
  // Criar Produto (Create)
  async criar(req, res) {
    try {
      const produto = await Produto.create(req.body);
      return res.status(201).json(produto);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar produto' });
    }
  },

  // Listar todos os Produtos (Read)
  async listar(req, res) {
    try {
      const produtos = await Produto.findAll();
      return res.json(produtos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  },

  // Atualizar Produto (Update)
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Produto.update(req.body, { where: { id } });
      if (updated) {
        const produtoAtualizado = await Produto.findByPk(id);
        return res.json(produtoAtualizado);
      }
      return res.status(404).json({ error: 'Produto não encontrado' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar produto' });
    }
  },

  // Deletar Produto (Delete)
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Produto.destroy({ where: { id } });
      if (deleted) {
        return res.status(204).send(); // Sucesso sem conteúdo de retorno
      }
      return res.status(404).json({ error: 'Produto não encontrado' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
};

module.exports = ProdutoController; 