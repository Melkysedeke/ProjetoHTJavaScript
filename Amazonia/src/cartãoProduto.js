import { catalogo } from "./utilidades.js";
import { addInCart } from "./menuCart.js";

export function renderizarCatalogo (){
    for (const produtoCatalogo of catalogo) {
        const cartaoProduto = `<div class="card" id="card-produto-${catalogo.id}">
        <img
        src="./assets/img/${produtoCatalogo.imagem}"
        alt="Produto 1 do Magazine Hashtag.""
        />
        <p>${produtoCatalogo.nome}</p>
        <p class="info-cart">${produtoCatalogo.marca}</p>
        <p>$${produtoCatalogo.preco}</p>
        <button class="adicionar" id='addInCart-${produtoCatalogo.id}'><i  class="fa-solid fa-cart-plus"></i></button>
        </div>`;
        
        document.getElementById("container-produto").innerHTML += cartaoProduto;
    }

    for (const produtoCatalogo of catalogo) {
        document.getElementById(`addInCart-${produtoCatalogo.id}`).addEventListener('click',() =>addInCart(produtoCatalogo.id))
    }
}