import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

function GerenciarContas() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [contas, setContas] = useState({
    usuarios: [],
    empresas: [],
    pontos: []
  });
  const [contaSelecionada, setContaSelecionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setIsAdmin(true);
    setLoading(false);
    carregarContas();
  }, [user]);

  const carregarContas = async () => {
    try {
      const [usuariosData, empresasData, pontosData] = await Promise.all([
        apiService.listarUsuarios(),
        apiService.listarEmpresas(),
        apiService.listarPontos()
      ]);
      
      const usuarios = usuariosData.map(u => ({
        ...u,
        nome: u.nome || u.nomeCompleto || 'Usuário',
        ativo: u.ativo !== undefined ? u.ativo : true,
        dataCadastro: u.dataCadastro || new Date().toISOString()
      }));
      
      const empresas = empresasData.map(e => ({
        ...e,
        nome: e.nome || e.nomeEmpresa || 'Empresa',
        ativo: e.ativo !== undefined ? e.ativo : true,
        dataCadastro: e.dataCadastro || new Date().toISOString()
      }));
      
      const pontos = pontosData.map(p => ({
        ...p,
        nome: p.nome || p.nomePonto || 'Ponto de Coleta',
        email: p.email || p.codigo || 'N/A',
        ativo: p.ativo !== undefined ? p.ativo : true,
        dataCadastro: p.dataCadastro || new Date().toISOString(),
        materiais: {
          papel: p.papel || false,
          plastico: p.plastico || false,
          vidro: p.vidro || false,
          metal: p.metal || false
        }
      }));
      
      setContas({ usuarios, empresas, pontos });
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
    }
  };

  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    @keyframes modalSlideIn {
      from { opacity: 0; transform: scale(0.8) translateY(-20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
    .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
    .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
    .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
    .animate-delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
    .animate-delay-4 { animation-delay: 0.4s; animation-fill-mode: both; }
    .hover-lift { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .hover-lift:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .hover-button { transition: all 0.3s ease; }
    .hover-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
    .pulse { animation: pulse 2s ease-in-out infinite; }
    .bounce { animation: bounce 2s infinite; }
    .float { animation: float 3s ease-in-out infinite; }
    .shimmer { position: relative; overflow: hidden; }
    .shimmer::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animation: shimmer 2s infinite; }
  `;

  const alterarStatus = async (tipo, id) => {
    try {
      const conta = contas[tipo].find(c => c.id === id);
      const novoStatus = !conta.ativo;
      
      if (tipo === 'usuarios') {
        await apiService.atualizarUsuario(id, {...conta, ativo: novoStatus});
      } else if (tipo === 'empresas') {
        await apiService.atualizarEmpresa(id, {...conta, ativo: novoStatus});
      } else if (tipo === 'pontos') {
        await apiService.atualizarPonto(id, {...conta, ativo: novoStatus});
      }
      
      carregarContas();
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
  };

  const excluirConta = async (tipo, id) => {
    if (window.confirm('Tem certeza que deseja excluir esta conta permanentemente?')) {
      try {
        if (tipo === 'usuarios') {
          await apiService.excluirUsuario(id);
        } else if (tipo === 'empresas') {
          await apiService.excluirEmpresa(id);
        } else if (tipo === 'pontos') {
          await apiService.excluirPonto(id);
        }
        
        carregarContas();
      } catch (error) {
        console.error('Erro ao excluir conta:', error);
      }
    }
  };

  const getStatusColor = (ativo) => {
    return ativo ? '#10b981' : '#ef4444';
  };

  const getTypeIcon = (tipo) => {
    const icons = {
      usuarios: 'bi-person-circle',
      empresas: 'bi-building',
      pontos: 'bi-geo-alt'
    };
    return icons[tipo] || 'bi-circle';
  };

  const getTypeColor = (tipo) => {
    const colors = {
      usuarios: '#3b82f6',
      empresas: '#6b7280', 
      pontos: '#059669'
    };
    return colors[tipo] || '#059669';
  };
  
  const abrirDetalhes = (conta, tipo) => {
    setContaSelecionada({...conta, tipo});
    setMostrarModal(true);
  };
  
  const fecharModal = () => {
    setMostrarModal(false);
    setContaSelecionada(null);
  };

  const renderSecao = (tipo, dados, titulo) => {
    const typeColor = getTypeColor(tipo);
    const typeIcon = getTypeIcon(tipo);
    const ativos = dados.filter(conta => conta.ativo).length;
    const total = dados.length;

    return (
      <div className="col-12 mb-5 animate-scaleIn" style={{animationDelay: `${['usuarios', 'empresas', 'pontos'].indexOf(tipo) * 0.2}s`}}>
        <div className="card border-0 shadow-lg hover-lift" style={{
          borderRadius: '25px',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${typeColor}20`
        }}>
          {/* Header da Seção */}
          <div className="card-header border-0 position-relative overflow-hidden" style={{
            background: `linear-gradient(135deg, ${typeColor}, ${typeColor}dd)`,
            borderRadius: '25px 25px 0 0',
            padding: '2rem'
          }}>
            <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
            <div className="d-flex align-items-center justify-content-between position-relative">
              <div className="d-flex align-items-center">
                <div>
                  <h4 className="text-white mb-1 fw-bold">
                    <i className={`bi ${typeIcon} me-3`} style={{fontSize: '1.8rem'}}></i>
                    {titulo}
                  </h4>
                  <p className="text-white-50 mb-0">{ativos} de {total} contas ativas</p>
                </div>
              </div>
              <div className="text-end">
                <div className="bg-white bg-opacity-90 rounded-pill px-3 py-2 backdrop-blur">
                  <small className="fw-bold" style={{color: typeColor}}>
                    <i className="bi bi-check-circle me-1"></i>
                    {Math.round((ativos/total) * 100)}% Ativas
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="card-body p-0">
            <div className="row g-0">
              {dados.map((conta, index) => (
                <div key={conta.id} className="col-12">
                  <div className="p-4 border-bottom position-relative" style={{
                    background: index % 2 === 0 ? 'rgba(248,250,252,0.5)' : 'transparent',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    const color = getTypeColor(tipo);
                    e.currentTarget.style.background = `${color}15`;
                    e.currentTarget.style.transform = 'translateX(8px)';
                    e.currentTarget.style.boxShadow = `0 8px 25px ${color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? 'rgba(248,250,252,0.5)' : 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}>
                    <div className="row align-items-center">
                      {/* Info da Conta */}
                      <div className="col-md-5">
                        <div className="d-flex align-items-center" style={{cursor: 'pointer'}} onClick={() => abrirDetalhes(conta, tipo)}>
                          <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{
                            width: '50px',
                            height: '50px',
                            background: conta.tipo === 'admin' ? 'linear-gradient(135deg, #dc262620, #dc262610)' : `linear-gradient(135deg, ${typeColor}20, ${typeColor}10)`,
                            border: conta.tipo === 'admin' ? '2px solid #dc262630' : `2px solid ${typeColor}30`,
                            transition: 'all 0.3s ease'
                          }}>
                            <i className={`bi ${conta.tipo === 'admin' ? 'bi-shield-lock' : typeIcon}`} style={{color: conta.tipo === 'admin' ? '#dc2626' : typeColor, fontSize: '1.3rem'}}></i>
                          </div>
                          <div>
                            <h6 className="mb-1 fw-bold text-dark">
                              {conta.nome}
                              {conta.tipo === 'admin' && <span className="badge bg-danger ms-2" style={{fontSize: '0.6rem'}}>ADMIN</span>}
                              <i className="bi bi-eye ms-2 text-muted" style={{fontSize: '0.8rem'}}></i>
                            </h6>
                            <small className="text-muted">{conta.email}</small>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-md-2 text-center">
                        <div className="d-flex align-items-center justify-content-center">
                          <div className={`rounded-circle me-2 ${conta.ativo ? 'pulse' : ''}`} style={{
                            width: '12px',
                            height: '12px',
                            background: getStatusColor(conta.ativo)
                          }}></div>
                          <span className="fw-bold" style={{color: getStatusColor(conta.ativo)}}>
                            {conta.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </div>

                      {/* Data */}
                      <div className="col-md-2 text-center">
                        <small className="text-muted">
                          <i className="bi bi-calendar3 me-1"></i>
                          {new Date(conta.dataCadastro).toLocaleDateString('pt-BR')}
                        </small>
                      </div>

                      {/* Ações */}
                      <div className="col-md-3">
                        <div className="d-flex gap-2 justify-content-end">
                          {conta.tipo !== 'admin' && (
                            <>
                              <button
                                className={`btn btn-sm position-relative overflow-hidden hover-button`}
                                onClick={() => alterarStatus(tipo, conta.id)}
                                style={{
                                  borderRadius: '12px',
                                  padding: '8px 16px',
                                  fontWeight: '600',
                                  border: 'none',
                                  transition: 'all 0.3s ease',
                                  background: conta.ativo ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #10b981, #059669)',
                                  color: 'white'
                                }}
                              >
                                <i className={`bi ${conta.ativo ? 'bi-pause-circle' : 'bi-play-circle'} me-1`}></i>
                                {conta.ativo ? 'Desativar' : 'Reativar'}
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger position-relative overflow-hidden hover-button"
                                onClick={() => excluirConta(tipo, conta.id)}
                                style={{
                                  borderRadius: '12px',
                                  padding: '8px 16px',
                                  fontWeight: '600',
                                  transition: 'all 0.3s ease'
                                }}
                              >
                                <i className="bi bi-trash me-1"></i>
                                Excluir
                              </button>
                            </>
                          )}
                          {conta.tipo === 'admin' && (
                            <div className="text-muted fst-italic">
                              <i className="bi bi-shield-lock me-1"></i>
                              Conta protegida
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="text-center">
          <div className="spinner-border text-danger" style={{width: '3rem', height: '3rem'}}></div>
          <p className="mt-3 text-muted">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{background: '#ffffff', minHeight: '100vh', padding: '2rem 0'}}>
      <style>{animationStyles}</style>
      <div className="container">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4 animate-fadeInUp">
              <div>
                <h1 className="display-5 fw-bold text-danger mb-2 animate-slideInLeft">
                  <i className="bi bi-shield-lock me-3"></i>Gerenciar Contas
                </h1>
                <p className="text-muted mb-0 animate-fadeIn animate-delay-1">Controle total sobre usuários, empresas e pontos de coleta</p>
              </div>
              <div className="d-flex align-items-center gap-3 animate-fadeIn animate-delay-2">
                <div className="bg-light rounded-pill px-3 py-2">
                  <small className="text-muted fw-medium">
                    <i className="bi bi-people text-danger me-1"></i>
                    {Object.values(contas).flat().length} contas totais
                  </small>
                </div>
                <div className="bg-danger bg-opacity-10 rounded-pill px-3 py-2">
                  <small className="text-danger fw-bold">
                    <i className="bi bi-shield-check me-1"></i>
                    ADMINISTRADOR
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas Rápidas */}
        <div className="row mb-5 animate-fadeInUp animate-delay-1">
          <div className="col-md-4 animate-slideInLeft animate-delay-2">
            <div className="card border-0 shadow-sm hover-lift" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
              <div className="card-body text-center text-white p-4">
                <i className="bi bi-person-circle float" style={{fontSize: '3rem'}}></i>
                <h3 className="fw-bold mt-2">{contas.usuarios.length}</h3>
                <p className="mb-0">Usuários</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 animate-fadeInUp animate-delay-3">
            <div className="card border-0 shadow-sm hover-lift" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #6b7280, #4b5563)'}}>
              <div className="card-body text-center text-white p-4">
                <i className="bi bi-building bounce" style={{fontSize: '3rem'}}></i>
                <h3 className="fw-bold mt-2">{contas.empresas.length}</h3>
                <p className="mb-0">Empresas</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 animate-slideInRight animate-delay-4">
            <div className="card border-0 shadow-sm hover-lift" style={{borderRadius: '20px', background: 'linear-gradient(135deg, #10b981, #059669)'}}>
              <div className="card-body text-center text-white p-4">
                <i className="bi bi-geo-alt pulse" style={{fontSize: '3rem'}}></i>
                <h3 className="fw-bold mt-2">{contas.pontos.length}</h3>
                <p className="mb-0">Pontos de Coleta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seções de Contas */}
        <div className="row">
          {renderSecao('usuarios', contas.usuarios, 'Usuários')}
          {renderSecao('empresas', contas.empresas, 'Empresas Parceiras')}
          {renderSecao('pontos', contas.pontos, 'Pontos de Coleta')}
        </div>
      </div>
      
      {/* Modal de Detalhes */}
      {mostrarModal && contaSelecionada && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.6)'}}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{borderRadius: '30px', background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(25px)'}}>
              <div className="modal-header border-0 position-relative overflow-hidden" style={{
                background: contaSelecionada.tipo === 'admin' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : `linear-gradient(135deg, ${getTypeColor(contaSelecionada.tipo)}, ${getTypeColor(contaSelecionada.tipo)}dd)`,
                borderRadius: '30px 30px 0 0',
                padding: '2.5rem'
              }}>
                <div className="position-absolute" style={{top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                <div className="d-flex align-items-center position-relative">
                  <div className="rounded-circle bg-white bg-opacity-25 d-flex align-items-center justify-content-center me-4" style={{width: '80px', height: '80px', backdropFilter: 'blur(15px)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', overflow: 'hidden', cursor: contaSelecionada.imagemEmpresa ? 'pointer' : 'default'}} onClick={() => contaSelecionada.imagemEmpresa && window.open(contaSelecionada.imagemEmpresa, '_blank')}>
                    {contaSelecionada.imagemEmpresa ? (
                      <img 
                        src={contaSelecionada.imagemEmpresa} 
                        alt={contaSelecionada.nome}
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        title="Clique para ver em tamanho maior"
                      />
                    ) : (
                      <i className={`bi ${contaSelecionada.tipo === 'admin' ? 'bi-shield-lock' : getTypeIcon(contaSelecionada.tipo)}`} style={{color: 'white', fontSize: '2rem'}}></i>
                    )}
                  </div>
                  <div>
                    <h3 className="text-white mb-2 fw-bold" style={{fontSize: '2rem'}}>{contaSelecionada.nome}</h3>
                    <div className="d-flex align-items-center gap-3">
                      <span className="badge bg-white px-3 py-2 rounded-pill" style={{fontSize: '0.9rem', fontWeight: '600', color: '#374151'}}>
                        {contaSelecionada.tipo === 'usuarios' ? '👤 Usuário' : 
                         contaSelecionada.tipo === 'empresas' ? '🏢 Empresa' : 
                         contaSelecionada.tipo === 'pontos' ? '📍 Ponto de Coleta' : '🛡️ Administrador'}
                      </span>
                      <span className={`badge px-3 py-2 rounded-pill ${contaSelecionada.ativo ? 'bg-success' : 'bg-danger'}`} style={{fontSize: '0.8rem', fontWeight: '600'}}>
                        {contaSelecionada.ativo ? '✅ Ativo' : '❌ Inativo'}
                      </span>
                    </div>
                  </div>
                </div>
                <button type="button" className="btn-close btn-close-white position-absolute" onClick={fecharModal} style={{top: '20px', right: '20px', fontSize: '1.5rem'}}></button>
              </div>
              
              <div className="modal-body p-5">
                <div className="row g-4">
                  <div className="col-lg-6">
                    <div className="card border-0 h-100" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(5, 150, 105, 0.03))', borderRadius: '20px'}}>
                      <div className="card-body p-4">
                        <h5 className="fw-bold mb-4 d-flex align-items-center text-success">
                          <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px'}}>
                            <i className="bi bi-person-lines-fill text-white" style={{fontSize: '1.2rem'}}></i>
                          </div>
                          Informações Básicas
                        </h5>
                        
                        <div className="d-flex align-items-start p-3 rounded-4 mb-3" style={{background: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            <i className="bi bi-envelope text-white"></i>
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">Email</h6>
                            <p className="text-muted mb-0">{contaSelecionada.email}</p>
                          </div>
                        </div>
                        
                        <div className="d-flex align-items-start p-3 rounded-4" style={{background: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                          <div className="rounded-circle bg-info d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                            <i className="bi bi-calendar3 text-white"></i>
                          </div>
                          <div>
                            <h6 className="fw-bold mb-1">Data de Cadastro</h6>
                            <p className="text-muted mb-0">{new Date(contaSelecionada.dataCadastro).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-lg-6">
                    <div className="card border-0 h-100" style={{background: `linear-gradient(135deg, ${getTypeColor(contaSelecionada.tipo)}15, ${getTypeColor(contaSelecionada.tipo)}05)`, borderRadius: '20px'}}>
                      <div className="card-body p-4">
                        <h5 className="fw-bold mb-4 d-flex align-items-center" style={{color: getTypeColor(contaSelecionada.tipo)}}>
                          <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px', background: getTypeColor(contaSelecionada.tipo)}}>
                            <i className={`bi ${getTypeIcon(contaSelecionada.tipo)} text-white`} style={{fontSize: '1.2rem'}}></i>
                          </div>
                          Detalhes Específicos
                        </h5>
                        
                        {contaSelecionada.tipo === 'empresas' && (
                          <>
                            <div className="d-flex align-items-start p-3 rounded-4 mb-3" style={{background: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                              <div className="rounded-circle bg-secondary d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                <i className="bi bi-briefcase text-white"></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-1">Setor</h6>
                                <p className="text-muted mb-0">{contaSelecionada.setor || 'Não informado'}</p>
                              </div>
                            </div>
                            <div className="d-flex align-items-start p-3 rounded-4" style={{background: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                              <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                <i className="bi bi-geo-alt text-white"></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-1">Endereço</h6>
                                <p className="text-muted mb-0">{contaSelecionada.endereco || 'Não informado'}</p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {contaSelecionada.tipo === 'pontos' && (
                          <>
                            <div className="d-flex align-items-start p-3 rounded-4 mb-3" style={{background: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                              <div className="rounded-circle bg-info d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                                <i className="bi bi-clock text-white"></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-1">Horário</h6>
                                <p className="text-muted mb-0">{contaSelecionada.horario || 'Não informado'}</p>
                              </div>
                            </div>
                            <div className="p-3 rounded-4" style={{background: 'rgba(255,255,255,0.8)', boxShadow: '0 4px 15px rgba(0,0,0,0.05)'}}>
                              <h6 className="fw-bold mb-3 d-flex align-items-center">
                                <i className="bi bi-recycle me-2 text-success"></i>
                                Materiais Aceitos
                              </h6>
                              <div className="d-flex gap-2 flex-wrap">
                                {contaSelecionada.materiais && Object.entries(contaSelecionada.materiais).map(([material, aceita]) => (
                                  <span key={material} className={`badge px-3 py-2 rounded-pill ${aceita ? 'bg-success' : 'bg-light text-muted'}`}>
                                    {aceita ? '✅' : '❌'} {material.charAt(0).toUpperCase() + material.slice(1)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                        
                        {contaSelecionada.tipo === 'usuarios' && (
                          <div className="text-center py-4">
                            <div className="rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{width: '80px', height: '80px'}}>
                              <i className="bi bi-person-check" style={{fontSize: '2rem', color: getTypeColor(contaSelecionada.tipo)}}></i>
                            </div>
                            <h6 className="text-muted">Conta de usuário padrão</h6>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer border-0 p-4 text-center" style={{background: 'rgba(248, 250, 252, 0.8)', borderRadius: '0 0 30px 30px'}}>
                <button 
                  type="button" 
                  className="btn btn-success px-5 py-3" 
                  onClick={fecharModal}
                  style={{borderRadius: '15px', fontWeight: '600', fontSize: '1.1rem', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'}}
                >
                  <i className="bi bi-check-circle-fill me-2"></i>Entendido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GerenciarContas;