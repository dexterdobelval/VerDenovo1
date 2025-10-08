import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { database } from '../services/database';
import { excluirPontoPorNome } from '../utils/excluirPonto';
import { useAuth } from '../contexts/AuthContext';

function PontosColeta() {
  const { usuario, logout, isLogado } = useAuth();
  const location = useLocation();
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pontos, setPontos] = useState([]);
  
  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
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
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes modalSlideIn {
      from { opacity: 0; transform: scale(0.8) translateY(-20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-delay-1 { animation-delay: 0.05s; }
    .animate-delay-2 { animation-delay: 0.1s; }
    .animate-delay-3 { animation-delay: 0.15s; }
    .pulse { animation: pulse 2s ease-in-out infinite; }
    .hover-lift { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .hover-lift:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .hover-lift:hover .position-absolute { transform: translateX(0) !important; }
    .text-purple { color: #8b5cf6; }
    .hover-scale { transition: transform 0.3s ease; }
    .hover-scale:hover { transform: scale(1.05); }
    
    /* Animações do Modal */
    .hover-card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .hover-section:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(16, 185, 129, 0.1); }
    .hover-material:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 20px rgba(0,0,0,0.1); }
    .hover-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3); }
    .hover-info:hover { transform: translateX(5px); background: rgba(16, 185, 129, 0.08) !important; }
    .hover-tip:hover { transform: scale(1.02); box-shadow: 0 5px 15px rgba(245, 158, 11, 0.2); }
    .icon-bounce { animation: iconBounce 3s ease-in-out infinite; }
    .icon-pulse { animation: iconPulse 2.5s ease-in-out infinite; }
    
    @keyframes iconBounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    @keyframes iconPulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.8; }
    }
    
    /* Fix para navbar lateral */
    .pontos-coleta-page { overflow: visible !important; }
    body.modal-open { overflow: hidden !important; }
    .offcanvas { z-index: 99999 !important; }
    .offcanvas-backdrop { z-index: 99998 !important; }
  `;
  
  useEffect(() => {
    // Garantir que o body não tenha overflow hidden
    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);
    
    // Excluir ponto chamado "ponto" se existir
    excluirPontoPorNome('ponto');
    
    carregarPontos();
    
    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('modal-open');
    };
  }, []);
  
  const carregarPontos = () => {
    try {
      const pontosData = database.listarPontos();
      setPontos(pontosData.filter(p => p.ativo !== false));
    } catch (error) {
      console.error('Erro ao carregar pontos:', error);
    }
  };

  const formatarMateriais = (materiais) => {
    if (!materiais) return 'Não informado';
    const tipos = [];
    if (materiais.papel) tipos.push('Papel');
    if (materiais.plastico) tipos.push('Plástico');
    if (materiais.vidro) tipos.push('Vidro');
    if (materiais.metal) tipos.push('Metal');
    return tipos.length > 0 ? tipos.join(', ') : 'Não informado';
  };



  const acessarPonto = (ponto) => {
    setPontoSelecionado(ponto);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setPontoSelecionado(null);
  };

  const entrarEmContato = (ponto) => {
    if (ponto.telefone) {
      window.open(`tel:${ponto.telefone}`);
    } else {
      alert('Telefone não disponível');
    }
  };

  const excluirPonto = (pontoId) => {
    if (window.confirm('Tem certeza que deseja excluir este ponto?')) {
      setPontos(pontos.filter(p => p.id !== pontoId));
      alert('Ponto excluído com sucesso!');
    }
  };



  const handleLogout = () => {
    logout();
    closeOffcanvas();
  };
  
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbarPontos');
    const offcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
    if (offcanvas) {
      offcanvas.hide();
    }
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
      document.body.classList.remove('modal-open');
    }, 100);
  };

  return (
    <>
      {/* Navbar exclusiva para pontos de coleta */}
      <nav className="navbar navbar-dark bg-success fixed-top" style={{height: '72px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 1030}}>
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center">
            <button className="btn btn-link p-2 me-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarPontos" style={{border: 'none'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            
            <Link className="navbar-brand d-flex align-items-center text-white text-decoration-none" to="/">
              <img src="/Verdenovologo.png" alt="VerDenovo" height="40" className="me-2" />
              <span style={{fontSize: '22px', fontWeight: '500'}}>VerDenovo</span>
            </Link>
          </div>
          
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbarPontos" style={{width: '320px', zIndex: 99999, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'}}>
            <div className="offcanvas-header position-relative overflow-hidden d-flex align-items-center justify-content-between" style={{background: 'linear-gradient(135deg, #059669, #10b981)', padding: '2rem 1.5rem'}}>
              <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
              <div className="position-absolute" style={{bottom: '-10px', left: '-10px', width: '60px', height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%'}}></div>
              <h5 className="offcanvas-title text-white position-relative m-0 d-flex align-items-center" style={{fontSize: '1.5rem', fontWeight: '600'}}>
                <img src="/Verdenovologo.png" alt="VerDenovo" height="32" className="me-3" />
                VerDenovo
              </h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" onClick={closeOffcanvas}></button>
            </div>
            <div className="offcanvas-body" style={{padding: '1.5rem'}}>
              <style>
                {`#offcanvasNavbarPontos .offcanvas-body::-webkit-scrollbar { display: none; }
                  #offcanvasNavbarPontos .offcanvas-body { -ms-overflow-style: none; scrollbar-width: none; }
                  #offcanvasNavbarPontos { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%); }
                  .offcanvas-backdrop { z-index: 99998 !important; }
                  .nav-section { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border-radius: 20px; margin-bottom: 1.5rem; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.08); }
                  .nav-section h6 { color: #1f2937; font-weight: 700; margin-bottom: 1rem; }
                  .nav-link-custom { color: #4b5563; padding: 0.75rem 1rem; border-radius: 12px; margin-bottom: 0.5rem; transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); background: rgba(255,255,255,0.5); border: 1px solid rgba(5, 150, 105, 0.1); }
                  .nav-link-custom:hover { background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #059669; transform: translateX(8px); box-shadow: 0 4px 15px rgba(5, 150, 105, 0.2); }
                  .nav-link-active { background: linear-gradient(135deg, #10b981, #059669) !important; color: white !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
                  .nav-link-login-active { background: linear-gradient(135deg, #3b82f6, #2563eb) !important; color: white !important; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
                  .nav-link-login:hover { background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #3b82f6; transform: translateX(8px); box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2); }
                  .nav-link-custom i { width: 20px; }`}
              </style>
              
              {/* Navegação Principal */}
              <div className="nav-section">
                <h6>
                  <i className="bi bi-compass me-2" style={{color: '#059669'}}></i>Navegação
                </h6>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/' ? 'nav-link-active' : ''}`} to="/" onClick={closeOffcanvas}>
                  <i className="bi bi-house me-3"></i>Início
                </Link>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/pontos' ? 'nav-link-active' : ''}`} to="/pontos" onClick={closeOffcanvas}>
                  <i className="bi bi-geo-alt me-3"></i>Pontos de Coleta
                </Link>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/empresas-parceiras' ? 'nav-link-active' : ''}`} to="/empresas-parceiras" onClick={closeOffcanvas}>
                  <i className="bi bi-building me-3"></i>Empresas Parceiras
                </Link>
              </div>
              
              {/* Educação */}
              <div className="nav-section">
                <h6>
                  <i className="bi bi-book me-2" style={{color: '#059669'}}></i>Educação Ambiental
                </h6>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/materiais' ? 'nav-link-active' : ''}`} to="/materiais" onClick={closeOffcanvas}>
                  <i className="bi bi-recycle me-3"></i>Materiais Recicláveis
                </Link>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/residuos' ? 'nav-link-active' : ''}`} to="/residuos" onClick={closeOffcanvas}>
                  <i className="bi bi-trash me-3"></i>Resíduos
                </Link>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/faq' ? 'nav-link-active' : ''}`} to="/faq" onClick={closeOffcanvas}>
                  <i className="bi bi-question-circle me-3"></i>Perguntas Frequentes
                </Link>
              </div>
              
              {/* Conta */}
              <div className="nav-section">
                <h6>
                  <i className="bi bi-person-circle me-2" style={{color: '#059669'}}></i>Conta
                </h6>
                {isLogado() ? (
                  <div className="position-relative" style={{background: usuario.tipo === 'admin' ? 'linear-gradient(135deg, #fef2f2, #fee2e2)' : 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '15px', padding: '1rem', border: `2px solid ${usuario.tipo === 'admin' ? '#fca5a5' : '#86efac'}`}}>
                    <div className="text-center mb-3">
                      <div className={`badge ${usuario.tipo === 'admin' ? 'bg-danger' : 'bg-success'} px-3 py-2 rounded-pill`} style={{fontSize: '0.75rem', fontWeight: '600'}}>
                        {usuario.tipo === 'empresa' ? 'EMPRESA LOGADA' : 
                         usuario.tipo === 'ponto' ? 'PONTO LOGADO' : 
                         usuario.tipo === 'usuario' ? 'USUÁRIO LOGADO' : 'ADMINISTRADOR'}
                      </div>
                    </div>
                    {usuario.tipo === 'admin' ? (
                      <>
                        <Link className="nav-link nav-link-custom text-decoration-none" to="/cadastrar" onClick={closeOffcanvas}>
                          <i className="bi bi-plus-circle me-3"></i>Adicionar Ponto
                        </Link>
                        <Link className="nav-link nav-link-custom text-decoration-none" to="/gerenciar-contas" onClick={closeOffcanvas}>
                          <i className="bi bi-people me-3"></i>Gerenciar Contas
                        </Link>
                      </>
                    ) : usuario.tipo === 'usuario' ? (
                      <div className="text-center py-2">
                        <small className="text-muted">Bem-vindo, {usuario.dados?.email}!</small>
                      </div>
                    ) : (
                      <Link 
                        className="nav-link nav-link-custom text-decoration-none" 
                        to={usuario.tipo === 'empresa' ? '/personalizar-empresa' : '/personalizar-ponto'} 
                        onClick={closeOffcanvas}
                      >
                        <i className="bi bi-gear me-3"></i>Personalizar Informações
                      </Link>
                    )}
                    <button 
                      className="nav-link nav-link-custom w-100 text-start border-0 bg-transparent text-danger" 
                      onClick={handleLogout}
                      style={{marginTop: '0.5rem'}}
                    >
                      <i className="bi bi-box-arrow-right me-3"></i>Sair da Conta
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '15px', padding: '1rem', marginBottom: '1rem', border: '2px solid #86efac'}}>
                      <div className="text-center mb-2">
                        <div className="badge bg-success px-3 py-1 rounded-pill" style={{fontSize: '0.75rem', fontWeight: '600'}}>CADASTRAR</div>
                      </div>
                      <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/cadastro-usuario' ? 'nav-link-active' : ''}`} to="/cadastro-usuario" onClick={closeOffcanvas}>
                        <i className="bi bi-person-plus me-3"></i>Usuário
                      </Link>
                      <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/cadastrar' ? 'nav-link-active' : ''}`} to="/cadastrar" onClick={closeOffcanvas}>
                        <i className="bi bi-geo-alt me-3"></i>Ponto de Coleta
                      </Link>
                      <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/cadastro-empresa' ? 'nav-link-active' : ''}`} to="/cadastro-empresa" onClick={closeOffcanvas}>
                        <i className="bi bi-building me-3"></i>Empresa
                      </Link>
                    </div>
                    <div style={{background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '15px', padding: '1rem', border: '2px solid #3b82f6'}}>
                      <div className="text-center mb-2">
                        <div className="badge bg-primary px-3 py-1 rounded-pill" style={{fontSize: '0.75rem', fontWeight: '600'}}>LOGIN</div>
                      </div>
                      <Link className={`nav-link nav-link-custom nav-link-login text-decoration-none ${location.pathname === '/login-usuario' ? 'nav-link-login-active' : ''}`} to="/login-usuario" onClick={closeOffcanvas}>
                        <i className="bi bi-person-circle me-3"></i>Usuário
                      </Link>
                      <Link className={`nav-link nav-link-custom nav-link-login text-decoration-none ${location.pathname === '/login-empresa' ? 'nav-link-login-active' : ''}`} to="/login-empresa" onClick={closeOffcanvas}>
                        <i className="bi bi-building me-3"></i>Empresa
                      </Link>
                      <Link className={`nav-link nav-link-custom nav-link-login text-decoration-none ${location.pathname === '/login-ponto' ? 'nav-link-login-active' : ''}`} to="/login-ponto" onClick={closeOffcanvas}>
                        <i className="bi bi-unlock me-3"></i>Ponto de Coleta
                      </Link>
                    </div>
                  </>
                )}
              </div>
              
              {/* Sobre */}
              <div className="nav-section">
                <h6>
                  <i className="bi bi-info-circle me-2" style={{color: '#059669'}}></i>Informações
                </h6>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/sobre' ? 'nav-link-active' : ''}`} to="/sobre" onClick={closeOffcanvas}>
                  <i className="bi bi-people me-3"></i>Sobre o VerDenovo
                </Link>
                <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/conscientizacao' ? 'nav-link-active' : ''}`} to="/conscientizacao" onClick={closeOffcanvas}>
                  <i className="bi bi-tree me-3"></i>Conscientização e Educação Ambiental
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="pontos-coleta-page" style={{background: '#ffffff', minHeight: '100vh', padding: '2rem 0', marginTop: '72px'}}>
      <style>{animationStyles}</style>
      <div className="container">
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4 animate-fadeInUp">
            <div>
              <h1 className="display-5 fw-bold text-success mb-2 animate-slideInLeft">
                Pontos de Coleta
              </h1>
              <p className="text-muted mb-0 animate-fadeIn animate-delay-1">Gerencie e visualize todos os pontos de coleta cadastrados</p>
            </div>
            <div className="d-flex align-items-center gap-3 animate-fadeIn animate-delay-2">
              <div className="bg-light rounded-pill px-3 py-2">
                <small className="text-muted fw-medium">
                  <i className="bi bi-geo-alt text-success me-1"></i>
                  {pontos.length} pontos ativos
                </small>
              </div>
              <div className="bg-success bg-opacity-10 rounded-pill px-3 py-2">
                <small className="text-success fw-bold">
                  <i className="bi bi-check-circle me-1"></i>
                  Sistema Online
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4 animate-fadeInUp animate-delay-3">
        {pontos.map((ponto, index) => (
          <div key={ponto.id} className="col-lg-6 col-xl-4">
            <div className={`card border-0 shadow-lg position-relative overflow-hidden hover-lift animate-scaleIn h-100`} style={{borderRadius: '20px', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', transition: 'all 0.4s ease', minHeight: '450px', animationDelay: `${index * 0.08}s`}}>
              <div className="position-absolute top-0 end-0 m-3">
                <div className="d-flex align-items-center bg-success bg-opacity-10 rounded-pill px-3 py-1">
                  <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px', animation: 'pulse 2s infinite'}}></div>
                  <small className="text-success fw-bold">Online</small>
                </div>
              </div>
              
              <div className="card-body p-4 d-flex flex-column h-100">
                <div className="mb-4">
                  <h5 className="card-title mb-1 fw-bold d-flex align-items-center" style={{color: '#1f2937', fontSize: '1.25rem'}}>
                    <i className="bi bi-geo-alt text-success me-2" style={{fontSize: '1.2rem'}}></i>
                    {ponto.nome}
                  </h5>
                  <p className="text-muted mb-0" style={{fontSize: '0.9rem'}}>
                    <i className="bi bi-geo me-1"></i>{ponto.cidade}
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="row g-2 mb-3">
                    <div className="col-12">
                      <div className="d-flex align-items-center p-2 rounded" style={{background: 'rgba(16, 185, 129, 0.05)'}}>
                        <i className="bi bi-house text-success me-2"></i>
                        <small className="text-dark fw-medium">{ponto.endereco}</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center p-2 rounded" style={{background: 'rgba(59, 130, 246, 0.05)'}}>
                        <i className="bi bi-clock text-primary me-2"></i>
                        <small className="text-dark">{ponto.horario}</small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center p-2 rounded" style={{background: 'rgba(168, 85, 247, 0.05)'}}>
                        <i className="bi bi-telephone text-purple me-2"></i>
                        <small className="text-dark">{ponto.telefone}</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h6 className="text-success fw-bold mb-3 d-flex align-items-center" style={{fontSize: '1rem'}}>
                    <i className="bi bi-recycle me-2" style={{fontSize: '1.3rem'}}></i>Materiais Aceitos
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {formatarMateriais(ponto.materiais).split(', ').map((material, index) => {
                      const materialConfig = {
                        'Papel': { icon: 'bi-file-earmark-text-fill', color: '#3b82f6', bgClass: 'bg-primary' },
                        'Plástico': { icon: 'bi-cup-fill', color: '#ef4444', bgClass: 'bg-danger' },
                        'Vidro': { icon: 'bi-cup-straw', color: '#10b981', bgClass: 'bg-success' },
                        'Metal': { icon: 'bi-gear-fill', color: '#f59e0b', bgClass: 'bg-warning' }
                      };
                      const config = materialConfig[material] || { icon: 'bi-check-circle', color: '#6b7280', bgClass: 'bg-secondary' };
                      
                      return (
                        <span key={index} className={`badge rounded-pill px-3 py-2 d-flex align-items-center`} style={{fontSize: '0.8rem', fontWeight: '600', color: 'white', backgroundColor: config.color}}>
                          <i className={`bi ${config.icon} me-2`} style={{fontSize: '1rem'}}></i>
                          {material}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="d-grid gap-2">
                    <button 
                      className="btn btn-success position-relative overflow-hidden" 
                      onClick={() => acessarPonto(ponto)}
                      style={{borderRadius: '12px', padding: '12px', fontWeight: '600', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'}}
                    >
                      <span className="position-relative" style={{zIndex: 2}}>
                        <i className="bi bi-arrow-right-circle me-2"></i>Ver Detalhes
                      </span>
                      <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: 'linear-gradient(45deg, rgba(255,255,255,0.2), transparent)', transform: 'translateX(-100%)', transition: 'transform 0.3s ease'}}></div>
                    </button>

                  </div>
                </div>
              </div>
              
              <div className="position-absolute bottom-0 start-0 w-100" style={{height: '4px', background: 'linear-gradient(90deg, #10b981, #059669, #34d399)'}}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {mostrarModal && pontoSelecionado && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1050, backdropFilter: 'blur(8px)', animation: 'modalFadeIn 0.4s ease-out'}}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{borderRadius: '25px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', animation: 'modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', transform: 'scale(1)', boxShadow: '0 25px 50px rgba(0,0,0,0.25)'}}>
              {/* Header com gradiente */}
              <div className="modal-header position-relative overflow-hidden" style={{background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
                <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                <div className="position-absolute" style={{bottom: '-15px', left: '-15px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%'}}></div>
                <div className="d-flex align-items-center position-relative">
                  <div className="rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', minWidth: '60px'}}>
                    {pontoSelecionado.imagemPonto ? (
                      <img 
                        src={pontoSelecionado.imagemPonto} 
                        alt="Foto do ponto"
                        style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                      />
                    ) : (
                      <img 
                        src="/Verdenovologo.png" 
                        alt="Logo VerDenovo"
                        style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                      />
                    )}
                  </div>
                  <div>
                    <h4 className="modal-title text-white mb-1 fw-bold">{pontoSelecionado.nome}</h4>
                    <p className="text-white-50 mb-0">
                      📍 {pontoSelecionado.cidade}
                    </p>
                  </div>
                </div>
                <button type="button" className="btn-close btn-close-white position-relative" onClick={fecharModal} style={{fontSize: '1.2rem'}}></button>
              </div>
              
              <div className="modal-body p-0">
                {/* Status e Informações Rápidas */}
                <div className="p-4 border-bottom" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))'}}>
                  <div className="row g-3">
                    <div className="col-md-3" style={{animation: 'slideInUp 0.6s ease-out 0.1s both'}}>
                      <div className="text-center p-3 rounded-4 hover-card" style={{background: 'rgba(16, 185, 129, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'}}>
                        <div className="bg-success mx-auto mb-2 d-flex align-items-center justify-content-center icon-bounce" style={{width: '60px', height: '60px', borderRadius: '50%'}}>
                          <i className="bi bi-check-circle-fill text-white" style={{fontSize: '1.8rem'}}></i>
                        </div>
                        <h6 className="text-success fw-bold mb-1">Status</h6>
                        <small className="text-success">Ponto Ativo</small>
                      </div>
                    </div>
                    <div className="col-md-3" style={{animation: 'slideInUp 0.6s ease-out 0.2s both'}}>
                      <div className="text-center p-3 rounded-4 hover-card" style={{background: 'rgba(59, 130, 246, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'}}>
                        <div className="bg-primary mx-auto mb-2 d-flex align-items-center justify-content-center icon-bounce" style={{width: '60px', height: '60px', borderRadius: '50%'}}>
                          <i className="bi bi-clock-fill text-white" style={{fontSize: '1.8rem'}}></i>
                        </div>
                        <h6 className="text-primary fw-bold mb-1">Horário</h6>
                        <small className="text-primary">{pontoSelecionado.horario}</small>
                      </div>
                    </div>
                    <div className="col-md-3" style={{animation: 'slideInUp 0.6s ease-out 0.3s both'}}>
                      <div className="text-center p-3 rounded-4 hover-card" style={{background: 'rgba(168, 85, 247, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'}}>
                        <div className="mx-auto mb-2 d-flex align-items-center justify-content-center icon-bounce" style={{width: '60px', height: '60px', borderRadius: '50%', background: '#a855f7'}}>
                          <i className="bi bi-telephone-fill text-white" style={{fontSize: '1.8rem'}}></i>
                        </div>
                        <h6 className="fw-bold mb-1" style={{color: '#a855f7'}}>Contato</h6>
                        <small style={{color: '#a855f7'}}>{pontoSelecionado.telefone}</small>
                      </div>
                    </div>
                    <div className="col-md-3" style={{animation: 'slideInUp 0.6s ease-out 0.4s both'}}>
                      <div className="text-center p-3 rounded-4 hover-card" style={{background: 'rgba(245, 158, 11, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'}}>
                        <div className="mx-auto mb-2 d-flex align-items-center justify-content-center icon-bounce" style={{width: '60px', height: '60px', borderRadius: '50%', background: '#f59e0b'}}>
                          <i className="bi bi-arrow-repeat text-white" style={{fontSize: '1.8rem'}}></i>
                        </div>
                        <h6 className="fw-bold mb-1" style={{color: '#f59e0b'}}>Materiais</h6>
                        <small style={{color: '#f59e0b'}}>{formatarMateriais(pontoSelecionado.materiais).split(', ').length} tipos</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="row g-4">
                    {/* Informações de Localização */}
                    <div className="col-lg-6" style={{animation: 'slideInLeft 0.7s ease-out 0.5s both'}}>
                      <div className="h-100 p-4 rounded-4 hover-section" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease'}}>
                        <h5 className="text-success fw-bold mb-4 d-flex align-items-center">
                          <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px', minWidth: '45px'}}>
                            <i className="bi bi-geo-alt text-white" style={{fontSize: '1.2rem'}}></i>
                          </div>
                          Localização
                        </h5>
                        
                        <div className="space-y-3">
                          <div className="d-flex align-items-start p-3 rounded-3 hover-info" style={{background: 'rgba(16, 185, 129, 0.05)', transition: 'all 0.3s ease', animation: 'slideInLeft 0.5s ease-out 0.6s both'}}>
                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3 flex-shrink-0 icon-pulse" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                              <i className="bi bi-house-door text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-dark">Endereço Completo</h6>
                              <p className="text-muted mb-0">{pontoSelecionado.endereco}</p>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-start p-3 rounded-3 hover-info" style={{background: 'rgba(59, 130, 246, 0.05)', transition: 'all 0.3s ease', animation: 'slideInLeft 0.5s ease-out 0.7s both'}}>
                            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3 flex-shrink-0 icon-pulse" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                              <i className="bi bi-geo-alt text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-dark">Cidade</h6>
                              <p className="text-muted mb-0">{pontoSelecionado.cidade}</p>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-start p-3 rounded-3 hover-info" style={{background: 'rgba(168, 85, 247, 0.05)', transition: 'all 0.3s ease', animation: 'slideInLeft 0.5s ease-out 0.8s both'}}>
                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0 icon-pulse" style={{width: '40px', height: '40px', minWidth: '40px', backgroundColor: '#a855f7'}}>
                              <i className="bi bi-mailbox text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-dark">CEP</h6>
                              <p className="text-muted mb-0">{pontoSelecionado.cep}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Materiais Aceitos */}
                    <div className="col-lg-6" style={{animation: 'slideInRight 0.7s ease-out 0.6s both'}}>
                      <div className="h-100 p-4 rounded-4 hover-section" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease'}}>
                        <h5 className="text-success fw-bold mb-4 d-flex align-items-center">
                          <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px', minWidth: '45px'}}>
                            <i className="bi bi-recycle text-white" style={{fontSize: '1.2rem'}}></i>
                          </div>
                          Materiais Aceitos
                        </h5>
                        
                        <div className="row g-3">
                          {formatarMateriais(pontoSelecionado.materiais).split(', ').map((material, index) => {
                            const materialConfig = {
                              'Papel': { icon: 'bi-file-earmark-text-fill', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
                              'Plástico': { icon: 'bi-cup-fill', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
                              'Vidro': { icon: 'bi-cup-straw', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)' },
                              'Metal': { icon: 'bi-gear-fill', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)' }
                            };
                            const config = materialConfig[material] || { icon: 'bi-check-circle-fill', color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' };
                            
                            return (
                              <div key={index} className="col-6" style={{animation: `fadeInScale 0.5s ease-out ${0.7 + index * 0.1}s both`}}>
                                <div className="text-center p-3 rounded-3 h-100 hover-material" style={{background: config.bg, border: `1px solid ${config.color}20`, transition: 'all 0.3s ease'}}>
                                  <div className="mx-auto mb-2 d-flex align-items-center justify-content-center icon-pulse" style={{width: '50px', height: '50px', borderRadius: '50%', background: config.color}}>
                                    <i className={`bi ${config.icon} text-white`} style={{fontSize: '1.3rem'}}></i>
                                  </div>
                                  <h6 className="fw-bold mb-0" style={{color: config.color, fontSize: '0.9rem'}}>{material}</h6>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Informações Adicionais */}
                        <div className="mt-4 p-3 rounded-3 hover-tip" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))', border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'all 0.3s ease', animation: 'fadeInScale 0.5s ease-out 1s both'}}>
                          <div className="d-flex align-items-center">
                            <div className="rounded-circle bg-warning d-flex align-items-center justify-content-center me-3 icon-bounce" style={{width: '40px', height: '40px', minWidth: '40px'}}>
                              <i className="bi bi-exclamation-triangle text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-success">Dica Importante</h6>
                              <small className="text-muted">Certifique-se de limpar os materiais antes de depositar</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer border-0 p-4" style={{background: 'rgba(248, 250, 252, 0.8)', borderRadius: '0 0 25px 25px', animation: 'slideInUp 0.6s ease-out 0.8s both'}}>
                <div className="d-flex gap-3 w-100">
                  <button 
                    type="button" 
                    className="btn btn-outline-success flex-fill hover-button" 
                    onClick={() => entrarEmContato(pontoSelecionado)}
                    style={{borderRadius: '15px', padding: '12px', fontWeight: '600', border: '2px solid #10b981', transition: 'all 0.3s ease'}}
                  >
                    <i className="bi bi-telephone-fill me-2"></i>Entrar em Contato
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-success flex-fill hover-button" 
                    onClick={fecharModal}
                    style={{borderRadius: '15px', padding: '12px', fontWeight: '600', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', transition: 'all 0.3s ease'}}
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      </div>
    </>
  );
}

export default PontosColeta;