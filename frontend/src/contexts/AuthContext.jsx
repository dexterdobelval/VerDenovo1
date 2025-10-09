import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    // Sempre verificar localStorage primeiro para manter login entre abas
    const savedLocal = localStorage.getItem('usuario_logado');
    if (savedLocal) return JSON.parse(savedLocal);
    
    const savedSession = sessionStorage.getItem('usuario_logado');
    return savedSession ? JSON.parse(savedSession) : null;
  });
  const [mostrarMensagemLogout, setMostrarMensagemLogout] = useState(false);

  const salvarUsuario = (dadosUsuario, lembrar = false) => {
    // Sempre salvar no localStorage para manter entre abas
    localStorage.setItem('usuario_logado', JSON.stringify(dadosUsuario));
    
    if (!lembrar) {
      // Se não marcou "lembrar", também salvar no sessionStorage como indicador
      sessionStorage.setItem('usuario_temporario', 'true');
    } else {
      sessionStorage.removeItem('usuario_temporario');
    }
  };

  useEffect(() => {
    if (!usuario) {
      localStorage.removeItem('usuario_logado');
      sessionStorage.removeItem('usuario_logado');
    }
  }, [usuario]);

  useEffect(() => {
    const handleStorageChange = () => {
      const savedLocal = localStorage.getItem('usuario_logado');
      const savedSession = sessionStorage.getItem('usuario_logado');
      const savedUser = savedLocal ? JSON.parse(savedLocal) : (savedSession ? JSON.parse(savedSession) : null);
      
      if (savedUser && (!usuario || JSON.stringify(usuario) !== JSON.stringify(savedUser))) {
        setUsuario(savedUser);
      } else if (!savedUser && usuario) {
        setUsuario(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, [usuario]);

  const loginPonto = (dadosPonto, lembrar = false) => {
    const usuario = { tipo: 'ponto', dados: dadosPonto };
    setUsuario(usuario);
    salvarUsuario(usuario, lembrar);
  };

  const loginAdmin = (lembrar = false) => {
    const usuario = { tipo: 'admin', dados: { email: 'vitorhugobate@gmail.com', nome: 'Administrador VerDenovo' } };
    setUsuario(usuario);
    salvarUsuario(usuario, lembrar);
  };

  const loginUsuario = async (email, senha, lembrar = false) => {
    try {
      const response = await apiService.login(email, senha);
      const usuario = { tipo: 'usuario', dados: response.usuario };
      setUsuario(usuario);
      salvarUsuario(usuario, lembrar);
      return response;
    } catch (error) {
      throw new Error('Credenciais inválidas');
    }
  };

  const cadastrarUsuario = async (dadosUsuario) => {
    try {
      await apiService.cadastrar(dadosUsuario);
      return { success: true };
    } catch (error) {
      throw new Error('Erro ao cadastrar usuário');
    }
  };

  const logout = () => {
    apiService.logout();
    setUsuario(null);
    localStorage.removeItem('usuario_logado');
    sessionStorage.removeItem('usuario_logado');
    sessionStorage.removeItem('usuario_temporario');
    setMostrarMensagemLogout(true);
    setTimeout(() => setMostrarMensagemLogout(false), 3000);
    window.location.href = '/';
    setTimeout(() => window.location.reload(), 100);
  };

  const isLogado = () => {
    return usuario !== null;
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      loginPonto,
      loginAdmin,
      loginUsuario,
      cadastrarUsuario,
      logout,
      isLogado,
      mostrarMensagemLogout
    }}>
      {children}
    </AuthContext.Provider>
  );
};