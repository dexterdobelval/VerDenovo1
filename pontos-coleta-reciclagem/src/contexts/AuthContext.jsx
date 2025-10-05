import { createContext, useContext, useState, useEffect } from 'react';

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
    // Verificar localStorage primeiro, depois sessionStorage
    const savedLocal = localStorage.getItem('usuario_logado');
    const savedSession = sessionStorage.getItem('usuario_logado');
    return savedLocal ? JSON.parse(savedLocal) : (savedSession ? JSON.parse(savedSession) : null);
  });

  const salvarUsuario = (dadosUsuario, lembrar = false) => {
    if (lembrar) {
      localStorage.setItem('usuario_logado', JSON.stringify(dadosUsuario));
      sessionStorage.removeItem('usuario_logado');
    } else {
      sessionStorage.setItem('usuario_logado', JSON.stringify(dadosUsuario));
      localStorage.removeItem('usuario_logado');
    }
  };

  useEffect(() => {
    if (!usuario) {
      localStorage.removeItem('usuario_logado');
      sessionStorage.removeItem('usuario_logado');
    }
  }, [usuario]);

  const loginEmpresa = (dadosEmpresa, lembrar = false) => {
    const usuario = { tipo: 'empresa', dados: dadosEmpresa };
    setUsuario(usuario);
    salvarUsuario(usuario, lembrar);
  };

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

  const loginUsuario = (dadosUsuario, lembrar = false) => {
    const usuario = { tipo: 'usuario', dados: dadosUsuario };
    setUsuario(usuario);
    salvarUsuario(usuario, lembrar);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario_logado');
    sessionStorage.removeItem('usuario_logado');
  };

  const isLogado = () => {
    return usuario !== null;
  };

  return (
    <AuthContext.Provider value={{
      usuario,
      loginEmpresa,
      loginPonto,
      loginAdmin,
      loginUsuario,
      logout,
      isLogado
    }}>
      {children}
    </AuthContext.Provider>
  );
};