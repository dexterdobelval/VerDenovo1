import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/api';

function PersonalizarPonto() {
  const { usuario, logout, loginPonto } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    cep: '',
    cidade: '',
    telefone: '',
    horario: '',
    descricao: '',
    materiais: {
      papel: false,
      plastico: false,
      vidro: false,
      metal: false
    }
  });
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erros, setErros] = useState({});
  const [imagemPonto, setImagemPonto] = useState(null);
  const [previewImagem, setPreviewImagem] = useState(null);
  const [mostrarCrop, setMostrarCrop] = useState(false);
  const [imagemOriginal, setImagemOriginal] = useState(null);
  const [cropData, setCropData] = useState({ x: 0, y: 0, zoom: 1 });
  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    // Verificar se é um ponto logado
    if (usuario && usuario.tipo === 'ponto' && usuario.dados) {
      setFormData({
        nome: usuario.dados.nome || '',
        endereco: usuario.dados.numero || '',
        cep: usuario.dados.cep || '',
        cidade: usuario.dados.complemento || '',
        telefone: usuario.dados.telefone || '',
        horario: usuario.dados.horaFuncionamento || '',
        descricao: '',
        materiais: {
          papel: usuario.dados.material?.includes('Papel') || false,
          plastico: usuario.dados.material?.includes('Plástico') || false,
          vidro: usuario.dados.material?.includes('Vidro') || false,
          metal: usuario.dados.material?.includes('Metal') || false
        }
      });
      
      if (usuario.dados.imagemPonto) {
        setPreviewImagem(usuario.dados.imagemPonto);
      }
    } else {
      // Se não há ponto logado, redirecionar para login
      navigate('/login-ponto');
    }
  }, [usuario, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Limpar erro do campo quando usuário digitar
    if (erros[name]) {
      setErros(prev => ({ ...prev, [name]: false }));
    }
    
    if (name.startsWith('materiais.')) {
      const material = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        materiais: {
          ...prev.materiais,
          [material]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };
  
  const handleImagemChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagemPonto(file);
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
      
      const editorToCropScale = 250 / 400;
      const cropToCanvasScale = 300 / 250;
      
      const imgWidth = img.width * cropData.zoom * cropToCanvasScale;
      const imgHeight = img.height * cropData.zoom * cropToCanvasScale;
      
      const imgX = (size - imgWidth) / 2 + (cropData.x * cropToCanvasScale);
      const imgY = (size - imgHeight) / 2 + (cropData.y * cropToCanvasScale);
      
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.clip();
      
      ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
      
      const croppedImage = canvas.toDataURL('image/jpeg', 0.9);
      setPreviewImagem(croppedImage);
      setMostrarCrop(false);
    };
    
    img.src = imagemOriginal;
  };

  const salvarInformacoes = async (e) => {
    e.preventDefault();
    
    // Validar campos obrigatórios
    const novosErros = {};
    if (!formData.nome) novosErros.nome = true;
    if (!formData.endereco) novosErros.endereco = true;
    if (!formData.cidade) novosErros.cidade = true;
    if (!formData.cep) novosErros.cep = true;
    if (!formData.telefone) novosErros.telefone = true;
    if (!formData.horario) novosErros.horario = true;
    
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      // Focar no primeiro campo com erro
      const primeiroCampoErro = Object.keys(novosErros)[0];
      setTimeout(() => {
        const elemento = document.getElementById(primeiroCampoErro);
        if (elemento) {
          elemento.scrollIntoView({ behavior: 'smooth', block: 'center' });
          elemento.focus();
        }
      }, 100);
      return;
    }
    
    setErros({});
    
    setCarregando(true);
    
    try {
      // Preparar dados para enviar para API
      const dadosParaSalvar = {
        nome: formData.nome,
        cep: formData.cep,
        numero: formData.endereco,
        complemento: formData.cidade,
        telefone: formData.telefone,
        horaFuncionamento: formData.horario,
        material: Object.entries(formData.materiais)
          .filter(([key, value]) => value)
          .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
          .join(', '),
        email: usuario.dados.email,
        statusPonto: 'ATIVO'
      };
      
      await apiService.atualizarPonto(usuario.dados.id, dadosParaSalvar);
      
      setSucesso(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setSucesso(false), 3000);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar informações!');
    } finally {
      setCarregando(false);
    }
  };

  const excluirPonto = async () => {
    if (window.confirm('Tem certeza que deseja excluir este ponto de coleta? Esta ação não pode ser desfeita.')) {
      try {
        await apiService.deletarPonto(usuario.dados.id);
        logout();
        alert('Ponto de coleta excluído com sucesso!');
        navigate('/');
      } catch (error) {
        alert('Erro ao excluir ponto: ' + error.message);
      }
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
      border-color: #059669;
      box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1);
      background: white;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(100%); }
      to { opacity: 1; transform: translateX(0); }
    }
    .success-alert {
      background: linear-gradient(135deg, #059669, #10b981);
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
                background: 'linear-gradient(135deg, #059669, #10b981)',
                boxShadow: '0 10px 30px rgba(5, 150, 105, 0.3)'
              }}>
                <i className="bi bi-geo-alt text-white" style={{fontSize: '2rem'}}></i>
              </div>
              <h1 className="display-6 fw-bold text-success mb-2">Gerenciar Ponto de Coleta</h1>
              <p className="text-muted">Configure as informações do seu ponto de coleta</p>
            </div>



            {/* Success Alert Flutuante */}
            {sucesso && (
              <div className="alert text-white text-center" style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 9999,
                background: 'linear-gradient(135deg, #059669, #10b981)',
                border: 'none',
                borderRadius: '15px',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                boxShadow: '0 10px 30px rgba(5, 150, 105, 0.4)',
                animation: 'slideInRight 0.5s ease-out',
                minWidth: '300px'
              }}>
                <div className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill me-2" style={{fontSize: '1.2rem'}}></i>
                  <span>Alterações salvas com sucesso!</span>
                </div>
              </div>
            )}



            <div className="card border-0 shadow-lg hover-lift animate-slideInLeft" style={{
              borderRadius: '25px',
              background: 'rgba(255,255,255,0.95)',
              backdropFilter: 'blur(20px)'
            }}>
              <div className="card-header border-0 position-relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, #059669, #10b981)',
                borderRadius: '25px 25px 0 0',
                padding: '2rem'
              }}>
                <div className="position-absolute" style={{top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                <div className="d-flex align-items-center position-relative">
                  <div className="rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.3)'}}>
                    {previewImagem ? (
                      <img 
                        src={previewImagem} 
                        alt="Foto do ponto"
                        style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%'}}
                      />
                    ) : (
                      <i className="bi bi-geo-alt-fill text-white" style={{fontSize: '1.8rem'}}></i>
                    )}
                  </div>
                  <div>
                    <h4 className="text-white mb-1 fw-bold">Configurações do Ponto</h4>
                    <p className="text-white-50 mb-0">Atualize as informações do seu ponto de coleta</p>
                  </div>
                </div>
              </div>
              <div className="card-body p-4">
                <form onSubmit={salvarInformacoes}>
                  <div className="row g-4">
                    <div className="col-12">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="nome"
                          className={`form-control ${erros.nome ? 'border-danger' : ''}`}
                          id="nome"
                          placeholder="Nome do Ponto"
                          value={formData.nome}
                          onChange={handleChange}
                          required 
                          style={erros.nome ? {borderColor: '#dc2626', borderWidth: '2px', backgroundColor: '#fef2f2'} : {}}
                        />
                        <label htmlFor="nome">
                          <i className="bi bi-geo-alt me-2"></i>Nome do Ponto de Coleta
                        </label>
                        {erros.nome && (
                          <div className="mt-2 p-2 rounded-3" style={{
                            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                            border: '1px solid #fca5a5',
                            fontSize: '13px',
                            color: '#dc2626',
                            fontWeight: '600'
                          }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Este campo é obrigatório para salvar
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="row g-4 mt-2">
                    <div className="col-md-8">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="endereco"
                          className={`form-control ${erros.endereco ? 'border-danger' : ''}`}
                          id="endereco"
                          placeholder="Endereço completo"
                          value={formData.endereco}
                          onChange={handleChange}
                          required 
                          style={erros.endereco ? {borderColor: '#dc2626', borderWidth: '2px', backgroundColor: '#fef2f2'} : {}}
                        />
                        <label htmlFor="endereco">
                          <i className="bi bi-house me-2"></i>Endereço
                        </label>
                        {erros.endereco && (
                          <div className="mt-2 p-2 rounded-3" style={{
                            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                            border: '1px solid #fca5a5',
                            fontSize: '13px',
                            color: '#dc2626',
                            fontWeight: '600'
                          }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Este campo é obrigatório para salvar
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="cep"
                          className={`form-control ${erros.cep ? 'border-danger' : ''}`}
                          id="cep"
                          placeholder="00000-000"
                          value={formData.cep}
                          onChange={handleChange}
                          required 
                          style={erros.cep ? {borderColor: '#dc2626', borderWidth: '2px', backgroundColor: '#fef2f2'} : {}}
                        />
                        <label htmlFor="cep">
                          <i className="bi bi-mailbox me-2"></i>CEP
                        </label>
                        {erros.cep && (
                          <div className="mt-2 p-2 rounded-3" style={{
                            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                            border: '1px solid #fca5a5',
                            fontSize: '13px',
                            color: '#dc2626',
                            fontWeight: '600'
                          }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Este campo é obrigatório para salvar
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="row g-4 mt-2">
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="cidade"
                          className={`form-control ${erros.cidade ? 'border-danger' : ''}`}
                          id="cidade"
                          placeholder="Cidade"
                          value={formData.cidade}
                          onChange={handleChange}
                          required 
                          style={erros.cidade ? {borderColor: '#dc2626', borderWidth: '2px', backgroundColor: '#fef2f2'} : {}}
                        />
                        <label htmlFor="cidade">
                          <i className="bi bi-building me-2"></i>Cidade
                        </label>
                        {erros.cidade && (
                          <div className="mt-2 p-2 rounded-3" style={{
                            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                            border: '1px solid #fca5a5',
                            fontSize: '13px',
                            color: '#dc2626',
                            fontWeight: '600'
                          }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Este campo é obrigatório para salvar
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="tel" 
                          name="telefone"
                          className={`form-control ${erros.telefone ? 'border-danger' : ''}`}
                          id="telefone"
                          placeholder="(00) 00000-0000"
                          value={formData.telefone}
                          onChange={handleChange}
                          required 
                          style={erros.telefone ? {borderColor: '#dc2626', borderWidth: '2px', backgroundColor: '#fef2f2'} : {}}
                        />
                        <label htmlFor="telefone">
                          <i className="bi bi-telephone me-2"></i>Telefone
                        </label>
                        {erros.telefone && (
                          <div className="mt-2 p-2 rounded-3" style={{
                            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                            border: '1px solid #fca5a5',
                            fontSize: '13px',
                            color: '#dc2626',
                            fontWeight: '600'
                          }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Este campo é obrigatório para salvar
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-floating">
                        <input 
                          type="text" 
                          name="horario"
                          className={`form-control ${erros.horario ? 'border-danger' : ''}`}
                          id="horario"
                          placeholder="Ex: 08:00 - 18:00"
                          value={formData.horario}
                          onChange={handleChange}
                          required 
                          style={erros.horario ? {borderColor: '#dc2626', borderWidth: '2px', backgroundColor: '#fef2f2'} : {}}
                        />
                        <label htmlFor="horario">
                          <i className="bi bi-clock me-2"></i>Horário de Funcionamento
                        </label>
                        {erros.horario && (
                          <div className="mt-2 p-2 rounded-3" style={{
                            background: 'linear-gradient(135deg, #fef2f2, #fee2e2)',
                            border: '1px solid #fca5a5',
                            fontSize: '13px',
                            color: '#dc2626',
                            fontWeight: '600'
                          }}>
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Este campo é obrigatório para salvar
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="fw-bold text-success mb-3 d-flex align-items-center">
                      <i className="bi bi-recycle me-2"></i>
                      Materiais Aceitos
                    </h6>
                    <div className="row g-3">
                      <div className="col-md-3">
                        <div className="form-check p-3 rounded-4" style={{background: formData.materiais.papel ? 'rgba(5, 150, 105, 0.1)' : 'rgba(248,250,252,0.8)', border: '2px solid ' + (formData.materiais.papel ? '#059669' : '#e5e7eb'), transition: 'all 0.3s ease'}}>
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            name="materiais.papel"
                            id="papel" 
                            checked={formData.materiais.papel}
                            onChange={handleChange}
                          />
                          <label className="form-check-label fw-bold" htmlFor="papel">
                            📄 Papel
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check p-3 rounded-4" style={{background: formData.materiais.plastico ? 'rgba(5, 150, 105, 0.1)' : 'rgba(248,250,252,0.8)', border: '2px solid ' + (formData.materiais.plastico ? '#059669' : '#e5e7eb'), transition: 'all 0.3s ease'}}>
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            name="materiais.plastico"
                            id="plastico" 
                            checked={formData.materiais.plastico}
                            onChange={handleChange}
                          />
                          <label className="form-check-label fw-bold" htmlFor="plastico">
                            🥤 Plástico
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check p-3 rounded-4" style={{background: formData.materiais.vidro ? 'rgba(5, 150, 105, 0.1)' : 'rgba(248,250,252,0.8)', border: '2px solid ' + (formData.materiais.vidro ? '#059669' : '#e5e7eb'), transition: 'all 0.3s ease'}}>
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            name="materiais.vidro"
                            id="vidro" 
                            checked={formData.materiais.vidro}
                            onChange={handleChange}
                          />
                          <label className="form-check-label fw-bold" htmlFor="vidro">
                            🍶 Vidro
                          </label>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-check p-3 rounded-4" style={{background: formData.materiais.metal ? 'rgba(5, 150, 105, 0.1)' : 'rgba(248,250,252,0.8)', border: '2px solid ' + (formData.materiais.metal ? '#059669' : '#e5e7eb'), transition: 'all 0.3s ease'}}>
                          <input 
                            className="form-check-input" 
                            type="checkbox" 
                            name="materiais.metal"
                            id="metal" 
                            checked={formData.materiais.metal}
                            onChange={handleChange}
                          />
                          <label className="form-check-label fw-bold" htmlFor="metal">
                            🥫 Metal
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>






                  <div className="row g-3 mt-4">
                    <div className="col-md-8">
                      <button 
                        type="button" 
                        className="btn text-white w-100 hover-lift"
                        disabled={carregando}
                        onClick={salvarInformacoes}
                        style={{
                          background: 'linear-gradient(135deg, #059669, #10b981)',
                          border: 'none',
                          borderRadius: '12px',
                          padding: '12px',
                          fontWeight: '600',
                          boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)'
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
                        onClick={excluirPonto}
                        style={{
                          borderRadius: '12px',
                          padding: '12px',
                          fontWeight: '600',
                          border: '2px solid #dc2626'
                        }}
                      >
                        <i className="bi bi-trash me-2"></i>
                        Excluir Ponto
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

export default PersonalizarPonto;