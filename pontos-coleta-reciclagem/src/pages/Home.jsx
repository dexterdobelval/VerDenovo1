import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { noticiasService } from '../services/noticias';

function Home() {
  const [noticias, setNoticias] = useState([]);
  const [carregandoNoticias, setCarregandoNoticias] = useState(true);

  useEffect(() => {
    const carregarNoticias = async () => {
      try {
        const noticiasAtualizadas = await noticiasService.obterNoticias();
        setNoticias(noticiasAtualizadas);
      } catch (error) {
        console.error('Erro ao carregar notícias:', error);
      } finally {
        setCarregandoNoticias(false);
      }
    };

    carregarNoticias();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section mb-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-3 fw-bold text-success mb-4">
              <i className="bi bi-recycle me-3"></i>
              VerDenovo
            </h1>
            <p className="lead mb-4">
              Conectando você aos pontos de coleta de materiais recicláveis. 
              Juntos construímos um futuro mais sustentável para nossa cidade.
            </p>
            <div className="d-flex gap-3">
              <Link to="/pontos" className="btn btn-success btn-lg">
                <i className="bi bi-geo-alt me-2"></i>Encontrar Pontos
              </Link>
              <Link to="/cadastrar" className="btn btn-outline-success btn-lg">
                <i className="bi bi-plus-circle me-2"></i>Cadastrar Ponto
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <img src="/image.png" 
                 className="img-fluid rounded-3 shadow" 
                 alt="Sustentabilidade" />
          </div>
        </div>
      </div>

      {/* Carrossel */}
      <div id="carouselSustentavel" className="carousel slide mb-5" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="2"></button>
          <button type="button" data-bs-target="#carouselSustentavel" data-bs-slide-to="3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=1200&h=400&fit=crop" className="d-block w-100" alt="Reciclagem" style={{height: '400px', objectFit: 'cover'}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Reciclagem Sustentável</h5>
              <p className="text-white">Transforme resíduos em recursos para um futuro melhor</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=400&fit=crop" className="d-block w-100" alt="Energia Solar" style={{height: '400px', objectFit: 'cover'}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Energia Renovável</h5>
              <p className="text-white">Energia limpa para um planeta sustentável</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=400&fit=crop" className="d-block w-100" alt="Natureza" style={{height: '400px', objectFit: 'cover'}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Preservação Ambiental</h5>
              <p className="text-white">Protegendo nosso meio ambiente para as próximas gerações</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop" className="d-block w-100" alt="Sustentabilidade" style={{height: '400px', objectFit: 'cover'}} />
            <div className="carousel-caption d-none d-md-block">
              <h5 className="text-white">Vida Sustentável</h5>
              <p className="text-white">Pequenas ações, grandes impactos ambientais</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselSustentavel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselSustentavel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>

      {/* Features Section */}
      <div className="row mb-5">
        <div className="col-12 text-center mb-4">
          <h2 className="display-5 text-success mb-3">Como Funciona</h2>
          <p className="lead text-muted">Simples, rápido e eficiente</p>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="bi bi-search text-success" style={{fontSize: '2rem'}}></i>
              </div>
              <h5 className="card-title text-success">Encontre</h5>
              <p className="card-text">Localize pontos de coleta próximos a você usando nosso mapa interativo</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="bi bi-recycle text-success" style={{fontSize: '2rem'}}></i>
              </div>
              <h5 className="card-title text-success">Recicle</h5>
              <p className="card-text">Leve seus materiais recicláveis aos pontos cadastrados e contribua com o meio ambiente</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{width: '80px', height: '80px'}}>
                <i className="bi bi-award text-success" style={{fontSize: '2rem'}}></i>
              </div>
              <h5 className="card-title text-success">Impacte</h5>
              <p className="card-text">Faça a diferença na sua comunidade e ajude a construir um futuro sustentável</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card bg-success text-white">
            <div className="card-body p-5">
              <div className="row text-center">
                <div className="col-md-3 mb-3">
                  <h3 className="display-4 fw-bold">150+</h3>
                  <p className="mb-0">Pontos de Coleta</p>
                </div>
                <div className="col-md-3 mb-3">
                  <h3 className="display-4 fw-bold">50+</h3>
                  <p className="mb-0">Empresas Parceiras</p>
                </div>
                <div className="col-md-3 mb-3">
                  <h3 className="display-4 fw-bold">10k+</h3>
                  <p className="mb-0">Kg Reciclados</p>
                </div>
                <div className="col-md-3 mb-3">
                  <h3 className="display-4 fw-bold">5k+</h3>
                  <p className="mb-0">Usuários Ativos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Notícias */}
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="text-center text-success mb-4">
            <i className="bi bi-newspaper me-2"></i>
            Notícias Ambientais
          </h2>
          {carregandoNoticias ? (
            <div className="text-center">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Carregando notícias...</span>
              </div>
              <p className="mt-2 text-muted">Atualizando notícias do Brasil...</p>
            </div>
          ) : (
            <div className="row">
              {noticias.map((noticia) => (
                <div key={noticia.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img 
                      src={noticia.imagem} 
                      className="card-img-top" 
                      alt={noticia.titulo} 
                      style={{height: '200px', objectFit: 'cover'}} 
                    />
                    <div className="card-body">
                      <h5 className="card-title text-success">{noticia.titulo}</h5>
                      <p className="card-text">{noticia.resumo}</p>
                      <small className="text-muted">
                        <i className="bi bi-calendar me-1"></i>{noticia.data}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;