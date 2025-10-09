import { useState, useRef, useEffect } from 'react';

function FAQ() {
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
  `;

  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Olá! Sou o VerX, assistente virtual do VerDenovo. Digite o número da opção desejada:',
      time: new Date().toLocaleTimeString()
    },
    {
      type: 'bot', 
      text: '1 - O que podemos reciclar?\n2 - Como separar materiais para coleta?\n3 - O que é um EcoPonto?\n4 - Posso reciclar embalagens sujas?\n5 - O que fazer com pilhas e baterias?\n6 - Como descartar óleo de cozinha?\n7 - Outro...\n0 - Ver menu novamente',
      time: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const messagesEndRef = useRef(null);

  const respostas = {
    '1': 'Podemos reciclar diversos materiais como papel (jornais, revistas, caixas), plástico (garrafas PET, embalagens), vidro (garrafas, potes), metal (latas de alumínio, tampas) e eletrônicos. É importante que os materiais estejam limpos e separados adequadamente.',
    '2': 'A separação deve seguir o sistema de cores: azul para papel, vermelho para plástico, verde para vidro e amarelo para metal. Lave bem as embalagens, retire tampas e rótulos quando possível, e mantenha os materiais secos.',
    '3': 'Um EcoPonto é um local de coleta seletiva onde você pode descartar materiais recicláveis de forma adequada. Estes pontos são estrategicamente localizados em bairros, escolas, empresas e centros comerciais para facilitar o acesso da população.',
    '4': 'Não, embalagens sujas não devem ser colocadas na reciclagem. Restos de comida, óleo ou outros contaminantes podem prejudicar todo o processo de reciclagem. Sempre lave as embalagens com água antes de descartá-las.',
    '5': 'Pilhas e baterias contêm metais pesados tóxicos e nunca devem ser descartadas no lixo comum. Procure pontos de coleta específicos em lojas de eletrônicos, supermercados ou postos de coleta especializados.',
    '6': 'O óleo de cozinha usado deve ser armazenado em recipientes fechados (como garrafas PET) e levado a pontos de coleta específicos. Nunca despeje óleo no ralo ou vaso sanitário, pois isso causa entupimentos e poluição da água.',
    '7': 'Para outras dúvidas, entre em contato conosco pelo email: contato@verdenovo.com.br\n\nNossa equipe responderá sua pergunta o mais breve possível!'
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
    setIsInitialLoad(false);
  }, []);

  const scrollToBottom = () => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  };

  useEffect(() => {
    if (!isInitialLoad) {
      scrollToBottom();
    }
  }, [messages, isInitialLoad]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      let botResponse;
      if (respostas[inputValue]) {
        botResponse = {
          type: 'bot',
          text: respostas[inputValue],
          time: new Date().toLocaleTimeString()
        };
      } else if (inputValue === '0') {
        botResponse = {
          type: 'bot',
          text: '1 - O que podemos reciclar?\n2 - Como separar materiais para coleta?\n3 - O que é um EcoPonto?\n4 - Posso reciclar embalagens sujas?\n5 - O que fazer com pilhas e baterias?\n6 - Como descartar óleo de cozinha?\n7 - Outro...\n0 - Ver menu novamente',
          time: new Date().toLocaleTimeString()
        };
      } else {
        botResponse = {
          type: 'bot',
          text: 'Opção inválida. Digite um número de 1 a 7 ou 0 para ver o menu.',
          time: new Date().toLocaleTimeString()
        };
      }
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputValue('');
  };

  return (
    <div>
      <style>{animationStyles}</style>
      <div className="text-center mb-5 animate-fadeInUp">
        <div className="d-inline-flex align-items-center justify-content-center mb-3 animate-scaleIn" 
             style={{width: '80px', height: '80px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '20px'}}>
          <i className="bi bi-robot text-success" style={{fontSize: '2.5rem'}}></i>
        </div>
        <h1 className="display-4 fw-bold text-success mb-3 animate-slideInLeft">
          VerX - Assistente Virtual
        </h1>
        <p className="lead text-muted animate-fadeInUp animate-delay-1">
          Tire suas dúvidas sobre reciclagem com nosso assistente inteligente
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 animate-scaleIn animate-delay-2" style={{boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)', borderRadius: '20px'}}>
            <div className="card-header bg-success text-white border-0" style={{borderRadius: '20px 20px 0 0', padding: '1.5rem'}}>
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center justify-content-center me-3" 
                     style={{width: '40px', height: '40px', background: 'rgba(255, 255, 255, 0.2)', borderRadius: '10px'}}>
                  <i className="bi bi-chat-dots" style={{fontSize: '1.2rem'}}></i>
                </div>
                <div>
                  <h5 className="mb-0 fw-bold">VerX</h5>
                  <small className="opacity-75">Assistente Virtual</small>
                </div>
                <div className="ms-auto">
                  <div className="d-flex align-items-center">
                    <div className="bg-success rounded-circle me-2" style={{width: '8px', height: '8px'}}></div>
                    <small className="opacity-75">Online</small>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0" style={{background: '#e9ecef'}}>
              <div className="chat-messages" style={{ height: '450px', overflowY: 'auto', padding: '1.5rem' }}>
                {messages.map((message, index) => (
                  <div key={index} className={`d-flex mb-4 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    {message.type === 'bot' && (
                      <div className="d-flex align-items-center justify-content-center me-3 flex-shrink-0" 
                           style={{width: '35px', height: '35px', background: 'rgba(40, 167, 69, 0.1)', borderRadius: '50%'}}>
                        <i className="bi bi-robot text-success" style={{fontSize: '1rem'}}></i>
                      </div>
                    )}
                    <div className={`message ${message.type === 'user' ? 'text-white' : ''}`} 
                         style={{ 
                           maxWidth: '75%', 
                           padding: '1rem 1.25rem', 
                           borderRadius: message.type === 'user' ? '20px 20px 5px 20px' : '20px 20px 20px 5px',
                           whiteSpace: 'pre-line',
                           background: message.type === 'user' 
                             ? '#28a745' 
                             : 'white',
                           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                           color: message.type === 'user' ? 'white' : '#374151'
                         }}>
                      <div className="mb-1">{message.text}</div>
                      <small className={`d-block ${message.type === 'user' ? 'text-white-50' : 'text-muted'}`} style={{fontSize: '0.75rem'}}>
                        {message.time}
                      </small>
                    </div>
                    {message.type === 'user' && (
                      <div className="d-flex align-items-center justify-content-center ms-3 flex-shrink-0" 
                           style={{width: '35px', height: '35px', background: '#28a745', borderRadius: '50%'}}>
                        <i className="bi bi-person-fill" style={{fontSize: '1rem', color: 'white'}}></i>
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="card-footer border-0" style={{background: 'white', borderRadius: '0 0 20px 20px', padding: '1.5rem'}}>
              <div className="input-group" style={{borderRadius: '25px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
                <input
                  type="text"
                  className="form-control border-0"
                  placeholder="Digite o número da opção..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  style={{padding: '1rem 1.25rem', fontSize: '0.95rem'}}
                />
                <button className="btn btn-success border-0 px-4" onClick={handleSendMessage}>
                  <i className="bi bi-send-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQ;