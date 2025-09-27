function Residuos() {
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

  const residuosComuns = [
    {
      id: 1,
      nome: "Resíduos Orgânicos",
      cor: "bg-success",
      icone: "bi-apple",
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
      <div className="text-center mb-5 animate-fadeInUp">
        <h1 className="display-4 text-success mb-3 animate-slideInLeft">
          <i className="bi bi-trash me-3"></i>
          Resíduos Comuns e Especiais
        </h1>
        <p className="lead animate-fadeInUp animate-delay-1">
          Aprenda a identificar e descartar corretamente diferentes tipos de resíduos
        </p>
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
              <div className={`card h-100 shadow-sm animate-scaleIn animate-delay-${(index % 2) + 1}`}>
                <div className={`card-header ${residuo.cor} text-white`}>
                  <h4 className="card-title mb-0">
                    <i className={`bi ${residuo.icone} me-2`}></i>
                    {residuo.nome}
                  </h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="text-success">
                      <i className="bi bi-check-circle me-2"></i>Exemplos:
                    </h6>
                    <div className="d-flex flex-wrap gap-1">
                      {residuo.exemplos.map((exemplo, index) => (
                        <span key={index} className="badge bg-light text-dark">
                          {exemplo}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-info">
                      <i className="bi bi-clock me-2"></i>Decomposição:
                    </h6>
                    <p className="mb-0">{residuo.tempoDecomposicao}</p>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-primary">
                      <i className="bi bi-gear me-2"></i>Tratamento:
                    </h6>
                    <p className="mb-0">{residuo.tratamento}</p>
                  </div>

                  <div className="mb-0">
                    <h6 className="text-warning">
                      <i className="bi bi-exclamation-triangle me-2"></i>Cuidados:
                    </h6>
                    <ul className="mb-0">
                      {residuo.cuidados.map((cuidado, index) => (
                        <li key={index}>{cuidado}</li>
                      ))}
                    </ul>
                  </div>
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
              <div className={`card h-100 shadow-sm border-danger animate-scaleIn animate-delay-${(index % 4) + 1}`}>
                <div className={`card-header ${residuo.cor} text-white`}>
                  <h4 className="card-title mb-0">
                    <i className={`bi ${residuo.icone} me-2`}></i>
                    {residuo.nome}
                  </h4>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="text-success">
                      <i className="bi bi-check-circle me-2"></i>Exemplos:
                    </h6>
                    <div className="d-flex flex-wrap gap-1">
                      {residuo.exemplos.map((exemplo, index) => (
                        <span key={index} className="badge bg-light text-dark">
                          {exemplo}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-danger">
                      <i className="bi bi-shield-exclamation me-2"></i>Perigos:
                    </h6>
                    <p className="mb-0">{residuo.perigos}</p>
                  </div>

                  <div className="mb-3">
                    <h6 className="text-primary">
                      <i className="bi bi-geo-alt me-2"></i>Onde Descartar:
                    </h6>
                    <p className="mb-0">{residuo.tratamento}</p>
                  </div>

                  <div className="mb-0">
                    <h6 className="text-warning">
                      <i className="bi bi-exclamation-triangle me-2"></i>Cuidados:
                    </h6>
                    <ul className="mb-0">
                      {residuo.cuidados.map((cuidado, index) => (
                        <li key={index}>{cuidado}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dicas Gerais */}
      <div className="row">
        <div className="col-12">
          <div className="card bg-success text-white animate-scaleIn animate-delay-4">
            <div className="card-body text-center">
              <h3>
                <i className="bi bi-lightbulb me-2"></i>
                Dicas Importantes
              </h3>
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <i className="bi bi-shield-check display-6 mb-2"></i>
                  <h5>Segurança Primeiro</h5>
                  <p>Sempre use equipamentos de proteção ao manusear resíduos especiais</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-geo-alt display-6 mb-2"></i>
                  <h5>Pontos Especializados</h5>
                  <p>Procure pontos de coleta específicos para cada tipo de resíduo especial</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-people display-6 mb-2"></i>
                  <h5>Conscientização</h5>
                  <p>Eduque familiares e amigos sobre o descarte correto de resíduos</p>
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