import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { database } from '../services/database';

function PersonalizarEmpresa() {
  const { usuario, logout, loginEmpresa } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    cep: '',
    setor: '',
    descricao: '',
    horario: ''
  });
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [imagemEmpresa, setImagemEmpresa] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [mostrarCrop, setMostrarCrop] = useState(false);
  const [imagemOriginal, setImagemOriginal] = useState(null);
  const [cropData, setCropData] = useState({ x: 0, y: 0, zoom: 1 });

  useEffect(() => {
    if (usuario && usuario.dados) {
      setFormData({
        nome: usuario.dados.nome || usuario.dados.nomeEmpresa || '',
        cnpj: usuario.dados.cnpj || '',
        email: usuario.dados.email || '',
        telefone: usuario.dados.telefone || '',
        endereco: usuario.dados.endereco || '',
        cidade: usuario.dados.cidade || '',
        cep: usuario.dados.cep || '',
        setor: usuario.dados.setor || '',
        descricao: usuario.dados.descricao || '',
        horario: usuario.dados.horario || ''
      });
      
      // Buscar dados atualizados da empresa no banco
      const empresaAtual = database.listarEmpresas().find(e => e.email === usuario.dados.email);
      if (empresaAtual && empresaAtual.imagemEmpresa) {
        setPreviewImagem(empresaAtual.imagemEmpresa);
      }
    }
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemEmpresa(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagemOriginal(e.target.result);
        setCropData({ x: 0, y: 0, zoom: 1 });
        setMostrarCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const aplicarCrop = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      const size = 300;
      canvas.width = size;
      canvas.height = size;
      
      // Usar exatamente a mesma lógica do preview
      // Editor: 400px, Círculo: 250px, Canvas: 300px
      // Escala: 300/250 = 1.2
      const editorToCropScale = 250 / 400; // 0.625
      const cropToCanvasScale = 300 / 250; // 1.2
      
      // Tamanho da imagem no canvas
      const imgWidth = img.width * cropData.zoom * cropToCanvasScale;
      const imgHeight = img.height * cropData.zoom * cropToCanvasScale;
      
      // Posição no canvas (centralizada + offset)
      const imgX = (size - imgWidth) / 2 + (cropData.x * cropToCanvasScale);
      const imgY = (size - imgHeight) / 2 + (cropData.y * cropToCanvasScale);
      
      // Criar círculo de recorte
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();
      
      // Desenhar imagem
      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
      
      const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
      setPreviewImagem(croppedImage);
      setMostrarCrop(false);
    };
    
    img.src = imagemOriginal;
  };
  
  const salvarInformacoes = async (e) => {
    e.preventDefault();
    setCarregando(true);
    
    try {
      // Buscar empresa pelo email se ID não existir
      const empresaId = usuario.dados.id || database.listarEmpresas().find(e => e.email === usuario.dados.email)?.id;
      
      if (!empresaId) {
        throw new Error('Empresa não encontrada');
      }
      
      const dadosParaSalvar = {
        ...formData,
        nomeEmpresa: formData.nome,
        imagemEmpresa: previewImagem
      };
      
      const empresaAtualizada = database.atualizarEmpresa(empresaId, dadosParaSalvar);
      
      if (empresaAtualizada) {
        loginEmpresa(empresaAtualizada);
        setSucesso(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => setSucesso(false), 3000);
      } else {
        console.error('Falha ao atualizar empresa');
        alert('Erro ao salvar informações!');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar informações: ' + error.message);
    } finally {
      setCarregando(false);
    }
  };

  const excluirEmpresa = () => {
    if (window.confirm('Tem certeza que deseja excluir esta empresa? Esta ação não pode ser desfeita.')) {
      database.excluirEmpresa(usuario.dados.id);
      logout();
      alert('Empresa excluída com sucesso!');
      navigate('/');
    }
  };

  const styles = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
    .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
    .animate-slideInLeft { animation: slideInLeft 0.6s ease-out; }
    .hover-lift { transition: all 0.3s ease; }
    .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }
    .form-floating input, .form-floating textarea {
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      transition: all 0.3s ease;
      background: #f9fafb;
    }
    .form-floating input:focus, .form-floating textarea:focus {
      border-color: #10b981;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
      background: white;
    }
    .success-alert {
      background: linear-gradient(135deg, #10b981, #059669);
      border: none;
      border-radius: 15px;
      animation: pulse 2s infinite;
    }
  `;

  return (
    <div style={{background: '#ffffff', minHeight: '100vh', padding: '2rem 0'}}>
      <style>{styles}</style>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="text-center mb-5 animate-fadeInUp">
              <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <i className="bi bi-building text-white" style={{fontSize: '2rem'}}></i>
              </div>
              <h1 className="display-6 fw-bold text-success mb-2">Personalizar Empresa</h1>
              <p className="text-muted">Mantenha as informações da sua empresa sempre atualizadas</p>
            </div>

            {/* Success Alert */}
            {sucesso && (
              <div className="alert text-white text-center mb-4 animate-fadeInUp" style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                borderRadius: '20px',
                padding: '1.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
                animation: 'pulse 1.5s ease-in-out 3'
              }}>
                <div className="text-center">
                  <div className="fw-bold mb-1">
                    <i className="bi bi-check-circle-fill me-2" style={{fontSize: '1.5rem'}}></i>
                    ✅ ALTERAÇÕES SALVAS!
                  </div>
                  <small className="text-white-50">Todas as informações foram atualizadas com sucesso</small>
                </div>
              </div>
            )}

            <div className="card border-0 shadow-lg hover-lift animate-slideInLeft" style={{
              borderRadius: '25px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)'
            }}>
              <div className="card-header border-0 position-relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '25px 25px 0 0',
                padding: '2rem'
              }}>
                <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                <div className="d-flex align-items-center position-relative">
                  <div className="rounded-circle bg-white bg-opacity-20 d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', overflow: 'hidden'}}>
                    {previewImagem ? (
                      <img 
                        src={previewImagem} 
                        alt="Logo da empresa"
                        style={{width: '100%', height: '100%', objectFit: 'cover'}}
                      />
                    ) : (
                      <i className="bi bi-gear text-white" style={{fontSize: '1.5rem'}}></i>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white mb-1 fw-bold">Configurações da Empresa</h4>
                    <p className="text-white-50 mb-0">Atualize suas informações empresariais</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <form onSubmit={salvarInformacoes}>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="nome"
                          className="form-control" 
                          id="nome"
                          placeholder="Nome da Empresa"
                          value={formData.nome}
                          onChange={handleChange}
                          required 
                        />
                        <label htmlFor="nome">
                          <i className="bi bi-building me-2"></i>Nome da Empresa
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="cnpj"
                          className="form-control" 
                          id="cnpj"
                          placeholder="00.000.000/0000-00"
                          value={formData.cnpj}
                          onChange={handleChange}
                          required 
                        />
                        <label htmlFor="cnpj">
                          <i className="bi bi-card-text me-2"></i>CNPJ
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="row g-4 mt-2">
                    <div className="col-md-8">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="endereco"
                          className="form-control" 
                          id="endereco"
                          placeholder="Endereço completo"
                          value={formData.endereco}
                          onChange={handleChange}
                          required 
                        />
                        <label htmlFor="endereco">
                          <i className="bi bi-geo-alt me-2"></i>Endereço
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="cep"
                          className="form-control" 
                          id="cep"
                          placeholder="00000-000"
                          value={formData.cep}
                          onChange={handleChange}
                          required 
                        />
                        <label htmlFor="cep">
                          <i className="bi bi-mailbox me-2"></i>CEP
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row g-4 mt-2">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="cidade"
                          className="form-control" 
                          id="cidade"
                          placeholder="Cidade"
                          value={formData.cidade}
                          onChange={handleChange}
                          required 
                        />
                        <label htmlFor="cidade">
                          <i className="bi bi-building me-2"></i>Cidade
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="tel" 
                          name="telefone"
                          className="form-control" 
                          id="telefone"
                          placeholder="(00) 00000-0000"
                          value={formData.telefone}
                          onChange={handleChange}
                          required 
                        />
                        <label htmlFor="telefone">
                          <i className="bi bi-telephone me-2"></i>Telefone
                        </label>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="email" 
                          name="email"
                          className="form-control" 
                          id="email"
                          placeholder="empresa@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required 
                        />
                        <label htmlFor="email">
                          <i className="bi bi-envelope me-2"></i>Email
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="row g-4 mt-2">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="setor"
                          className="form-control" 
                          id="setor"
                          placeholder="Setor de atuação"
                          value={formData.setor}
                          onChange={handleChange}
                        />
                        <label htmlFor="setor">
                          <i className="bi bi-briefcase me-2"></i>Setor de Atuação
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="horario"
                          className="form-control" 
                          id="horario"
                          placeholder="Ex: 08:00 - 18:00"
                          value={formData.horario}
                          onChange={handleChange}
                        />
                        <label htmlFor="horario">
                          <i className="bi bi-clock me-2"></i>Horário de Funcionamento
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="form-floating">
                      <textarea 
                        className="form-control" 
                        name="descricao"
                        id="descricao"
                        style={{height: '120px'}}
                        placeholder="Descreva sua empresa e atividades..."
                        value={formData.descricao}
                        onChange={handleChange}
                      ></textarea>
                      <label htmlFor="descricao">
                        <i className="bi bi-card-text me-2"></i>Descrição da Empresa
                      </label>
                    </div>
                  </div>
                  
                  {/* Imagem da Empresa */}
                  <div className="mt-4">
                    <div className="card border-0 shadow-sm" style={{borderRadius: '20px', background: 'rgba(16, 185, 129, 0.05)'}}>
                      <div className="card-body p-4">
                        <h5 className="text-success fw-bold mb-3">
                          <i className="bi bi-image me-2"></i>
                          Imagem da Empresa
                        </h5>
                        
                        <div className="row align-items-center">
                          <div className="col-md-6">
                            <div className="mb-3">
                              <input 
                                type="file" 
                                className="form-control" 
                                accept="image/*"
                                onChange={handleImagemChange}
                                style={{borderRadius: '12px', border: '2px solid #10b981'}}
                              />
                              <small className="text-muted mt-1 d-block">Formatos aceitos: JPG, PNG, GIF (máx. 5MB)</small>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="text-center">
                              <div className="position-relative d-inline-block">
                                {previewImagem ? (
                                  <img 
                                    src={previewImagem} 
                                    alt="Preview" 
                                    className="rounded-circle shadow-sm"
                                    style={{width: '150px', height: '150px', objectFit: 'cover', border: '3px solid #10b981'}}
                                  />
                                ) : (
                                  <div className="bg-light border rounded-circle d-flex align-items-center justify-content-center" style={{width: '150px', height: '150px', border: '3px dashed #10b981 !important'}}>
                                    <i className="bi bi-image text-success" style={{fontSize: '3rem'}}></i>
                                  </div>
                                )}
                                {previewImagem && (
                                  <>
                                    <button 
                                      type="button"
                                      className="btn btn-danger btn-sm position-absolute rounded-circle"
                                      onClick={() => {setPreviewImagem(null); setImagemEmpresa(null);}}
                                      style={{width: '30px', height: '30px', top: '0', right: '0', transform: 'translate(10px, -10px)'}}
                                    >
                                      <i className="bi bi-x" style={{fontSize: '0.8rem'}}></i>
                                    </button>
                                    <button 
                                      type="button"
                                      className="btn btn-primary btn-sm position-absolute rounded-circle"
                                      onClick={() => setMostrarCrop(true)}
                                      style={{width: '30px', height: '30px', bottom: '0', right: '0', transform: 'translate(10px, 10px)'}}
                                    >
                                      <i className="bi bi-crop" style={{fontSize: '0.8rem'}}></i>
                                    </button>
                                  </>
                                )}
                              </div>
                              <small className="text-muted mt-2 d-block">Preview circular da imagem</small>
                              {previewImagem && (
                                <small className="text-success mt-1 d-block">
                                  <i className="bi bi-arrows-move me-1"></i>
                                  Clique no botão para ajustar
                                </small>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  <div className="row g-3 mt-4">
                    <div className="col-md-8">
                      <button 
                        type="submit" 
                        className="btn text-white w-100 hover-lift"
                        disabled={carregando}
                        style={{
                          background: 'linear-gradient(135deg, #10b981, #059669)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px',
                          fontWeight: '600',
                          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
                        }}
                      >
                        {carregando ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            <span className="fw-bold">SALVANDO ALTERAÇÕES...</span>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-floppy me-2"></i>
                            <span className="fw-bold">SALVAR ALTERAÇÕES</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button 
                        type="button" 
                        className="btn btn-outline-danger w-100 hover-lift"
                        onClick={excluirEmpresa}
                        style={{
                          borderRadius: '12px',
                          padding: '12px',
                          fontWeight: '600',
                          border: '2px solid #dc2626'
                        }}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Excluir Empresa
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Crop Estilo App */}
      {mostrarCrop && imagemOriginal && (
        <div className="modal d-block" style={{backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 9999}}>
          <div className="modal-dialog modal-dialog-centered" style={{maxWidth: '500px'}}>
            <div className="modal-content border-0" style={{borderRadius: '0', background: '#000'}}>
              <div className="modal-header border-0 p-3" style={{background: '#000'}}>
                <h6 className="modal-title text-white fw-bold m-0">
                  Mover e redimensionar
                </h6>
                <button type="button" className="btn-close btn-close-white" onClick={() => setMostrarCrop(false)}></button>
              </div>
              
              <div className="modal-body p-0" style={{background: '#000'}}>
                <div className="position-relative" style={{height: '400px', overflow: 'hidden'}}>
                  <img 
                    src={imagemOriginal} 
                    alt="Crop"
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${cropData.x}px), calc(-50% + ${cropData.y}px)) scale(${cropData.zoom})`,
                      cursor: 'move',
                      userSelect: 'none',
                      maxWidth: 'none',
                      maxHeight: 'none'
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      const startX = e.clientX - cropData.x;
                      const startY = e.clientY - cropData.y;
                      
                      const handleMouseMove = (e) => {
                        setCropData(prev => ({
                          ...prev,
                          x: e.clientX - startX,
                          y: e.clientY - startY
                        }));
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                    onTouchStart={(e) => {
                      const touch = e.touches[0];
                      const startX = touch.clientX - cropData.x;
                      const startY = touch.clientY - cropData.y;
                      
                      const handleTouchMove = (e) => {
                        const touch = e.touches[0];
                        setCropData(prev => ({
                          ...prev,
                          x: touch.clientX - startX,
                          y: touch.clientY - startY
                        }));
                      };
                      
                      const handleTouchEnd = () => {
                        document.removeEventListener('touchmove', handleTouchMove);
                        document.removeEventListener('touchend', handleTouchEnd);
                      };
                      
                      document.addEventListener('touchmove', handleTouchMove);
                      document.addEventListener('touchend', handleTouchEnd);
                    }}
                    draggable={false}
                  />
                  
                  {/* Overlay escuro com círculo transparente */}
                  <div 
                    className="position-absolute w-100 h-100"
                    style={{
                      background: 'radial-gradient(circle 125px at center, transparent 125px, rgba(0,0,0,0.7) 125px)',
                      pointerEvents: 'none'
                    }}
                  ></div>
                  
                  {/* Borda do círculo */}
                  <div 
                    className="position-absolute border rounded-circle"
                    style={{
                      width: '250px',
                      height: '250px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      border: '2px solid rgba(255,255,255,0.8)',
                      pointerEvents: 'none'
                    }}
                  ></div>
                </div>
                
                {/* Controle de Zoom */}
                <div className="p-4" style={{background: '#000'}}>
                  <div className="d-flex align-items-center gap-3">
                    <i className="bi bi-zoom-out text-white" style={{fontSize: '1.2rem'}}></i>
                    <input 
                      type="range" 
                      className="form-range flex-grow-1" 
                      min="0.5" 
                      max="3" 
                      step="0.05"
                      value={cropData.zoom}
                      onChange={(e) => setCropData({...cropData, zoom: parseFloat(e.target.value)})}
                      style={{
                        background: '#333',
                        height: '4px'
                      }}
                    />
                    <i className="bi bi-zoom-in text-white" style={{fontSize: '1.2rem'}}></i>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer border-0 p-3" style={{background: '#000'}}>
                <div className="d-flex w-100 gap-3">
                  <button 
                    type="button" 
                    className="btn btn-outline-light flex-fill" 
                    onClick={() => setMostrarCrop(false)}
                    style={{borderRadius: '8px', fontWeight: '500'}}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary flex-fill" 
                    onClick={aplicarCrop}
                    style={{borderRadius: '8px', fontWeight: '500', background: '#1877f2', border: 'none'}}
                  >
                    Concluir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersonalizarEmpresa;