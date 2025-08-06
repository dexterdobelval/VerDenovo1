import { useState } from 'react';

function EmpresasParceiras() {
  const [empresaSelecionada, setEmpresaSelecionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

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

  const acessarEmpresa = (empresa) => {
    setEmpresaSelecionada(empresa);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setEmpresaSelecionada(null);
  };

  return (
    <div className="empresas-parceiras-page">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 text-success mb-3">
            <i className="bi bi-building me-3"></i>Empresas Parceiras
          </h1>
          <p className="lead text-muted mb-4">Conheça as empresas que apoiam a sustentabilidade</p>
          <div className="d-inline-flex align-items-center bg-success text-white px-4 py-2 rounded-pill">
            <i className="bi bi-check-circle me-2"></i>
            <span className="fw-bold">{empresasExemplo.length} empresas parceiras</span>
          </div>
        </div>
      </div>

      <div className="row">
        {empresasExemplo.map((empresa) => (
          <div key={empresa.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden">
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-success rounded-pill px-3 py-2">
                  <i className="bi bi-check-circle me-1"></i>Parceira
                </span>
              </div>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="bi bi-building text-success" style={{fontSize: '1.5rem'}}></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-1 text-success fw-bold">{empresa.nome}</h5>
                    <p className="text-muted mb-0 small">{empresa.setor}</p>
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
                
                <div className="d-grid">
                  <button 
                    className="btn btn-success"
                    onClick={() => acessarEmpresa(empresa)}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {mostrarModal && empresaSelecionada && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="bi bi-building me-2"></i>
                  {empresaSelecionada.nome}
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