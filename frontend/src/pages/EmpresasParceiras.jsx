import { useState, useEffect } from 'react';
import { database } from '../services/database';
import { useAuth } from '../contexts/AuthContext';

function EmpresasParceiras() {
  const { usuario } = useAuth();
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [empresas, setEmpresas] = useState([]);

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
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes modalSlideIn {
      from { opacity: 0; transform: scale(0.8) translateY(-20px); }
      to { opacity: 1; transform: scale(1) translateY(0); }
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
    .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
    .animate-slideInRight { animation: slideInRight 0.6s ease-out; }
    .animate-scaleIn { animation: scaleIn 0.5s ease-out; }
    .animate-delay-1 { animation-delay: 0.1s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.3s; animation-fill-mode: both; }
    .hover-lift { transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .hover-lift:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 40px rgba(0,0,0,0.15); }
    .text-purple { color: #8b5cf6; }
    .hover-button { transition: all 0.3s ease; }
    .hover-button:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4); }
    .shimmer-effect { position: relative; overflow: hidden; }
    .shimmer-effect::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent); animation: shimmer 2s infinite; }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
    carregarEmpresas();
  }, []);
  
  const carregarEmpresas = () => {
    try {
      const empresasData = database.listarEmpresas();
      setEmpresas(empresasData.filter(e => e.ativo !== false));
    } catch (error) {
      console.error('Erro ao carregar empresas:', error);
    }
  };

  const acessarEmpresa = (empresa) => {
    setEmpresaSelecionada(empresa);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setEmpresaSelecionada(null);
  };

  const excluirEmpresa = (empresaId) => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa?')) {
      setEmpresas(empresas.filter(e => e.id !== empresaId));
      alert('Empresa excluída com sucesso!');
    }
  };

  return (
    <div className="empresas-parceiras-page" style={{background: '#ffffff', minHeight: '100vh', padding: '2rem 0'}}>
      <style>{animationStyles}</style>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-4 animate-fadeInUp">
              <div>
                <h1 className="display-5 fw-bold text-success mb-2 animate-slideInLeft">
                  Empresas Parceiras
                </h1>
                <p className="text-muted mb-0 animate-fadeIn animate-delay-1">Conheça as empresas comprometidas com a sustentabilidade</p>
              </div>
              <div className="d-flex align-items-center gap-3 animate-fadeIn animate-delay-2">
                <div className="bg-light rounded-pill px-3 py-2">
                  <small className="text-muted fw-medium">
                    <i className="bi bi-building text-success me-1"></i>
                    {empresas.length} empresas ativas
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
          {empresas.map((empresa, index) => (
            <div key={empresa.id} className="col-lg-6 col-xl-4">
              <div className={`card border-0 shadow-lg position-relative overflow-hidden hover-lift animate-scaleIn h-100`} style={{borderRadius: '25px', background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)', backdropFilter: 'blur(15px)', boxShadow: '0 15px 35px rgba(0,0,0,0.12), 0 5px 15px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.2)', transition: 'all 0.4s ease', minHeight: '450px', animationDelay: `${index * 0.08}s`}}>
                <div className="position-absolute top-0 end-0 m-3">
                  <div className="d-flex align-items-center bg-success bg-opacity-10 rounded-pill px-3 py-1" style={{backdropFilter: 'blur(10px)'}}>
                    <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px', animation: 'pulse 2s infinite'}}></div>
                    <small className="text-success fw-bold">Ativa</small>
                  </div>
                </div>
                
                <div className="card-body p-4 d-flex flex-column" style={{height: '380px'}}>
                  <div className="d-flex align-items-start mb-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{
                      width: '60px',
                      height: '60px',
                      background: empresa.imagemEmpresa ? 'transparent' : 'linear-gradient(135deg, #059669, #10b981)',
                      boxShadow: '0 8px 20px rgba(16, 185, 129, 0.3)',
                      overflow: 'hidden'
                    }}>
                      {empresa.imagemEmpresa ? (
                        <img 
                          src={empresa.imagemEmpresa} 
                          alt={empresa.nome || empresa.nomeEmpresa}
                          style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        />
                      ) : (
                        <i className="bi bi-building text-white" style={{fontSize: '1.5rem'}}></i>
                      )}
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="card-title mb-1 text-dark fw-bold" style={{fontSize: '1.1rem'}}>{empresa.nome || empresa.nomeEmpresa}</h5>
                      <div className="d-inline-flex align-items-center px-2 py-1 rounded-pill" style={{
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.2)'
                      }}>
                        <i className="bi bi-briefcase text-success me-1" style={{fontSize: '0.8rem'}}></i>
                        <small className="text-success fw-medium">{empresa.setor || 'Parceira'}</small>
                      </div>
                    </div>
                  </div>
                
                  <div className="mb-4">
                    <div className="row g-2">
                      <div className="col-12">
                        <div className="d-flex align-items-center p-2 rounded-3" style={{background: 'rgba(16, 185, 129, 0.05)'}}>
                          <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', minWidth: '24px'}}>
                            <i className="bi bi-geo-alt text-white" style={{fontSize: '0.8rem'}}></i>
                          </div>
                          <small className="text-dark fw-medium">{empresa.cidade}</small>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="d-flex align-items-center p-2 rounded-3" style={{background: 'rgba(59, 130, 246, 0.05)'}}>
                          <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-2" style={{width: '24px', height: '24px', minWidth: '24px'}}>
                            <i className="bi bi-telephone text-white" style={{fontSize: '0.8rem'}}></i>
                          </div>
                          <small className="text-dark">Contato</small>
                        </div>
                      </div>

                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="small text-muted mb-0" style={{lineHeight: '1.5'}}>{empresa.descricao}</p>
                  </div>
                
                  <div className="mt-auto">
                    <div className="d-grid gap-2">
                      <button 
                        className="btn btn-success position-relative overflow-hidden" 
                        onClick={() => acessarEmpresa(empresa)}
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
      </div>

      {/* Modal */}
      {mostrarModal && empresaSelecionada && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.4)', animation: 'fadeInUp 0.4s ease-out'}}>
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{borderRadius: '25px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', animation: 'modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'}}>
              <div className="modal-header position-relative overflow-hidden" style={{background: 'linear-gradient(135deg, #059669, #10b981)', borderRadius: '25px 25px 0 0', padding: '2rem'}}>
                <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                <div className="d-flex align-items-center position-relative">
                  <div className="rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', minWidth: '60px'}}>
                    {empresaSelecionada.imagemEmpresa ? (
                      <img 
                        src={empresaSelecionada.imagemEmpresa} 
                        alt={empresaSelecionada.nome || empresaSelecionada.nomeEmpresa}
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
                    <h4 className="modal-title text-white mb-1 fw-bold">{empresaSelecionada.nome || empresaSelecionada.nomeEmpresa}</h4>
                    <p className="text-white-50 mb-0">
                      <i className="bi bi-briefcase me-2"></i>{empresaSelecionada.setor}
                    </p>
                  </div>
                </div>
                <button type="button" className="btn-close btn-close-white position-relative" onClick={fecharModal} style={{fontSize: '1.2rem'}}></button>
              </div>
              <div className="modal-body p-0">
                {/* Status Cards */}
                <div className="p-4 border-bottom" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))'}}>
                  <div className="row g-3">
                    <div className="col-md-6" style={{animation: 'slideInUp 0.6s ease-out 0.1s both'}}>
                      <div className="text-center p-3 rounded-4" style={{background: 'rgba(16, 185, 129, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'}}>
                        <div className="bg-success mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px', borderRadius: '50%'}}>
                          <i className="bi bi-check-circle-fill text-white" style={{fontSize: '1.5rem'}}></i>
                        </div>
                        <h6 className="text-success fw-bold mb-1">Status</h6>
                        <small className="text-success">Parceira Ativa</small>
                      </div>
                    </div>
                    <div className="col-md-6" style={{animation: 'slideInUp 0.6s ease-out 0.2s both'}}>
                      <div className="text-center p-3 rounded-4" style={{background: 'rgba(59, 130, 246, 0.1)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease'}}>
                        <div className="bg-primary mx-auto mb-2 d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px', borderRadius: '50%'}}>
                          <i className="bi bi-briefcase-fill text-white" style={{fontSize: '1.5rem'}}></i>
                        </div>
                        <h6 className="text-primary fw-bold mb-1">Setor</h6>
                        <small className="text-primary">{empresaSelecionada.setor}</small>
                      </div>
                    </div>

                  </div>
                </div>
                
                <div className="p-4">
                  <div className="row g-4">
                    <div className="col-lg-6" style={{animation: 'slideInLeft 0.7s ease-out 0.4s both'}}>
                      <div className="h-100 p-4 rounded-4" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
                        <h5 className="text-success fw-bold mb-4 d-flex align-items-center">
                          <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px'}}>
                            <i className="bi bi-person-lines-fill text-white" style={{fontSize: '1.2rem'}}></i>
                          </div>
                          Informações de Contato
                        </h5>
                        
                        <div className="space-y-3">
                          <div className="d-flex align-items-start p-3 rounded-3" style={{background: 'rgba(16, 185, 129, 0.05)', transition: 'all 0.3s ease'}}>
                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '40px', height: '40px'}}>
                              <i className="bi bi-house-door text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-dark">Endereço</h6>
                              <p className="text-muted mb-0">{empresaSelecionada.endereco}</p>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-start p-3 rounded-3" style={{background: 'rgba(59, 130, 246, 0.05)', transition: 'all 0.3s ease'}}>
                            <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '40px', height: '40px'}}>
                              <i className="bi bi-geo-alt text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-dark">Cidade</h6>
                              <p className="text-muted mb-0">{empresaSelecionada.cidade}</p>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-start p-3 rounded-3" style={{background: 'rgba(168, 85, 247, 0.05)', transition: 'all 0.3s ease'}}>
                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '40px', height: '40px', backgroundColor: '#a855f7'}}>
                              <i className="bi bi-telephone text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-dark">Telefone</h6>
                              <p className="text-muted mb-0">{empresaSelecionada.telefone}</p>
                            </div>
                          </div>
                          
                          <div className="d-flex align-items-start p-3 rounded-3" style={{background: 'rgba(245, 158, 11, 0.05)', transition: 'all 0.3s ease'}}>
                            <div className="rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{width: '40px', height: '40px', backgroundColor: '#f59e0b'}}>
                              <i className="bi bi-envelope text-white" style={{fontSize: '1.1rem'}}></i>
                            </div>
                            <div>
                              <h6 className="fw-bold mb-1 text-dark">Email</h6>
                              <p className="text-muted mb-0">{empresaSelecionada.email}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="col-lg-6" style={{animation: 'slideInRight 0.7s ease-out 0.5s both'}}>
                      <div className="h-100 p-4 rounded-4" style={{background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
                        <h5 className="text-success fw-bold mb-4 d-flex align-items-center">
                          <div className="rounded-circle bg-success d-flex align-items-center justify-content-center me-3" style={{width: '45px', height: '45px'}}>
                            <i className="bi bi-info-circle text-white" style={{fontSize: '1.2rem'}}></i>
                          </div>
                          Sobre a Empresa
                        </h5>
                        
                        <div className="mb-4 p-3 rounded-3" style={{background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02))', border: '1px solid rgba(16, 185, 129, 0.1)'}}>
                          <h6 className="text-success fw-bold mb-2">Descrição</h6>
                          <p className="text-muted mb-0" style={{lineHeight: '1.6'}}>{empresaSelecionada.descricao}</p>
                        </div>
                        

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-0 p-4" style={{background: 'rgba(248, 250, 252, 0.8)', borderRadius: '0 0 25px 25px', animation: 'slideInUp 0.6s ease-out 0.6s both'}}>
                <div className="d-flex gap-3 w-100">
                  <button 
                    type="button" 
                    className="btn btn-outline-success flex-fill hover-button" 
                    onClick={() => window.open(`mailto:${empresaSelecionada.email}`)}
                    style={{borderRadius: '15px', padding: '12px', fontWeight: '600', border: '2px solid #10b981', transition: 'all 0.3s ease'}}
                  >
                    <i className="bi bi-envelope me-2"></i>Entrar em Contato
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
  );
}

export default EmpresasParceiras;