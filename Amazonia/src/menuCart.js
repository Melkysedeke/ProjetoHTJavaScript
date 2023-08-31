import { catalogo } from "./utilidades.js";

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

export function addInCart (idProduto){
    const produto = catalogo.find((p) => p.id ===idProduto)
    const containerProdutoCarrinho =document.getElementById('produtos-carrinho');
    const cartaoProdutoCarrinho = `<article class="card-carrinho">
   <img src="assets/img/${produto.imagem}" alt="${produto.nome}">
   <div id="info-cart">
     <p id="name-cart">${produto.nome}</p>
     <p id="size-cart">Tamanho M</p>
     <p id="price-cart">$${produto.preco}</p>
   </div>
   <button id="rem-cart"><i class="fa-solid fa-xmark"></i></i></button>
 </article>`;
   containerProdutoCarrinho.innerHTML += cartaoProdutoCarrinho;
}