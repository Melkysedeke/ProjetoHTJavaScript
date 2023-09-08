import { catalogo, salvarLocalStorage, lerLocalStorage } from "./utilidades.js";

const idsProdutoCarrinhoComQuantidade = lerLocalStorage('carrinho') ?? {};

function openCart (){
    const overlay = document.querySelector('#carrinho');
    overlay.style.right= 0;
}

function closeCart (){
    const overlay = document.querySelector('#carrinho');
    overlay.style.right= "-300px";
}

function irParaCheckout (){
  if (Object.keys(idsProdutoCarrinhoComQuantidade).lenght === 0){
    return;
  }
  window.location.href = '/checkout.html';
}

export function initializeCart (){
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');
    const botaoIrParaCheckout = document.getElementById('confirm');

    openButton.addEventListener('click',openCart);
    closeButton.addEventListener('click',closeCart);
    botaoIrParaCheckout.addEventListener('click', irParaCheckout);
}

function removerDoCarrinho (idProduto){
  delete idsProdutoCarrinhoComQuantidade[idProduto];
  salvarLocalStorage('carrinho',idsProdutoCarrinhoComQuantidade);
  atualizarPreçoCarrinho();
  renderizarProdutoCarrinho();
}

function incrementarQuantidadeProduto (idProduto){
  idsProdutoCarrinhoComQuantidade[idProduto]++;
  salvarLocalStorage('carrinho',idsProdutoCarrinhoComQuantidade);
  atualizarPreçoCarrinho();
  atualizarInformaçãoQuantidade(idProduto);
}

function decrementarQuantidadeProduto (idProduto){
  if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
    removerDoCarrinho(idProduto);
    return;
  }
  idsProdutoCarrinhoComQuantidade[idProduto]--;
  salvarLocalStorage('carrinho',idsProdutoCarrinhoComQuantidade);
  atualizarPreçoCarrinho();
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
      <button class="countButton" id="decrementarProduto-${produto.id}">-</button>
      <p class="countId" id="quantidade-${produto.id}">${idsProdutoCarrinhoComQuantidade[produto.id]}</p>
      <button class="countButton" id="incrementarProduto-${produto.id}">+</button>
    </div>
    <button class="rem-cart" id="rem-cart-${produto.id}"><i class="fa-solid fa-xmark"></i></i></button>`;

    elementoArticle.innerHTML = cartaoProdutoCarrinho;

    containerProdutoCarrinho.appendChild(elementoArticle);

    document.getElementById(`incrementarProduto-${produto.id}`).addEventListener('click', () => incrementarQuantidadeProduto(produto.id));

    document.getElementById(`decrementarProduto-${produto.id}`).addEventListener('click', () => decrementarQuantidadeProduto(produto.id));

    document.getElementById(`rem-cart-${produto.id}`).addEventListener('click', () => removerDoCarrinho(produto.id));
}

export function renderizarProdutoCarrinho (){
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
    atualizarPreçoCarrinho();
    salvarLocalStorage('carrinho',idsProdutoCarrinhoComQuantidade);
    desenharProdutoCarrinho(idProduto);
}

export function atualizarPreçoCarrinho(){
  const precoCarrinho = document.getElementById('preco-total');
  let precoTotalCarrinho = 0;
  for (const idProdutoNoCarrinho in idsProdutoCarrinhoComQuantidade){
    precoTotalCarrinho += catalogo.find(p=>p.id === idProdutoNoCarrinho).preco * idsProdutoCarrinhoComQuantidade[idProdutoNoCarrinho];
  }
  precoCarrinho.innerText = `$${precoTotalCarrinho}`
}