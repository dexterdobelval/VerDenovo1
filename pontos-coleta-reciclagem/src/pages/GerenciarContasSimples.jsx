import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiService } from '../services/api';

function GerenciarContasSimples() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    carregarUsuarios();
  }, [user]);

  const carregarUsuarios = async () => {
    try {
      console.log('Carregando usuários...');
      const data = await apiService.listarUsuarios();
      console.log('Usuários carregados:', data);
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{padding: '2rem'}}>
      <h1>Gerenciar Contas - Teste</h1>
      <p>Total de usuários: {usuarios.length}</p>
      
      {usuarios.map(usuario => (
        <div key={usuario.id} style={{border: '1px solid #ccc', padding: '1rem', margin: '1rem 0'}}>
          <h3>{usuario.nome}</h3>
          <p>Email: {usuario.email}</p>
          <p>Status: {usuario.ativo ? 'Ativo' : 'Inativo'}</p>
        </div>
      ))}
    </div>
  );
}

export default GerenciarContasSimples;