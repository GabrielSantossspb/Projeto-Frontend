import React, { useState } from 'react';
import Produtos from './pages/Produtos';
import Fornecedores from './pages/Fornecedores';
import Associacoes from './pages/Associacoes';

export default function App() {
  // Estado para controlar qual tela está ativa
  const [telaAtiva, setTelaAtiva] = useState('produtos');

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Menu Superior de Navegação */}
      <header style={{ background: '#343a40', padding: '15px', color: '#fff', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>🏬 Sistema Integrador Gran</h1>
        <nav style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setTelaAtiva('produtos')} 
            style={{ padding: '8px 15px', background: telaAtiva === 'produtos' ? '#007bff' : '#6c757d', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            📦 Produtos
          </button>
          <button 
            onClick={() => setTelaAtiva('fornecedores')} 
            style={{ padding: '8px 15px', background: telaAtiva === 'fornecedores' ? '#007bff' : '#6c757d', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            🏢 Fornecedores
          </button>
          <button 
            onClick={() => setTelaAtiva('associacoes')} 
            style={{ padding: '8px 15px', background: telaAtiva === 'associacoes' ? '#007bff' : '#6c757d', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            🔗 Associações
          </button>
        </nav>
      </header>

      {/* Renderização condicional das telas */}
      <main style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {telaAtiva === 'produtos' && <Produtos />}
        {telaAtiva === 'fornecedores' && <Fornecedores />}
        {telaAtiva === 'associacoes' && <Associacoes />}
      </main>
    </div>
  );
}