import { renderizarCatalogo } from "./cartãoProduto.js";
import { initializeCart, renderizarProdutoCarrinho, atualizarPreçoCarrinho } from "./menuCart.js";
import { inicializarFiltros } from "./filtrosCatalogo.js";

  renderizarCatalogo();
  initializeCart();
  atualizarPreçoCarrinho();
  renderizarProdutoCarrinho();
  inicializarFiltros();