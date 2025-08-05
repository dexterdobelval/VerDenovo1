import { useState } from 'react';

function FAQ() {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const faqs = [
    {
      id: 1,
      pergunta: "O que podemos reciclar?",
      resposta: "Podemos reciclar diversos materiais como papel (jornais, revistas, caixas), plástico (garrafas PET, embalagens), vidro (garrafas, potes), metal (latas de alumínio, tampas) e eletrônicos. É importante que os materiais estejam limpos e separados adequadamente. Materiais contaminados, papel higiênico, isopor e vidros temperados não podem ser reciclados."
    },
    {
      id: 2,
      pergunta: "Como separar adequadamente os materiais para coleta?",
      resposta: "A separação deve seguir o sistema de cores: azul para papel, vermelho para plástico, verde para vidro e amarelo para metal. Lave bem as embalagens, retire tampas e rótulos quando possível, e mantenha os materiais secos. Separe também os resíduos orgânicos dos recicláveis. Materiais especiais como pilhas, medicamentos e óleo de cozinha devem ter descarte específico."
    },
    {
      id: 3,
      pergunta: "O que é um EcoPonto?",
      resposta: "Um EcoPonto é um local de coleta seletiva onde você pode descartar materiais recicláveis de forma adequada. Estes pontos são estrategicamente localizados em bairros, escolas, empresas e centros comerciais para facilitar o acesso da população. Cada EcoPonto possui containers coloridos para diferentes tipos de materiais e contribui para a logística reversa e economia circular."
    },
    {
      id: 4,
      pergunta: "Posso reciclar embalagens sujas?",
      resposta: "Não, embalagens sujas não devem ser colocadas na reciclagem. Restos de comida, óleo ou outros contaminantes podem prejudicar todo o processo de reciclagem e contaminar outros materiais limpos. Sempre lave as embalagens com água antes de descartá-las nos containers apropriados."
    },
    {
      id: 5,
      pergunta: "O que fazer com pilhas e baterias?",
      resposta: "Pilhas e baterias contêm metais pesados tóxicos e nunca devem ser descartadas no lixo comum. Procure pontos de coleta específicos em lojas de eletrônicos, supermercados ou postos de coleta especializados. Muitos fabricantes também têm programas de logística reversa para estes produtos."
    },
    {
      id: 6,
      pergunta: "Como descartar óleo de cozinha usado?",
      resposta: "O óleo de cozinha usado deve ser armazenado em recipientes fechados (como garrafas PET) e levado a pontos de coleta específicos. Nunca despeje óleo no ralo ou vaso sanitário, pois isso causa entupimentos e poluição da água. O óleo coletado pode ser transformado em biodiesel e sabão."
    }
  ];

  return (
    <div>
      <div className="text-center mb-5">
        <h1 className="display-4 text-success mb-3">
          <i className="bi bi-question-circle me-3"></i>
          Perguntas Frequentes
        </h1>
        <p className="lead">
          Tire suas dúvidas sobre reciclagem e descarte correto de materiais
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          {faqs.map((faq) => (
            <div key={faq.id} className="card mb-3 shadow-sm">
              <div className="card-header bg-light">
                <div 
                  className="d-flex justify-content-between align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleExpanded(faq.id)}
                >
                  <h5 className="mb-0 text-success">
                    <i className="bi bi-chat-question me-2"></i>
                    {faq.pergunta}
                  </h5>
                  <button className="btn btn-success btn-sm">
                    <i className={`bi ${expandedItems.has(faq.id) ? 'bi-dash' : 'bi-plus'}`}></i>
                  </button>
                </div>
              </div>
              
              {expandedItems.has(faq.id) && (
                <div className="card-body">
                  <p className="mb-0 text-muted">
                    <i className="bi bi-chat-text me-2"></i>
                    {faq.resposta}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <div className="card bg-success text-white">
            <div className="card-body text-center">
              <h3>
                <i className="bi bi-lightbulb me-2"></i>
                Ainda tem dúvidas?
              </h3>
              <p className="mb-3">
                Entre em contato conosco ou visite nossos pontos de coleta para mais informações
              </p>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <i className="bi bi-envelope display-6 mb-2"></i>
                  <h5>Email</h5>
                  <p>contato@verdenovo.com.br</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-telephone display-6 mb-2"></i>
                  <h5>Telefone</h5>
                  <p>(11) 0000-0000</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-geo-alt display-6 mb-2"></i>
                  <h5>Pontos de Coleta</h5>
                  <p>Encontre o mais próximo de você</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;