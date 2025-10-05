// API service para conectar com backend Spring Boot
class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:8081/api';
  }

  // Usuários
  async listarUsuarios() {
    try {
      const response = await fetch(`${this.baseURL}/usuarios`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar usuários:', error);
      return [];
    }
  }

  async cadastrarUsuario(dadosUsuario) {
    try {
      const response = await fetch(`${this.baseURL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dadosUsuario, ativo: true })
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      throw error;
    }
  }

  async loginUsuario(email, senha) {
    try {
      const response = await fetch(`${this.baseURL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Erro no login usuário:', error);
      return null;
    }
  }

  // Empresas
  async listarEmpresas() {
    try {
      const response = await fetch(`${this.baseURL}/empresas`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar empresas:', error);
      return [];
    }
  }

  async cadastrarEmpresa(dadosEmpresa) {
    try {
      const response = await fetch(`${this.baseURL}/empresas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dadosEmpresa, ativo: true })
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar empresa:', error);
      throw error;
    }
  }

  async loginEmpresa(email, senha) {
    try {
      const response = await fetch(`${this.baseURL}/empresas/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Erro no login empresa:', error);
      return null;
    }
  }

  async atualizarEmpresa(id, dadosAtualizados) {
    try {
      const response = await fetch(`${this.baseURL}/empresas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error);
      throw error;
    }
  }

  // Pontos de Coleta
  async listarPontos() {
    try {
      const response = await fetch(`${this.baseURL}/pontos`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar pontos:', error);
      return [];
    }
  }

  async cadastrarPonto(dadosPonto) {
    try {
      const response = await fetch(`${this.baseURL}/pontos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dadosPonto, ativo: true })
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao cadastrar ponto:', error);
      throw error;
    }
  }

  async loginPonto(email, senha) {
    try {
      const response = await fetch(`${this.baseURL}/pontos/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error('Erro no login ponto:', error);
      return null;
    }
  }

  async atualizarPonto(id, dadosAtualizados) {
    try {
      const response = await fetch(`${this.baseURL}/pontos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosAtualizados)
      });
      return await response.json();
    } catch (error) {
      console.error('Erro ao atualizar ponto:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();