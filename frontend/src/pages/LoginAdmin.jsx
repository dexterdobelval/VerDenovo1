import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function LoginAdmin() {
  const navigate = useNavigate();
  const { loginAdmin } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.email === 'vitorhugobate@gmail.com' && formData.senha === '123456789Vi') {
      loginAdmin();
      alert('Login de administrador realizado com sucesso!');
      navigate('/');
    } else {
      alert('Credenciais de administrador incorretas!');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-header bg-danger text-white text-center">
            <h3><i className="bi bi-shield-lock me-2"></i>Login Administrador</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="admin@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Senha</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder="Sua senha"
                    required
                  />
                </div>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-danger">
                  <i className="bi bi-shield-lock me-2"></i>Entrar como Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;