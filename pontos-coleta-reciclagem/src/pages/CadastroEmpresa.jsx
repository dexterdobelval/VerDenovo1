import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    alert('Empresa cadastrada com sucesso!');
    console.log('Dados da empresa:', formData);
    setTimeout(() => {
      navigate('/login-empresa');
    }, 2000);
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow">
          <div className="card-header bg-success text-white text-center">
            <h3><i className="bi bi-building me-2"></i>Cadastro de Empresa</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome da Empresa</label>
                <input
                  type="text"
                  className="form-control"
                  name="nomeEmpresa"
                  value={formData.nomeEmpresa}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">CNPJ</label>
                <input
                  type="text"
                  className="form-control"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  placeholder="00.000.000/0000-00"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirmar Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirmarSenha"
                    value={formData.confirmarSenha}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Endereço</label>
                <input
                  type="text"
                  className="form-control"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Cidade</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">CEP</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    placeholder="00000-000"
                    required
                  />
                </div>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-check-circle me-2"></i>Cadastrar Empresa
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CadastroEmpresa;