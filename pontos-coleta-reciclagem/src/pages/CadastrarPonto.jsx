import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../services/database';
import { useAuth } from '../contexts/AuthContext';

function CadastrarPonto() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [credenciais, setCredenciais] = useState({ codigo: '', senha: '' });
  const navigate = useNavigate();
  const { loginPonto } = useAuth();
  
  const styles = `
    .cadastro-ponto-container {
      min-height: 100vh;
      background: #f8fffe;
      padding: 20px;
    }
    .cadastro-ponto-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
      max-width: 800px;
      margin: 0 auto;
    }
    .cadastro-ponto-header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 2rem;
      text-align: center;
    }
    .ponto-icon {
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
    .btn-cadastro-ponto {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      padding: 1rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .btn-cadastro-ponto:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
    }
    .material-checkbox {
      background: #f9fafb;
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 1rem;
      transition: all 0.3s ease;
    }
    .material-checkbox:hover {
      border-color: #10b981;
      background: white;
    }
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slideInUp 0.6s ease-out; }
  `;

  const onSubmit = async (dados) => {
    setLoading(true);
    setMensagem('');
    
    try {
      // Gerar código único para o ponto
      const codigo = 'ECO' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      const dadosCompletos = {
        ...dados,
        codigo
      };
      
      database.adicionarPonto(dadosCompletos);
      
      setCredenciais({ codigo, email: dados.email });
      setMostrarModal(true);
      reset();
      setLoading(false);
    } catch (error) {
      setMensagem('Erro ao cadastrar ponto');
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-ponto-container">
      <style>{styles}</style>
      <div className="cadastro-ponto-card animate-slide-up">
        <div className="cadastro-ponto-header">
          <div className="ponto-icon">
            <i className="bi bi-geo-alt text-white"></i>
          </div>
          <h3 className="text-white mb-0 fw-bold">Cadastrar Ponto de Coleta</h3>
          <p className="text-white-50 mb-0 mt-2">Registre um novo ponto de coleta</p>
        </div>
        
        <div className="p-4">
          {mensagem && (
            <div className={`alert border-0 rounded-3 mb-4 ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
              <i className={`bi ${mensagem.includes('sucesso') ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2`}></i>
              {mensagem}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                id="nome"
                placeholder="Nome do ponto"
                {...register('nome', { required: 'Nome é obrigatório' })}
              />
              <label htmlFor="nome">
                <i className="bi bi-geo-alt me-2"></i>Nome do Ponto
              </label>
              {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${errors.endereco ? 'is-invalid' : ''}`}
                id="endereco"
                placeholder="Endereço completo"
                {...register('endereco', { required: 'Endereço é obrigatório' })}
              />
              <label htmlFor="endereco">
                <i className="bi bi-house me-2"></i>Endereço
              </label>
              {errors.endereco && <div className="invalid-feedback">{errors.endereco.message}</div>}
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className={`form-control ${errors.cidade ? 'is-invalid' : ''}`}
                    id="cidade"
                    placeholder="Cidade"
                    {...register('cidade', { required: 'Cidade é obrigatória' })}
                  />
                  <label htmlFor="cidade">
                    <i className="bi bi-building me-2"></i>Cidade
                  </label>
                  {errors.cidade && <div className="invalid-feedback">{errors.cidade.message}</div>}
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="cep"
                    placeholder="00000-000"
                    {...register('cep')}
                  />
                  <label htmlFor="cep">
                    <i className="bi bi-mailbox me-2"></i>CEP
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold mb-3">
                <i className="bi bi-recycle me-2"></i>Tipos de Material Aceitos
              </label>
              <div className="row">
                <div className="col-md-3 mb-2">
                  <div className="material-checkbox">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="papel" {...register('materiais.papel')} />
                      <label className="form-check-label" htmlFor="papel">
                        <i className="bi bi-file-text me-2 text-primary"></i>Papel
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="material-checkbox">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="plastico" {...register('materiais.plastico')} />
                      <label className="form-check-label" htmlFor="plastico">
                        <i className="bi bi-cup me-2 text-warning"></i>Plástico
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="material-checkbox">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="vidro" {...register('materiais.vidro')} />
                      <label className="form-check-label" htmlFor="vidro">
                        <i className="bi bi-cup-straw me-2 text-success"></i>Vidro
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 mb-2">
                  <div className="material-checkbox">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="metal" {...register('materiais.metal')} />
                      <label className="form-check-label" htmlFor="metal">
                        <i className="bi bi-gear me-2 text-secondary"></i>Metal
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>



            <div className="row mb-3">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="time"
                    className="form-control"
                    id="horarioAbertura"
                    {...register('horarioAbertura')}
                  />
                  <label htmlFor="horarioAbertura">
                    <i className="bi bi-clock me-2"></i>Abertura
                  </label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="time"
                    className="form-control"
                    id="horarioFechamento"
                    {...register('horarioFechamento')}
                  />
                  <label htmlFor="horarioFechamento">
                    <i className="bi bi-clock me-2"></i>Fechamento
                  </label>
                </div>
              </div>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                placeholder="ponto@email.com"
                {...register('email', { required: 'Email é obrigatório' })}
              />
              <label htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email do Ponto
              </label>
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className={`form-control ${errors.senha ? 'is-invalid' : ''}`}
                id="senha"
                placeholder="Senha do ponto"
                {...register('senha', { required: 'Senha é obrigatória' })}
              />
              <label htmlFor="senha">
                <i className="bi bi-lock me-2"></i>Senha
              </label>
              {errors.senha && <div className="invalid-feedback">{errors.senha.message}</div>}
            </div>

            <div className="form-floating mb-4">
              <input
                type="tel"
                className="form-control"
                id="telefone"
                placeholder="(00) 00000-0000"
                {...register('telefone')}
              />
              <label htmlFor="telefone">
                <i className="bi bi-telephone me-2"></i>Telefone
              </label>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-cadastro-ponto text-white" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Cadastrando...
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-2"></i>
                    Cadastrar Ponto
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Modal de Sucesso */}
      {mostrarModal && (
        <div className="modal d-block animate-fadeIn" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content animate-scaleIn">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">
                  <i className="bi bi-check-circle me-2"></i>
                  Ponto Cadastrado com Sucesso!
                </h5>
              </div>
              <div className="modal-body text-center p-4">
                <div className="alert alert-success">
                  <h4 className="alert-heading">Suas Credenciais de Acesso</h4>
                  <hr/>
                  <div className="row">
                    <div className="col-6">
                      <strong>Código do Ponto:</strong><br/>
                      <span className="fs-4 text-success fw-bold">{credenciais.codigo}</span>
                    </div>
                    <div className="col-6">
                      <strong>Email:</strong><br/>
                      <span className="fs-6 text-success fw-bold">{credenciais.email}</span>
                    </div>
                  </div>
                  <hr/>
                  <small className="text-muted">Anote essas informações para fazer login</small>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-success hover-lift animate-bounce"
                  onClick={() => {
                    setMostrarModal(false);
                    loginPonto({ codigo: credenciais.codigo, email: credenciais.email });
                    navigate('/');
                  }}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Entrar Automaticamente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CadastrarPonto;