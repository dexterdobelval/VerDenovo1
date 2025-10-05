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
    <div style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', minHeight: '100vh', padding: '2rem 0'}}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="d-inline-block p-3 rounded-circle mb-3" style={{background: 'linear-gradient(135deg, #dc2626, #b91c1c)', boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'}}>
            <i className="bi bi-shield-lock text-white" style={{fontSize: '2.5rem'}}></i>
          </div>
          <h1 className="display-4 fw-bold text-danger mb-2">Painel Administrativo</h1>
          <p className="text-muted fs-5">Controle total sobre usuários, empresas e pontos de coleta</p>
        </div>
        
        {/* Estatísticas */}
        <div className="row mb-5 g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', transform: 'translateY(0)', transition: 'all 0.3s ease'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body text-center text-white p-4">
                <div className="mb-3">
                  <i className="bi bi-people" style={{fontSize: '3rem', opacity: 0.9}}></i>
                </div>
                <h2 className="fw-bold mb-2">{usuarios.length}</h2>
                <p className="mb-0 fs-5">Usuários Cadastrados</p>
                <small className="opacity-75">Contas de usuários no sistema</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #6b7280, #374151)', transform: 'translateY(0)', transition: 'all 0.3s ease'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body text-center text-white p-4">
                <div className="mb-3">
                  <i className="bi bi-building" style={{fontSize: '3rem', opacity: 0.9}}></i>
                </div>
                <h2 className="fw-bold mb-2">{empresas.length}</h2>
                <p className="mb-0 fs-5">Empresas Parceiras</p>
                <small className="opacity-75">Organizações cadastradas</small>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card border-0 shadow-lg h-100" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #10b981, #047857)', transform: 'translateY(0)', transition: 'all 0.3s ease'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body text-center text-white p-4">
                <div className="mb-3">
                  <i className="bi bi-geo-alt" style={{fontSize: '3rem', opacity: 0.9}}></i>
                </div>
                <h2 className="fw-bold mb-2">{pontos.length}</h2>
                <p className="mb-0 fs-5">Pontos de Coleta</p>
                <small className="opacity-75">Locais de reciclagem</small>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Usuários */}
        <div className="card border-0 shadow-lg mb-5" style={{borderRadius: '25px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)'}}>
          <div className="card-header border-0 position-relative overflow-hidden" style={{background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
            <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
            <h4 className="text-white mb-0 fw-bold position-relative">
              <i className="bi bi-people me-3" style={{fontSize: '1.8rem'}}></i>
              Usuários Cadastrados ({usuarios.length})
            </h4>
          </div>
          <div className="card-body p-4">
            {usuarios.map((usuario, index) => (
              <div key={usuario.id} className="p-4 mb-3 rounded-4 position-relative" style={{background: index % 2 === 0 ? 'rgba(59, 130, 246, 0.05)' : 'rgba(248, 250, 252, 0.8)', border: '1px solid rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none';}}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', background: usuario.email === 'vitorhugobate@gmail.com' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                      <i className={`bi ${usuario.email === 'vitorhugobate@gmail.com' ? 'bi-shield-lock' : 'bi-person'} text-white`} style={{fontSize: '1.3rem'}}></i>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold text-dark">
                        {usuario.nome}
                        {usuario.email === 'vitorhugobate@gmail.com' && <span className="badge bg-danger ms-2 px-2 py-1" style={{fontSize: '0.7rem'}}>ADMIN</span>}
                      </h6>
                      <small className="text-muted">{usuario.email}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <span className={`badge px-3 py-2 rounded-pill ${usuario.ativo ? 'bg-success' : 'bg-danger'}`} style={{fontSize: '0.8rem'}}>
                      {usuario.ativo ? '✅ Ativo' : '❌ Inativo'}
                    </span>
                    {usuario.email !== 'vitorhugobate@gmail.com' && (
                      <>
                        <button 
                          className={`btn btn-sm px-3 py-2 fw-bold ${usuario.ativo ? 'btn-warning' : 'btn-success'}`}
                          onClick={() => alterarStatus('usuarios', usuario.id)}
                          style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
                        >
                          <i className={`bi ${usuario.ativo ? 'bi-pause-circle' : 'bi-play-circle'} me-1`}></i>
                          {usuario.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                        <button 
                          className="btn btn-sm btn-danger px-3 py-2 fw-bold"
                          onClick={() => excluirConta('usuarios', usuario.id)}
                          style={{borderRadius: '12px', transition: 'all 0.3s ease'}}
                        >
                          <i className="bi bi-trash me-1"></i>Excluir
                        </button>
                      </>
                    )}
                    {usuario.email === 'vitorhugobate@gmail.com' && (
                      <div className="text-muted fst-italic d-flex align-items-center">
                        <i className="bi bi-shield-lock me-2"></i>
                        <span>Conta Protegida</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lista de Empresas */}
        <div className="card border-0 shadow-lg mb-5" style={{borderRadius: '25px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)'}}>
          <div className="card-header border-0 position-relative overflow-hidden" style={{background: 'linear-gradient(135deg, #6b7280, #374151)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
            <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
            <h4 className="text-white mb-0 fw-bold position-relative">
              <i className="bi bi-building me-3" style={{fontSize: '1.8rem'}}></i>
              Empresas Parceiras ({empresas.length})
            </h4>
          </div>
          <div className="card-body p-4">
            {empresas.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-3">
                  <i className="bi bi-building" style={{fontSize: '4rem', color: '#9ca3af'}}></i>
                </div>
                <h5 className="text-muted">Nenhuma empresa cadastrada</h5>
                <p className="text-muted">As empresas parceiras aparecerão aqui quando se cadastrarem</p>
              </div>
            ) : (
              empresas.map((empresa, index) => (
                <div key={empresa.id} className="p-4 mb-3 rounded-4" style={{background: index % 2 === 0 ? 'rgba(107, 114, 128, 0.05)' : 'rgba(248, 250, 252, 0.8)', border: '1px solid rgba(107, 114, 128, 0.1)', transition: 'all 0.3s ease'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #6b7280, #374151)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                        <i className="bi bi-building text-white" style={{fontSize: '1.3rem'}}></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold text-dark">{empresa.nome}</h6>
                        <small className="text-muted">{empresa.email}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className={`badge px-3 py-2 rounded-pill ${empresa.ativo ? 'bg-success' : 'bg-danger'}`}>
                        {empresa.ativo ? '✅ Ativo' : '❌ Inativo'}
                      </span>
                      <button className={`btn btn-sm px-3 py-2 fw-bold ${empresa.ativo ? 'btn-warning' : 'btn-success'}`} onClick={() => alterarStatus('empresas', empresa.id)} style={{borderRadius: '12px'}}>
                        {empresa.ativo ? 'Desativar' : 'Ativar'}
                      </button>
                      <button className="btn btn-sm btn-danger px-3 py-2 fw-bold" onClick={() => excluirConta('empresas', empresa.id)} style={{borderRadius: '12px'}}>
                        <i className="bi bi-trash me-1"></i>Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Lista de Pontos */}
        <div className="card border-0 shadow-lg" style={{borderRadius: '25px', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)'}}>
          <div className="card-header border-0 position-relative overflow-hidden" style={{background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
            <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
            <h4 className="text-white mb-0 fw-bold position-relative">
              <i className="bi bi-geo-alt me-3" style={{fontSize: '1.8rem'}}></i>
              Pontos de Coleta ({pontos.length})
            </h4>
          </div>
          <div className="card-body p-4">
            {pontos.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-3">
                  <i className="bi bi-geo-alt" style={{fontSize: '4rem', color: '#9ca3af'}}></i>
                </div>
                <h5 className="text-muted">Nenhum ponto cadastrado</h5>
                <p className="text-muted">Os pontos de coleta aparecerão aqui quando forem cadastrados</p>
              </div>
            ) : (
              pontos.map((ponto, index) => (
                <div key={ponto.id} className="p-4 mb-3 rounded-4" style={{background: index % 2 === 0 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(248, 250, 252, 0.8)', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease'}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #047857)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                        <i className="bi bi-geo-alt text-white" style={{fontSize: '1.3rem'}}></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold text-dark">{ponto.nome}</h6>
                        <small className="text-muted">{ponto.endereco}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className={`badge px-3 py-2 rounded-pill ${ponto.ativo ? 'bg-success' : 'bg-danger'}`}>
                        {ponto.ativo ? '✅ Ativo' : '❌ Inativo'}
                      </span>
                      <button className={`btn btn-sm px-3 py-2 fw-bold ${ponto.ativo ? 'btn-warning' : 'btn-success'}`} onClick={() => alterarStatus('pontos', ponto.id)} style={{borderRadius: '12px'}}>
                        {ponto.ativo ? 'Desativar' : 'Ativar'}
                      </button>
                      <button className="btn btn-sm btn-danger px-3 py-2 fw-bold" onClick={() => excluirConta('pontos', ponto.id)} style={{borderRadius: '12px'}}>
                        <i className="bi bi-trash me-1"></i>Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GerenciarContas;