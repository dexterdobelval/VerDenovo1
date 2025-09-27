import { useEffect } from 'react';

function Sobre() {
  const animationStyles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-60px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
    .animate-fadeInUp { animation: fadeInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-slideInLeft { animation: slideInLeft 1s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-scaleIn { animation: scaleIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
    .animate-delay-1 { animation-delay: 0.2s; animation-fill-mode: both; }
    .animate-delay-2 { animation-delay: 0.4s; animation-fill-mode: both; }
    .animate-delay-3 { animation-delay: 0.6s; animation-fill-mode: both; }
  `;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <style>{animationStyles}</style>
      <div className="text-center mb-5 animate-fadeInUp">
        <h1 className="display-4 text-success mb-3 animate-slideInLeft">
          <i className="bi bi-people me-3"></i>
          Sobre o VerDenovo
        </h1>
        <p className="lead animate-fadeInUp animate-delay-1">
          Conheça nossa história, missão e compromisso com a sustentabilidade
        </p>
      </div>

      {/* Nossa Origem */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm animate-scaleIn animate-delay-1">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">
                <i className="bi bi-book me-2"></i>
                Nossa Origem
              </h3>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <p className="lead">
                    O projeto VerDenovo nasceu como um Trabalho de Conclusão de Curso (TCC) desenvolvido por estudantes comprometidos com a transformação ambiental de nossa comunidade.
                  </p>
                  <p>
                    Durante nossos estudos, identificamos a necessidade urgente de facilitar o acesso da população aos pontos de coleta seletiva e promover a educação ambiental. Assim surgiu a ideia de criar uma plataforma digital que conectasse pessoas, empresas e pontos de reciclagem de forma simples e eficiente.
                  </p>
                  <p>
                    O que começou como um projeto acadêmico se transformou em uma iniciativa real de impacto social e ambiental, demonstrando como a educação pode gerar soluções práticas para problemas do mundo real.
                  </p>
                </div>
                <div className="col-md-4 text-center">
                  <i className="bi bi-mortarboard display-1 text-success"></i>
                  <h5 className="text-success mt-3">Projeto Acadêmico</h5>
                  <p className="text-muted">Transformando conhecimento em ação</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nossos Objetivos */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm animate-scaleIn animate-delay-2">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">
                <i className="bi bi-target me-2"></i>
                Nossos Objetivos
              </h3>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-geo-alt-fill text-primary me-3 fs-3"></i>
                    <div>
                      <h5 className="text-primary">Foco em Barueri</h5>
                      <p>
                        Nosso objetivo principal é contribuir para o desenvolvimento sustentável do município de Barueri, facilitando o acesso da população aos pontos de coleta seletiva e promovendo práticas ambientalmente responsáveis em nossa cidade.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-people-fill text-primary me-3 fs-3"></i>
                    <div>
                      <h5 className="text-primary">Engajamento Comunitário</h5>
                      <p>
                        Queremos criar uma rede colaborativa onde cidadãos, empresas e organizações trabalhem juntos para construir um futuro mais sustentável, fortalecendo os laços comunitários através da consciência ambiental.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-graph-up-arrow text-primary me-3 fs-3"></i>
                    <div>
                      <h5 className="text-primary">Impacto Mensurável</h5>
                      <p>
                        Buscamos aumentar significativamente os índices de reciclagem em Barueri, contribuindo para a redução de resíduos em aterros sanitários e promovendo a economia circular em nossa região.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-lightbulb-fill text-primary me-3 fs-3"></i>
                    <div>
                      <h5 className="text-primary">Inovação Tecnológica</h5>
                      <p>
                        Utilizamos tecnologia para democratizar o acesso à informação sobre reciclagem, tornando mais fácil para todos encontrarem pontos de coleta e aprenderem sobre práticas sustentáveis.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="row">
        <div className="col-12">
          <div className="card bg-success text-white animate-scaleIn animate-delay-3">
            <div className="card-body text-center">
              <h3>
                <i className="bi bi-heart me-2"></i>
                Junte-se ao VerDenovo
              </h3>
              <p className="lead mb-4">
                Faça parte desta transformação! Juntos podemos construir um Barueri mais sustentável e consciente.
              </p>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <i className="bi bi-geo-alt display-6 mb-2"></i>
                  <h5>Encontre Pontos</h5>
                  <p>Localize pontos de coleta próximos a você</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-plus-circle display-6 mb-2"></i>
                  <h5>Cadastre Pontos</h5>
                  <p>Ajude a expandir nossa rede de coleta</p>
                </div>
                <div className="col-md-4 mb-3">
                  <i className="bi bi-share display-6 mb-2"></i>
                  <h5>Compartilhe</h5>
                  <p>Espalhe a consciência ambiental</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sobre;