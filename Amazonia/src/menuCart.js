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