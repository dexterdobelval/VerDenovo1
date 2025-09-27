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
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-60px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-slideInLeft { animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-scaleIn { animation: scaleIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-delay-1 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.4s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.6s; animation-fill-mode: both; }
  `;

  useEffect(() => {
    const empresasCadastradas = database.listarEmpresas();
    const empresasExemplo = [
    {
      id: 1,
      nome: "EcoTech Solutions",
      endereco: "Av. Paulista, 1000",
      cidade: "São Paulo",
      cep: "01310-100",
      telefone: "(11) 3333-4444",
      email: "contato@ecotech.com.br",
      setor: "Tecnologia Sustentável",
      descricao: "Especializada em soluções tecnológicas para sustentabilidade empresarial"
    },
    {
      id: 2,
      nome: "Verde Indústria Ltda",
      endereco: "Rua Industrial, 500",
      cidade: "Barueri",
      cep: "06454-000",
      telefone: "(11) 4444-5555",
      email: "parceria@verdeindustria.com.br",
      setor: "Indústria",
      descricao: "Indústria comprometida com práticas sustentáveis e economia circular"
    },
    {
      id: 3,
      nome: "Sustenta Logística",
      endereco: "Rod. Castelo Branco, 2000",
      cidade: "Osasco",
      cep: "06020-000",
      telefone: "(11) 5555-6666",
      email: "sustenta@logistica.com.br",
      setor: "Logística",
      descricao: "Transporte e logística verde para coleta seletiva"
    },
    {
      id: 4,
      nome: "Recicla Corp",
      endereco: "Av. das Nações, 800",
      cidade: "Santana de Parnaíba",
      cep: "06543-000",
      telefone: "(11) 6666-7777",
      email: "contato@reciclacorp.com.br",
      setor: "Reciclagem",
      descricao: "Processamento e transformação de materiais recicláveis"
    },
    {
      id: 5,
      nome: "GreenOffice Consultoria",
      endereco: "Rua dos Negócios, 300",
      cidade: "Alphaville",
      cep: "06454-100",
      telefone: "(11) 7777-8888",
      email: "green@office.com.br",
      setor: "Consultoria",
      descricao: "Consultoria em sustentabilidade e certificações ambientais"
    },
    {
      id: 6,
      nome: "EcoMateriais Brasil",
      endereco: "Av. Sustentável, 1500",
      cidade: "Jandira",
      cep: "06600-000",
      telefone: "(11) 8888-9999",
      email: "brasil@ecomateriais.com.br",
      setor: "Materiais",
      descricao: "Fornecimento de materiais sustentáveis e ecológicos"
    }
  ];
    
    setEmpresas([...empresasExemplo, ...empresasCadastradas]);
  }, []);

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
    <div className="empresas-parceiras-page" style={{
      background: 'linear-gradient(135deg, #f8fffe 0%, #f0fdf4 50%, #ecfdf5 100%)',
      minHeight: '100vh',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <style>{animationStyles}</style>
      <div className="container">
        <div className="row mb-5">
          <div className="col-12 text-center animate-fadeInUp">
            <h1 className="display-4 text-success mb-3 animate-slideInLeft" style={{
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(16, 185, 129, 0.1)'
            }}>
              <i className="bi bi-building me-3"></i>Empresas Parceiras
            </h1>
            <p className="lead text-muted mb-4 animate-fadeInUp animate-delay-1" style={{
              fontSize: '1.2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>Conheça as empresas que apoiam a sustentabilidade</p>
            <div className="d-inline-flex align-items-center text-white px-4 py-3 rounded-pill animate-scaleIn animate-delay-2" style={{
              background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
            }}>
              <i className="bi bi-check-circle me-2"></i>
              <span className="fw-bold">{empresas.length} empresas parceiras</span>
            </div>
          </div>
        </div>

        <div className="row">
          {empresas.map((empresa, index) => (
            <div key={empresa.id} className="col-md-6 col-lg-4 mb-4">
              <div className={`card h-100 border-0 position-relative overflow-hidden animate-scaleIn animate-delay-${(index % 3) + 1}`} style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 100%)',
                boxShadow: '0 8px 25px rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.1)',
                transition: 'all 0.3s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(16, 185, 129, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.1)';
              }}>
                <div className="position-absolute top-0 end-0 m-3">
                  <span className="badge rounded-pill px-3 py-2" style={{
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white'
                  }}>
                    <i className="bi bi-check-circle me-1"></i>Parceira
                  </span>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle p-3 me-3" style={{
                      background: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
                      border: '2px solid rgba(16, 185, 129, 0.2)'
                    }}>
                      <i className="bi bi-building text-success" style={{fontSize: '1.5rem'}}></i>
                    </div>
                    <div>
                      <h5 className="card-title mb-1 text-success fw-bold">{empresa.nome || empresa.nomeEmpresa}</h5>
                      <p className="text-muted mb-0 small">{empresa.setor || 'Empresa Parceira'}</p>
                    </div>
                  </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-house text-muted me-2"></i>
                    <small className="text-muted">{empresa.endereco}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-geo text-muted me-2"></i>
                    <small className="text-muted">{empresa.cidade}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone text-muted me-2"></i>
                    <small className="text-muted">{empresa.telefone}</small>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="small text-muted">{empresa.descricao}</p>
                </div>
                
                  <div className="d-grid gap-2">
                    <button 
                      className="btn text-white fw-bold"
                      style={{
                        background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                        border: 'none',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                      onClick={() => acessarEmpresa(empresa)}
                    >
                      <i className="bi bi-arrow-right-circle me-2"></i>Ver Detalhes
                    </button>
                    {usuario?.tipo === 'admin' && (
                      <button 
                        className="btn btn-danger btn-sm"
                        onClick={() => excluirEmpresa(empresa.id)}
                      >
                        <i className="bi bi-trash me-2"></i>Excluir
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {mostrarModal && empresaSelecionada && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="bi bi-building me-2"></i>
                  {empresaSelecionada.nome || empresaSelecionada.nomeEmpresa}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={fecharModal}></button>
              </div>
              <div className="modal-body p-4">
                {/* Galeria de Imagens */}
                <div className="mb-4">
                  <h6 className="text-success mb-3">
                    <i className="bi bi-images me-2"></i>
                    Fotos da Empresa
                  </h6>
                  <div className="row">
                    <div className="col-3 mb-2">
                      <div className="bg-light border rounded" style={{height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="bi bi-image text-muted"></i>
                      </div>
                    </div>
                    <div className="col-3 mb-2">
                      <div className="bg-light border rounded" style={{height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="bi bi-image text-muted"></i>
                      </div>
                    </div>
                    <div className="col-3 mb-2">
                      <div className="bg-light border rounded" style={{height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="bi bi-image text-muted"></i>
                      </div>
                    </div>
                    <div className="col-3 mb-2">
                      <div className="bg-light border rounded" style={{height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="bi bi-image text-muted"></i>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h6 className="text-success mb-3">Informações de Contato</h6>
                    <div className="mb-3">
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-house text-success me-3"></i>
                        <div>
                          <strong>Endereço:</strong><br/>
                          <span className="text-muted">{empresaSelecionada.endereco}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo text-success me-3"></i>
                        <div>
                          <strong>Cidade:</strong><br/>
                          <span className="text-muted">{empresaSelecionada.cidade}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-mailbox text-success me-3"></i>
                        <div>
                          <strong>CEP:</strong><br/>
                          <span className="text-muted">{empresaSelecionada.cep}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-telephone text-success me-3"></i>
                        <div>
                          <strong>Telefone:</strong><br/>
                          <span className="text-muted">{empresaSelecionada.telefone}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-envelope text-success me-3"></i>
                        <div>
                          <strong>Email:</strong><br/>
                          <span className="text-muted">{empresaSelecionada.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-success mb-3">Sobre a Empresa</h6>
                    <div className="mb-3">
                      <strong>Setor:</strong><br/>
                      <span className="badge bg-success fs-6 px-3 py-2 mb-3">
                        <i className="bi bi-briefcase me-1"></i>
                        {empresaSelecionada.setor}
                      </span>
                    </div>
                    <div className="mb-3">
                      <strong>Descrição:</strong><br/>
                      <p className="text-muted mt-2">{empresaSelecionada.descricao}</p>
                    </div>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-success mb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        Status
                      </h6>
                      <span className="badge bg-success fs-6 px-3 py-2">
                        <i className="bi bi-check-circle me-1"></i>
                        Empresa Parceira Ativa
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-success" onClick={fecharModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmpresasParceiras;