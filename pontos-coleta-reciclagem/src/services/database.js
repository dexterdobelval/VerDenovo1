// Simulação de banco de dados local
class Database {
  constructor() {
    this.pontos = JSON.parse(localStorage.getItem('pontos') || '[]');
    this.empresas = JSON.parse(localStorage.getItem('empresas') || '[]');
  }

  // Pontos de Coleta
  adicionarPonto(ponto) {
    const novoPonto = {
      id: Date.now(),
      ...ponto,
      dataCadastro: new Date().toISOString()
    };
    this.pontos.push(novoPonto);
    localStorage.setItem('pontos', JSON.stringify(this.pontos));
    return novoPonto;
  }

  buscarPonto(codigo, senha) {
    return this.pontos.find(p => p.codigo === codigo && p.senha === senha);
  }

  listarPontos() {
    return this.pontos;
  }

  excluirPonto(id) {
    this.pontos = this.pontos.filter(p => p.id !== id);
    localStorage.setItem('pontos', JSON.stringify(this.pontos));
  }

  atualizarPonto(id, dadosAtualizados) {
    const index = this.pontos.findIndex(p => p.id === id);
    if (index !== -1) {
      this.pontos[index] = { ...this.pontos[index], ...dadosAtualizados };
      localStorage.setItem('pontos', JSON.stringify(this.pontos));
      return this.pontos[index];
    }
    return null;
  }

  // Empresas
  adicionarEmpresa(empresa) {
    const novaEmpresa = {
      id: Date.now(),
      ...empresa,
      dataCadastro: new Date().toISOString()
    };
    this.empresas.push(novaEmpresa);
    localStorage.setItem('empresas', JSON.stringify(this.empresas));
    return novaEmpresa;
  }

  buscarEmpresa(email, senha) {
    return this.empresas.find(e => e.email === email && e.senha === senha);
  }

  listarEmpresas() {
    return this.empresas;
  }

  excluirEmpresa(id) {
    this.empresas = this.empresas.filter(e => e.id !== id);
    localStorage.setItem('empresas', JSON.stringify(this.empresas));
  }

  atualizarEmpresa(id, dadosAtualizados) {
    const index = this.empresas.findIndex(e => e.id === id);
    if (index !== -1) {
      this.empresas[index] = { ...this.empresas[index], ...dadosAtualizados };
      localStorage.setItem('empresas', JSON.stringify(this.empresas));
      return this.empresas[index];
    }
    return null;
  }
}

export const database = new Database();