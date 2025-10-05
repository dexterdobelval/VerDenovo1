import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Sobre() {
  const { usuario, logout, isLogado } = useAuth();
  const location = useLocation();
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
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 8px 35px rgba(59, 130, 246, 0.5); }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.03); opacity: 0.9; }
    }
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(50px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes wiggle {
      0%, 7% { transform: rotateZ(0); }
      15% { transform: rotateZ(-15deg); }
      20% { transform: rotateZ(10deg); }
      25% { transform: rotateZ(-10deg); }
      30% { transform: rotateZ(6deg); }
      35% { transform: rotateZ(-4deg); }
      40%, 100% { transform: rotateZ(0); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-slideInLeft { animation: slideInLeft 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-slideInRight { animation: slideInRight 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-slideInUp { animation: slideInUp 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-scaleIn { animation: scaleIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
    .animate-delay-1 { animation-delay: 0.1s; }
    .animate-delay-2 { animation-delay: 0.2s; }
    .animate-delay-3 { animation-delay: 0.3s; }
    .animate-delay-4 { animation-delay: 0.4s; }
    .animate-delay-5 { animation-delay: 0.5s; }
    .hover-lift { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .hover-lift:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .hover-bounce:hover { animation: bounce 0.6s ease; }
    .hover-wiggle:hover { animation: wiggle 0.8s ease; }
    .icon-pulse { animation: pulse 2s ease-in-out infinite; }
    .icon-float { animation: float 3s ease-in-out infinite; }
    .icon-glow { animation: glow 2s ease-in-out infinite; }
    .icon-breathe { animation: breathe 3s ease-in-out infinite; }
    .icon-rotate:hover { animation: rotate 0.6s ease-in-out; }
    .shimmer-effect { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
    .text-animate { transition: all 0.3s ease; }
    .text-animate:hover { transform: translateY(-2px); color: #059669; }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    logout();
    closeOffcanvas();
  };
  
  const closeOffcanvas = () => {
    const offcanvasElement = document.getElementById('offcanvasNavbarSobre');
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
      {/* Navbar exclusiva para sobre */}
      <nav className="navbar navbar-dark bg-success fixed-top" style={{height: '72px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', zIndex: 1030}}>
        <div className="container-fluid px-3">
          <div className="d-flex align-items-center">
            <button className="btn btn-link p-2 me-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarSobre" style={{border: 'none'}}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
              </svg>
            </button>
            
            <Link className="navbar-brand d-flex align-items-center text-white text-decoration-none" to="/">
              <img src="/Verdenovologo.png" alt="VerDenovo" height="40" className="me-2" />
              <span style={{fontSize: '22px', fontWeight: '500'}}>VerDenovo</span>
            </Link>
          </div>
          
          <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbarSobre" style={{width: '320px', zIndex: 99999, background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'}}>
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
                {`#offcanvasNavbarSobre .offcanvas-body::-webkit-scrollbar { display: none; }
                  #offcanvasNavbarSobre .offcanvas-body { -ms-overflow-style: none; scrollbar-width: none; }
                  #offcanvasNavbarSobre { background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%); }
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
      
      <div style={{background: '#ffffff', minHeight: '100vh', padding: '2rem 0', marginTop: '72px'}}>
        <style>{animationStyles}</style>
        <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-5 animate-fadeInUp">
          <div className="d-inline-flex align-items-center justify-content-center mb-4 icon-float" style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'}}>
            <i className="bi bi-people text-white" style={{fontSize: '2rem'}}></i>
          </div>
          <h1 className="display-4 fw-bold text-success mb-3 animate-slideInLeft">
            Sobre o VerDenovo
          </h1>
          <p className="lead text-muted mb-0 animate-fadeInUp animate-delay-1" style={{maxWidth: '600px', margin: '0 auto'}}>
            Conheça nossa história, missão e compromisso com a sustentabilidade
          </p>
        </div>

        {/* Nossa Origem */}
        <div className="row mb-5 animate-fadeInUp animate-delay-1">
          <div className="col-12">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '25px', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', backdropFilter: 'blur(15px)', boxShadow: '0 15px 35px rgba(0,0,0,0.08)'}}>
              <div className="card-body p-5">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <div className="d-flex align-items-center mb-4">
                      <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #10b981, #059669)', boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)'}}>
                        <i className="bi bi-book text-white" style={{fontSize: '1.5rem'}}></i>
                      </div>
                      <h3 className="text-success fw-bold mb-0">Nossa Origem</h3>
                    </div>
                    <p className="lead mb-4" style={{color: '#1f2937'}}>
                      O projeto VerDenovo nasceu como um Trabalho de Conclusão de Curso (TCC) desenvolvido por estudantes comprometidos com a transformação ambiental de nossa comunidade.
                    </p>
                    <p className="mb-4" style={{color: '#4b5563', lineHeight: '1.7'}}>
                      Durante nossos estudos, identificamos a necessidade urgente de facilitar o acesso da população aos pontos de coleta seletiva e promover a educação ambiental. Assim surgiu a ideia de criar uma plataforma digital que conectasse pessoas, empresas e pontos de reciclagem de forma simples e eficiente.
                    </p>
                    <p className="mb-0" style={{color: '#4b5563', lineHeight: '1.7'}}>
                      O que começou como um projeto acadêmico se transformou em uma iniciativa real de impacto social e ambiental, demonstrando como a educação pode gerar soluções práticas para problemas do mundo real.
                    </p>
                  </div>
                  <div className="col-md-4 text-center">
                    <div className="p-4 rounded-4" style={{background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
                      <i className="bi bi-mortarboard text-success icon-pulse" style={{fontSize: '4rem'}}></i>
                      <h5 className="text-success mt-3 fw-bold">Projeto Acadêmico</h5>
                      <p className="text-muted mb-0">Transformando conhecimento em ação</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nossos Objetivos */}
        <div className="row mb-5 animate-fadeInUp animate-delay-2">
          <div className="col-12 mb-4">
            <div className="text-center">
              <div className="d-inline-flex align-items-center justify-content-center mb-3 icon-glow" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)', borderRadius: '50%'}}>
                <i className="bi bi-bullseye text-white icon-pulse" style={{fontSize: '1.5rem'}}></i>
              </div>
              <h3 className="text-primary fw-bold mb-2">Nossos Objetivos</h3>
              <p className="text-muted">Metas que nos guiam rumo a um futuro sustentável</p>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInLeft animate-delay-3">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(59, 130, 246, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(59, 130, 246, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #3b82f6, #2563eb)'}}>
                    <i className="bi bi-geo-alt-fill text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="text-primary fw-bold mb-3">Foco em Barueri</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Nosso objetivo principal é contribuir para o desenvolvimento sustentável do município de Barueri, facilitando o acesso da população aos pontos de coleta seletiva e promovendo práticas ambientalmente responsáveis em nossa cidade.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInRight animate-delay-3">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(16, 185, 129, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #10b981, #059669)'}}>
                    <i className="bi bi-people-fill text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="text-success fw-bold mb-3">Engajamento Comunitário</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Queremos criar uma rede colaborativa onde cidadãos, empresas e organizações trabalhem juntos para construir um futuro mais sustentável, fortalecendo os laços comunitários através da consciência ambiental.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInLeft animate-delay-4">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(245, 158, 11, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(245, 158, 11, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
                    <i className="bi bi-graph-up-arrow text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-3" style={{color: '#f59e0b'}}>Impacto Mensurável</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Buscamos aumentar significativamente os índices de reciclagem em Barueri, contribuindo para a redução de resíduos em aterros sanitários e promovendo a economia circular em nossa região.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 animate-slideInRight animate-delay-4">
            <div className="card border-0 shadow-lg hover-lift" style={{borderRadius: '20px', background: 'rgba(168, 85, 247, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(168, 85, 247, 0.1)', height: '100%'}}>
              <div className="card-body p-4">
                <div className="d-flex align-items-start">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #a855f7, #9333ea)'}}>
                    <i className="bi bi-lightbulb-fill text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                  <div>
                    <h5 className="fw-bold mb-3" style={{color: '#a855f7'}}>Inovação Tecnológica</h5>
                    <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>
                      Utilizamos tecnologia para democratizar o acesso à informação sobre reciclagem, tornando mais fácil para todos encontrarem pontos de coleta e aprenderem sobre práticas sustentáveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="row">
          <div className="col-12">
            <div className="card border-0 shadow-lg animate-scaleIn animate-delay-4" style={{borderRadius: '25px', background: 'linear-gradient(135deg, #10b981, #059669)', position: 'relative', overflow: 'hidden'}}>
              <div className="position-absolute" style={{top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
              <div className="position-absolute" style={{bottom: '-30px', left: '-30px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%'}}></div>
              <div className="card-body text-center text-white p-5 position-relative">
                <div className="d-inline-flex align-items-center justify-content-center mb-4 icon-float" style={{width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', backdropFilter: 'blur(10px)'}}>
                  <i className="bi bi-heart text-white icon-pulse" style={{fontSize: '2rem'}}></i>
                </div>
                <h3 className="fw-bold mb-3">Junte-se ao VerDenovo</h3>
                <p className="lead mb-5" style={{maxWidth: '600px', margin: '0 auto'}}>
                  Faça parte desta transformação! Juntos podemos construir um Barueri mais sustentável e consciente.
                </p>
                <div className="row">
                  <div className="col-md-4 mb-4">
                    <div className="p-4 rounded-4 hover-lift" style={{background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="bi bi-geo-alt icon-pulse" style={{fontSize: '3rem'}} ></i>
                      <h5 className="mt-3 fw-bold">Encontre Pontos</h5>
                      <p className="mb-0">Localize pontos de coleta próximos a você</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="p-4 rounded-4 hover-lift" style={{background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="bi bi-plus-circle icon-pulse" style={{fontSize: '3rem'}}></i>
                      <h5 className="mt-3 fw-bold">Cadastre Pontos</h5>
                      <p className="mb-0">Ajude a expandir nossa rede de coleta</p>
                    </div>
                  </div>
                  <div className="col-md-4 mb-4">
                    <div className="p-4 rounded-4 hover-lift" style={{background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)'}}>
                      <i className="bi bi-share icon-pulse" style={{fontSize: '3rem'}}></i>
                      <h5 className="mt-3 fw-bold">Compartilhe</h5>
                      <p className="mb-0">Espalhe a consciência ambiental</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Sobre;