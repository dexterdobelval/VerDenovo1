import { useEffect } from 'react';

function MateriaisReciclaveis() {
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
    .animate-delay-4 { animation-delay: 0.8s; animation-fill-mode: both; }
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
      <div className="text-center mb-5 animate-fadeInUp">
        <h1 className="display-4 text-success mb-3 animate-slideInLeft">
          <i className="bi bi-recycle me-3"></i>
          Materiais Recicláveis
        </h1>
        <p className="lead animate-fadeInUp animate-delay-1">
          Conheça os principais tipos de materiais recicláveis e como descartá-los corretamente
        </p>
      </div>

      <div className="row">
        {materiais.map((material, index) => (
          <div key={material.id} className="col-lg-6 mb-4">
            <div className={`card h-100 shadow-sm animate-scaleIn animate-delay-${(index % 4) + 1}`}>
              <div className={`card-header ${material.cor} text-white`}>
                <h4 className="card-title mb-0">
                  <i className={`bi ${material.icone} me-2`}></i>
                  {material.nome}
                </h4>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <h6 className="text-success">
                    <i className="bi bi-check-circle me-2"></i>Exemplos:
                  </h6>
                  <div className="d-flex flex-wrap gap-1">
                    {material.exemplos.map((exemplo, index) => (
                      <span key={index} className="badge bg-light text-dark">
                        {exemplo}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-danger">
                    <i className="bi bi-clock me-2"></i>Tempo de Decomposição:
                  </h6>
                  <p className="mb-0">{material.tempoDecomposicao}</p>
                </div>

                <div className="mb-3">
                  <h6 className="text-success">
                    <i className="bi bi-leaf me-2"></i>Benefícios da Reciclagem:
                  </h6>
                  <p className="mb-0">{material.beneficios}</p>
                </div>

                <div className="mb-0">
                  <h6 className="text-warning">
                    <i className="bi bi-x-circle me-2"></i>Não Reciclar:
                  </h6>
                  <div className="d-flex flex-wrap gap-1">
                    {material.naoReciclar.map((item, index) => (
                      <span key={index} className="badge bg-warning text-dark">
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

      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-success text-white animate-scaleIn animate-delay-4">
            <div className="card-body text-center">
              <h3>
                <i className="bi bi-lightbulb me-2"></i>
                Dicas Importantes
              </h3>
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <i className="bi bi-droplet display-6 mb-2"></i>
                  <h5>Limpe os Materiais</h5>
                  <p>Lave embalagens antes de descartar para facilitar a reciclagem</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-arrow-down-up display-6 mb-2"></i>
                  <h5>Separe Corretamente</h5>
                  <p>Use as cores corretas: azul (papel), vermelho (plástico), verde (vidro), amarelo (metal)</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-geo-alt display-6 mb-2"></i>
                  <h5>Encontre Pontos de Coleta</h5>
                  <p>Use nosso sistema para localizar pontos de coleta próximos a você</p>
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