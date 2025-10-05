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

  const alterarStatus = async (tipo, id) => {
    try {
      if (tipo === 'usuarios') {
        const usuario = usuarios.find(u => u.id === id);
        await apiService.atualizarUsuario(id, {...usuario, ativo: !usuario.ativo});
      } else if (tipo === 'empresas') {
        const empresa = empresas.find(e => e.id === id);
        await apiService.atualizarEmpresa(id, {...empresa, ativo: !empresa.ativo});
      } else if (tipo === 'pontos') {
        const ponto = pontos.find(p => p.id === id);
        await apiService.atualizarPonto(id, {...ponto, ativo: !ponto.ativo});
      }
      carregarDados();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const excluirConta = async (tipo, id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta conta?')) return;
    
    try {
      if (tipo === 'usuarios') {
        await apiService.excluirUsuario(id);
      } else if (tipo === 'empresas') {
        await apiService.excluirEmpresa(id);
      } else if (tipo === 'pontos') {
        await apiService.excluirPonto(id);
      }
      carregarDados();
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
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
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0"><i className="bi bi-people me-2"></i>Usuários ({usuarios.length})</h5>
        </div>
        <div className="card-body">
          {usuarios.map(usuario => (
            <div key={usuario.id} className="border-bottom py-3">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{usuario.nome}</strong>
                  {usuario.email === 'vitorhugobate@gmail.com' && <span className="badge bg-danger ms-2">ADMIN</span>}
                  <br />
                  <small className="text-muted">{usuario.email}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span className={`badge ${usuario.ativo ? 'bg-success' : 'bg-danger'}`}>
                    {usuario.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                  {usuario.email !== 'vitorhugobate@gmail.com' && (
                    <>
                      <button 
                        className={`btn btn-sm ${usuario.ativo ? 'btn-warning' : 'btn-success'}`}
                        onClick={() => alterarStatus('usuarios', usuario.id)}
                      >
                        {usuario.ativo ? 'Desativar' : 'Ativar'}
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={() => excluirConta('usuarios', usuario.id)}
                      >
                        Excluir
                      </button>
                    </>
                  )}
                  {usuario.email === 'vitorhugobate@gmail.com' && (
                    <small className="text-muted fst-italic">Conta protegida</small>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de Empresas */}
      <div className="card mb-4">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0"><i className="bi bi-building me-2"></i>Empresas ({empresas.length})</h5>
        </div>
        <div className="card-body">
          {empresas.length === 0 ? (
            <p className="text-muted">Nenhuma empresa cadastrada</p>
          ) : (
            empresas.map(empresa => (
              <div key={empresa.id} className="border-bottom py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{empresa.nome}</strong>
                    <br />
                    <small className="text-muted">{empresa.email}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${empresa.ativo ? 'bg-success' : 'bg-danger'}`}>
                      {empresa.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                    <button 
                      className={`btn btn-sm ${empresa.ativo ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => alterarStatus('empresas', empresa.id)}
                    >
                      {empresa.ativo ? 'Desativar' : 'Ativar'}
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => excluirConta('empresas', empresa.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lista de Pontos */}
      <div className="card">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0"><i className="bi bi-geo-alt me-2"></i>Pontos de Coleta ({pontos.length})</h5>
        </div>
        <div className="card-body">
          {pontos.length === 0 ? (
            <p className="text-muted">Nenhum ponto cadastrado</p>
          ) : (
            pontos.map(ponto => (
              <div key={ponto.id} className="border-bottom py-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{ponto.nome}</strong>
                    <br />
                    <small className="text-muted">{ponto.endereco}</small>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className={`badge ${ponto.ativo ? 'bg-success' : 'bg-danger'}`}>
                      {ponto.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                    <button 
                      className={`btn btn-sm ${ponto.ativo ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => alterarStatus('pontos', ponto.id)}
                    >
                      {ponto.ativo ? 'Desativar' : 'Ativar'}
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => excluirConta('pontos', ponto.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default GerenciarContas;