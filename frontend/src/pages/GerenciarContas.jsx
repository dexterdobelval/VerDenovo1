import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

function GerenciarContas() {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [pontos, setPontos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Usuario completo:', usuario);
    console.log('Usuario.dados:', usuario?.dados);
    
    if (!usuario || !usuario.dados) {
      console.log('Redirecionando para login - usuário não encontrado');
      navigate('/login-usuario');
      return;
    }
    
    console.log('Nivel de acesso do usuário:', usuario.dados.nivelAcesso);
    console.log('Tipo do nivelAcesso:', typeof usuario.dados.nivelAcesso);
    
    // Verificar se o usuário é ADMIN
    if (usuario.dados.nivelAcesso !== 'ADMIN') {
      console.log('Acesso negado - usuário não é ADMIN. Nivel atual:', usuario.dados.nivelAcesso);
      alert('Acesso negado. Apenas administradores podem acessar esta página.');
      navigate('/');
      return;
    }
    
    console.log('Usuário ADMIN logado, carregando dados');
    // Scroll para o topo da página
    window.scrollTo({ top: 0, behavior: 'smooth' });
    carregarDados();
  }, [usuario]);

  const carregarDados = async () => {
    try {
      const pontosData = await apiService.listarTodosPontos();
      console.log('Dados dos pontos:', pontosData);
      const pontosFormatados = pontosData.map(ponto => ({
        id: ponto.id,
        nome: ponto.nome,
        cep: ponto.cep,
        material: ponto.material,
        horaFuncionamento: ponto.horaFuncionamento,
        ativo: ponto.statusPonto === 'ATIVO',
        statusPonto: ponto.statusPonto
      }));
      console.log('Pontos formatados:', pontosFormatados);
      setPontos(pontosFormatados);
      
      // Buscar usuários reais do banco
      const usuariosData = await apiService.listarUsuarios();
      const usuariosFormatados = usuariosData.map(user => ({
        id: user.id,
        nome: user.nome,
        email: user.email,
        ativo: user.statusUsuario === 'ATIVO',
        nivelAcesso: user.nivelAcesso,
        statusUsuario: user.statusUsuario
      }));
      setUsuarios(usuariosFormatados);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const alterarStatus = async (tipo, id) => {
    try {
      if (tipo === 'usuarios') {
        await apiService.alterarStatusUsuario(id);
      } else if (tipo === 'pontos') {
        await apiService.alterarStatusPonto(id);
      }
      carregarDados();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
      alert('Erro ao alterar status: ' + error.message);
    }
  };

  const excluirConta = async (tipo, id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta conta?')) return;
    
    try {
      if (tipo === 'pontos') {
        await apiService.deletarPonto(id);
      } else if (tipo === 'usuarios') {
        await apiService.deletarUsuario(id);
      }
      carregarDados();
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      alert('Erro ao excluir: ' + error.message);
    }
  };



  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="spinner-border text-danger"></div>
      </div>
    );
  }

  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-slideInLeft { animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-slideInRight { animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-scaleIn { animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
    .hover-lift { 
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
    }
    .hover-lift:hover { 
      transform: translateY(-8px) scale(1.02); 
      box-shadow: 0 20px 40px rgba(0,0,0,0.15); 
    }
    .section-card { 
      background: rgba(255,255,255,0.95); 
      backdrop-filter: blur(10px);
      border-radius: 25px; 
      box-shadow: 0 8px 32px rgba(0,0,0,0.1); 
      border: 1px solid rgba(255,255,255,0.2); 
    }
    .interactive-card {
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }
    .interactive-card:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }
  `;

  return (
    <div>
      <style>{animationStyles}</style>
      {/* Header Melhorado */}
      <div className="text-center mb-5" style={{marginTop: '100px'}}>
        <div className="d-inline-flex align-items-center justify-content-center mb-4 animate-pulse" style={{
          width: '120px', 
          height: '120px', 
          background: 'linear-gradient(135deg, #dc2626, #b91c1c)', 
          borderRadius: '50%', 
          boxShadow: '0 20px 60px rgba(220, 38, 38, 0.4), inset 0 0 0 4px rgba(255,255,255,0.1)',
          border: '4px solid rgba(255,255,255,0.2)'
        }}>
          <i className="bi bi-shield-lock text-white" style={{fontSize: '3.5rem'}}></i>
        </div>
        
        <h1 className="fw-bold mb-3 animate-fadeInUp" style={{fontSize: '3.5rem', letterSpacing: '-0.02em', color: '#1e293b'}}>
          <span style={{color: '#dc2626'}}>Área</span> Administrativa
        </h1>
        
        <p className="text-muted fs-5 mb-0 animate-fadeInUp" style={{maxWidth: '600px', margin: '0 auto'}}>
          Gerencie usuários, pontos de coleta e monitore o sistema
        </p>
      </div>

      <div className="container">
        
        {/* Estatísticas */}
        <div className="row mb-5 g-4" style={{marginTop: '-2rem'}}>
          <div className="col-md-6 animate-slideInLeft animate-delay-1">
            <div className="card border-0 section-card h-100 interactive-card position-relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', 
              border: '1px solid rgba(59, 130, 246, 0.2)',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.15)'
            }}>
              <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', filter: 'blur(20px)'}}></div>
              
              <div className="card-body text-center p-5 position-relative">
                <div className="position-relative mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center animate-pulse" style={{
                    width: '120px', 
                    height: '120px', 
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
                    borderRadius: '50%', 
                    boxShadow: '0 15px 40px rgba(59, 130, 246, 0.4), inset 0 0 0 3px rgba(255,255,255,0.2)',
                    border: '3px solid rgba(255,255,255,0.3)'
                  }}>
                    <i className="bi bi-people-fill text-white" style={{fontSize: '3.5rem'}}></i>
                  </div>
                </div>
                <h1 className="fw-bold mb-3" style={{
                  background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  fontSize: '4rem',
                  textShadow: '0 4px 20px rgba(29, 78, 216, 0.3)'
                }}>{usuarios.length}</h1>
                <h4 className="mb-2 fw-bold" style={{color: '#1e293b'}}>Usuários Cadastrados</h4>
                <p className="text-muted fs-5 mb-0">Contas no sistema</p>
              </div>
              
              <div className="position-absolute bottom-0 start-0 w-100" style={{
                height: '6px', 
                background: 'linear-gradient(90deg, #3b82f6, #1d4ed8, #3b82f6)',
                boxShadow: '0 -2px 10px rgba(59, 130, 246, 0.3)'
              }}></div>
            </div>
          </div>
          <div className="col-md-6 animate-slideInRight animate-delay-2">
            <div className="card border-0 section-card h-100 interactive-card position-relative overflow-hidden" style={{
              background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', 
              border: '1px solid rgba(16, 185, 129, 0.2)',
              boxShadow: '0 10px 40px rgba(16, 185, 129, 0.15)'
            }}>
              <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', filter: 'blur(20px)'}}></div>
              
              <div className="card-body text-center p-5 position-relative">
                <div className="position-relative mb-4">
                  <div className="d-inline-flex align-items-center justify-content-center animate-pulse" style={{
                    width: '120px', 
                    height: '120px', 
                    background: 'linear-gradient(135deg, #10b981, #047857)', 
                    borderRadius: '50%', 
                    boxShadow: '0 15px 40px rgba(16, 185, 129, 0.4), inset 0 0 0 3px rgba(255,255,255,0.2)',
                    border: '3px solid rgba(255,255,255,0.3)'
                  }}>
                    <i className="bi bi-geo-alt-fill text-white" style={{fontSize: '3.5rem'}}></i>
                  </div>
                </div>
                <h1 className="fw-bold mb-3" style={{
                  background: 'linear-gradient(135deg, #047857, #10b981)', 
                  WebkitBackgroundClip: 'text', 
                  WebkitTextFillColor: 'transparent',
                  fontSize: '4rem',
                  textShadow: '0 4px 20px rgba(4, 120, 87, 0.3)'
                }}>{pontos.length}</h1>
                <h4 className="mb-2 fw-bold" style={{color: '#1e293b'}}>Pontos de Coleta</h4>
                <p className="text-muted fs-5 mb-0">Locais de reciclagem</p>
              </div>
              
              <div className="position-absolute bottom-0 start-0 w-100" style={{
                height: '6px', 
                background: 'linear-gradient(90deg, #10b981, #047857, #10b981)',
                boxShadow: '0 -2px 10px rgba(16, 185, 129, 0.3)'
              }}></div>
            </div>
          </div>
        </div>

        {/* Lista de Usuários */}
        <div className="card border-0 shadow-lg mb-5" style={{
          borderRadius: '25px', 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <div className="card-header border-0 position-relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', 
            borderRadius: '25px 25px 0 0', 
            padding: '2.5rem'
          }}>
            <div className="position-absolute" style={{top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(20px)'}}></div>
            <div className="position-absolute" style={{bottom: '-20px', left: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%'}}></div>
            
            <div className="d-flex align-items-center position-relative">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-4" style={{
                width: '70px', 
                height: '70px', 
                background: 'rgba(255,255,255,0.2)', 
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
              }}>
                <i className="bi bi-people-fill text-white" style={{fontSize: '2.2rem'}}></i>
              </div>
              <div>
                <h4 className="text-white mb-1 fw-bold" style={{fontSize: '1.8rem', textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
                  Usuários Cadastrados
                </h4>
                <p className="text-white-50 mb-0" style={{fontSize: '1.1rem'}}>Total: {usuarios.length} contas</p>
              </div>
            </div>
          </div>
          <div className="card-body p-4">
            {usuarios.map((usuario, index) => (
              <div key={usuario.id} className="p-4 mb-3 rounded-4 position-relative" style={{background: index % 2 === 0 ? 'rgba(59, 130, 246, 0.05)' : 'rgba(248, 250, 252, 0.8)', border: '1px solid rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.15)';}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none';}}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', background: usuario.nivelAcesso === 'ADMIN' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : 'linear-gradient(135deg, #3b82f6, #1d4ed8)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                      <i className={`bi ${usuario.nivelAcesso === 'ADMIN' ? 'bi-shield-lock' : 'bi-person'} text-white`} style={{fontSize: '1.3rem'}}></i>
                    </div>
                    <div>
                      <h6 className="mb-1 fw-bold text-dark">
                        {usuario.nome}
                        {usuario.nivelAcesso === 'ADMIN' && <span className="badge bg-danger ms-2 px-2 py-1" style={{fontSize: '0.7rem'}}>ADMIN</span>}
                      </h6>
                      <small className="text-muted">{usuario.email}</small>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    {usuario.nivelAcesso !== 'ADMIN' && (
                      <>
                        <span 
                          className="badge px-3 py-2 rounded-pill fw-bold"
                          style={{
                            fontSize: '0.8rem',
                            background: usuario.ativo 
                              ? 'linear-gradient(135deg, #10b981, #059669)' 
                              : 'linear-gradient(135deg, #ef4444, #dc2626)',
                            color: 'white',
                            boxShadow: usuario.ativo 
                              ? '0 4px 15px rgba(16, 185, 129, 0.3)' 
                              : '0 4px 15px rgba(239, 68, 68, 0.3)',
                            border: 'none'
                          }}
                        >
                          {usuario.ativo ? '✨ Ativo' : '⚠️ Inativo'}
                        </span>
                        <button 
                          className="btn btn-sm px-3 py-2 fw-bold"
                          onClick={() => alterarStatus('usuarios', usuario.id)}
                          style={{
                            borderRadius: '12px', 
                            transition: 'all 0.3s ease',
                            background: usuario.ativo 
                              ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                              : 'linear-gradient(135deg, #10b981, #059669)',
                            border: 'none',
                            color: 'white',
                            boxShadow: usuario.ativo 
                              ? '0 4px 15px rgba(245, 158, 11, 0.3)' 
                              : '0 4px 15px rgba(16, 185, 129, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px) scale(1.05)';
                            e.target.style.boxShadow = usuario.ativo 
                              ? '0 8px 25px rgba(245, 158, 11, 0.4)' 
                              : '0 8px 25px rgba(16, 185, 129, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = usuario.ativo 
                              ? '0 4px 15px rgba(245, 158, 11, 0.3)' 
                              : '0 4px 15px rgba(16, 185, 129, 0.3)';
                          }}
                        >
                          <i className={`bi ${usuario.ativo ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'} me-1`}></i>
                          {usuario.ativo ? 'Desativar' : 'Ativar'}
                        </button>
                        <button 
                          className="btn btn-sm px-3 py-2 fw-bold"
                          onClick={() => excluirConta('usuarios', usuario.id)}
                          style={{
                            borderRadius: '12px', 
                            transition: 'all 0.3s ease',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            border: 'none',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px) scale(1.05)';
                            e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0) scale(1)';
                            e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                          }}
                        >
                          <i className="bi bi-trash3-fill me-1"></i>Excluir
                        </button>
                      </>
                    )}
                    {usuario.nivelAcesso === 'ADMIN' && (
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

        {/* Lista de Pontos */}
        <div className="card border-0 shadow-lg" style={{
          borderRadius: '25px', 
          background: 'rgba(255,255,255,0.95)', 
          backdropFilter: 'blur(20px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          <div className="card-header border-0 position-relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #10b981, #047857)', 
            borderRadius: '25px 25px 0 0', 
            padding: '2.5rem'
          }}>
            <div className="position-absolute" style={{top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', filter: 'blur(20px)'}}></div>
            <div className="position-absolute" style={{bottom: '-20px', left: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%'}}></div>
            
            <div className="d-flex align-items-center position-relative">
              <div className="rounded-circle d-flex align-items-center justify-content-center me-4" style={{
                width: '70px', 
                height: '70px', 
                background: 'rgba(255,255,255,0.2)', 
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
              }}>
                <i className="bi bi-geo-alt-fill text-white" style={{fontSize: '2.2rem'}}></i>
              </div>
              <div>
                <h4 className="text-white mb-1 fw-bold" style={{fontSize: '1.8rem', textShadow: '0 2px 10px rgba(0,0,0,0.2)'}}>
                  Pontos de Coleta
                </h4>
                <p className="text-white-50 mb-0" style={{fontSize: '1.1rem'}}>Total: {pontos.length} locais</p>
              </div>
            </div>
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
                <div key={ponto.id} className="p-4 mb-3 rounded-4 position-relative" style={{background: index % 2 === 0 ? 'rgba(16, 185, 129, 0.05)' : 'rgba(248, 250, 252, 0.8)', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease'}} onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateX(8px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.15)';}} onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none';}}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #047857)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'}}>
                        <i className="bi bi-geo-alt text-white" style={{fontSize: '1.3rem'}}></i>
                      </div>
                      <div>
                        <h6 className="mb-1 fw-bold text-dark">{ponto.nome}</h6>
                        <small className="text-muted">CEP: {ponto.cep} - {ponto.material}</small>
                        <div className="mt-1">
                          <small className="text-success fw-bold">{ponto.horaFuncionamento}</small>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span 
                        className="badge px-3 py-2 rounded-pill fw-bold"
                        style={{
                          fontSize: '0.8rem',
                          background: ponto.ativo 
                            ? 'linear-gradient(135deg, #10b981, #059669)' 
                            : 'linear-gradient(135deg, #ef4444, #dc2626)',
                          color: 'white',
                          boxShadow: ponto.ativo 
                            ? '0 4px 15px rgba(16, 185, 129, 0.3)' 
                            : '0 4px 15px rgba(239, 68, 68, 0.3)',
                          border: 'none'
                        }}
                      >
                        {ponto.ativo ? '✨ Ativo' : '⚠️ Inativo'}
                      </span>
                      <button 
                        className="btn btn-sm px-3 py-2 fw-bold"
                        onClick={() => alterarStatus('pontos', ponto.id)}
                        style={{
                          borderRadius: '12px', 
                          transition: 'all 0.3s ease',
                          background: ponto.ativo 
                            ? 'linear-gradient(135deg, #f59e0b, #d97706)' 
                            : 'linear-gradient(135deg, #10b981, #059669)',
                          border: 'none',
                          color: 'white',
                          boxShadow: ponto.ativo 
                            ? '0 4px 15px rgba(245, 158, 11, 0.3)' 
                            : '0 4px 15px rgba(16, 185, 129, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px) scale(1.05)';
                          e.target.style.boxShadow = ponto.ativo 
                            ? '0 8px 25px rgba(245, 158, 11, 0.4)' 
                            : '0 8px 25px rgba(16, 185, 129, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = ponto.ativo 
                            ? '0 4px 15px rgba(245, 158, 11, 0.3)' 
                            : '0 4px 15px rgba(16, 185, 129, 0.3)';
                        }}
                      >
                        <i className={`bi ${ponto.ativo ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'} me-1`}></i>
                        {ponto.ativo ? 'Desativar' : 'Ativar'}
                      </button>
                      <button 
                        className="btn btn-sm px-3 py-2 fw-bold" 
                        onClick={() => excluirConta('pontos', ponto.id)} 
                        style={{
                          borderRadius: '12px',
                          transition: 'all 0.3s ease',
                          background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                          border: 'none',
                          color: 'white',
                          boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px) scale(1.05)';
                          e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0) scale(1)';
                          e.target.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                        }}
                      >
                        <i className="bi bi-trash3-fill me-1"></i>Excluir
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