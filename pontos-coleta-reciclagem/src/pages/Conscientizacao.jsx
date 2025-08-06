function Conscientizacao() {
  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="display-4 text-success mb-3">
          <i className="bi bi-tree me-3"></i>
          Conscientização e Educação Ambiental
        </h1>
        <p className="lead">
          Aprenda sobre práticas sustentáveis e como contribuir para um futuro mais verde
        </p>
      </div>

      {/* Conscientização */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <i className="bi bi-lightbulb me-2"></i>
                Por que a Conscientização é Importante?
              </h3>
            </div>
            <div className="card-body">
              <p className="lead mb-4">
                A conscientização ambiental é o primeiro passo para transformar nossa relação com o planeta. Quando entendemos o impacto de nossas ações, podemos fazer escolhas mais responsáveis e sustentáveis.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <h5 className="text-success mb-3">Dados Alarmantes</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-exclamation-triangle text-warning me-2"></i>O Brasil produz mais de <strong>79 milhões de toneladas</strong> de resíduos por ano</li>
                    <li className="mb-2"><i className="bi bi-exclamation-triangle text-warning me-2"></i>Apenas <strong>4%</strong> do lixo brasileiro é reciclado</li>
                    <li className="mb-2"><i className="bi bi-exclamation-triangle text-warning me-2"></i>Um plástico pode levar até <strong>400 anos</strong> para se decompor</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5 className="text-success mb-3">O Poder da Mudança</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Cada tonelada de papel reciclado salva <strong>17 árvores</strong></li>
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>Reciclar alumínio economiza <strong>95%</strong> da energia necessária</li>
                    <li className="mb-2"><i className="bi bi-check-circle text-success me-2"></i>A reciclagem pode gerar mais de <strong>1 milhão de empregos</strong> no Brasil</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vídeo Educativo */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h3 className="mb-0">
                <i className="bi bi-play-circle me-2"></i>
                Vídeo Educativo
              </h3>
            </div>
            <div className="card-body text-center">
              <p className="mb-4">"A Terra fornece o suficiente para satisfazer as necessidades de cada homem, mas não a ganância de cada homem." - Mahatma Gandhi</p>
              <div className="position-relative d-inline-block">
                <div 
                  className="bg-dark rounded" 
                  style={{
                    width: '300px', 
                    height: '400px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundImage: 'linear-gradient(45deg, #28a745, #20c997)',
                    color: 'white'
                  }}
                  onClick={() => window.open('https://www.tiktok.com/@haileydollie/video/7463768126761504005', '_blank')}
                >
                  <div className="text-center">
                    <i className="bi bi-play-circle" style={{fontSize: '4rem'}}></i>
                    <div className="mt-3">
                      <h5>Vídeo Educativo</h5>
                      <p className="mb-0">Clique para assistir</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-3 small">
                <i className="bi bi-info-circle me-1"></i>
                O vídeo será aberto em uma nova aba
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cores das Lixeiras */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="bi bi-palette me-2"></i>
                Guia das Cores das Lixeiras
              </h3>
            </div>
            <div className="card-body">
              <p className="mb-4">Conhecer as cores das lixeiras é fundamental para fazer o descarte correto. Cada cor representa um tipo específico de material:</p>
              <div className="row">
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="text-center">
                    <div className="bg-primary rounded-circle mx-auto mb-3" style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-file-text text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                    <h5 className="text-primary">AZUL</h5>
                    <p><strong>Papel e Papelão</strong><br/>Jornais, revistas, caixas, cadernos</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="text-center">
                    <div className="bg-danger rounded-circle mx-auto mb-3" style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-cup text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                    <h5 className="text-danger">VERMELHO</h5>
                    <p><strong>Plástico</strong><br/>Garrafas PET, embalagens, sacolas</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="text-center">
                    <div className="bg-success rounded-circle mx-auto mb-3" style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-cup-straw text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                    <h5 className="text-success">VERDE</h5>
                    <p><strong>Vidro</strong><br/>Garrafas, potes, frascos</p>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 mb-4">
                  <div className="text-center">
                    <div className="bg-warning rounded-circle mx-auto mb-3" style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <i className="bi bi-gear text-white" style={{fontSize: '2rem'}}></i>
                    </div>
                    <h5 className="text-warning">AMARELO</h5>
                    <p><strong>Metal</strong><br/>Latas de alumínio, ferro, aço</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impacto Ambiental */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h3 className="mb-0">
                <i className="bi bi-globe me-2"></i>
                Como a Reciclagem Ajuda o Meio Ambiente
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h5 className="text-info"><i className="bi bi-tree me-2"></i>Preservação de Recursos Naturais</h5>
                  <p>A reciclagem reduz a necessidade de extrair matérias-primas da natureza. <strong>1 tonelada de papel reciclado</strong> evita o corte de 17 árvores e economiza 50% da água utilizada na produção.</p>
                </div>
                <div className="col-md-6 mb-4">
                  <h5 className="text-info"><i className="bi bi-lightning me-2"></i>Economia de Energia</h5>
                  <p>Produzir materiais reciclados consome menos energia. Reciclar alumínio economiza <strong>95% da energia</strong> comparado à produção com matéria-prima virgem.</p>
                </div>
                <div className="col-md-6 mb-4">
                  <h5 className="text-info"><i className="bi bi-cloud me-2"></i>Redução de Poluição</h5>
                  <p>A reciclagem diminui a emissão de gases poluentes. Cada tonelada de plástico reciclado evita a emissão de <strong>2 toneladas de CO2</strong> na atmosfera.</p>
                </div>
                <div className="col-md-6 mb-4">
                  <h5 className="text-info"><i className="bi bi-trash me-2"></i>Menos Lixo nos Aterros</h5>
                  <p>Materiais reciclados não vão para aterros sanitários, aumentando sua vida útil. No Brasil, <strong>60%</strong> dos municípios ainda usam lixões inadequados.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Educação Ambiental - Reutilização */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-warning text-dark">
              <h3 className="mb-0">
                <i className="bi bi-arrow-repeat me-2"></i>
                Educação Ambiental: Dicas de Reutilização em Casa
              </h3>
            </div>
            <div className="card-body">
              <p className="lead mb-4">Antes de descartar, pense em como reutilizar! A reutilização é ainda mais eficiente que a reciclagem, pois não requer processamento industrial.</p>
              
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="card border-success">
                    <div className="card-header bg-success text-white">
                      <h5 className="mb-0"><i className="bi bi-cup me-2"></i>Garrafas PET</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li><i className="bi bi-check text-success me-2"></i>Vasos para plantas</li>
                        <li><i className="bi bi-check text-success me-2"></i>Organizadores de gavetas</li>
                        <li><i className="bi bi-check text-success me-2"></i>Comedouros para animais</li>
                        <li><i className="bi bi-check text-success me-2"></i>Porta-lápis e canetas</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card border-primary">
                    <div className="card-header bg-primary text-white">
                      <h5 className="mb-0"><i className="bi bi-box me-2"></i>Caixas de Papelão</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li><i className="bi bi-check text-primary me-2"></i>Organizadores de armário</li>
                        <li><i className="bi bi-check text-primary me-2"></i>Brinquedos para crianças</li>
                        <li><i className="bi bi-check text-primary me-2"></i>Composteira caseira</li>
                        <li><i className="bi bi-check text-primary me-2"></i>Arquivo de documentos</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card border-info">
                    <div className="card-header bg-info text-white">
                      <h5 className="mb-0"><i className="bi bi-jar me-2"></i>Potes de Vidro</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li><i className="bi bi-check text-info me-2"></i>Porta-temperos</li>
                        <li><i className="bi bi-check text-info me-2"></i>Luminárias decorativas</li>
                        <li><i className="bi bi-check text-info me-2"></i>Vasos para suculentas</li>
                        <li><i className="bi bi-check text-info me-2"></i>Porta-objetos pequenos</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-6 mb-4">
                  <div className="card border-warning">
                    <div className="card-header bg-warning text-dark">
                      <h5 className="mb-0"><i className="bi bi-circle me-2"></i>Latas de Alumínio</h5>
                    </div>
                    <div className="card-body">
                      <ul className="list-unstyled mb-0">
                        <li><i className="bi bi-check text-warning me-2"></i>Porta-lápis decorativo</li>
                        <li><i className="bi bi-check text-warning me-2"></i>Vasinhos para ervas</li>
                        <li><i className="bi bi-check text-warning me-2"></i>Organizador de mesa</li>
                        <li><i className="bi bi-check text-warning me-2"></i>Luminária de mesa</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="alert alert-success mt-4">
                <h5><i className="bi bi-lightbulb me-2"></i>Dica Importante</h5>
                <p className="mb-0">Segundo estudos, <strong>cada família brasileira</strong> pode reduzir até <strong>30%</strong> do seu lixo doméstico apenas reutilizando materiais que normalmente descartaria. Isso representa uma economia de aproximadamente <strong>R$ 200 por ano</strong> em produtos que não precisam ser comprados!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Estatísticas Finais */}
      <div className="row">
        <div className="col-12">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3 className="mb-4">
                <i className="bi bi-graph-up me-2"></i>
                Juntos Podemos Fazer a Diferença
              </h3>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <h2 className="display-4">17</h2>
                  <p>árvores salvas por tonelada de papel reciclado</p>
                </div>
                <div className="col-md-3 mb-3">
                  <h2 className="display-4">95%</h2>
                  <p>menos energia para reciclar alumínio</p>
                </div>
                <div className="col-md-3 mb-3">
                  <h2 className="display-4">400</h2>
                  <p>anos para um plástico se decompor</p>
                </div>
                <div className="col-md-3 mb-3">
                  <h2 className="display-4">30%</h2>
                  <p>redução possível do lixo doméstico</p>
                </div>
              </div>
              <p className="lead mt-4">
                "Pequenas ações, grandes transformações. Cada gesto consciente conta para um planeta mais sustentável."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Conscientizacao;