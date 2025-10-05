import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PontosColeta from './pages/PontosColeta';
import CadastrarPonto from './pages/CadastrarPonto';
import CadastroEmpresa from './pages/CadastroEmpresa';
import LoginEmpresa from './pages/LoginEmpresa';
import LoginPonto from './pages/LoginPonto';
import LoginAdmin from './pages/LoginAdmin';
import LoginUsuario from './pages/LoginUsuario';
import CadastroUsuario from './pages/CadastroUsuario';
import RecuperarSenha from './pages/RecuperarSenha';
import RecuperarSenhaEmpresa from './pages/RecuperarSenhaEmpresa';
import RecuperarSenhaPonto from './pages/RecuperarSenhaPonto';
import GerenciarContas from './pages/GerenciarContas';
import GerenciarContasSimples from './pages/GerenciarContasSimples';
import PersonalizarEmpresa from './pages/PersonalizarEmpresa';
import PersonalizarPonto from './pages/PersonalizarPonto';
import MateriaisReciclaveis from './pages/MateriaisReciclaveis';
import Residuos from './pages/Residuos';
import FAQ from './pages/FAQ';
import Sobre from './pages/Sobre';
import Conscientizacao from './pages/Conscientizacao';
import EmpresasParceiras from './pages/EmpresasParceiras';

function Layout() {
  const location = useLocation();
  const isAuthPage = [
    '/login-usuario', 
    '/login-empresa', 
    '/login-ponto', 
    '/login-admin', 
    '/cadastro-usuario', 
    '/cadastro-empresa', 
    '/cadastrar', 
    '/recuperar-senha',
    '/recuperar-senha-empresa',
    '/recuperar-senha-ponto'
  ].includes(location.pathname);

  return (
    <div className="App">
      <Navbar />
      <div className="container" style={{marginTop: '88px'}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pontos" element={<PontosColeta />} />
          <Route path="/cadastrar" element={<CadastrarPonto />} />
          <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
          <Route path="/login-empresa" element={<LoginEmpresa />} />
          <Route path="/login-ponto" element={<LoginPonto />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/login-usuario" element={<LoginUsuario />} />
          <Route path="/cadastro-usuario" element={<CadastroUsuario />} />
          <Route path="/recuperar-senha" element={<RecuperarSenha />} />
          <Route path="/recuperar-senha-empresa" element={<RecuperarSenhaEmpresa />} />
          <Route path="/recuperar-senha-ponto" element={<RecuperarSenhaPonto />} />
          <Route path="/gerenciar-contas" element={<GerenciarContas />} />
          <Route path="/gerenciar-contas-teste" element={<GerenciarContasSimples />} />
          <Route path="/personalizar-empresa" element={<PersonalizarEmpresa />} />
          <Route path="/personalizar-ponto" element={<PersonalizarPonto />} />
          <Route path="/materiais" element={<MateriaisReciclaveis />} />
          <Route path="/residuos" element={<Residuos />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/conscientizacao" element={<Conscientizacao />} />
          <Route path="/empresas-parceiras" element={<EmpresasParceiras />} />
        </Routes>
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;