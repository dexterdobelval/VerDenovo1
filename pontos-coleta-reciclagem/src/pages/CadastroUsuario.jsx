import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      // Simulação de cadastro - substituir por API real
      setSucesso('Cadastro realizado com sucesso! Redirecionando para login...');
      setTimeout(() => {
        navigate('/login-usuario');
      }, 2000);
    } catch (error) {
      setErro('Erro ao realizar cadastro. Tente novamente.');
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
                <i className="bi bi-person-plus me-2"></i>
                Cadastro de Usuário
              </h4>
            </div>
            <div className="card-body">
              {erro && (
                <div className="alert alert-danger" role="alert">
                  {erro}
                </div>
              )}
              
              {sucesso && (
                <div className="alert alert-success" role="alert">
                  {sucesso}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nome" className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="senha"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="confirmarSenha" className="form-label">Confirmar Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmarSenha"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-success"
                    disabled={carregando}
                  >
                    {carregando ? 'Cadastrando...' : 'Cadastrar'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-3">
                <span>Já tem uma conta? </span>
                <Link to="/login-usuario" className="text-decoration-none">
                  Faça login aqui
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;