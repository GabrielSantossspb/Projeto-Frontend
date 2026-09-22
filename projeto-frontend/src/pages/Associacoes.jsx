import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Associacoes() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');
  const [buscaProdutoId, setBuscaProdutoId] = useState('');
  const [fornecedoresVinculados, setFornecedoresVinculados] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const respProd = await axios.get('http://localhost:3000/produtos');
      const respForn = await axios.get('http://localhost:3000/fornecedores');
      setProdutos(respProd.data);
      setFornecedores(respForn.data);
    } catch (error) {
      alert('Erro ao carregar dados para associação.');
    }
  };

  const realizarAssociacao = async (e) => {
    e.preventDefault();
    if (!produtoSelecionado || !fornecedorSelecionado) {
      alert('Selecione um produto e um fornecedor.');
      return;
    }
    try {
      await axios.post('http://localhost:3000/associar', {
        produtoId: parseInt(produtoSelecionado),
        fornecedorId: parseInt(fornecedorSelecionado)
      });
      alert('Associação realizada com sucesso!');
      setProdutoSelecionado('');
      setFornecedorSelecionado('');
    } catch (error) {
      alert('Erro ao realizar associação.');
    }
  };

  const buscarFornecedores = async () => {
    if (!buscaProdutoId) return;
    try {
      const response = await axios.get(`http://localhost:3000/produtos/${buscaProdutoId}/fornecedores`);
      setFornecedoresVinculados(response.data);
    } catch (error) {
      alert('Erro ao buscar fornecedores vinculados.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🔗 Associação de Produtos e Fornecedores (Muitos para Muitos)</h2>

      {/* Formulário de Associação */}
      <form onSubmit={realizarAssociacao} style={{ marginBottom: '40px', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <select value={produtoSelecionado} onChange={e => setProdutoSelecionado(e.target.value)}>
          <option value="">-- Selecione o Produto --</option>
          {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>

        <select value={fornecedorSelecionado} onChange={e => setFornecedorSelecionado(e.target.value)}>
          <option value="">-- Selecione o Fornecedor --</option>
          {fornecedores.map(f => <option key={f.id} value={f.id}>{f.nome}</option>)}
        </select>

        <button type="submit" style={{ padding: '8px 15px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Vincular</button>
      </form>

      {/* Consulta de Associações */}
      <h3>🔍 Consultar Fornecedores por Produto</h3>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select value={buscaProdutoId} onChange={e => setBuscaProdutoId(e.target.value)}>
          <option value="">-- Escolha um Produto --</option>
          {produtos.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
        </select>
        <button onClick={buscarFornecedores} style={{ padding: '8px 15px', background: '#17a2b8', color: '#fff', border: 'none', cursor: 'pointer' }}>Consultar</button>
      </div>

      <ul>
        {fornecedoresVinculados.map(f => (
          <li key={f.id} style={{ margin: '5px 0' }}>👉 <strong>{f.nome}</strong> (CNPJ: {f.cnpj})</li>
        ))}
        {fornecedoresVinculados.length === 0 && buscaProdutoId && <li>Nenhum fornecedor vinculado a este produto ainda.</li>}
      </ul>
    </div>
  );
}