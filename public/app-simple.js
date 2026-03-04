console.log('App Simple carregando...');
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content Loaded');
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = '<h1 style="color: #4ade80;">SISTEMA SIMPLIFICADO ATIVO</h1><p>Se você está vendo isso, scripts básicos funcionam.</p>';
    document.body.style.background = '#064e3b';
  }
});
