import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { database } from '../services/database';

function CadastrarPonto() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [credenciais, setCredenciais] = useState({ codigo: '', senha: '' });
  const navigate = useNavigate();
  
  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.9); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
      40%, 43% { transform: translate3d(0, -8px, 0); }
      70% { transform: translate3d(0, -4px, 0); }
      90% { transform: translate3d(0, -2px, 0); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.8s ease-out; }
    .animate-slideInLeft { animation: slideInLeft 0.8s ease-out; }
    .animate-scaleIn { animation: scaleIn 0.6s ease-out; }
    .animate-bounce { animation: bounce 1s ease-in-out; }
    .animate-delay-1 { animation-delay: 0.1s; }
    .animate-delay-2 { animation-delay: 0.2s; }
    .animate-delay-5 { animation-delay: 0.5s; }
    .hover-lift { transition: transform 0.3s ease; }
    .hover-lift:hover { transform: translateY(-3px); }
  `;

  const onSubmit = async (dados) => {
    setLoading(true);
    setMensagem('');
    
    try {
      // Gerar código único para o ponto
      const codigo = 'ECO' + Math.random().toString(36).substr(2, 6).toUpperCase();
      const senha = Math.random().toString(36).substr(2, 8);
      
      const dadosCompletos = {
        ...dados,
        codigo,
        senha
      };
      
      database.adicionarPonto(dadosCompletos);
      
      setCredenciais({ codigo, senha });
      setMostrarModal(true);
      reset();
      setLoading(false);
    } catch (error) {
      setMensagem('Erro ao cadastrar ponto');
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <style>{animationStyles}</style>
      <div className="col-md-8 mx-auto animate-fadeInUp">
        <h2 className="mb-4 animate-slideInLeft">Cadastrar Ponto de Coleta</h2>
        
        {mensagem && (
          <div className={`alert ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="animate-fadeIn animate-delay-2">
          <div className="mb-3 animate-fadeInUp animate-delay-1">
            <label className="form-label">Nome do Ponto</label>
            <input
              type="text"
              className={`form-control hover-lift ${errors.nome ? 'is-invalid' : ''}`}
              {...register('nome', { required: 'Nome é obrigatório' })}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Endereço</label>
            <input
              type="text"
              className={`form-control ${errors.endereco ? 'is-invalid' : ''}`}
              {...register('endereco', { required: 'Endereço é obrigatório' })}
            />
            {errors.endereco && <div className="invalid-feedback">{errors.endereco.message}</div>}
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Cidade</label>
              <input
                type="text"
                className={`form-control ${errors.cidade ? 'is-invalid' : ''}`}
                {...register('cidade', { required: 'Cidade é obrigatória' })}
              />
              {errors.cidade && <div className="invalid-feedback">{errors.cidade.message}</div>}
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">CEP</label>
              <input
                type="text"
                className="form-control"
                {...register('cep')}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Tipos de Material</label>
            <div className="row">
              <div className="col-md-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" {...register('materiais.papel')} />
                  <label className="form-check-label">Papel</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" {...register('materiais.plastico')} />
                  <label className="form-check-label">Plástico</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" {...register('materiais.vidro')} />
                  <label className="form-check-label">Vidro</label>
                </div>
              </div>
              <div className="col-md-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" {...register('materiais.metal')} />
                  <label className="form-check-label">Metal</label>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Horário de Funcionamento</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ex: Segunda a Sexta, 8h às 17h"
              {...register('horario')}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input
              type="tel"
              className="form-control"
              {...register('telefone')}
            />
          </div>

          <button type="submit" className="btn btn-success hover-lift animate-fadeInUp animate-delay-5" disabled={loading}>
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
        </form>
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
                      <strong>Senha:</strong><br/>
                      <span className="fs-4 text-success fw-bold">{credenciais.senha}</span>
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
                    navigate('/login-ponto');
                  }}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Ir para Login
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