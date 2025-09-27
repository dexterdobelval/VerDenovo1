import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { loginUsuario, loginAdmin } = useAuth();
  const navigate = useNavigate();

  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-scaleIn { animation: scaleIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-delay-1 { animation-delay: 0.2s; animation-fill-mode: both; }
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      // Verificar se é admin
      if (email === 'vitorhugobate@gmail.com' && senha === '123456789Vi') {
        loginAdmin();
        navigate('/');
      } else if (email && senha) {
        loginUsuario({ email });
        navigate('/');
      } else {
        setErro('Email e senha são obrigatórios');
      }
    } catch (error) {
      setErro('Erro ao fazer login. Verifique suas credenciais.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container mt-5">
      <style>{animationStyles}</style>
      <div className="row justify-content-center animate-fadeInUp">
        <div className="col-md-6">
          <div className="card animate-scaleIn animate-delay-1">
            <div className="card-header bg-success text-white">
              <h4 className="mb-0">
                <i className="bi bi-person-circle me-2"></i>
                Login de Usuário
              </h4>
            </div>
            <div className="card-body">
              {erro && (
                <div className="alert alert-danger" role="alert">
                  {erro}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={carregando}
                  >
                    {carregando ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-3">
                <Link to="/recuperar-senha" className="text-decoration-none">
                  Esqueceu sua senha?
                </Link>
              </div>
              
              <div className="text-center mt-3">
                <span>Não tem uma conta? </span>
                <Link to="/cadastro-usuario" className="text-decoration-none">
                  Cadastre-se aqui
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginUsuario;