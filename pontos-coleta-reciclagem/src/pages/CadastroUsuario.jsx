import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function CadastroUsuario() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);
  const navigate = useNavigate();
  const { loginUsuario, cadastrarUsuario } = useAuth();

  const styles = `
    .cadastro-container {
      min-height: 100vh;
      background: #f8fffe;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .cadastro-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
      max-width: 500px;
      width: 100%;
    }
    .cadastro-header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 2rem;
      text-align: center;
    }
    .cadastro-icon {
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
    .btn-cadastro {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      padding: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-cadastro:hover {
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
    .progress-bar {
      height: 4px;
      background: #e5e7eb;
      border-radius: 2px;
      overflow: hidden;
      margin-top: 0.5rem;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #ef4444, #f59e0b, #10b981);
      transition: width 0.3s ease;
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
    setErro('');
    setSucesso('');

    if (formData.senha !== formData.confirmarSenha) {
      setErro('As senhas não coincidem');
      setCarregando(false);
      return;
    }

    try {
      await cadastrarUsuario({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha
      });
      
      setSucesso('Cadastro realizado com sucesso! Você pode fazer login agora.');
      
      setTimeout(() => {
        navigate('/login-usuario');
      }, 2000);
    } catch (error) {
      setErro(error.message || 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.senha);

  return (
    <div className="cadastro-container">
      <style>{styles}</style>
      <div className="cadastro-card animate-slide-up">
        <div className="cadastro-header">
          <div className="cadastro-icon">
            <i className="bi bi-person-plus text-white"></i>
          </div>
          <h3 className="text-white mb-0 fw-bold">Criar Conta</h3>
          <p className="text-white-50 mb-0 mt-2">Junte-se à nossa comunidade</p>
        </div>
        
        <div className="p-4">
          {erro && (
            <div className="alert alert-danger border-0 rounded-3 mb-4" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {erro}
            </div>
          )}
          
          {sucesso && (
            <div className="alert alert-success border-0 rounded-3 mb-4" role="alert">
              <i className="bi bi-check-circle me-2"></i>
              {sucesso}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={handleChange}
                maxLength="100"
                required
              />
              <label htmlFor="nome">
                <i className="bi bi-person me-2"></i>Nome Completo
              </label>
            </div>
            
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                maxLength="100"
                required
              />
              <label htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email
              </label>
            </div>
            
            <div className="form-floating position-relative mb-2">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                className="form-control"
                id="senha"
                name="senha"
                placeholder="Sua senha"
                value={formData.senha}
                onChange={handleChange}
                maxLength="100"
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
            
            {formData.senha && (
              <div className="mb-3">
                <div className="progress-bar">
                  <div className="progress-fill" style={{width: `${passwordStrength}%`}}></div>
                </div>
                <small className="text-muted">
                  Força da senha: {passwordStrength < 50 ? 'Fraca' : passwordStrength < 75 ? 'Média' : 'Forte'}
                </small>
              </div>
            )}
            
            <div className="form-floating position-relative mb-4">
              <input
                type={mostrarConfirmarSenha ? 'text' : 'password'}
                className="form-control"
                id="confirmarSenha"
                name="confirmarSenha"
                placeholder="Confirme sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                maxLength="100"
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
            
            <div className="d-grid mb-4">
              <button 
                type="submit" 
                className="btn btn-cadastro text-white"
                disabled={carregando}
              >
                {carregando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-check me-2"></i>
                    Criar Conta
                  </>
                )}
              </button>
            </div>
          </form>
          
          <div className="text-center">
            <p className="text-muted mb-2">Já tem uma conta?</p>
            <Link to="/login-usuario" className="btn btn-outline-success rounded-3 px-4">
              <i className="bi bi-box-arrow-in-right me-2"></i>
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;