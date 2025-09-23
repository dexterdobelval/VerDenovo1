import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PontosColeta from './pages/PontosColeta';
import CadastrarPonto from './pages/CadastrarPonto';
import CadastroEmpresa from './pages/CadastroEmpresa';
import LoginEmpresa from './pages/LoginEmpresa';
import LoginPonto from './pages/LoginPonto';
import LoginAdmin from './pages/LoginAdmin';
import PersonalizarEmpresa from './pages/PersonalizarEmpresa';
import PersonalizarPonto from './pages/PersonalizarPonto';
import MateriaisReciclaveis from './pages/MateriaisReciclaveis';
import Residuos from './pages/Residuos';
import FAQ from './pages/FAQ';
import Sobre from './pages/Sobre';
import Conscientizacao from './pages/Conscientizacao';
import EmpresasParceiras from './pages/EmpresasParceiras';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mt-4">
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pontos" element={<PontosColeta />} />
            <Route path="/cadastrar" element={<CadastrarPonto />} />
            <Route path="/cadastro-empresa" element={<CadastroEmpresa />} />
            <Route path="/login-empresa" element={<LoginEmpresa />} />
            <Route path="/login-ponto" element={<LoginPonto />} />
            <Route path="/login-admin" element={<LoginAdmin />} />
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
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;