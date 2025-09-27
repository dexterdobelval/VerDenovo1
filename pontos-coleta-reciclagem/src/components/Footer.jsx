import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="text-white mt-5" style={{background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', borderTop: '3px solid #28a745'}}>
      {/* Seção Principal */}
      <div className="py-5">
        <div className="container">
          <div className="row">
            {/* Logo e Descrição */}
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="d-flex align-items-center mb-3">
                <img src="/Verdenovologo.png" alt="VerDenovo" style={{height: '40px'}} className="me-2" />
                <h4 className="mb-0 fw-bold">VerDenovo</h4>
              </div>
              <p className="text-light mb-3">Transformando o futuro através da reciclagem inteligente. Conectamos pessoas, empresas e pontos de coleta para um mundo mais sustentável.</p>
              <div className="d-flex gap-3">
                <a href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
                <a href="#" className="text-white fs-5"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
              </div>
            </div>
            
            {/* Navegação */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold mb-3 text-uppercase">Navegação</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/" className="text-light text-decoration-none hover-link">Início</Link></li>
                <li className="mb-2"><Link to="/pontos" className="text-light text-decoration-none hover-link">Pontos de Coleta</Link></li>
                <li className="mb-2"><Link to="/empresas-parceiras" className="text-light text-decoration-none hover-link">Empresas Parceiras</Link></li>
                <li className="mb-2"><Link to="/sobre" className="text-light text-decoration-none hover-link">Sobre Nós</Link></li>
              </ul>
            </div>
            
            {/* Serviços */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h6 className="fw-bold mb-3 text-uppercase">Serviços</h6>
              <ul className="list-unstyled">
                <li className="mb-2"><Link to="/materiais" className="text-light text-decoration-none hover-link">Materiais Recicláveis</Link></li>
                <li className="mb-2"><Link to="/residuos" className="text-light text-decoration-none hover-link">Gestão de Resíduos</Link></li>
                <li className="mb-2"><Link to="/conscientizacao" className="text-light text-decoration-none hover-link">Conscientização</Link></li>
                <li className="mb-2"><Link to="/faq" className="text-light text-decoration-none hover-link">FAQ</Link></li>
              </ul>
            </div>
            
            {/* Contato */}
            <div className="col-lg-4 col-md-6 mb-4">
              <h6 className="fw-bold mb-3 text-uppercase">Contato</h6>
              <div className="mb-2">
                <i className="bi bi-geo-alt-fill me-2 text-success"></i>
                <span className="text-light">São Paulo, SP - Brasil</span>
              </div>
              <div className="mb-2">
                <i className="bi bi-envelope-fill me-2 text-success"></i>
                <a href="mailto:contato@verdenovo.com.br" className="text-light text-decoration-none hover-link">contato@verdenovo.com.br</a>
              </div>
              <div className="mb-2">
                <i className="bi bi-telephone-fill me-2 text-success"></i>
                <a href="tel:+5511999999999" className="text-light text-decoration-none hover-link">(11) 99999-9999</a>
              </div>
              <div className="mb-3">
                <i className="bi bi-clock-fill me-2 text-success"></i>
                <span className="text-light">Seg - Sex: 8h às 18h</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Seção Inferior */}
      <div className="py-3" style={{backgroundColor: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="mb-0 text-light">&copy; 2024 VerDenovo Soluções Ambientais Ltda. Todos os direitos reservados.</p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="d-flex justify-content-md-end gap-3 mt-2 mt-md-0">
                <a href="#" className="text-light text-decoration-none hover-link small">Política de Privacidade</a>
                <span className="text-muted">|</span>
                <a href="#" className="text-light text-decoration-none hover-link small">Termos de Uso</a>
                <span className="text-muted">|</span>
                <a href="#" className="text-light text-decoration-none hover-link small">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hover-link:hover {
          color: #28a745 !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
}

export default Footer;