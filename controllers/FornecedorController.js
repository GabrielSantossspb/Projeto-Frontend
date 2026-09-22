const { Fornecedor } = require('../models/index');

const FornecedorController = {
  async criar(req, res) {
    try {
      const fornecedor = await Fornecedor.create(req.body);
      return res.status(201).json(fornecedor);
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar fornecedor' });
    }
  },

  async listar(req, res) {
    try {
      const fornecedores = await Fornecedor.findAll();
      return res.json(fornecedores);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar fornecedores' });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Fornecedor.update(req.body, { where: { id } });
      if (updated) {
        const fornecedorAtualizado = await Fornecedor.findByPk(id);
        return res.json(fornecedorAtualizado);
      }
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao atualizar fornecedor' });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Fornecedor.destroy({ where: { id } });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ error: 'Fornecedor não encontrado' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao deletar fornecedor' });
    }
  }
};

module.exports = FornecedorController;