import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

function GerenciarContas() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Usuario:', usuario);
    if (!usuario || !usuario.dados) {
      console.log('Redirecionando para login');
      navigate('/login-usuario');
      return;
    }
    console.log('Usuário logado, carregando dados');
    carregarDados();
  }, [usuario]);

  const carregarDados = async () => {
    try {
      const [usuariosData, empresasData, pontosData] = await Promise.all([
        apiService.listarUsuarios(),
        apiService.listarEmpresas(),
        apiService.listarPontos()
      ]);
      
      setUsuarios(usuariosData);
      setEmpresas(empresasData);
      setPontos(pontosData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="spinner-border text-danger"></div>
      </div>
    );
  }

  return (
    <div style={{padding: '2rem', minHeight: '100vh'}}>
      <h1 className="text-danger mb-4">
        <i className="bi bi-shield-lock me-2"></i>Gerenciar Contas
      </h1>
      
      {/* Estatísticas */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-primary text-white">
            <div className="card-body text-center">
              <h3>{usuarios.length}</h3>
              <p>Usuários</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-secondary text-white">
            <div className="card-body text-center">
              <h3>{empresas.length}</h3>
              <p>Empresas</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>{pontos.length}</h3>
              <p>Pontos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Usuários */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Usuários ({usuarios.length})</h5>
        </div>
        <div className="card-body">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="border-bottom py-2">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{usuario.nome}</strong>
                  {usuario.email === 'vitorhugobate@gmail.com' && <span className="badge bg-danger ms-2">ADMIN</span>}
                  <br />
                  <small className="text-muted">{usuario.email}</small>
                </div>
                <div>
                  <span className={`badge ${usuario.ativo ? 'bg-success' : 'bg-danger'}`}>
                    {usuario.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Empresas */}
      <div className="card mb-4">
        <div className="card-header">
          <h5>Empresas ({empresas.length})</h5>
        </div>
        <div className="card-body">
          {empresas.length === 0 ? (
            <p className="text-muted">Nenhuma empresa cadastrada</p>
          ) : (
            empresas.map(empresa => (
              <div key={empresa.id} className="border-bottom py-2">
                <strong>{empresa.nome}</strong>
                <br />
                <small className="text-muted">{empresa.email}</small>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lista de Pontos */}
      <div className="card">
        <div className="card-header">
          <h5>Pontos de Coleta ({pontos.length})</h5>
        </div>
        <div className="card-body">
          {pontos.length === 0 ? (
            <p className="text-muted">Nenhum ponto cadastrado</p>
          ) : (
            pontos.map(ponto => (
              <div key={ponto.id} className="border-bottom py-2">
                <strong>{ponto.nome}</strong>
                <br />
                <small className="text-muted">{ponto.endereco}</small>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GerenciarContas;