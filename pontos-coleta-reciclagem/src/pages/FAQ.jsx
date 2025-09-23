import { useState, useRef, useEffect } from 'react';

function FAQ() {
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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      <div className="text-center mb-4">
        <h1 className="display-4 text-success mb-3">
          <i className="bi bi-robot me-3"></i>
          VerX - Assistente Virtual
        </h1>
        <p className="lead">
          Tire suas dúvidas sobre reciclagem com o VerX
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">
                <i className="bi bi-chat-dots me-2"></i>
                VerX
              </h5>
            </div>
            <div className="card-body p-0">
              <div className="chat-messages" style={{ height: '400px', overflowY: 'auto', padding: '1rem' }}>
                {messages.map((message, index) => (
                  <div key={index} className={`d-flex mb-3 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                    <div className={`message ${message.type === 'user' ? 'bg-primary text-white' : 'bg-light'}`} style={{ maxWidth: '70%', padding: '0.75rem', borderRadius: '1rem', whiteSpace: 'pre-line' }}>
                      <div>{message.text}</div>
                      <small className={`d-block mt-1 ${message.type === 'user' ? 'text-white-50' : 'text-muted'}`}>
                        {message.time}
                      </small>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>
            <div className="card-footer">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Digite o número da opção..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button className="btn btn-success" onClick={handleSendMessage}>
                  <i className="bi bi-send"></i>
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