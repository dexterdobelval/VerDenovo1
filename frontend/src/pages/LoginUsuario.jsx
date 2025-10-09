import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarMe, setLembrarMe] = useState(false);
  const { loginUsuario, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const styles = `
    .login-container {
      min-height: 100vh;
      background: #f8fffe;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 100px 20px 20px 20px;
    }
    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
      max-width: 450px;
      width: 100%;
    }
    .login-header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 2rem;
      text-align: center;
    }
    .login-icon {
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
    .btn-login {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      padding: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-login:hover {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      // Verificar se é admin
      if (email === 'admin@verdenovo.com' && senha === 'admin123') {
        loginAdmin(lembrarMe);
        navigate('/');
      } else if (email && senha) {
        await loginUsuario(email, senha, lembrarMe);
        navigate('/');
      } else {
        setErro('Email e senha são obrigatórios');
      }
    } catch (error) {
      setErro(error.message || 'Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-container">
      <style>{styles}</style>
      <div className="login-card animate-slide-up">
        <div className="login-header">
          <div className="login-icon">
            <i className="bi bi-person-circle text-white"></i>
          </div>
          <h3 className="text-white mb-0 fw-bold">Bem-vindo de volta!</h3>
          <p className="text-white-50 mb-0 mt-2">Entre na sua conta</p>
        </div>
        
        <div className="p-4">
          {erro && (
            <div className="alert alert-danger border-0 rounded-3 mb-4" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {erro}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="seu@email.com"
                maxLength="100"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email
              </label>
            </div>
            
            <div className="form-floating position-relative mb-4">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                className="form-control"
                id="senha"
                placeholder="Sua senha"
                maxLength="100"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
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
              <input
                className="form-check-input"
                type="checkbox"
                id="lembrarMe"
                checked={lembrarMe}
                onChange={(e) => setLembrarMe(e.target.checked)}
              />
              <label className="form-check-label text-muted" htmlFor="lembrarMe">
                <i className="bi bi-bookmark-check me-2"></i>
                Lembrar de mim
              </label>
            </div>
            
            <div className="d-grid mb-4">
              <button 
                type="submit" 
                className="btn btn-login text-white"
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
                    Entrar
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="text-center mb-4">
            <Link to="/recuperar-senha" className="text-decoration-none text-success fw-medium">
              <i className="bi bi-question-circle me-1"></i>
              Esqueceu sua senha?
            </Link>
          </div>
          
          <div className="text-center">
            <p className="text-muted mb-2">Não tem uma conta?</p>
            <Link to="/cadastro-usuario" className="btn btn-outline-success rounded-3 px-4">
              <i className="bi bi-person-plus me-2"></i>
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUsuario;