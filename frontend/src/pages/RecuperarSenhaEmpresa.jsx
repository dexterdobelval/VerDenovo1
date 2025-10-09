import { useState } from 'react';
import { Link } from 'react-router-dom';

function RecuperarSenhaEmpresa() {
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const styles = `
    .recuperar-senha-container {
      min-height: 100vh;
      background: #f8fffe;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .recuperar-senha-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
      max-width: 450px;
      width: 100%;
    }
    .recuperar-senha-header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 2rem;
      text-align: center;
    }
    .recuperar-icon {
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1rem;
      font-size: 2rem;
    }
    .form-floating input {
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 1rem;
      transition: all 0.3s ease;
      background: #f9fafb;
    }
    .form-floating input:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      background: white;
    }
    .btn-recuperar {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      padding: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-recuperar:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    }
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slideInUp 0.6s ease-out; }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    
    // Simular envio de email
    setTimeout(() => {
      setEnviado(true);
      setCarregando(false);
    }, 2000);
  };

  return (
    <div className="recuperar-senha-container">
      <style>{styles}</style>
      <div className="recuperar-senha-card animate-slide-up">
        <div className="recuperar-senha-header">
          <div className="recuperar-icon">
            <i className="bi bi-key text-white"></i>
          </div>
          <h3 className="text-white mb-0 fw-bold">Recuperar Senha</h3>
          <p className="text-white-50 mb-0 mt-2">Empresa</p>
        </div>
        
        <div className="p-4">
          {!enviado ? (
            <>
              <div className="alert alert-info border-0 rounded-3 mb-4">
                <i className="bi bi-info-circle me-2"></i>
                Digite o email da sua empresa para receber as instruções
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-4">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="empresa@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">
                    <i className="bi bi-envelope me-2"></i>Email da Empresa
                  </label>
                </div>
                
                <div className="d-grid mb-4">
                  <button 
                    type="submit" 
                    className="btn btn-recuperar text-white"
                    disabled={carregando}
                  >
                    {carregando ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-send me-2"></i>
                        Enviar Instruções
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="alert alert-success border-0 rounded-3 mb-4">
                <i className="bi bi-check-circle me-2"></i>
                <strong>Email enviado!</strong><br/>
                Verifique sua caixa de entrada e spam.
              </div>
            </div>
          )}
          
          <div className="text-center">
            <Link to="/login-empresa" className="btn btn-outline-success rounded-3 px-4">
              <i className="bi bi-arrow-left me-2"></i>
              Voltar ao Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenhaEmpresa;