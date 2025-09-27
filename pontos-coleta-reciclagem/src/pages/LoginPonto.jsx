import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { database } from '../services/database';

function LoginPonto() {
  const navigate = useNavigate();
  const { loginPonto } = useAuth();
  const [formData, setFormData] = useState({
    codigo: '',
    senha: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ponto = database.buscarPonto(formData.codigo, formData.senha);
    
    if (ponto) {
      loginPonto(ponto);
      alert('Acesso ao ponto realizado com sucesso!');
      navigate('/personalizar-ponto');
    } else {
      alert('Código ou senha incorretos!');
    }
  };

  return (
    <div>
      <style>{animationStyles}</style>
      <div className="row justify-content-center animate-fadeInUp">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow animate-scaleIn animate-delay-1">
            <div className="card-header bg-success text-white text-center">
              <h3><i className="bi bi-geo-alt me-2"></i>Acesso ao Ponto</h3>
            </div>
            <div className="card-body">
              <div className="alert alert-success">
                <i className="bi bi-info-circle me-2"></i>
                <small>Use o código do ponto de coleta para acessar</small>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Código do Ponto</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-qr-code"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleChange}
                      placeholder="Ex: ECO001"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Senha de Acesso</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="bi bi-key"></i>
                    </span>
                    <input
                      type="password"
                      className="form-control"
                      name="senha"
                      value={formData.senha}
                      onChange={handleChange}
                      placeholder="Senha do ponto"
                      required
                    />
                  </div>
                </div>

                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-unlock me-2"></i>Acessar Ponto
                  </button>
                </div>

                <div className="text-center">
                  <Link to="#" className="text-decoration-none text-success">
                    Problemas de acesso?
                  </Link>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <small className="text-muted">
                É uma empresa? <Link to="/login-empresa" className="text-success">Faça login aqui</Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPonto;