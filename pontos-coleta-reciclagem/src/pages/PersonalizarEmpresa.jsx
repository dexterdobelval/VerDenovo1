function PersonalizarEmpresa() {
  const salvarInformacoes = (e) => {
    e.preventDefault();
    alert('Informações da empresa salvas com sucesso!');
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
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">CNPJ</label>
                  <input type="text" className="form-control" required />
                </div>
              </div>
              
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Endereço</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">CEP</label>
                  <input type="text" className="form-control" required />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Cidade</label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Telefone</label>
                  <input type="tel" className="form-control" required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Descrição da Empresa</label>
                <textarea className="form-control" rows="3" placeholder="Descreva sua empresa e atividades..."></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Horário de Funcionamento</label>
                <input type="text" className="form-control" placeholder="Ex: 08:00 - 18:00" />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success">
                  <i className="bi bi-check-circle me-2"></i>
                  Salvar Informações
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalizarEmpresa;