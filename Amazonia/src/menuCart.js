function openCart (){
    const overlay = document.querySelector('#carrinho');
    overlay.style.display= 'block';
}

function closeCart (){
    const overlay = document.querySelector('#carrinho');
    overlay.style.display= 'none';
}

export function initializeCart (){
    const openButton = document.getElementById('openButton');
    const closeButton = document.getElementById('closeButton');

    openButton.addEventListener('click',openCart);
    closeButton.addEventListener('click',closeCart);
}