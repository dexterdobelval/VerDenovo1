import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../services/database';

function PersonalizarPonto() {
  const { usuario, logout, loginPonto } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    cep: '',
    cidade: '',
    telefone: '',
    horario: '',
    descricao: '',
    materiais: {
      papel: false,
      plastico: false,
      vidro: false,
      metal: false
    }
  });

  useEffect(() => {
    if (usuario && usuario.dados) {
      setFormData({
        nome: usuario.dados.nome || '',
        endereco: usuario.dados.endereco || '',
        cep: usuario.dados.cep || '',
        cidade: usuario.dados.cidade || '',
        telefone: usuario.dados.telefone || '',
        horario: usuario.dados.horario || '',
        descricao: usuario.dados.descricao || '',
        materiais: usuario.dados.materiais || {
          papel: false,
          plastico: false,
          vidro: false,
          metal: false
        }
      });
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('materiais.')) {
      const material = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        materiais: {
          ...prev.materiais,
          [material]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const salvarInformacoes = (e) => {
    e.preventDefault();
    
    const pontoAtualizado = database.atualizarPonto(usuario.dados.id, formData);
    
    if (pontoAtualizado) {
      // Atualizar contexto de autenticação com novos dados
      loginPonto(pontoAtualizado);
      alert('Informações do ponto de coleta salvas com sucesso!');
    } else {
      alert('Erro ao salvar informações!');
    }
  };

  const excluirPonto = () => {
    if (window.confirm('Tem certeza que deseja excluir este ponto de coleta? Esta ação não pode ser desfeita.')) {
      database.excluirPonto(usuario.dados.id);
      logout();
      alert('Ponto de coleta excluído com sucesso!');
      navigate('/');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">
              <i className="bi bi-geo-alt me-2"></i>
              Personalizar Informações do Ponto de Coleta
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={salvarInformacoes}>
              <div className="mb-3">
                <label className="form-label">Nome do Ponto de Coleta</label>
                <input 
                  type="text" 
                  name="nome"
                  className="form-control" 
                  value={formData.nome}
                  onChange={handleChange}
                  required 
                />
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
                <label className="form-label">Horário de Funcionamento</label>
                <input 
                  type="text" 
                  name="horario"
                  className="form-control" 
                  placeholder="Ex: 08:00 - 18:00" 
                  value={formData.horario}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Materiais Aceitos</label>
                <div className="row">
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="materiais.papel"
                        id="papel" 
                        checked={formData.materiais.papel}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="papel">
                        Papel
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="materiais.plastico"
                        id="plastico" 
                        checked={formData.materiais.plastico}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="plastico">
                        Plástico
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="materiais.vidro"
                        id="vidro" 
                        checked={formData.materiais.vidro}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="vidro">
                        Vidro
                      </label>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input 
                        className="form-check-input" 
                        type="checkbox" 
                        name="materiais.metal"
                        id="metal" 
                        checked={formData.materiais.metal}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor="metal">
                        Metal
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Descrição do Ponto</label>
                <textarea 
                  className="form-control" 
                  name="descricao"
                  rows="3" 
                  placeholder="Descreva seu ponto de coleta, facilidades, etc..."
                  value={formData.descricao}
                  onChange={handleChange}
                ></textarea>
              </div>

              {/* Fotos do Ponto de Coleta */}
              <div className="mb-4">
                <h5 className="text-success mb-3">
                  <i className="bi bi-images me-2"></i>
                  Fotos do Ponto de Coleta
                </h5>
                <div className="card border-success">
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Adicionar Fotos</label>
                      <input type="file" className="form-control" accept="image/*" multiple />
                      <small className="text-muted">Você pode selecionar múltiplas fotos do ponto de coleta</small>
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
                    onClick={excluirPonto}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Excluir Ponto
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

export default PersonalizarPonto;