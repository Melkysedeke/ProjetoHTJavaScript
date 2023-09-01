import { renderizarCatalogo } from "./src/cartãoProduto.js";
import { initializeCart } from "./src/menuCart.js";
  
  renderizarCatalogo();
  initializeCart();

  const button = document.querySelector('.button');

  // Função para remover a classe de hover após o toque
  function removeHoverClass() {
    button.classList.remove('hover-effect');
  }

  // Adicione um ouvinte de eventos de toque no botão
  button.addEventListener('touchstart', removeHoverClass, { passive: true });