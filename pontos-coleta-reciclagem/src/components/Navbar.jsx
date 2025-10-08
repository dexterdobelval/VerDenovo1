import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { usuario, logout, isLogado } = useAuth();
  const location = useLocation();
  
  const isLoginPage = ['/login-usuario', '/login-ponto'].includes(location.pathname);
  const isCadastroPage = ['/cadastro-usuario', '/cadastrar'].includes(location.pathname);
  
  const animationStyles = `
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-10px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes logoEntrance {
      0% { opacity: 0; transform: translateY(-50px) scale(0.3); }
      25% { opacity: 0.3; transform: translateY(10px) scale(0.8); }
      50% { opacity: 0.7; transform: translateY(-5px) scale(1.1); }
      75% { opacity: 0.9; transform: translateY(2px) scale(0.95); }
      100% { opacity: 1; transform: translateY(0px) scale(1); }
    }
    @keyframes logoHover {
      0%, 100% { transform: scale(1); filter: brightness(1); }
      50% { transform: scale(1.08); filter: brightness(1.2) drop-shadow(0 0 10px rgba(255,255,255,0.5)); }
    }
    .animate-slideInLeft { animation: slideInLeft 0.3s ease-out; }
    .animate-fadeIn { animation: fadeIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-logo { animation: logoEntrance 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
    .animate-delay-4 { animation-delay: 0.4s; animation-fill-mode: both; }
    .hover-lift { transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .hover-lift:hover { transform: translateY(-3px); background-color: rgba(5, 150, 105, 0.1); }
    .hover-scale { transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .hover-scale:hover { transform: scale(1.1); }
    .logo-hover { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .logo-hover:hover { animation: logoHover 0.6s ease-in-out; }
  `;
  
  const handleLogout = () => {
    logout();
    closeOffcanvas();
  };
  
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    const offcanvas = window.bootstrap?.Offcanvas?.getInstance(offcanvasElement);
    if (offcanvas) {
      offcanvas.hide();
    }
    // Force restore scroll
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
      document.body.classList.remove('modal-open');
    }, 100);
  };
  return (
    <>
      <style>{animationStyles}</style>
      <nav className="navbar navbar-dark bg-success fixed-top" style={{height: '72px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 1030}}>
      <div className="container-fluid px-3">
        <div className="d-flex align-items-center">
          <button className="btn btn-link p-2 me-3 text-white hover-scale" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" style={{border: 'none'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          
          <Link className="navbar-brand d-flex align-items-center text-white text-decoration-none" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{transition: 'all 0.15s ease-out', willChange: 'transform'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
            <img src="/Verdenovologo.png" alt="VerDenovo" height="40" className="me-2" />
            <span style={{fontSize: '22px', fontWeight: '500'}}>VerDenovo</span>
          </Link>
        </div>
        
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" style={{width: '320px', zIndex: 9999}}>
          <style>
            {`#offcanvasNavbar .offcanvas-body::-webkit-scrollbar { display: none; }
              #offcanvasNavbar .offcanvas-body { -ms-overflow-style: none; scrollbar-width: none; }
              #offcanvasNavbar { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%); }
              .offcanvas-backdrop { z-index: 9998 !important; }
              .nav-section { background: rgba(255,255,255,0.7); backdrop-filter: blur(10px); border-radius: 20px; margin-bottom: 1.5rem; padding: 1.5rem; box-shadow: 0 8px 25px rgba(0,0,0,0.08); }
              .nav-section h6 { color: #1f2937; font-weight: 700; margin-bottom: 1rem; }
              .nav-link-custom { color: #4b5563; padding: 0.75rem 1rem; border-radius: 12px; margin-bottom: 0.5rem; transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); background: rgba(255,255,255,0.5); border: 1px solid rgba(5, 150, 105, 0.1); }
              .nav-link-custom:hover { background: linear-gradient(135deg, #dcfce7, #bbf7d0); color: #059669; transform: translateX(8px); box-shadow: 0 4px 15px rgba(5, 150, 105, 0.2); }
              .nav-link-active { background: linear-gradient(135deg, #10b981, #059669) !important; color: white !important; box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
              .nav-link-login-active { background: linear-gradient(135deg, #3b82f6, #2563eb) !important; color: white !important; box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4); }
              .nav-link-login:hover { background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #3b82f6; transform: translateX(8px); box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2); }
              .nav-link-admin-active { background: linear-gradient(135deg, #dc2626, #b91c1c) !important; color: white !important; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4) !important; }
              .nav-link-admin:hover { background: linear-gradient(135deg, #fee2e2, #fecaca) !important; color: #dc2626 !important; transform: translateX(8px) !important; box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2) !important; }
              .nav-link-custom i { width: 20px; }`}
          </style>
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
            {/* Navegação Principal */}
            <div className="nav-section animate-fadeIn animate-delay-1">
              <h6>
                <i className="bi bi-compass me-2" style={{color: '#059669'}}></i>Navegação
              </h6>
              <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/' ? 'nav-link-active' : ''}`} to="/" onClick={closeOffcanvas}>
                <i className="bi bi-house me-3"></i>Início
              </Link>
              <Link className={`nav-link nav-link-custom text-decoration-none ${location.pathname === '/pontos' ? 'nav-link-active' : ''}`} to="/pontos" onClick={closeOffcanvas}>
                <i className="bi bi-geo-alt me-3"></i>Pontos de Coleta
              </Link>

            </div>
            
            {/* Educação */}
            <div className="nav-section animate-fadeIn animate-delay-2">
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
            <div className="nav-section animate-fadeIn animate-delay-3">
              <h6>
                <i className="bi bi-person-circle me-2" style={{color: '#059669'}}></i>Conta
              </h6>
              {isLogado() ? (
                <div className="position-relative" style={{background: usuario.tipo === 'admin' ? 'linear-gradient(135deg, #fef2f2, #fee2e2)' : 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '15px', padding: '1rem', border: `2px solid ${usuario.tipo === 'admin' ? '#fca5a5' : '#86efac'}`}}>
                  <div className="text-center mb-3">
                    <div className={`badge ${usuario.tipo === 'admin' ? 'bg-danger' : 'bg-success'} px-3 py-2 rounded-pill`} style={{fontSize: '0.75rem', fontWeight: '600'}}>
                      {usuario.tipo === 'ponto' ? 'PONTO LOGADO' : 
                       usuario.tipo === 'usuario' ? 'USUÁRIO LOGADO' : 'ADMINISTRADOR'}
                    </div>
                  </div>
                  {usuario.tipo === 'admin' ? (
                    <>
                      <Link 
                        className={`nav-link text-decoration-none ${
                          location.pathname === '/cadastrar' ? 'nav-link-admin-active' : ''
                        }`}
                        to="/cadastrar" 
                        onClick={closeOffcanvas}
                        style={{
                          background: location.pathname === '/cadastrar' 
                            ? 'linear-gradient(135deg, #dc2626, #b91c1c)' 
                            : 'rgba(255,255,255,0.5)',
                          color: location.pathname === '/cadastrar' ? 'white' : '#4b5563',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          marginBottom: '0.5rem',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          border: '1px solid rgba(220, 38, 38, 0.1)',
                          boxShadow: location.pathname === '/cadastrar' 
                            ? '0 4px 15px rgba(220, 38, 38, 0.4)' 
                            : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (location.pathname !== '/cadastrar') {
                            e.target.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)';
                            e.target.style.color = '#dc2626';
                            e.target.style.transform = 'translateX(8px)';
                            e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (location.pathname !== '/cadastrar') {
                            e.target.style.background = 'rgba(255,255,255,0.5)';
                            e.target.style.color = '#4b5563';
                            e.target.style.transform = 'translateX(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <i className="bi bi-plus-circle me-3"></i>Adicionar Ponto
                      </Link>
                      <Link 
                        className={`nav-link text-decoration-none ${
                          location.pathname === '/gerenciar-contas' ? 'nav-link-admin-active' : ''
                        }`}
                        to="/gerenciar-contas" 
                        onClick={closeOffcanvas}
                        style={{
                          background: location.pathname === '/gerenciar-contas' 
                            ? 'linear-gradient(135deg, #dc2626, #b91c1c)' 
                            : 'rgba(255,255,255,0.5)',
                          color: location.pathname === '/gerenciar-contas' ? 'white' : '#4b5563',
                          padding: '0.75rem 1rem',
                          borderRadius: '12px',
                          marginBottom: '0.5rem',
                          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          border: '1px solid rgba(220, 38, 38, 0.1)',
                          boxShadow: location.pathname === '/gerenciar-contas' 
                            ? '0 4px 15px rgba(220, 38, 38, 0.4)' 
                            : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (location.pathname !== '/gerenciar-contas') {
                            e.target.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)';
                            e.target.style.color = '#dc2626';
                            e.target.style.transform = 'translateX(8px)';
                            e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (location.pathname !== '/gerenciar-contas') {
                            e.target.style.background = 'rgba(255,255,255,0.5)';
                            e.target.style.color = '#4b5563';
                            e.target.style.transform = 'translateX(0)';
                            e.target.style.boxShadow = 'none';
                          }
                        }}
                      >
                        <i className="bi bi-people me-3"></i>Gerenciar Contas
                      </Link>
                    </>
                  ) : usuario.tipo === 'usuario' ? (
                    <div className="text-center py-2">
                      <small className="text-muted">Bem-vindo, {usuario.dados?.nome?.split(' ')[0] || usuario.dados?.email}!</small>
                    </div>
                  ) : (
                    <Link 
                      className="nav-link nav-link-custom text-decoration-none" 
                      to="/personalizar-ponto" 
                      onClick={closeOffcanvas}
                    >
                      <i className="bi bi-gear me-3"></i>Personalizar Informações
                    </Link>
                  )}
                  <button 
                    className="nav-link w-100 text-start border-0 bg-transparent" 
                    onClick={handleLogout}
                    style={{
                      marginTop: '0.5rem',
                      color: '#dc2626',
                      padding: '0.75rem 1rem',
                      borderRadius: '12px',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      background: 'rgba(255,255,255,0.5)',
                      border: '1px solid rgba(220, 38, 38, 0.1)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #fee2e2, #fecaca)';
                      e.target.style.color = '#dc2626';
                      e.target.style.transform = 'translateX(8px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.5)';
                      e.target.style.color = '#dc2626';
                      e.target.style.transform = 'translateX(0)';
                      e.target.style.boxShadow = 'none';
                    }}
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
                  </div>
                  <div style={{background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '15px', padding: '1rem', border: '2px solid #3b82f6'}}>
                    <div className="text-center mb-2">
                      <div className="badge bg-primary px-3 py-1 rounded-pill" style={{fontSize: '0.75rem', fontWeight: '600'}}>LOGIN</div>
                    </div>
                    <Link className={`nav-link nav-link-custom nav-link-login text-decoration-none ${location.pathname === '/login-usuario' ? 'nav-link-login-active' : ''}`} to="/login-usuario" onClick={closeOffcanvas}>
                      <i className="bi bi-person-circle me-3"></i>Usuário
                    </Link>
                    <Link className={`nav-link nav-link-custom nav-link-login text-decoration-none ${location.pathname === '/login-ponto' ? 'nav-link-login-active' : ''}`} to="/login-ponto" onClick={closeOffcanvas}>
                      <i className="bi bi-unlock me-3"></i>Ponto de Coleta
                    </Link>
                  </div>
                </>
              )}
            </div>
            
            {/* Sobre */}
            <div className="nav-section animate-fadeIn animate-delay-4">
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
    </>
  );
}

export default Navbar;