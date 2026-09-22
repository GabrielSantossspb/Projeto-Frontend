import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Fornecedores() {
  const [fornecedores, setFornecedores] = useState([]);
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [contato, setContato] = useState('');

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = async () => {
    try {
      const response = await axios.get('http://localhost:3000/fornecedores');
      setFornecedores(response.data);
    } catch (error) {
      alert('Erro ao carregar fornecedores.');
    }
  };

  const cadastrarFornecedor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/fornecedores', {
        nome, cnpj, endereco, contato
      });
      alert('Fornecedor cadastrado com sucesso!');
      setNome(''); setCnpj(''); setEndereco(''); setContato('');
      carregarFornecedores();
    } catch (error) {
      alert('Erro ao cadastrar fornecedor.');
    }
  };

  const deletarFornecedor = async (id) => {
    if (window.confirm('Deseja realmente excluir este fornecedor?')) {
      try {
        await axios.delete(`http://localhost:3000/fornecedores/${id}`);
        carregarFornecedores();
      } catch (error) {
        alert('Erro ao deletar fornecedor.');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>🏢 Gerenciamento de Fornecedores (CRUD)</h2>
      
      <form onSubmit={cadastrarFornecedor} style={{ marginBottom: '30px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" placeholder="Nome do Fornecedor" value={nome} onChange={e => setNome(e.target.value)} required />
        <input type="text" placeholder="CNPJ" value={cnpj} onChange={e => setCnpj(e.target.value)} required />
        <input type="text" placeholder="Endereço" value={endereco} onChange={e => setEndereco(e.target.value)} />
        <input type="text" placeholder="Contato (E-mail/Tel)" value={contato} onChange={e => setContato(e.target.value)} />
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>Cadastrar Fornecedor</button>
      </form>

      <h3>Fornecedores Cadastrados</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f2f2f2' }}>
            <th>ID</th><th>Nome</th><th>CNPJ</th><th>Endereço</th><th>Contato</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(f => (
            <tr key={f.id}>
              <td>{f.id}</td><td>{f.nome}</td><td>{f.cnpj}</td><td>{f.endereco}</td><td>{f.contato}</td>
              <td>
                <button onClick={() => deletarFornecedor(f.id)} style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}