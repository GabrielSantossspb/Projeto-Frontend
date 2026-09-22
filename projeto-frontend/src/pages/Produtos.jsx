import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [codigoBarras, setCodigoBarras] = useState('');

  // Buscar produtos do backend ao carregar a página
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/produtos');
      setProdutos(response.data);
    } catch (error) {
      alert('Erro ao carregar produtos do servidor.');
    }
  };

  const cadastrarProduto = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/produtos', {
        nome, descricao, preco: parseFloat(preco), codigoBarras
      });
      alert('Produto cadastrado com sucesso!');
      setNome(''); setDescricao(''); setPreco(''); setCodigoBarras('');
      carregarProdutos(); // Atualiza a lista na tela
    } catch (error) {
      alert('Erro ao cadastrar produto.');
    }
  };

  const deletarProduto = async (id) => {
    if (window.confirm('Deseja realmente excluir este produto?')) {
      try {
        await axios.delete(`http://localhost:3000/produtos/${id}`);
        carregarProdutos();
      } catch (error) {
        alert('Erro ao deletar produto.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📦 Gerenciamento de Produtos (CRUD)</h2>
      
      {/* Formulário de Cadastro */}
      <form onSubmit={cadastrarProduto} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" placeholder="Nome do Produto" value={nome} onChange={e => setNome(e.target.value)} required />
        <input type="text" placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <input type="number" step="0.01" placeholder="Preço" value={preco} onChange={e => setPreco(e.target.value)} required />
        <input type="text" placeholder="Código de Barras" value={codigoBarras} onChange={e => setCodigoBarras(e.target.value)} />
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>Cadastrar Produto</button>
      </form>

      {/* Lista de Produtos */}
      <h3>Produtos Cadastrados</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>ID</th><th>Nome</th><th>Descrição</th><th>Preço</th><th>Código de Barras</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.nome}</td><td>{p.descricao}</td><td>R\$ {p.preco.toFixed(2)}</td><td>{p.codigoBarras}</td>
              <td>
                <button onClick={() => deletarProduto(p.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}