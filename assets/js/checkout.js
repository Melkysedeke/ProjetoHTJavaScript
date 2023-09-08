import { apagarDoLocalStorage, desenharProdutoCarrinhoSimples, lerLocalStorage, salvarLocalStorage } from "./utilidades.js";
import { atualizarPreçoCarrinho } from "./menuCart.js";

function desenharProdutosCheckout (){
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoCarrinhoSimples(idProduto,"container-produtos-checkout", idsProdutoCarrinhoComQuantidade[idProduto]);
    }
}

function finalizarCompra (evento){
    evento.preventDefault();
    const idsProdutoCarrinhoComQuantidade = lerLocalStorage("carrinho") ?? {};
    if (Object.keys(idsProdutoCarrinhoComQuantidade).length === 0){
        return;
    }
    const dataAtual = new Date();
    const pedidofeito = {
        dataPedido: dataAtual,
        pedido: idsProdutoCarrinhoComQuantidade,
    }
    const historicoDePedidos = lerLocalStorage('historico') ?? [];
    const historicoDePedidosAtualizado = [pedidofeito, ...historicoDePedidos];

    salvarLocalStorage('historico', historicoDePedidosAtualizado);
    apagarDoLocalStorage();
    window.location.href = window.location.assign('/pedidos.html');
}

desenharProdutosCheckout('carrinho');

document.addEventListener('submit', (evt)=> finalizarCompra(evt));
atualizarPreçoCarrinho(); 