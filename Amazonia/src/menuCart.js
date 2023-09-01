import { catalogo } from "./utilidades.js";

const idsProdutoCarrinhoComQuantidade = {};

function openCart (){
    const overlay = document.querySelector('#carrinho');
    overlay.style.right= 0;
}

function closeCart (){
    const overlay = document.querySelector('#carrinho');
    overlay.style.right= "-300px";
}

export function initializeCart (){
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');

    openButton.addEventListener('click',openCart);
    closeButton.addEventListener('click',closeCart);
}

function removerDoCarrinho (idProduto){
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  renderizarProdutoCarrinho();
}

function incrementarQuantidadeProduto (idProduto){
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  atualizarInformaçãoQuantidade(idProduto);
}

function decrementarQuantidadeProduto (idProduto){
  if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  atualizarInformaçãoQuantidade(idProduto);
}

function atualizarInformaçãoQuantidade (idProduto){
  document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoCarrinho (idProduto){
  const produto = catalogo.find((p) => p.id === idProduto)

    const containerProdutoCarrinho = document.getElementById('produtos-carrinho');
    const elementoArticle = document.createElement("article");
    elementoArticle.classList.add('card-carrinho');
    const cartaoProdutoCarrinho = `
    <img src="assets/img/${produto.imagem}" alt="${produto.nome}"/>
    <div id="info-cart">
      <p id="name-cart">${produto.nome}</p>
      <p id="size-cart">Tamanho M</p>
      <p id="price-cart">$${produto.preco}</p>
    </div>
    <div id="count">
      <button class="countButton" id="incrementarProduto-${produto.id}">+</button>
      <p id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
      <button class="countButton" id="decrementarProduto-${produto.id}">-</button>
    </div>
    <button class="rem-cart" id="rem-cart-${produto.id}"><i class="fa-solid fa-xmark"></i></i></button>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;

    containerProdutoCarrinho.appendChild(elementoArticle);

    document.getElementById(`incrementarProduto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

    document.getElementById(`decrementarProduto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));

    document.getElementById(`rem-cart-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

function renderizarProdutoCarrinho (){
  const containerProdutoCarrinho = document.getElementById("produtos-carrinho");
  containerProdutoCarrinho.innerHTML = '';
  for (const idProduto in idsProdutoCarrinhoComQuantidade){
    desenharProdutoCarrinho(idProduto);
  }
}

export function addInCart (idProduto){
    if (idProduto in idsProdutoCarrinhoComQuantidade){
      incrementarQuantidadeProduto(idProduto);
      return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    desenharProdutoCarrinho(idProduto);
}