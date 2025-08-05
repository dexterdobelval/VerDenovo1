import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginEmpresa() {
  const navigate = useNavigate();
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
    alert('Login realizado com sucesso!');
    navigate('/personalizar-empresa');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow">
          <div className="card-header bg-success text-white text-center">
            <h3><i className="bi bi-building me-2"></i>Login Empresa</h3>
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
                    placeholder="empresa@email.com"
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

              <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="lembrar" />
                <label className="form-check-label" htmlFor="lembrar">
                  Lembrar de mim
                </label>
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-box-arrow-in-right me-2"></i>Entrar
                </button>
              </div>

              <div className="text-center">
                <Link to="#" className="text-decoration-none text-success">
                  Esqueceu a senha?
                </Link>
              </div>
            </form>
          </div>
          <div className="card-footer text-center">
            <small className="text-muted">
              Não tem conta? <Link to="/cadastro-empresa" className="text-success">Cadastre-se</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginEmpresa;