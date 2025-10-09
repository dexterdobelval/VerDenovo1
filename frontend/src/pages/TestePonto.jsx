import { useState } from 'react';

function TestePonto() {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState(false);

  const salvar = () => {
    if (!nome) {
      setErro(true);
    } else {
      setErro(false);
      alert('Salvo!');
    }
  };

  return (
    <div style={{padding: '2rem'}}>
      <h3>Teste de Validação</h3>
      
      <div style={{marginBottom: '1rem'}}>
        <input 
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (erro) setErro(false);
          }}
          placeholder="Digite seu nome"
          style={{
            border: erro ? '2px solid red' : '1px solid #ccc',
            backgroundColor: erro ? '#ffe6e6' : 'white',
            padding: '10px',
            width: '300px'
          }}
        />
        {erro && <div style={{color: 'red', fontWeight: 'bold'}}>⚠️ Este campo é obrigatório!</div>}
      </div>
      
      <button onClick={salvar} style={{padding: '10px 20px'}}>
        Salvar
      </button>
    </div>
  );
}

export default TestePonto;