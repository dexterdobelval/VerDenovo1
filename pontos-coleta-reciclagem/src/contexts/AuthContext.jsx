import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const loginEmpresa = (dadosEmpresa) => {
    setUsuario({ tipo: 'empresa', dados: dadosEmpresa });
  };

  const loginPonto = (dadosPonto) => {
    setUsuario({ tipo: 'ponto', dados: dadosPonto });
  };

  const loginAdmin = () => {
    setUsuario({ tipo: 'admin', dados: { email: 'vitorhugobate@gmail.com' } });
  };

  const logout = () => {
    setUsuario(null);
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
      logout,
      isLogado
    }}>
      {children}
    </AuthContext.Provider>
  );
};