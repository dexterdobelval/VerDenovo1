function Loading({ size = 'md', text = 'Carregando...' }) {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center p-4 animate-fadeIn">
      <div className={`spinner-border text-success ${sizeClasses[size]} mb-3`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted animate-pulse">{text}</p>
    </div>
  );
}

export default Loading;