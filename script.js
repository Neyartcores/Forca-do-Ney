document.addEventListener('DOMContentLoaded', () => {
  iniciarJogo();
});

let palavrasPorCategoria = {};
let palavraAtual = '';
let letrasCorretas = [];
let tentativasRestantes = 6;
let categoriaAtual = '';

function iniciarJogo() {
  if (!window.palavrasPorCategoria) return;
  palavrasPorCategoria = window.palavrasPorCategoria;

  const categorias = Object.keys(palavrasPorCategoria);
  categoriaAtual = categorias[Math.floor(Math.random() * categorias.length)];
  const palavras = palavrasPorCategoria[categoriaAtual];
  palavraAtual = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase();
  letrasCorretas = [];
  tentativasRestantes = 6;

  document.getElementById('categoria').innerText = 'Categoria: ' + categoriaAtual;
  document.getElementById('mensagem').innerText = '';
  atualizarPalavra();
  gerarTeclado();
  document.querySelectorAll('.parte').forEach(p => p.style.display = 'none');
}

function atualizarPalavra() {
  const display = palavraAtual.split('').map(l => (letrasCorretas.includes(l) ? l : '_')).join(' ');
  document.getElementById('palavra').innerText = display;
  if (!display.includes('_')) {
    document.getElementById('mensagem').innerText = '🎉 Você venceu!';
  }
}

function gerarTeclado() {
  const teclado = document.getElementById('teclado');
  teclado.innerHTML = '';
  const alfabeto = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alfabeto.split('').forEach(letra => {
    const btn = document.createElement('button');
    btn.textContent = letra;
    btn.onclick = () => tentarLetra(letra, btn);
    teclado.appendChild(btn);
  });
}

function tentarLetra(letra, btn) {
  btn.disabled = true;
  if (palavraAtual.includes(letra)) {
    letrasCorretas.push(letra);
    atualizarPalavra();
  } else {
    tentativasRestantes--;
    mostrarParteForca();
    if (tentativasRestantes === 0) {
      document.getElementById('mensagem').innerText = '😢 Você perdeu! Palavra era: ' + palavraAtual;
    }
  }
}

function mostrarParteForca() {
  const partes = ['cabeça', 'corpo', 'bracoE', 'bracoD', 'pernaE', 'pernaD'];
  const parte = partes[6 - tentativasRestantes - 1];
  if (parte) document.querySelector('.' + parte).style.display = 'block';
}


function iniciarComPalavraPersonalizada() {
  const inputPalavra = prompt("Digite a palavra secreta (sem acento, sem espaço):");
  if (!inputPalavra || inputPalavra.trim().length === 0) return;
  palavraAtual = inputPalavra.trim().toUpperCase();

  const inputDica = prompt("Digite uma dica para o jogador 2 (opcional):");
  categoriaAtual = inputDica ? inputDica : "Palavra personalizada";
  letrasCorretas = [];
  tentativasRestantes = 6;

  document.getElementById('categoria').innerText = 'Categoria: ' + categoriaAtual;
  document.getElementById('mensagem').innerText = '';
  atualizarPalavra();
  gerarTeclado();
  document.querySelectorAll('.parte').forEach(p => p.style.display = 'none');
}