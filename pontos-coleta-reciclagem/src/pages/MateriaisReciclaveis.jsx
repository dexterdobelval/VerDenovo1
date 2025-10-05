import { useEffect } from 'react';

function MateriaisReciclaveis() {
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
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
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
    .animate-rotate { animation: rotate 20s linear infinite; }
    .animate-pulse { animation: pulse 2s ease-in-out infinite; }
    .animate-delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
    .animate-delay-4 { animation-delay: 0.4s; animation-fill-mode: both; }
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
    .icon-hover { 
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); 
      cursor: pointer;
    }
    .icon-hover:hover { 
      transform: scale(1.15) rotate(10deg); 
      filter: brightness(1.1);
    }
    .modern-card {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(15px);
      border-radius: 25px;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const materiais = [
    {
      id: 1,
      nome: "Papel",
      cor: "bg-primary",
      icone: "bi-file-text",
      exemplos: ["Jornais", "Revistas", "Papelão", "Papel de escritório", "Caixas"],
      tempoDecomposicao: "3 a 6 meses",
      beneficios: "Economiza água e energia, reduz desmatamento",
      naoReciclar: ["Papel higiênico", "Guardanapos sujos", "Papel carbono"]
    },
    {
      id: 2,
      nome: "Plástico",
      cor: "bg-danger",
      icone: "bi-cup-straw",
      exemplos: ["Garrafas PET", "Embalagens", "Sacolas", "Potes", "Tampas"],
      tempoDecomposicao: "100 a 400 anos",
      beneficios: "Reduz poluição dos oceanos, economiza petróleo",
      naoReciclar: ["Plásticos sujos", "Isopor", "Plástico filme"]
    },
    {
      id: 3,
      nome: "Vidro",
      cor: "bg-success",
      icone: "bi-cup",
      exemplos: ["Garrafas", "Potes", "Frascos", "Copos", "Janelas"],
      tempoDecomposicao: "Mais de 1000 anos",
      beneficios: "100% reciclável, economiza energia e matéria-prima",
      naoReciclar: ["Espelhos", "Lâmpadas", "Vidros temperados", "Cristal"]
    },
    {
      id: 4,
      nome: "Metal",
      cor: "bg-warning",
      icone: "bi-gear",
      exemplos: ["Latas de alumínio", "Latas de aço", "Tampas", "Arames", "Pregos"],
      tempoDecomposicao: "10 a 100 anos",
      beneficios: "Economiza energia, reduz mineração",
      naoReciclar: ["Latas de tinta", "Aerossóis", "Materiais contaminados"]
    }
  ];

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
            <i className="bi bi-recycle me-2"></i>Materiais Sustentáveis
          </div>
          <h1 className="display-3 fw-bold mb-4 animate-fadeInUp animate-delay-1" style={{lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em'}}>
            Materiais <span style={{color: '#059669'}}>Recicláveis</span>
          </h1>
          <p className="fs-4 mb-4 text-muted animate-fadeInUp animate-delay-2" style={{lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
            Conheça os principais tipos de materiais recicláveis e como descartá-los corretamente
          </p>
        </div>
      </div>

      <div className="row">
        {materiais.map((material, index) => (
          <div key={material.id} className="col-lg-6 mb-4">
            <div className={`modern-card h-100 interactive-card animate-scaleIn animate-delay-${(index % 4) + 1}`} style={{border: 'none', overflow: 'hidden'}}>
              <div className="position-relative p-5">
                <div className="d-flex align-items-center mb-4">
                  <div className={`d-flex align-items-center justify-content-center me-4 icon-hover`} style={{width: '70px', height: '70px', background: material.cor === 'bg-primary' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : material.cor === 'bg-danger' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : material.cor === 'bg-success' ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', color: 'white', boxShadow: material.cor === 'bg-primary' ? '0 10px 25px rgba(59,130,246,0.3)' : material.cor === 'bg-danger' ? '0 10px 25px rgba(220,38,38,0.3)' : material.cor === 'bg-success' ? '0 10px 25px rgba(5,150,105,0.3)' : '0 10px 25px rgba(245,158,11,0.3)', border: '3px solid rgba(255,255,255,0.3)'}}>
                    <i className={`bi ${material.icone}`} style={{fontSize: '1.8rem'}}></i>
                  </div>
                  <div>
                    <h4 className="fw-bold mb-1" style={{color: '#1f2937', fontSize: '1.4rem'}}>{material.nome}</h4>
                    <div className="badge" style={{background: 'rgba(5,150,105,0.1)', color: '#059669', fontSize: '0.75rem', padding: '4px 12px', borderRadius: '20px'}}>♻️ Reciclável</div>
                  </div>
                </div>

                <div className="mb-4 p-3" style={{background: 'rgba(5,150,105,0.03)', borderRadius: '16px', border: '1px solid rgba(5,150,105,0.1)'}}>
                  <div className="d-flex align-items-center mb-3">
                    <div className="d-flex align-items-center justify-content-center me-3 icon-hover" style={{width: '32px', height: '32px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%', boxShadow: '0 4px 12px rgba(5,150,105,0.2)'}}>
                      <i className="bi bi-check-circle" style={{fontSize: '1rem', color: '#059669'}}></i>
                    </div>
                    <h6 className="fw-bold mb-0" style={{color: '#059669', fontSize: '1.1rem'}}>✨ Exemplos</h6>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    {material.exemplos.map((exemplo, index) => (
                      <span key={index} className="badge" style={{background: 'linear-gradient(135deg, rgba(5,150,105,0.1), rgba(16,185,129,0.1))', color: '#059669', padding: '8px 16px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', border: '1px solid rgba(5,150,105,0.2)', boxShadow: '0 2px 8px rgba(5,150,105,0.1)'}}>
                        {exemplo}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-danger mb-2">
                    <i className="bi bi-clock me-2"></i>Decomposição
                  </h6>
                  <p className="mb-0 text-muted">{material.tempoDecomposicao}</p>
                </div>

                <div className="mb-3">
                  <h6 className="text-success mb-2">
                    <i className="bi bi-leaf me-2"></i>Benefícios
                  </h6>
                  <p className="mb-0 text-muted">{material.beneficios}</p>
                </div>

                <div className="mb-0">
                  <h6 className="text-warning mb-2">
                    <i className="bi bi-x-circle me-2"></i>Não Reciclar
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {material.naoReciclar.map((item, index) => (
                      <span key={index} className="badge" style={{background: 'rgba(245,158,11,0.1)', color: '#f59e0b', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem'}}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* Dicas Gerais */}
      <div className="row mt-5">
        <div className="col-12">
          <div className="modern-card text-center interactive-card animate-scaleIn animate-delay-4" style={{background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white'}}>
            <div className="card-body p-5">
              <div className="d-inline-flex align-items-center justify-content-center position-relative animate-pulse" 
                   style={{width: '100px', height: '100px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', boxShadow: '0 10px 30px rgba(255,255,255,0.3)', marginBottom: '2rem'}}>
                <i className="bi bi-lightbulb" style={{fontSize: '3rem', color: 'white'}}></i>
              </div>
              <h3 className="fw-bold mb-5" style={{fontSize: '2rem'}}>Dicas Importantes</h3>
              <div className="row mt-4">
                <div className="col-md-4 mb-4 animate-fadeInUp animate-delay-1">
                  <div className="d-inline-flex align-items-center justify-content-center mb-3 icon-hover" style={{width: '60px', height: '60px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%'}}>
                    <i className="bi bi-droplet" style={{fontSize: '1.8rem', color: 'white'}}></i>
                  </div>
                  <h5 className="fw-bold mb-3">Limpe os Materiais</h5>
                  <p className="mb-0">Lave embalagens antes de descartar para facilitar a reciclagem</p>
                </div>
                <div className="col-md-4 mb-4 animate-fadeInUp animate-delay-2">
                  <div className="d-inline-flex align-items-center justify-content-center mb-3 icon-hover" style={{width: '60px', height: '60px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%'}}>
                    <i className="bi bi-arrow-down-up" style={{fontSize: '1.8rem', color: 'white'}}></i>
                  </div>
                  <h5 className="fw-bold mb-3">Separe Corretamente</h5>
                  <p className="mb-0">Use as cores corretas: azul (papel), vermelho (plástico), verde (vidro), amarelo (metal)</p>
                </div>
                <div className="col-md-4 mb-4 animate-fadeInUp animate-delay-3">
                  <div className="d-inline-flex align-items-center justify-content-center mb-3 icon-hover" style={{width: '60px', height: '60px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%'}}>
                    <i className="bi bi-geo-alt" style={{fontSize: '1.8rem', color: 'white'}}></i>
                  </div>
                  <h5 className="fw-bold mb-3">Encontre Pontos de Coleta</h5>
                  <p className="mb-0">Use nosso sistema para localizar pontos de coleta próximos a você</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MateriaisReciclaveis;