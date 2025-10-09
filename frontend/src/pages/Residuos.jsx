import { useEffect } from 'react';

function Residuos() {
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
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(5, 150, 105, 0.3); }
      50% { box-shadow: 0 0 30px rgba(5, 150, 105, 0.6); }
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
    .animate-glow { animation: glow 2s ease-in-out infinite; }
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
      backdrop-filter: blur(10px);
      border-radius: 25px;
      border: 1px solid rgba(255,255,255,0.2);
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    .icon-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      margin: 0 auto 1rem;
    }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const residuosComuns = [
    {
      id: 1,
      nome: "Resíduos Orgânicos",
      cor: "bg-success",
      icone: "bi-flower1",
      exemplos: ["Restos de comida", "Cascas de frutas", "Folhas", "Galhos", "Borra de café"],
      tempoDecomposicao: "2 semanas a 6 meses",
      tratamento: "Compostagem doméstica ou industrial",
      cuidados: ["Separar de outros resíduos", "Evitar carnes e laticínios na compostagem"]
    },
    {
      id: 2,
      nome: "Resíduos Secos",
      cor: "bg-info",
      icone: "bi-box",
      exemplos: ["Papel limpo", "Plástico", "Vidro", "Metal", "Embalagens"],
      tempoDecomposicao: "Varia por material",
      tratamento: "Coleta seletiva e reciclagem",
      cuidados: ["Limpar antes do descarte", "Separar por tipo de material"]
    }
  ];

  const residuosEspeciais = [
    {
      id: 1,
      nome: "Eletrônicos",
      cor: "bg-primary",
      icone: "bi-phone",
      exemplos: ["Celulares", "Computadores", "TVs", "Pilhas", "Baterias"],
      perigos: "Metais pesados tóxicos",
      tratamento: "Pontos de coleta especializados",
      cuidados: ["Nunca descartar no lixo comum", "Procurar fabricantes ou lojas"]
    },
    {
      id: 2,
      nome: "Medicamentos",
      cor: "bg-danger",
      icone: "bi-capsule",
      exemplos: ["Comprimidos vencidos", "Xaropes", "Pomadas", "Injeções", "Termômetros"],
      perigos: "Contaminação do solo e água",
      tratamento: "Farmácias e postos de saúde",
      cuidados: ["Manter na embalagem original", "Não jogar no vaso sanitário"]
    },
    {
      id: 3,
      nome: "Óleo de Cozinha",
      cor: "bg-warning",
      icone: "bi-droplet-fill",
      exemplos: ["Óleo de fritura", "Gordura animal", "Azeite usado", "Margarina"],
      perigos: "Entupimento de tubulações, poluição da água",
      tratamento: "Pontos de coleta para produção de biodiesel",
      cuidados: ["Armazenar em recipiente fechado", "Nunca despejar no ralo"]
    },
    {
      id: 4,
      nome: "Lâmpadas",
      cor: "bg-secondary",
      icone: "bi-lightbulb",
      exemplos: ["Fluorescentes", "LED", "Halógenas", "Incandescentes"],
      perigos: "Mercúrio e outros metais pesados",
      tratamento: "Lojas de materiais elétricos",
      cuidados: ["Embalar com cuidado", "Não quebrar antes do descarte"]
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
            <i className="bi bi-trash me-2"></i>Gestão de Resíduos
          </div>
          <h1 className="display-3 fw-bold mb-4 animate-fadeInUp animate-delay-1" style={{lineHeight: '1.1', color: '#1e293b', letterSpacing: '-0.02em'}}>
            Resíduos <span style={{color: '#059669'}}>Comuns e Especiais</span>
          </h1>
          <p className="fs-4 mb-4 text-muted animate-fadeInUp animate-delay-2" style={{lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
            Aprenda a identificar e descartar corretamente diferentes tipos de resíduos
          </p>
        </div>
      </div>

      {/* Resíduos Comuns */}
      <div className="mb-5">
        <h2 className="text-success mb-4 animate-slideInLeft animate-delay-2">
          <i className="bi bi-house me-2"></i>
          Resíduos Comuns
        </h2>
        <div className="row">
          {residuosComuns.map((residuo, index) => (
            <div key={residuo.id} className="col-lg-6 mb-4">
              <div className={`modern-card h-100 interactive-card animate-scaleIn animate-delay-${(index % 2) + 1}`} style={{border: 'none', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', backdropFilter: 'blur(15px)', boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'}}>

                <div className="position-relative p-0">
                  {/* Imagem do Card */}
                  <div className="position-relative mb-4" style={{height: '200px', borderRadius: '25px 25px 0 0', overflow: 'hidden'}}>
                    <img 
                      src={residuo.id === 1 ? 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=300&fit=crop&crop=center' : 'https://imgs.search.brave.com/uG1QTvDi1-WH6Vha0Fd9ula3fpuGJJkIAXIQLiUfjbg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIx/MDkyMDg1Ni9wdC9m/b3RvL2hlYXAtb2Yt/d2FzdGUtY2FyZGJv/YXJkLWF0LXJlY3lj/bGluZy1jZW50ZXIu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PWk5VC01bmhxbVlI/OUlrdTZPa1J5RnFI/a1NTTkg5akgzTWlV/NUxrQ3NuU2M9'}
                      alt={residuo.nome}
                      className="w-100 h-100"
                      style={{objectFit: 'cover', filter: 'brightness(0.8)'}}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))'}}></div>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className={`d-flex align-items-center justify-content-center icon-hover`} style={{width: '80px', height: '80px', background: residuo.cor === 'bg-success' ? 'linear-gradient(135deg, #059669, #10b981)' : 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '50%', color: 'white', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', border: '4px solid rgba(255,255,255,0.3)'}}>
                        <i className={`bi ${residuo.icone}`} style={{fontSize: '2rem'}}></i>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="text-center mb-4">
                      <h4 className="fw-bold mb-2" style={{color: '#1f2937', fontSize: '1.5rem'}}>{residuo.nome}</h4>
                      <div className="badge" style={{background: residuo.cor === 'bg-success' ? 'rgba(5,150,105,0.1)' : 'rgba(14,165,233,0.1)', color: residuo.cor === 'bg-success' ? '#059669' : '#0ea5e9', fontSize: '0.8rem', padding: '6px 16px', borderRadius: '20px'}}>Resíduo Comum</div>
                    </div>

                    <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%'}}>
                        <i className="bi bi-check-circle" style={{fontSize: '0.8rem', color: '#059669'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#059669'}}>Exemplos</h6>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {residuo.exemplos.map((exemplo, index) => (
                        <span key={index} className="badge" style={{background: 'rgba(5, 150, 105, 0.1)', color: '#059669', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500'}}>
                          {exemplo}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', borderRadius: '50%'}}>
                        <i className="bi bi-clock" style={{fontSize: '0.8rem', color: '#3b82f6'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#3b82f6'}}>Decomposição</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.tempoDecomposicao}</p>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', borderRadius: '50%'}}>
                        <i className="bi bi-gear" style={{fontSize: '0.8rem', color: '#6366f1'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#6366f1'}}>Tratamento</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.tratamento}</p>
                  </div>

                  <div className="mb-0">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%'}}>
                        <i className="bi bi-exclamation-triangle" style={{fontSize: '0.8rem', color: '#f59e0b'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#f59e0b'}}>Cuidados</h6>
                    </div>
                    <ul className="mb-0" style={{paddingLeft: '32px', listStyle: 'none'}}>
                      {residuo.cuidados.map((cuidado, index) => (
                        <li key={index} className="text-muted mb-1" style={{position: 'relative', paddingLeft: '16px'}}>
                          <span style={{position: 'absolute', left: '0', top: '8px', width: '4px', height: '4px', background: '#f59e0b', borderRadius: '50%'}}></span>
                          {cuidado}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                  <div className="position-absolute bottom-0 start-0 w-100" style={{height: '4px', background: residuo.cor === 'bg-success' ? 'linear-gradient(90deg, #059669, #10b981)' : 'linear-gradient(90deg, #0ea5e9, #0284c7)', borderRadius: '0 0 25px 25px'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resíduos Especiais */}
      <div className="mb-5">
        <h2 className="text-danger mb-4 animate-slideInLeft animate-delay-3">
          <i className="bi bi-exclamation-triangle me-2"></i>
          Resíduos Especiais
        </h2>
        <div className="row">
          {residuosEspeciais.map((residuo, index) => (
            <div key={residuo.id} className="col-lg-6 mb-4">
              <div className={`modern-card h-100 interactive-card animate-scaleIn animate-delay-${(index % 4) + 1}`} style={{border: 'none', overflow: 'hidden', background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))', backdropFilter: 'blur(15px)', boxShadow: '0 20px 40px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)'}}>

                <div className="position-relative p-0">
                  {/* Imagem do Card */}
                  <div className="position-relative mb-4" style={{height: '200px', borderRadius: '25px 25px 0 0', overflow: 'hidden'}}>
                    <img 
                      src={residuo.id === 1 ? 'https://imgs.search.brave.com/C6WOmHk4e2ZHzJhrNmUTtO1u6Qw8JruUayQmtMWtvVQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9yZXZp/c3RhdmVydGljYWwu/Y29tLmJyL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDI1LzAzL2Rl/c2NhcnRlLWRvLWxp/eG8tZWxldHJvbmlj/by5qcGc' : residuo.id === 2 ? 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=300&fit=crop&crop=center' : residuo.id === 3 ? 'https://imgs.search.brave.com/CjclWSFPglN69M7PLwzi08za-G_Hkdlzd4GhofZSe9M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bm90aWNpYXN1c3Rl/bnRhdmVsLmNvbS5i/ci93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8xMC9vbGVvY296/aW5oYV9ucy5qcGc' : 'https://imgs.search.brave.com/fyY48DqQBcDclb9jf_t6BV7n1cRfBTPmSXJSI_Epbhc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wb3J0/YWxyZXNpZHVvc3Nv/bGlkb3MuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE0LzAz/L1BSUy1BUlRJR09T/LVRFQ05JQ09TLmpw/Zw'}
                      alt={residuo.nome}
                      className="w-100 h-100"
                      style={{objectFit: 'cover', filter: 'brightness(0.7)'}}
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: residuo.cor === 'bg-primary' ? 'linear-gradient(135deg, rgba(59,130,246,0.4), rgba(0,0,0,0.2))' : residuo.cor === 'bg-danger' ? 'linear-gradient(135deg, rgba(220,38,38,0.4), rgba(0,0,0,0.2))' : residuo.cor === 'bg-warning' ? 'linear-gradient(135deg, rgba(245,158,11,0.4), rgba(0,0,0,0.2))' : 'linear-gradient(135deg, rgba(107,114,128,0.4), rgba(0,0,0,0.2))'}}></div>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center">
                      <div className={`d-flex align-items-center justify-content-center icon-hover`} style={{width: '80px', height: '80px', background: residuo.cor === 'bg-primary' ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : residuo.cor === 'bg-danger' ? 'linear-gradient(135deg, #dc2626, #b91c1c)' : residuo.cor === 'bg-warning' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'linear-gradient(135deg, #6b7280, #4b5563)', borderRadius: '50%', color: 'white', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', border: '4px solid rgba(255,255,255,0.3)'}}>
                        <i className={`bi ${residuo.icone}`} style={{fontSize: '2rem'}}></i>
                      </div>
                    </div>
                    <div className="position-absolute top-3 end-3">
                      <div className="badge animate-pulse" style={{background: 'rgba(220,38,38,0.9)', color: 'white', fontSize: '0.75rem', padding: '6px 12px', borderRadius: '20px', boxShadow: '0 4px 12px rgba(220,38,38,0.3)'}}>⚠️ Especial</div>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <div className="text-center mb-4">
                      <h4 className="fw-bold mb-2" style={{color: '#1f2937', fontSize: '1.5rem'}}>{residuo.nome}</h4>
                    </div>

                    <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)', borderRadius: '50%'}}>
                        <i className="bi bi-check-circle" style={{fontSize: '0.8rem', color: '#059669'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#059669'}}>Exemplos</h6>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {residuo.exemplos.map((exemplo, index) => (
                        <span key={index} className="badge" style={{background: 'rgba(5, 150, 105, 0.1)', color: '#059669', padding: '6px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '500'}}>
                          {exemplo}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #fecaca, #fca5a5)', borderRadius: '50%'}}>
                        <i className="bi bi-shield-exclamation" style={{fontSize: '0.8rem', color: '#dc2626'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#dc2626'}}>Perigos</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.perigos}</p>
                  </div>

                  <div className="mb-4">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #e0e7ff, #c7d2fe)', borderRadius: '50%'}}>
                        <i className="bi bi-geo-alt" style={{fontSize: '0.8rem', color: '#6366f1'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#6366f1'}}>Onde Descartar</h6>
                    </div>
                    <p className="mb-0 text-muted" style={{paddingLeft: '32px'}}>{residuo.tratamento}</p>
                  </div>

                  <div className="mb-0">
                    <div className="d-flex align-items-center mb-2">
                      <div className="d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', background: 'linear-gradient(135deg, #fef3c7, #fde68a)', borderRadius: '50%'}}>
                        <i className="bi bi-exclamation-triangle" style={{fontSize: '0.8rem', color: '#f59e0b'}}></i>
                      </div>
                      <h6 className="fw-bold mb-0" style={{color: '#f59e0b'}}>Cuidados</h6>
                    </div>
                    <ul className="mb-0" style={{paddingLeft: '32px', listStyle: 'none'}}>
                      {residuo.cuidados.map((cuidado, index) => (
                        <li key={index} className="text-muted mb-1" style={{position: 'relative', paddingLeft: '16px'}}>
                          <span style={{position: 'absolute', left: '0', top: '8px', width: '4px', height: '4px', background: '#f59e0b', borderRadius: '50%'}}></span>
                          {cuidado}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                  <div className="position-absolute bottom-0 start-0 w-100" style={{height: '4px', background: residuo.cor === 'bg-primary' ? 'linear-gradient(90deg, #3b82f6, #2563eb)' : residuo.cor === 'bg-danger' ? 'linear-gradient(90deg, #dc2626, #b91c1c)' : residuo.cor === 'bg-warning' ? 'linear-gradient(90deg, #f59e0b, #d97706)' : 'linear-gradient(90deg, #6b7280, #4b5563)', borderRadius: '0 0 25px 25px'}}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dicas Gerais */}
      <div className="row">
        <div className="col-12">
          <div className="modern-card text-center interactive-card animate-scaleIn animate-delay-4" style={{background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white'}}>
            <div className="card-body p-5">
              <div className="icon-circle mx-auto mb-4" style={{background: 'rgba(255,255,255,0.2)', color: 'white'}}>
                <i className="bi bi-lightbulb"></i>
              </div>
              <h3 className="mb-4">Dicas Importantes</h3>
              <div className="row mt-4">
                <div className="col-md-4 mb-4">
                  <div className="icon-circle mx-auto mb-3" style={{background: 'rgba(255,255,255,0.15)', color: 'white'}}>
                    <i className="bi bi-shield-check"></i>
                  </div>
                  <h5>Segurança Primeiro</h5>
                  <p className="mb-0">Sempre use equipamentos de proteção ao manusear resíduos especiais</p>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="icon-circle mx-auto mb-3" style={{background: 'rgba(255,255,255,0.15)', color: 'white'}}>
                    <i className="bi bi-geo-alt"></i>
                  </div>
                  <h5>Pontos Especializados</h5>
                  <p className="mb-0">Procure pontos de coleta específicos para cada tipo de resíduo especial</p>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="icon-circle mx-auto mb-3" style={{background: 'rgba(255,255,255,0.15)', color: 'white'}}>
                    <i className="bi bi-people"></i>
                  </div>
                  <h5>Conscientização</h5>
                  <p className="mb-0">Eduque familiares e amigos sobre o descarte correto de resíduos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Residuos;