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