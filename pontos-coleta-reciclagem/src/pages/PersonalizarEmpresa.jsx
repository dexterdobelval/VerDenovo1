import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { database } from '../services/database';

function PersonalizarEmpresa() {
  const { usuario, logout, loginEmpresa } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    cep: '',
    descricao: '',
    horario: ''
  });

  useEffect(() => {
    if (usuario && usuario.dados) {
      setFormData({
        nomeEmpresa: usuario.dados.nomeEmpresa || '',
        cnpj: usuario.dados.cnpj || '',
        email: usuario.dados.email || '',
        telefone: usuario.dados.telefone || '',
        endereco: usuario.dados.endereco || '',
        cidade: usuario.dados.cidade || '',
        cep: usuario.dados.cep || '',
        descricao: usuario.dados.descricao || '',
        horario: usuario.dados.horario || ''
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const salvarInformacoes = (e) => {
    e.preventDefault();
    
    const empresaAtualizada = database.atualizarEmpresa(usuario.dados.id, formData);
    
    if (empresaAtualizada) {
      // Atualizar contexto de autenticação com novos dados
      loginEmpresa(empresaAtualizada);
      alert('Informações da empresa salvas com sucesso!');
    } else {
      alert('Erro ao salvar informações!');
    }
  };

  const excluirEmpresa = () => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa? Esta ação não pode ser desfeita.')) {
      database.excluirEmpresa(usuario.dados.id);
      logout();
      alert('Empresa excluída com sucesso!');
      navigate('/');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">
              <i className="bi bi-building me-2"></i>
              Personalizar Informações da Empresa
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={salvarInformacoes}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nome da Empresa</label>
                  <input 
                    type="text" 
                    name="nomeEmpresa"
                    className="form-control" 
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">CNPJ</label>
                  <input 
                    type="text" 
                    name="cnpj"
                    className="form-control" 
                    value={formData.cnpj}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Endereço</label>
                  <input 
                    type="text" 
                    name="endereco"
                    className="form-control" 
                    value={formData.endereco}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">CEP</label>
                  <input 
                    type="text" 
                    name="cep"
                    className="form-control" 
                    value={formData.cep}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Cidade</label>
                  <input 
                    type="text" 
                    name="cidade"
                    className="form-control" 
                    value={formData.cidade}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Telefone</label>
                  <input 
                    type="tel" 
                    name="telefone"
                    className="form-control" 
                    value={formData.telefone}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descrição da Empresa</label>
                <textarea 
                  className="form-control" 
                  name="descricao"
                  rows="3" 
                  placeholder="Descreva sua empresa e atividades..."
                  value={formData.descricao}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Horário de Funcionamento</label>
                <input 
                  type="text" 
                  name="horario"
                  className="form-control" 
                  placeholder="Ex: 08:00 - 18:00" 
                  value={formData.horario}
                  onChange={handleChange}
                />
              </div>

              {/* Logo da Empresa */}
              <div className="mb-4">
                <h5 className="text-success mb-3">
                  <i className="bi bi-image me-2"></i>
                  Logo da Empresa
                </h5>
                <div className="card border-success">
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Carregar Logo</label>
                      <input type="file" className="form-control" accept="image/*" />
                    </div>
                    <div className="text-center">
                      <div className="bg-light border rounded-circle p-4" style={{width: '150px', height: '150px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <i className="bi bi-image text-muted" style={{fontSize: '3rem'}}></i>
                      </div>
                      <small className="text-muted mt-2 d-block">Preview do logo</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fotos da Empresa */}
              <div className="mb-4">
                <h5 className="text-success mb-3">
                  <i className="bi bi-images me-2"></i>
                  Fotos da Empresa
                </h5>
                <div className="card border-success">
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Adicionar Fotos</label>
                      <input type="file" className="form-control" accept="image/*" multiple />
                      <small className="text-muted">Você pode selecionar múltiplas fotos</small>
                    </div>
                    <div className="row">
                      <div className="col-md-3 mb-3">
                        <div className="bg-light border rounded" style={{height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <i className="bi bi-plus-circle text-muted" style={{fontSize: '2rem'}}></i>
                        </div>
                        <small className="text-muted">Foto 1</small>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="bg-light border rounded" style={{height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <i className="bi bi-plus-circle text-muted" style={{fontSize: '2rem'}}></i>
                        </div>
                        <small className="text-muted">Foto 2</small>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="bg-light border rounded" style={{height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <i className="bi bi-plus-circle text-muted" style={{fontSize: '2rem'}}></i>
                        </div>
                        <small className="text-muted">Foto 3</small>
                      </div>
                      <div className="col-md-3 mb-3">
                        <div className="bg-light border rounded" style={{height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <i className="bi bi-plus-circle text-muted" style={{fontSize: '2rem'}}></i>
                        </div>
                        <small className="text-muted">Foto 4</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8">
                  <button type="submit" className="btn btn-success w-100">
                    <i className="bi bi-check-circle me-2"></i>
                    Salvar Informações
                  </button>
                </div>
                <div className="col-md-4">
                  <button 
                    type="button" 
                    className="btn btn-danger w-100"
                    onClick={excluirEmpresa}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Excluir Empresa
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalizarEmpresa;