import { useState, useEffect } from 'react';
import { database } from '../services/database';
import { excluirPontoPorNome } from '../utils/excluirPonto';
import { useAuth } from '../contexts/AuthContext';

function PontosColeta() {
  const { usuario } = useAuth();
  const [pontoSelecionado, setPontoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [pontos, setPontos] = useState([]);
  
  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
    .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
    .animate-scaleIn { animation: scaleIn 0.6s ease-out; }
    .animate-delay-1 { animation-delay: 0.1s; }
    .animate-delay-2 { animation-delay: 0.2s; }
    .animate-delay-3 { animation-delay: 0.3s; }
    .pulse { animation: pulse 2s ease-in-out infinite; }
    .hover-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .hover-lift:hover { transform: translateY(-5px); box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
    .hover-scale { transition: transform 0.3s ease; }
    .hover-scale:hover { transform: scale(1.05); }
  `;
  
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

  const excluirPonto = (pontoId) => {
    if (window.confirm('Tem certeza que deseja excluir este ponto?')) {
      setPontos(pontos.filter(p => p.id !== pontoId));
      alert('Ponto excluído com sucesso!');
    }
  };



  return (
    <div className="pontos-coleta-page">
      <style>{animationStyles}</style>
      <div className="row mb-5">
        <div className="col-12 text-center animate-fadeInUp">
          <h1 className="display-4 text-success mb-3 animate-slideInLeft">
            <i className="bi bi-geo-alt me-3"></i>Pontos de Coleta
          </h1>
          <p className="lead text-muted mb-4 animate-fadeIn animate-delay-2">Encontre o ponto de coleta mais próximo de você</p>
          <div className="d-inline-flex align-items-center bg-success text-white px-4 py-2 rounded-pill animate-scaleIn animate-delay-3 pulse">
            <i className="bi bi-check-circle me-2"></i>
            <span className="fw-bold">{pontos.length} pontos disponíveis</span>
          </div>
        </div>
      </div>

      <div className="row">
        {pontos.map((ponto, index) => (
          <div key={ponto.id} className="col-md-6 col-lg-4 mb-4">
            <div className={`card h-100 border-0 shadow-sm position-relative overflow-hidden hover-lift animate-fadeInUp animate-delay-${(index % 3) + 1}`}>
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
                
                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-success hover-lift"
                    onClick={() => acessarPonto(ponto)}
                  >
                    <i className="bi bi-arrow-right-circle me-2"></i>Acessar Ponto
                  </button>
                  {usuario?.tipo === 'admin' && (
                    <button 
                      className="btn btn-danger btn-sm hover-scale"
                      onClick={() => excluirPonto(ponto.id)}
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

      {/* Modal */}
      {mostrarModal && pontoSelecionado && (
        <div className="modal d-block animate-fadeIn" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content animate-scaleIn">
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
                <button type="button" className="btn btn-success hover-lift" onClick={fecharModal}>
                  <i className="bi bi-x-circle me-2"></i>Fechar
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