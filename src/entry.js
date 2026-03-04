console.log('Entry JS loading...');
import('./main.tsx').then(() => {
  console.log('Main.tsx imported successfully');
}).catch(err => {
  console.error('Failed to import main.tsx:', err);
  const display = document.getElementById('error-display');
  if (display) display.innerHTML += '\nErro no Import Dinâmico: ' + err.message;
});
