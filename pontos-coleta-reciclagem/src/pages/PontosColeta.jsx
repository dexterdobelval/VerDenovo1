import { useState, useEffect } from 'react';
import { database } from '../services/database';
import { excluirPontoPorNome } from '../utils/excluirPonto';

function PontosColeta() {
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pontos, setPontos] = useState([]);
  
  useEffect(() => {
    // Excluir ponto chamado "ponto" se existir
    excluirPontoPorNome('ponto');
    
    const pontosCadastrados = database.listarPontos();
    const pontosExemplo = [
    {
      id: 1,
      nome: "EcoVerde Reciclagem",
      endereco: "Rua das Flores, 123",
      cidade: "São Paulo",
      cep: "01234-567",
      telefone: "(11) 9999-8888",
      horario: "08:00 - 18:00",
      materiais: { papel: true, plastico: true, vidro: true, metal: false }
    },
    {
      id: 2,
      nome: "Centro Verde Sustentável",
      endereco: "Av. Meio Ambiente, 456",
      cidade: "Rio de Janeiro",
      cep: "20123-456",
      telefone: "(21) 8888-7777",
      horario: "07:00 - 17:00",
      materiais: { papel: true, plastico: true, vidro: false, metal: true }
    },
    {
      id: 3,
      nome: "Recicla Mais Ecológico",
      endereco: "Rua da Natureza, 789",
      cidade: "Belo Horizonte",
      cep: "30456-789",
      telefone: "(31) 7777-6666",
      horario: "09:00 - 16:00",
      materiais: { papel: true, plastico: true, vidro: true, metal: true }
    },
    {
      id: 4,
      nome: "Ponto Verde Consciente",
      endereco: "Praça da Sustentabilidade, 321",
      cidade: "Porto Alegre",
      cep: "90123-321",
      telefone: "(51) 6666-5555",
      horario: "08:30 - 17:30",
      materiais: { papel: false, plastico: true, vidro: true, metal: true }
    },
    {
      id: 5,
      nome: "EcoPoint Renovável",
      endereco: "Rua do Futuro Verde, 654",
      cidade: "Curitiba",
      cep: "80654-987",
      telefone: "(41) 5555-4444",
      horario: "07:30 - 18:30",
      materiais: { papel: true, plastico: false, vidro: true, metal: true }
    },
    {
      id: 6,
      nome: "Reciclagem Planeta Limpo",
      endereco: "Av. Terra Verde, 987",
      cidade: "Salvador",
      cep: "40987-123",
      telefone: "(71) 4444-3333",
      horario: "08:00 - 17:00",
      materiais: { papel: true, plastico: true, vidro: false, metal: false }
    }
  ];
    
    setPontos([...pontosExemplo, ...pontosCadastrados]);
  }, []);

  const formatarMateriais = (materiais) => {
    if (!materiais) return 'Não informado';
    const tipos = [];
    if (materiais.papel) tipos.push('Papel');
    if (materiais.plastico) tipos.push('Plástico');
    if (materiais.vidro) tipos.push('Vidro');
    if (materiais.metal) tipos.push('Metal');
    return tipos.length > 0 ? tipos.join(', ') : 'Não informado';
  };



  const acessarPonto = (ponto) => {
    setPontoSelecionado(ponto);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setPontoSelecionado(null);
  };

  const entrarEmContato = (ponto) => {
    if (ponto.telefone) {
      window.open(`tel:${ponto.telefone}`);
    } else {
      alert('Telefone não disponível');
    }
  };



  return (
    <div className="pontos-coleta-page">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h1 className="display-4 text-success mb-3">
            <i className="bi bi-geo-alt me-3"></i>Pontos de Coleta
          </h1>
          <p className="lead text-muted mb-4">Encontre o ponto de coleta mais próximo de você</p>
          <div className="d-inline-flex align-items-center bg-success text-white px-4 py-2 rounded-pill">
            <i className="bi bi-check-circle me-2"></i>
            <span className="fw-bold">{pontos.length} pontos disponíveis</span>
          </div>
        </div>
      </div>

      <div className="row">
        {pontos.map((ponto) => (
          <div key={ponto.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden">
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-success rounded-pill px-3 py-2">
                  <i className="bi bi-check-circle me-1"></i>Ativo
                </span>
              </div>
              <div className="card-body p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="bg-success bg-opacity-10 rounded-circle p-3 me-3">
                    <i className="bi bi-geo-alt text-success" style={{fontSize: '1.5rem'}}></i>
                  </div>
                  <div>
                    <h5 className="card-title mb-1 text-success fw-bold">{ponto.nome}</h5>
                    <p className="text-muted mb-0 small">{ponto.cidade}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-house text-muted me-2"></i>
                    <small className="text-muted">{ponto.endereco}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-clock text-muted me-2"></i>
                    <small className="text-muted">{ponto.horario}</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="bi bi-telephone text-muted me-2"></i>
                    <small className="text-muted">{ponto.telefone}</small>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="small text-success fw-bold mb-2">Materiais aceitos:</p>
                  <div className="d-flex flex-wrap gap-1">
                    {formatarMateriais(ponto.materiais).split(', ').map((material, index) => (
                      <span key={index} className="badge bg-success bg-opacity-10 text-success border border-success">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="d-grid">
                  <button 
                    className="btn btn-success"
                    onClick={() => acessarPonto(ponto)}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>Acessar Ponto
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {mostrarModal && pontoSelecionado && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="bi bi-geo-alt me-2"></i>
                  {pontoSelecionado.nome}
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={fecharModal}></button>
              </div>
              <div className="modal-body p-4">
                {/* Galeria de Imagens */}
                <div className="mb-4">
                  <h6 className="text-success mb-3">
                    <i className="bi bi-images me-2"></i>
                    Fotos do Ponto de Coleta
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
                          <span className="text-muted">{pontoSelecionado.endereco}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-geo text-success me-3"></i>
                        <div>
                          <strong>Cidade:</strong><br/>
                          <span className="text-muted">{pontoSelecionado.cidade}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-mailbox text-success me-3"></i>
                        <div>
                          <strong>CEP:</strong><br/>
                          <span className="text-muted">{pontoSelecionado.cep}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center mb-2">
                        <i className="bi bi-telephone text-success me-3"></i>
                        <div>
                          <strong>Telefone:</strong><br/>
                          <span className="text-muted">{pontoSelecionado.telefone}</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <i className="bi bi-clock text-success me-3"></i>
                        <div>
                          <strong>Horário:</strong><br/>
                          <span className="text-muted">{pontoSelecionado.horario}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-success mb-3">Materiais Aceitos</h6>
                    <div className="d-flex flex-wrap gap-2 mb-4">
                      {formatarMateriais(pontoSelecionado.materiais).split(', ').map((material, index) => (
                        <span key={index} className="badge bg-success fs-6 px-3 py-2">
                          <i className="bi bi-check-circle me-1"></i>
                          {material}
                        </span>
                      ))}
                    </div>
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-success mb-2">
                        <i className="bi bi-info-circle me-2"></i>
                        Status
                      </h6>
                      <span className="badge bg-success fs-6 px-3 py-2">
                        <i className="bi bi-check-circle me-1"></i>
                        Ponto Ativo
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

export default PontosColeta;