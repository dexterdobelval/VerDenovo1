import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../services/database';
import { useAuth } from '../contexts/AuthContext';

function CadastroEmpresa() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    endereco: '',
    cidade: '',
    cep: ''
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(1);
  const { loginEmpresa } = useAuth();

  const styles = `
    .cadastro-empresa-container {
      min-height: 100vh;
      background: #f8fffe;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .cadastro-empresa-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
      max-width: 600px;
      width: 100%;
    }
    .cadastro-empresa-header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 2rem;
      text-align: center;
    }
    .empresa-icon {
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
    .btn-empresa {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      padding: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-empresa:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    }
    .password-toggle {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      z-index: 10;
    }
    .step-indicator {
      display: flex;
      justify-content: center;
      margin-bottom: 2rem;
    }
    .step {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 10px;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    .step.active {
      background: #10b981;
      color: white;
    }
    .step.inactive {
      background: #e5e7eb;
      color: #6b7280;
    }
    .step-line {
      width: 50px;
      height: 2px;
      background: #e5e7eb;
      margin-top: 19px;
    }
    .step-line.active {
      background: #10b981;
    }
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slideInUp 0.6s ease-out; }
  `;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }
    
    try {
      database.adicionarEmpresa(formData);
      alert('Empresa cadastrada com sucesso! Fazendo login...');
      
      setTimeout(() => {
        loginEmpresa({ email: formData.email, nome: formData.nomeEmpresa });
        navigate('/');
      }, 1500);
    } catch (error) {
      alert('Erro ao cadastrar empresa');
    }
  };

  const proximaEtapa = () => {
    if (etapaAtual < 2) setEtapaAtual(etapaAtual + 1);
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) setEtapaAtual(etapaAtual - 1);
  };

  const renderEtapa1 = () => (
    <>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="nomeEmpresa"
          name="nomeEmpresa"
          placeholder="Nome da empresa"
          value={formData.nomeEmpresa}
          onChange={handleChange}
          required
        />
        <label htmlFor="nomeEmpresa">
          <i className="bi bi-building me-2"></i>Nome da Empresa
        </label>
      </div>
      
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="cnpj"
          name="cnpj"
          placeholder="00.000.000/0000-00"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />
        <label htmlFor="cnpj">
          <i className="bi bi-card-text me-2"></i>CNPJ
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          placeholder="empresa@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">
          <i className="bi bi-envelope me-2"></i>Email
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          type="tel"
          className="form-control"
          id="telefone"
          name="telefone"
          placeholder="(00) 00000-0000"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <label htmlFor="telefone">
          <i className="bi bi-telephone me-2"></i>Telefone
        </label>
      </div>
    </>
  );

  const renderEtapa2 = () => (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="form-floating position-relative mb-3">
            <input
              type={mostrarSenha ? 'text' : 'password'}
              className="form-control"
              id="senha"
              name="senha"
              placeholder="Sua senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
            <label htmlFor="senha">
              <i className="bi bi-lock me-2"></i>Senha
            </label>
            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              <i className={`bi ${mostrarSenha ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating position-relative mb-3">
            <input
              type={mostrarConfirmarSenha ? 'text' : 'password'}
              className="form-control"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirme sua senha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmarSenha">
              <i className="bi bi-lock-fill me-2"></i>Confirmar Senha
            </label>
            <button
              type="button"
              className="password-toggle"
              onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
            >
              <i className={`bi ${mostrarConfirmarSenha ? 'bi-eye-slash' : 'bi-eye'}`}></i>
            </button>
          </div>
        </div>
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="endereco"
          name="endereco"
          placeholder="Endereço completo"
          value={formData.endereco}
          onChange={handleChange}
          required
        />
        <label htmlFor="endereco">
          <i className="bi bi-geo-alt me-2"></i>Endereço
        </label>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="cidade"
              name="cidade"
              placeholder="Cidade"
              value={formData.cidade}
              onChange={handleChange}
              required
            />
            <label htmlFor="cidade">
              <i className="bi bi-building me-2"></i>Cidade
            </label>
          </div>
        </div>
        <div className="col-md-4">
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="cep"
              name="cep"
              placeholder="00000-000"
              value={formData.cep}
              onChange={handleChange}
              required
            />
            <label htmlFor="cep">
              <i className="bi bi-mailbox me-2"></i>CEP
            </label>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="cadastro-empresa-container">
      <style>{styles}</style>
      <div className="cadastro-empresa-card animate-slide-up">
        <div className="cadastro-empresa-header">
          <div className="empresa-icon">
            <i className="bi bi-building text-white"></i>
          </div>
          <h3 className="text-white mb-0 fw-bold">Cadastro de Empresa</h3>
          <p className="text-white-50 mb-0 mt-2">Registre sua empresa conosco</p>
        </div>
        
        <div className="p-4">
          <div className="step-indicator">
            <div className={`step ${etapaAtual >= 1 ? 'active' : 'inactive'}`}>1</div>
            <div className={`step-line ${etapaAtual >= 2 ? 'active' : ''}`}></div>
            <div className={`step ${etapaAtual >= 2 ? 'active' : 'inactive'}`}>2</div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {etapaAtual === 1 && renderEtapa1()}
            {etapaAtual === 2 && renderEtapa2()}
            
            <div className="d-flex gap-2">
              {etapaAtual > 1 && (
                <button 
                  type="button" 
                  className="btn btn-outline-secondary rounded-3 flex-fill"
                  onClick={etapaAnterior}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Anterior
                </button>
              )}
              
              {etapaAtual < 2 ? (
                <button 
                  type="button" 
                  className="btn btn-empresa text-white rounded-3 flex-fill"
                  onClick={proximaEtapa}
                >
                  Próximo
                  <i className="bi bi-arrow-right ms-2"></i>
                </button>
              ) : (
                <button 
                  type="submit" 
                  className="btn btn-empresa text-white rounded-3 flex-fill"
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Cadastrar Empresa
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroEmpresa;