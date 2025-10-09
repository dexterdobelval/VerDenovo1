function GerenciarContasSimples() {
  return (
    <div style={{
      padding: '2rem', 
      background: 'red', 
      minHeight: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      display: 'block !important',
      visibility: 'visible !important',
      opacity: 1
    }}>
      <h1 style={{color: 'white', fontSize: '3rem', display: 'block', visibility: 'visible'}}>TESTE - PÁGINA FUNCIONANDO</h1>
      <p style={{color: 'white', fontSize: '2rem', display: 'block', visibility: 'visible'}}>Se você está vendo isso, a página está carregando!</p>
      <p style={{color: 'yellow', fontSize: '1.5rem'}}>URL atual: {window.location.pathname}</p>
    </div>
  );
}

export default GerenciarContasSimples;