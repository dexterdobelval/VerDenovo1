import { useEffect } from 'react';

function Conscientizacao() {
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
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-8px); }
      60% { transform: translateY(-4px); }
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
      0%, 100% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.3); }
      50% { box-shadow: 0 0 30px rgba(5, 150, 105, 0.6); }
    }
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-slideInLeft { animation: slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-slideInRight { animation: slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-scaleIn { animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-bounce { animation: bounce 2s infinite; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-glow { animation: glow 2s ease-in-out infinite; }
    .animate-rotate { animation: rotate 20s linear infinite; }
    .animate-delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
    .animate-delay-4 { animation-delay: 0.4s; animation-fill-mode: both; }
    .animate-delay-5 { animation-delay: 0.5s; animation-fill-mode: both; }
    .animate-delay-6 { animation-delay: 0.6s; animation-fill-mode: both; }
    .hover-lift { 
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
      cursor: pointer;
    }
    .hover-lift:hover { 
      transform: translateY(-8px) scale(1.02); 
      box-shadow: 0 20px 40px rgba(0,0,0,0.15); 
    }
    .hover-glow:hover {
      box-shadow: 0 0 25px rgba(5, 150, 105, 0.4);
      transform: scale(1.05);
    }
    .section-card { 
      background: rgba(255,255,255,0.95); 
      backdrop-filter: blur(10px);
      border-radius: 25px; 
      box-shadow: 0 8px 32px rgba(0,0,0,0.1); 
      border: 1px solid rgba(255,255,255,0.2); 
    }
    .icon-hover { 
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
      cursor: pointer;
    }
    .icon-hover:hover { 
      transform: scale(1.15) rotate(10deg); 
      filter: brightness(1.1);
    }
    .interactive-card {
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .interactive-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    .interactive-card:hover::before {
      left: 100%;
    }
    .interactive-card:hover {
      transform: translateY(-10px) scale(1.03);
      box-shadow: 0 25px 50px rgba(0,0,0,0.2);
    }
    .btn-interactive {
      transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      position: relative;
      overflow: hidden;
    }
    .btn-interactive:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(5, 150, 105, 0.4);
    }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <style>{animationStyles}</style>
      {/* Hero Section */}
      <div className="hero-section mb-5 position-relative overflow-hidden" style={{minHeight: '50vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)', borderRadius: '25px', padding: '4rem 2rem'}}>
        <div className="position-absolute animate-float" style={{top: '15%', right: '10%', width: '80px', height: '80px', background: 'rgba(5, 150, 105, 0.1)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-float animate-delay-2" style={{bottom: '20%', left: '5%', width: '60px', height: '60px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-rotate" style={{top: '30%', left: '15%', width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.08)', borderRadius: '50%'}}></div>
        <div className="position-absolute animate-pulse" style={{bottom: '40%', right: '20%', width: '50px', height: '50px', background: 'rgba(5, 150, 105, 0.06)', borderRadius: '50%'}}></div>
        <div className="text-center position-relative" style={{zIndex: 2}}>
          <div className="d-inline-flex align-items-center bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4 animate-fadeInUp" style={{fontSize: '0.95rem', fontWeight: '600'}}>
            <i className="bi bi-tree me-2"></i>Educação Sustentável
          </div>
          <h1 className="display-3 fw-bold mb-4 animate-fadeInUp animate-delay-1" style={{lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em'}}>
            Conscientização e <span style={{color: '#059669'}}>Educação Ambiental</span>
          </h1>
          <p className="fs-4 mb-4 text-muted animate-fadeInUp animate-delay-2" style={{lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
            Aprenda sobre práticas sustentáveis e como contribuir para um futuro mais verde
          </p>
        </div>
      </div>

      <div className="row mb-5 g-4">
        <div className="col-12">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center mb-4" 
                 style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 8px 20px rgba(5, 150, 105, 0.2)'}}>
              <i className="bi bi-lightbulb" style={{fontSize: '2rem', color: '#059669'}}></i>
            </div>
            <h2 className="fw-bold mb-3" style={{color: '#1f2937', fontSize: '1.8rem'}}>Por que a Conscientização é Importante?</h2>
            <p className="text-muted mx-auto" style={{maxWidth: '600px', lineHeight: '1.6'}}>A conscientização ambiental é o primeiro passo para transformar nossa relação com o planeta</p>
          </div>
        </div>
        <div className="col-md-6 animate-slideInLeft animate-delay-1">
          <div className="card h-100 border-0 interactive-card" style={{background: 'white', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center me-3 icon-hover" 
                     style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #dc3545, #c82333)', borderRadius: '50%'}}>
                  <i className="bi bi-exclamation-triangle" style={{fontSize: '1.2rem', color: 'white'}}></i>
                </div>
                <h4 className="fw-bold mb-0" style={{color: '#dc3545'}}>Dados Alarmantes</h4>
              </div>
              <ul className="list-unstyled mb-0">
                <li className="mb-3 d-flex align-items-start">
                  <span className="badge bg-danger bg-opacity-10 text-danger me-3 mt-1" style={{minWidth: '35px', borderRadius: '8px'}}>79M</span>
                  <span className="text-muted">toneladas de resíduos produzidos no Brasil por ano</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <span className="badge bg-danger bg-opacity-10 text-danger me-3 mt-1" style={{minWidth: '35px', borderRadius: '8px'}}>4%</span>
                  <span className="text-muted">do lixo brasileiro é reciclado</span>
                </li>
                <li className="mb-0 d-flex align-items-start">
                  <span className="badge bg-danger bg-opacity-10 text-danger me-3 mt-1" style={{minWidth: '35px', borderRadius: '8px'}}>400</span>
                  <span className="text-muted">anos para um plástico se decompor</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 animate-slideInRight animate-delay-2">
          <div className="card h-100 border-0 interactive-card" style={{background: 'white', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)'}}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-3">
                <div className="d-flex align-items-center justify-content-center me-3 icon-hover" 
                     style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '50%'}}>
                  <i className="bi bi-check-circle" style={{fontSize: '1.2rem', color: 'white'}}></i>
                </div>
                <h4 className="fw-bold mb-0" style={{color: '#059669'}}>O Poder da Mudança</h4>
              </div>
              <ul className="list-unstyled mb-0">
                <li className="mb-3 d-flex align-items-start">
                  <span className="badge bg-success bg-opacity-10 text-success me-3 mt-1" style={{minWidth: '35px', borderRadius: '8px'}}>17</span>
                  <span className="text-muted">árvores salvas por tonelada de papel reciclado</span>
                </li>
                <li className="mb-3 d-flex align-items-start">
                  <span className="badge bg-success bg-opacity-10 text-success me-3 mt-1" style={{minWidth: '35px', borderRadius: '8px'}}>95%</span>
                  <span className="text-muted">menos energia para reciclar alumínio</span>
                </li>
                <li className="mb-0 d-flex align-items-start">
                  <span className="badge bg-success bg-opacity-10 text-success me-3 mt-1" style={{minWidth: '35px', borderRadius: '8px'}}>1M+</span>
                  <span className="text-muted">empregos que a reciclagem pode gerar no Brasil</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card h-100 text-center border-0 position-relative overflow-hidden interactive-card mb-5 animate-scaleIn animate-delay-2" 
           style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
        <div className="card-body p-5">
          <div className="position-relative mb-4">
            <div className="d-inline-flex align-items-center justify-content-center position-relative icon-hover animate-glow" 
                 style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'}}>
              <i className="bi bi-play-circle animate-pulse" style={{fontSize: '3rem', color: '#059669'}}></i>
            </div>
          </div>
          <h3 className="fw-bold mb-4" style={{color: '#1f2937', fontSize: '1.8rem'}}>Vídeo Educativo</h3>
          <p className="text-muted fs-6 mb-4 fst-italic">"A Terra fornece o suficiente para satisfazer as necessidades de cada homem, mas não a ganância de cada homem." - Mahatma Gandhi</p>
          <div 
            className="btn btn-success btn-lg px-5 py-3 btn-interactive" 
            style={{borderRadius: '12px', fontWeight: '600', border: 'none', boxShadow: '0 8px 25px rgba(5, 150, 105, 0.25)', cursor: 'pointer'}}
            onClick={() => window.open('https://www.tiktok.com/@haileydollie/video/7463768126761504005', '_blank')}
          >
            <i className="bi bi-play-circle me-2"></i>Assistir Vídeo Educativo
          </div>
          <p className="text-muted mt-3 small">
            <i className="bi bi-info-circle me-1"></i>O vídeo será aberto em uma nova aba
          </p>
        </div>
        <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: 'linear-gradient(90deg, #059669, #10b981)'}}></div>
      </div>

      <div className="py-5" style={{background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', borderRadius: '30px', margin: '0 -15px'}}>
        <div className="text-center mb-5">
          <div className="badge bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-3">
            <i className="bi bi-palette me-2"></i>Coleta Seletiva
          </div>
          <h2 className="display-4 fw-bold mb-4" style={{color: '#1f2937', background: 'linear-gradient(135deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>Guia das Cores das Lixeiras</h2>
          <p className="lead text-muted fs-4 mx-auto" style={{maxWidth: '600px'}}>Conhecer as cores das lixeiras é fundamental para fazer o descarte correto</p>
        </div>
        <div className="row g-4 px-4">
          <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-1">
            <div className="card h-100 text-center border-0 position-relative overflow-hidden interactive-card" 
                 style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
              <div className="card-body p-4">
                <div className="position-relative mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center icon-hover" 
                       style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'}}>
                    <i className="bi bi-file-text" style={{fontSize: '2rem', color: '#3b82f6'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold mb-3" style={{color: '#3b82f6'}}>AZUL</h5>
                <p className="text-muted fs-6"><strong>Papel e Papelão</strong><br/>Jornais, revistas, caixas</p>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: '#3b82f6'}}></div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-2">
            <div className="card h-100 text-center border-0 position-relative overflow-hidden interactive-card" 
                 style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
              <div className="card-body p-4">
                <div className="position-relative mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center icon-hover" 
                       style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #fecaca, #fca5a5)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(220, 53, 69, 0.3)'}}>
                    <i className="bi bi-cup" style={{fontSize: '2rem', color: '#dc3545'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold mb-3" style={{color: '#dc3545'}}>VERMELHO</h5>
                <p className="text-muted fs-6"><strong>Plástico</strong><br/>Garrafas PET, embalagens</p>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: '#dc3545'}}></div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-3">
            <div className="card h-100 text-center border-0 position-relative overflow-hidden interactive-card" 
                 style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
              <div className="card-body p-4">
                <div className="position-relative mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center icon-hover" 
                       style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'}}>
                    <i className="bi bi-cup-straw" style={{fontSize: '2rem', color: '#059669'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold mb-3" style={{color: '#059669'}}>VERDE</h5>
                <p className="text-muted fs-6"><strong>Vidro</strong><br/>Garrafas, potes, frascos</p>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: '#059669'}}></div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-4">
            <div className="card h-100 text-center border-0 position-relative overflow-hidden interactive-card" 
                 style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
              <div className="card-body p-4">
                <div className="position-relative mb-3">
                  <div className="d-inline-flex align-items-center justify-content-center icon-hover" 
                       style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(255, 193, 7, 0.3)'}}>
                    <i className="bi bi-gear" style={{fontSize: '2rem', color: '#ffc107'}}></i>
                  </div>
                </div>
                <h5 className="fw-bold mb-3" style={{color: '#ffc107'}}>AMARELO</h5>
                <p className="text-muted fs-6"><strong>Metal</strong><br/>Latas de alumínio, ferro</p>
              </div>
              <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: '#ffc107'}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card h-100 border-0 position-relative overflow-hidden hover-lift mb-5 animate-scaleIn animate-delay-4" 
           style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <div className="position-relative mb-4">
              <div className="d-inline-flex align-items-center justify-content-center position-relative animate-float" 
                   style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'}}>
                <i className="bi bi-globe animate-pulse" style={{fontSize: '3rem', color: '#059669'}}></i>
              </div>
            </div>
            <h3 className="fw-bold mb-4" style={{color: '#1f2937', fontSize: '1.8rem'}}>Como a Reciclagem Ajuda o Meio Ambiente</h3>
          </div>
          <div className="row g-4">
            <div className="col-md-6 animate-slideInLeft animate-delay-1">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(25, 135, 84, 0.05)', border: '2px solid rgba(25, 135, 84, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', border: '2px solid rgba(25, 135, 84, 0.3)', boxShadow: '0 4px 15px rgba(25, 135, 84, 0.2)'}}>
                    <i className="bi bi-tree text-success" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-dark mb-2 fw-bold">Preservação de Recursos Naturais</h6>
                  <p className="text-muted small mb-0">A reciclagem reduz a necessidade de extrair matérias-primas da natureza. <strong>1 tonelada de papel reciclado</strong> evita o corte de 17 árvores.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 animate-slideInRight animate-delay-2">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(255, 193, 7, 0.05)', border: '2px solid rgba(255, 193, 7, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%', border: '2px solid rgba(255, 193, 7, 0.3)', boxShadow: '0 4px 15px rgba(255, 193, 7, 0.2)'}}>
                    <i className="bi bi-lightning text-warning" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-dark mb-2 fw-bold">Economia de Energia</h6>
                  <p className="text-muted small mb-0">Produzir materiais reciclados consome menos energia. Reciclar alumínio economiza <strong>95% da energia</strong> comparado à produção virgem.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 animate-slideInLeft animate-delay-3">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(13, 202, 240, 0.05)', border: '2px solid rgba(13, 202, 240, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #e0f2fe, #b3e5fc)', borderRadius: '50%', border: '2px solid rgba(13, 202, 240, 0.3)', boxShadow: '0 4px 15px rgba(13, 202, 240, 0.2)'}}>
                    <i className="bi bi-cloud text-info" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-dark mb-2 fw-bold">Redução de Poluição</h6>
                  <p className="text-muted small mb-0">A reciclagem diminui a emissão de gases poluentes. Cada tonelada de plástico reciclado evita <strong>2 toneladas de CO2</strong>.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 animate-slideInRight animate-delay-4">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(220, 53, 69, 0.05)', border: '2px solid rgba(220, 53, 69, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '50px', height: '50px', background: 'linear-gradient(135deg, #fecaca, #fca5a5)', borderRadius: '50%', border: '2px solid rgba(220, 53, 69, 0.3)', boxShadow: '0 4px 15px rgba(220, 53, 69, 0.2)'}}>
                    <i className="bi bi-trash text-danger" style={{fontSize: '1.5rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-dark mb-2 fw-bold">Menos Lixo nos Aterros</h6>
                  <p className="text-muted small mb-0">Materiais reciclados não vão para aterros sanitários. No Brasil, <strong>60%</strong> dos municípios ainda usam lixões inadequados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: 'linear-gradient(90deg, #059669, #10b981)'}}></div>
      </div>

      <div className="card h-100 border-0 position-relative overflow-hidden hover-lift mb-5" 
           style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
        <div className="card-body p-5">
          <div className="text-center mb-5">
            <div className="position-relative mb-4">
              <div className="d-inline-flex align-items-center justify-content-center position-relative animate-bounce" 
                   style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(255, 193, 7, 0.3)'}}>
                <i className="bi bi-arrow-repeat animate-pulse" style={{fontSize: '3rem', color: '#f59e0b'}}></i>
              </div>
            </div>
            <h3 className="fw-bold mb-4" style={{color: '#1f2937', fontSize: '1.8rem'}}>Dicas de Reutilização em Casa</h3>
            <p className="text-muted fs-6 mb-4">Antes de descartar, pense em como reutilizar! A reutilização é ainda mais eficiente que a reciclagem, pois não requer processamento industrial.</p>
          </div>
          
          <div className="row g-4 mb-4">
            <div className="col-md-6 animate-slideInLeft animate-delay-1">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(25, 135, 84, 0.05)', border: '2px solid rgba(25, 135, 84, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', border: '2px solid rgba(25, 135, 84, 0.3)', boxShadow: '0 4px 15px rgba(25, 135, 84, 0.2)'}}>
                    <i className="bi bi-cup text-success" style={{fontSize: '1.2rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-success mb-3 fw-bold">Garrafas PET</h6>
                  <ul className="list-unstyled small">
                    <li className="mb-1 text-muted">• Vasos para plantas</li>
                    <li className="mb-1 text-muted">• Organizadores de gavetas</li>
                    <li className="mb-1 text-muted">• Comedouros para animais</li>
                    <li className="mb-1 text-muted">• Porta-lápis e canetas</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 animate-slideInRight animate-delay-2">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(220, 53, 69, 0.05)', border: '2px solid rgba(220, 53, 69, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #fecaca, #fca5a5)', borderRadius: '50%', border: '2px solid rgba(220, 53, 69, 0.3)', boxShadow: '0 4px 15px rgba(220, 53, 69, 0.2)'}}>
                    <i className="bi bi-box text-danger" style={{fontSize: '1.2rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-danger mb-3 fw-bold">Caixas de Papelão</h6>
                  <ul className="list-unstyled small">
                    <li className="mb-1 text-muted">• Organizadores de armário</li>
                    <li className="mb-1 text-muted">• Brinquedos para crianças</li>
                    <li className="mb-1 text-muted">• Composteira caseira</li>
                    <li className="mb-1 text-muted">• Arquivo de documentos</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 animate-slideInLeft animate-delay-3">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(59, 130, 246, 0.05)', border: '2px solid rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '50%', border: '2px solid rgba(59, 130, 246, 0.3)', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)'}}>
                    <i className="bi bi-cup-straw text-primary" style={{fontSize: '1.2rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-primary mb-3 fw-bold">Potes de Vidro</h6>
                  <ul className="list-unstyled small">
                    <li className="mb-1 text-muted">• Porta-temperos</li>
                    <li className="mb-1 text-muted">• Luminárias decorativas</li>
                    <li className="mb-1 text-muted">• Vasos para suculentas</li>
                    <li className="mb-1 text-muted">• Porta-objetos pequenos</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 animate-slideInRight animate-delay-4">
              <div className="d-flex p-3 rounded-3 hover-lift" style={{background: 'rgba(255, 193, 7, 0.05)', border: '2px solid rgba(255, 193, 7, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="position-relative me-3 flex-shrink-0">
                  <div className="d-flex align-items-center justify-content-center icon-hover" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%', border: '2px solid rgba(255, 193, 7, 0.3)', boxShadow: '0 4px 15px rgba(255, 193, 7, 0.2)'}}>
                    <i className="bi bi-circle text-warning" style={{fontSize: '1.2rem'}}></i>
                  </div>
                </div>
                <div>
                  <h6 className="text-warning mb-3 fw-bold">Latas de Alumínio</h6>
                  <ul className="list-unstyled small">
                    <li className="mb-1 text-muted">• Porta-lápis decorativo</li>
                    <li className="mb-1 text-muted">• Vasinhos para ervas</li>
                    <li className="mb-1 text-muted">• Organizador de mesa</li>
                    <li className="mb-1 text-muted">• Luminária de mesa</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="d-flex p-4 rounded-3 animate-fadeInUp animate-delay-5" style={{background: 'rgba(25, 135, 84, 0.05)', border: '2px solid rgba(25, 135, 84, 0.2)'}}>
            <div className="position-relative me-3 flex-shrink-0">
              <div className="d-flex align-items-center justify-content-center" style={{width: '40px', height: '40px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', border: '2px solid rgba(25, 135, 84, 0.3)', boxShadow: '0 4px 15px rgba(25, 135, 84, 0.2)'}}>
                <i className="bi bi-lightbulb text-success" style={{fontSize: '1.2rem'}}></i>
              </div>
            </div>
            <div>
              <h6 className="text-success mb-2 fw-bold">Dica Importante</h6>
              <p className="text-muted small mb-0">Segundo estudos, <strong>cada família brasileira</strong> pode reduzir até <strong>30%</strong> do seu lixo doméstico apenas reutilizando materiais que normalmente descartaria. Isso representa uma economia de aproximadamente <strong>R$ 200 por ano</strong> em produtos que não precisam ser comprados!</p>
            </div>
          </div>
        </div>
        <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: 'linear-gradient(90deg, #f59e0b, #d97706)'}}></div>
      </div>
      <div className="card h-100 border-0 position-relative overflow-hidden mb-5" 
           style={{background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', borderRadius: '25px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}}>
        <div className="card-body p-5 text-center">
          <div className="position-relative mb-4">
            <div className="d-inline-flex align-items-center justify-content-center position-relative animate-float" 
                 style={{width: '100px', height: '100px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'}}>
              <i className="bi bi-graph-up animate-pulse" style={{fontSize: '3rem', color: '#059669'}}></i>
            </div>
          </div>
          <div className="d-inline-flex align-items-center bg-success bg-opacity-10 text-success px-4 py-2 rounded-pill mb-4">
            <i className="bi bi-heart me-2"></i>Impacto Positivo
          </div>
          <h3 className="fw-bold mb-5" style={{color: '#1f2937', fontSize: '2rem'}}>Juntos Podemos Fazer a Diferença</h3>
          <div className="row g-4 mb-5">
            <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-1">
              <div className="d-flex flex-column align-items-center p-4 rounded-3 hover-lift" style={{background: 'rgba(25, 135, 84, 0.05)', border: '2px solid rgba(25, 135, 84, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="d-flex align-items-center justify-content-center mb-3 icon-hover" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', border: '2px solid rgba(25, 135, 84, 0.3)', boxShadow: '0 4px 15px rgba(25, 135, 84, 0.2)'}}>
                  <i className="bi bi-tree text-success" style={{fontSize: '1.8rem'}}></i>
                </div>
                <div className="display-4 fw-bold text-success mb-2">17</div>
                <p className="text-muted small mb-0 text-center">árvores salvas por tonelada de papel</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-2">
              <div className="d-flex flex-column align-items-center p-4 rounded-3 hover-lift" style={{background: 'rgba(255, 193, 7, 0.05)', border: '2px solid rgba(255, 193, 7, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="d-flex align-items-center justify-content-center mb-3 icon-hover" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%', border: '2px solid rgba(255, 193, 7, 0.3)', boxShadow: '0 4px 15px rgba(255, 193, 7, 0.2)'}}>
                  <i className="bi bi-lightning text-warning" style={{fontSize: '1.8rem'}}></i>
                </div>
                <div className="display-4 fw-bold text-warning mb-2">95%</div>
                <p className="text-muted small mb-0 text-center">menos energia para reciclar alumínio</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-3">
              <div className="d-flex flex-column align-items-center p-4 rounded-3 hover-lift" style={{background: 'rgba(220, 53, 69, 0.05)', border: '2px solid rgba(220, 53, 69, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="d-flex align-items-center justify-content-center mb-3 icon-hover" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #fecaca, #fca5a5)', borderRadius: '50%', border: '2px solid rgba(220, 53, 69, 0.3)', boxShadow: '0 4px 15px rgba(220, 53, 69, 0.2)'}}>
                  <i className="bi bi-clock text-danger" style={{fontSize: '1.8rem'}}></i>
                </div>
                <div className="display-4 fw-bold text-danger mb-2">400</div>
                <p className="text-muted small mb-0 text-center">anos para plástico se decompor</p>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 animate-fadeInUp animate-delay-4">
              <div className="d-flex flex-column align-items-center p-4 rounded-3 hover-lift" style={{background: 'rgba(59, 130, 246, 0.05)', border: '2px solid rgba(59, 130, 246, 0.1)', transition: 'all 0.3s ease'}}>
                <div className="d-flex align-items-center justify-content-center mb-3 icon-hover" style={{width: '60px', height: '60px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '50%', border: '2px solid rgba(59, 130, 246, 0.3)', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.2)'}}>
                  <i className="bi bi-arrow-down text-primary" style={{fontSize: '1.8rem'}}></i>
                </div>
                <div className="display-4 fw-bold text-primary mb-2">30%</div>
                <p className="text-muted small mb-0 text-center">redução possível do lixo doméstico</p>
              </div>
            </div>
          </div>
          <p className="lead text-muted fst-italic animate-fadeInUp animate-delay-5" style={{maxWidth: '600px', margin: '0 auto'}}>
            "Pequenas ações, grandes transformações. Cada gesto consciente conta para um planeta mais sustentável."
          </p>
        </div>
        <div className="position-absolute bottom-0 start-0 w-100" style={{height: '5px', background: 'linear-gradient(90deg, #059669, #10b981)'}}></div>
      </div>
    </div>
  );
}

export default Conscientizacao;