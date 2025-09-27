import { useState, useEffect } from 'react';

function GerenciarContas() {
  const [contas, setContas] = useState({
    usuarios: [
      { id: 1, email: 'usuario1@email.com', nome: 'João Silva', ativo: true },
      { id: 2, email: 'usuario2@email.com', nome: 'Maria Santos', ativo: false }
    ],
    empresas: [
      { id: 1, email: 'empresa1@email.com', nome: 'EcoTech Ltda', ativo: true },
      { id: 2, email: 'empresa2@email.com', nome: 'Verde Corp', ativo: true }
    ],
    pontos: [
      { id: 1, email: 'ponto1@email.com', nome: 'Ponto Centro', ativo: true },
      { id: 2, email: 'ponto2@email.com', nome: 'Ponto Norte', ativo: false }
    ]
  });

  const alterarStatus = (tipo, id) => {
    setContas(prev => ({
      ...prev,
      [tipo]: prev[tipo].map(conta => 
        conta.id === id ? { ...conta, ativo: !conta.ativo } : conta
      )
    }));
  };

  const excluirConta = (tipo, id) => {
    if (window.confirm('Tem certeza que deseja excluir esta conta?')) {
      setContas(prev => ({
        ...prev,
        [tipo]: prev[tipo].filter(conta => conta.id !== id)
      }));
    }
  };

  const renderTabela = (tipo, dados, titulo) => (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{titulo}</h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Email</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {dados.map(conta => (
                <tr key={conta.id}>
                  <td>{conta.nome}</td>
                  <td>{conta.email}</td>
                  <td>
                    <span className={`badge ${conta.ativo ? 'bg-success' : 'bg-secondary'}`}>
                      {conta.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${conta.ativo ? 'btn-warning' : 'btn-success'} me-2`}
                      onClick={() => alterarStatus(tipo, conta.id)}
                    >
                      {conta.ativo ? 'Desativar' : 'Reativar'}
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => excluirConta(tipo, conta.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-danger">
              <i className="bi bi-shield-lock me-2"></i>
              Gerenciar Contas
            </h2>
            <span className="badge bg-danger fs-6">ADMINISTRADOR</span>
          </div>

          {renderTabela('usuarios', contas.usuarios, 'Usuários')}
          {renderTabela('empresas', contas.empresas, 'Empresas')}
          {renderTabela('pontos', contas.pontos, 'Pontos de Coleta')}
        </div>
      </div>
    </div>
  );
}

export default GerenciarContas;