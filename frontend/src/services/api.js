const API_BASE_URL = 'http://localhost:8080/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', response.status, errorText);
        
        try {
          const errorJson = JSON.parse(errorText);
          throw new Error(errorJson.message || `HTTP error! status: ${response.status}`);
        } catch (parseError) {
          throw new Error(errorText || `HTTP error! status: ${response.status}`);
        }
      }
      
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        const text = await response.text();
        return { message: text };
      }
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Autenticação
  async login(email, senha) {
    const loginData = { email, senha };
    console.log('Dados de login:', loginData);
    console.log('URL completa:', `${API_BASE_URL}/auth/login`);
    
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('usuario', JSON.stringify(response.usuario));
    }
    
    return response;
  }

  async cadastrar(usuario) {
    const userData = {
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      nivelAcesso: usuario.nivelAcesso || 'USER'
    };
    
    console.log('Enviando dados:', userData);
    
    return await this.request('/auth/cadastro', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  // Pontos de Coleta
  async listarPontos() {
    return await this.request('/pontos');
  }
  
  async listarTodosPontos() {
    return await this.request('/pontos/todos');
  }

  async criarPonto(ponto) {
    return await this.request('/pontos', {
      method: 'POST',
      body: JSON.stringify(ponto),
    });
  }

  async atualizarPonto(id, ponto) {
    return await this.request(`/pontos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(ponto),
    });
  }

  async alterarStatusPonto(id) {
    return await this.request(`/pontos/${id}/status`, {
      method: 'PUT',
    });
  }

  async deletarPonto(id) {
    return await this.request(`/pontos/${id}`, {
      method: 'DELETE',
    });
  }

  // Categorias
  async listarCategorias() {
    return await this.request('/categorias');
  }
  
  // Usuários
  async listarUsuarios() {
    return await this.request('/auth/usuarios');
  }
  
  async alterarStatusUsuario(id) {
    return await this.request(`/auth/usuarios/${id}/status`, {
      method: 'PUT',
    });
  }
  
  async deletarUsuario(id) {
    return await this.request(`/auth/usuarios/${id}`, {
      method: 'DELETE',
    });
  }
  
  // Login para pontos de coleta
  async loginPonto(email, senha) {
    const loginData = { email, senha };
    
    const response = await this.request('/pontos/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
    });
    
    if (response.token) {
      this.token = response.token;
      localStorage.setItem('token', response.token);
      localStorage.setItem('ponto', JSON.stringify(response.ponto));
    }
    
    return response;
  }

  // Verificar se está autenticado
  isAuthenticated() {
    return !!this.token;
  }

  getUsuarioLogado() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}

export const apiService = new ApiService();