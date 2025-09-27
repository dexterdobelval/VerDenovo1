import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { usuario, logout, isLogado } = useAuth();
  
  const animationStyles = `
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-60px); }
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
    .animate-slideInLeft { animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
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
      <nav className="navbar navbar-dark bg-success fixed-top animate-slideInLeft" style={{height: '72px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}>
      <div className="container-fluid px-3">
        <div className="d-flex align-items-center">
          <button className="btn btn-link p-2 me-3 text-white hover-scale" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" style={{border: 'none'}}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>
          </button>
          
          <Link className="navbar-brand d-flex align-items-center text-white text-decoration-none logo-hover animate-logo" to="/">
            <img src="/Verdenovologo.png" alt="VerDenovo" height="32" className="me-2" />
            <span style={{fontSize: '20px', fontWeight: '500'}}>VerDenovo</span>
          </Link>
        </div>
        
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" style={{width: '280px'}}>
          <style>
            {`#offcanvasNavbar .offcanvas-body::-webkit-scrollbar { display: none; }
              #offcanvasNavbar .offcanvas-body { -ms-overflow-style: none; scrollbar-width: none; }`}
          </style>
          <div className="offcanvas-header bg-success border-bottom">
            <h5 className="offcanvas-title text-white">
              <img src="/Verdenovologo.png" alt="VerDenovo" height="30" className="me-2" />
              VerDenovo
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" onClick={closeOffcanvas}></button>
          </div>
          <div className="offcanvas-body">
            {/* Navegação Principal */}
            <div className="mb-4">
              <h6 className="text-success fw-bold mb-3">
                <i className="bi bi-compass me-2"></i>Navegação
              </h6>
              <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-1" to="/" onClick={closeOffcanvas}>
                <i className="bi bi-house me-2"></i>Início
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-2" to="/pontos" onClick={closeOffcanvas}>
                <i className="bi bi-geo-alt me-2"></i>Pontos de Coleta
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-3" to="/empresas-parceiras" onClick={closeOffcanvas}>
                <i className="bi bi-building me-2"></i>Empresas Parceiras
              </Link>
            </div>
            
            {/* Educação */}
            <div className="mb-4">
              <h6 className="text-success fw-bold mb-3">
                <i className="bi bi-book me-2"></i>Educação Ambiental
              </h6>
              <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-1" to="/materiais" onClick={closeOffcanvas}>
                <i className="bi bi-recycle me-2"></i>Materiais Recicláveis
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-2" to="/residuos" onClick={closeOffcanvas}>
                <i className="bi bi-trash me-2"></i>Resíduos
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-3" to="/faq" onClick={closeOffcanvas}>
                <i className="bi bi-question-circle me-2"></i>Perguntas Frequentes
              </Link>
            </div>
            
            {/* Conta */}
            <div className="mb-4">
              <h6 className="text-success fw-bold mb-3">
                <i className="bi bi-person-circle me-2"></i>Conta
              </h6>
              {isLogado() ? (
                <div className={`card ${usuario.tipo === 'admin' ? 'border-danger' : 'border-success'}`}>
                  <div className={`card-header ${usuario.tipo === 'admin' ? 'bg-danger' : 'bg-success'} text-white`}>
                    <small className="fw-bold">
                      {usuario.tipo === 'empresa' ? 'EMPRESA LOGADA' : 
                       usuario.tipo === 'ponto' ? 'PONTO LOGADO' : 
                       usuario.tipo === 'usuario' ? 'USUÁRIO LOGADO' : 'ADMINISTRADOR'}
                    </small>
                  </div>
                  <div className="card-body py-2">
                    {usuario.tipo === 'admin' ? (
                      <>
                        <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-1" to="/cadastrar" onClick={closeOffcanvas}>
                          <i className="bi bi-plus-circle me-2"></i>Adicionar Ponto
                        </Link>
                        <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-2" to="/gerenciar-contas" onClick={closeOffcanvas}>
                          <i className="bi bi-people me-2"></i>Gerenciar Contas
                        </Link>
                      </>
                    ) : usuario.tipo === 'usuario' ? (
                      <div className="text-center py-2">
                        <small className="text-muted">Bem-vindo, {usuario.dados?.email}!</small>
                      </div>
                    ) : (
                      <Link 
                        className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-1" 
                        to={usuario.tipo === 'empresa' ? '/personalizar-empresa' : '/personalizar-ponto'} 
                        onClick={closeOffcanvas}
                      >
                        <i className="bi bi-gear me-2"></i>Personalizar Informações
                      </Link>
                    )}
                    <button 
                      className="nav-link py-2 px-3 rounded w-100 text-start border-0 bg-transparent text-danger" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>Sair da Conta
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="card border-success mb-3">
                    <div className="card-header bg-light">
                      <small className="text-muted fw-bold">CADASTRAR</small>
                    </div>
                    <div className="card-body py-2">
                      <Link className="nav-link py-1 px-2 rounded mb-1 hover-lift animate-fadeIn animate-delay-1" to="/cadastro-usuario" onClick={closeOffcanvas}>
                        <i className="bi bi-person-plus me-2"></i>Usuário
                      </Link>
                      <Link className="nav-link py-1 px-2 rounded mb-1 hover-lift animate-fadeIn animate-delay-2" to="/cadastrar" onClick={closeOffcanvas}>
                        <i className="bi bi-geo-alt me-2"></i>Ponto de Coleta
                      </Link>
                      <Link className="nav-link py-1 px-2 rounded hover-lift animate-fadeIn animate-delay-3" to="/cadastro-empresa" onClick={closeOffcanvas}>
                        <i className="bi bi-building me-2"></i>Empresa
                      </Link>
                    </div>
                  </div>
                  <div className="card border-primary">
                    <div className="card-header bg-light">
                      <small className="text-muted fw-bold">LOGIN</small>
                    </div>
                    <div className="card-body py-2">
                      <Link className="nav-link py-1 px-2 rounded mb-1 hover-lift animate-fadeIn animate-delay-1" to="/login-usuario" onClick={closeOffcanvas}>
                        <i className="bi bi-person-circle me-2"></i>Usuário
                      </Link>
                      <Link className="nav-link py-1 px-2 rounded mb-1 hover-lift animate-fadeIn animate-delay-2" to="/login-empresa" onClick={closeOffcanvas}>
                        <i className="bi bi-building me-2"></i>Empresa
                      </Link>
                      <Link className="nav-link py-1 px-2 rounded hover-lift animate-fadeIn animate-delay-3" to="/login-ponto" onClick={closeOffcanvas}>
                        <i className="bi bi-unlock me-2"></i>Ponto de Coleta
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {/* Sobre */}
            <div className="mb-4">
              <h6 className="text-success fw-bold mb-3">
                <i className="bi bi-info-circle me-2"></i>Informações
              </h6>
              <Link className="nav-link py-2 px-3 rounded mb-2 hover-lift animate-fadeIn animate-delay-1" to="/sobre" onClick={closeOffcanvas}>
                <i className="bi bi-people me-2"></i>Sobre o VerDenovo
              </Link>
              <Link className="nav-link py-2 px-3 rounded hover-lift animate-fadeIn animate-delay-2" to="/conscientizacao" onClick={closeOffcanvas}>
                <i className="bi bi-tree me-2"></i>Conscientização e Educação Ambiental
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