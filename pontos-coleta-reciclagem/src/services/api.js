import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
});

export const pontosColetaAPI = {
  listar: () => api.get('/pontos'),
  buscarPorId: (id) => api.get(`/pontos/${id}`),
  criar: (dados) => api.post('/pontos', dados),
  atualizar: (id, dados) => api.put(`/pontos/${id}`, dados),
  deletar: (id) => api.delete(`/pontos/${id}`),
};

export default api;