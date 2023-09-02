import { renderizarCatalogo } from "./src/cartãoProduto.js";
import { initializeCart, renderizarProdutoCarrinho, atualizarPreçoCarrinho } from "./src/menuCart.js";
import { inicializarFiltros } from "./src/filtrosCatalogo.js";

  renderizarCatalogo();
  initializeCart();
  atualizarPreçoCarrinho();
  renderizarProdutoCarrinho();
  inicializarFiltros();