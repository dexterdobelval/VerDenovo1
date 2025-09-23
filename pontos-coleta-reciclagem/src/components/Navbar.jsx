import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { usuario, logout, isLogado } = useAuth();
  
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
  };
  return (
    <nav className="navbar navbar-dark bg-success">
      <div className="container">
        <div className="position-relative w-100 d-flex justify-content-center align-items-center">
          <button className="navbar-toggler position-absolute start-0" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <Link className="navbar-brand" to="/">
            <img src="/Verdenovologo.png" alt="VerDenovo" height="40" className="me-2" />
            VerDenovo
          </Link>
        </div>
        
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar">
          <div className="offcanvas-header bg-success text-white">
            <h5 className="offcanvas-title">
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
              <Link className="nav-link py-2 px-3 rounded mb-2" to="/" onClick={closeOffcanvas}>
                <i className="bi bi-house me-2"></i>Início
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2" to="/pontos" onClick={closeOffcanvas}>
                <i className="bi bi-geo-alt me-2"></i>Pontos de Coleta
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2" to="/empresas-parceiras" onClick={closeOffcanvas}>
                <i className="bi bi-building me-2"></i>Empresas Parceiras
              </Link>
            </div>
            
            {/* Educação */}
            <div className="mb-4">
              <h6 className="text-success fw-bold mb-3">
                <i className="bi bi-book me-2"></i>Educação Ambiental
              </h6>
              <Link className="nav-link py-2 px-3 rounded mb-2" to="/materiais" onClick={closeOffcanvas}>
                <i className="bi bi-recycle me-2"></i>Materiais Recicláveis
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2" to="/residuos" onClick={closeOffcanvas}>
                <i className="bi bi-trash me-2"></i>Resíduos
              </Link>
              <Link className="nav-link py-2 px-3 rounded mb-2" to="/faq" onClick={closeOffcanvas}>
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
                       usuario.tipo === 'ponto' ? 'PONTO LOGADO' : 'ADMINISTRADOR'}
                    </small>
                  </div>
                  <div className="card-body py-2">
                    {usuario.tipo === 'admin' ? (
                      <>
                        <Link className="nav-link py-2 px-3 rounded mb-2" to="/cadastrar" onClick={closeOffcanvas}>
                          <i className="bi bi-plus-circle me-2"></i>Adicionar Ponto
                        </Link>
                      </>
                    ) : (
                      <Link 
                        className="nav-link py-2 px-3 rounded mb-2" 
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
                      <Link className="nav-link py-1 px-2 rounded mb-1" to="/cadastrar" onClick={closeOffcanvas}>
                        <i className="bi bi-geo-alt me-2"></i>Ponto de Coleta
                      </Link>
                      <Link className="nav-link py-1 px-2 rounded" to="/cadastro-empresa" onClick={closeOffcanvas}>
                        <i className="bi bi-building me-2"></i>Empresa
                      </Link>
                    </div>
                  </div>
                  <div className="card border-primary">
                    <div className="card-header bg-light">
                      <small className="text-muted fw-bold">LOGIN</small>
                    </div>
                    <div className="card-body py-2">
                      <Link className="nav-link py-1 px-2 rounded mb-1" to="/login-empresa" onClick={closeOffcanvas}>
                        <i className="bi bi-building me-2"></i>Empresa
                      </Link>
                      <Link className="nav-link py-1 px-2 rounded mb-1" to="/login-ponto" onClick={closeOffcanvas}>
                        <i className="bi bi-unlock me-2"></i>Ponto de Coleta
                      </Link>
                      <Link className="nav-link py-1 px-2 rounded" to="/login-admin" onClick={closeOffcanvas}>
                        <i className="bi bi-shield-lock me-2"></i>Administrador
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
              <Link className="nav-link py-2 px-3 rounded mb-2" to="/sobre" onClick={closeOffcanvas}>
                <i className="bi bi-people me-2"></i>Sobre o VerDenovo
              </Link>
              <Link className="nav-link py-2 px-3 rounded" to="/conscientizacao" onClick={closeOffcanvas}>
                <i className="bi bi-tree me-2"></i>Conscientização e Educação Ambiental
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;