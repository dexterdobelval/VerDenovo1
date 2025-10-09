import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/database';

function LoginEmpresa() {
  const navigate = useNavigate();
  const { loginEmpresa, loginAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const styles = `
    .login-empresa-container {
      min-height: 100vh;
      background: #f8fffe;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .login-empresa-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
      max-width: 450px;
      width: 100%;
    }
    .login-empresa-header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 2rem;
      text-align: center;
    }
    .empresa-login-icon {
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
    .btn-login-empresa {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      padding: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-login-empresa:hover {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    
    try {
      // Verificar se é admin
      if (formData.email === 'vitorhugobate@gmail.com' && formData.senha === '123456789Vi') {
        loginAdmin();
        navigate('/');
        return;
      }
      
      const empresa = database.buscarEmpresa(formData.email, formData.senha);
      
      if (empresa) {
        loginEmpresa(empresa);
        navigate('/personalizar-empresa');
      } else {
        alert('Email ou senha incorretos!');
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-empresa-container">
      <style>{styles}</style>
      <div className="login-empresa-card animate-slide-up">
        <div className="login-empresa-header">
          <div className="empresa-login-icon">
            <i className="bi bi-building text-white"></i>
          </div>
          <h3 className="text-white mb-0 fw-bold">Portal da Empresa</h3>
          <p className="text-white-50 mb-0 mt-2">Acesse sua conta empresarial</p>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSubmit}>
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
                <i className="bi bi-envelope me-2"></i>Email da Empresa
              </label>
            </div>
            
            <div className="form-floating position-relative mb-4">
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
            
            <div className="form-check mb-4">
              <input type="checkbox" className="form-check-input" id="lembrar" />
              <label className="form-check-label text-muted" htmlFor="lembrar">
                <i className="bi bi-check2-square me-2"></i>
                Lembrar de mim
              </label>
            </div>
            
            <div className="d-grid mb-4">
              <button 
                type="submit" 
                className="btn btn-login-empresa text-white"
                disabled={carregando}
              >
                {carregando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Entrando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Acessar Portal
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="text-center mb-4">
            <Link to="/recuperar-senha-empresa" className="text-decoration-none text-success fw-medium">
              <i className="bi bi-question-circle me-1"></i>
              Esqueceu a senha?
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-muted mb-2">Não tem conta empresarial?</p>
            <Link to="/cadastro-empresa" className="btn btn-outline-success rounded-3 px-4">
              <i className="bi bi-building me-2"></i>
              Cadastrar Empresa
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginEmpresa;