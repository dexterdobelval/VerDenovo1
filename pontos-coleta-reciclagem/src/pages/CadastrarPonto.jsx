import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { pontosColetaAPI } from '../services/api';

function CadastrarPonto() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  const onSubmit = async (dados) => {
    setLoading(true);
    setMensagem('');
    
    try {
      await pontosColetaAPI.criar(dados);
      setMensagem('Ponto de coleta cadastrado com sucesso!');
      reset();
    } catch (error) {
      setMensagem('Erro ao cadastrar ponto de coleta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <h2 className="mb-4">Cadastrar Ponto de Coleta</h2>
        
        {mensagem && (
          <div className={`alert ${mensagem.includes('sucesso') ? 'alert-success' : 'alert-danger'}`}>
            {mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nome do Ponto</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
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

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar Ponto'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastrarPonto;