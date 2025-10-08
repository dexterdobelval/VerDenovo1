import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../services/database';
import { useAuth } from '../contexts/AuthContext';

function CadastrarPonto() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();
  
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
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    .animate-slide-up { animation: slideInUp 0.6s ease-out; }
  `;

  const onSubmit = async (dados) => {
    setLoading(true);
    setMensagem('');
    
    try {
      database.adicionarPonto(dados);
      
      setMensagem('Ponto cadastrado com sucesso!');
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
                maxLength="50"
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
                className={`form-control ${errors.numero ? 'is-invalid' : ''}`}
                id="numero"
                placeholder="Número"
                maxLength="10"
                {...register('numero', { required: 'Número é obrigatório' })}
              />
              <label htmlFor="numero">
                <i className="bi bi-hash me-2"></i>Número
              </label>
              {errors.numero && <div className="invalid-feedback">{errors.numero.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="complemento"
                placeholder="Complemento (opcional)"
                maxLength="50"
                {...register('complemento')}
              />
              <label htmlFor="complemento">
                <i className="bi bi-house me-2"></i>Complemento
              </label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${errors.cep ? 'is-invalid' : ''}`}
                id="cep"
                placeholder="00000-000"
                maxLength="9"
                {...register('cep', { required: 'CEP é obrigatório' })}
              />
              <label htmlFor="cep">
                <i className="bi bi-mailbox me-2"></i>CEP
              </label>
              {errors.cep && <div className="invalid-feedback">{errors.cep.message}</div>}
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



            <div className="form-floating mb-3">
              <input
                type="text"
                className={`form-control ${errors.horaFuncionamento ? 'is-invalid' : ''}`}
                id="horaFuncionamento"
                placeholder="Ex: 08:00 às 18:00"
                maxLength="200"
                {...register('horaFuncionamento', { required: 'Horário de funcionamento é obrigatório' })}
              />
              <label htmlFor="horaFuncionamento">
                <i className="bi bi-clock me-2"></i>Horário de Funcionamento
              </label>
              {errors.horaFuncionamento && <div className="invalid-feedback">{errors.horaFuncionamento.message}</div>}
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="ponto@email.com"
                maxLength="50"
                {...register('email')}
              />
              <label htmlFor="email">
                <i className="bi bi-envelope me-2"></i>Email do Ponto
              </label>
            </div>

            <div className="form-floating mb-4">
              <input
                type="tel"
                className="form-control"
                id="telefone"
                placeholder="(00) 00000-0000"
                maxLength="20"
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
      

    </div>
  );
}

export default CadastrarPonto;