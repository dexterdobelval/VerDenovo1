import { useState } from 'react';
import { Link } from 'react-router-dom';

function RecuperarSenha() {
  const [email, setEmail] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro('');
    setSucesso('');

    try {
      // Simulação de recuperação de senha - substituir por API real
      setSucesso('Instruções para recuperação de senha foram enviadas para seu email.');
    } catch (error) {
      setErro('Erro ao enviar email de recuperação. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-warning text-dark">
              <h4 className="mb-0">
                <i className="bi bi-key me-2"></i>
                Recuperar Senha
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
              
              <p className="text-muted mb-4">
                Digite seu email para receber instruções de recuperação de senha.
              </p>
              
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
                
                <div className="d-grid gap-2">
                  <button 
                    type="submit" 
                    className="btn btn-warning"
                    disabled={carregando}
                  >
                    {carregando ? 'Enviando...' : 'Enviar Instruções'}
                  </button>
                </div>
              </form>
              
              <div className="text-center mt-3">
                <Link to="/login-usuario" className="text-decoration-none">
                  Voltar ao Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecuperarSenha;