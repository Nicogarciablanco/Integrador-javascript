import { blurOverlay } from '../main';

// Selecciona el ícono del menú
const menu = document.querySelector('.menu')
// Selecciona el contenedor de los enlaces de navegación
const navlinks = document.querySelector('.navlinks')
// Selecciona el contenedor del carrito
const cartopen = document.querySelector('.cart-container')

// Maneja el evento de click en el menú
const handleMenuClick = () => {
    // Alterna la visibilidad de los enlaces de navegación
    navlinks.classList.toggle('navlinks-open')
    blurOverlay();
    // Si el carrito está abierto, lo cierra
    if (cartopen.classList.contains('cart-open')) {
        cartopen.classList.remove('cart-open')
    }
}


// Inicializa los eventos del menú de navegación
export const initMenuNavbar = () => {
    // Escucha el click en el ícono del menú
    menu.addEventListener('click', handleMenuClick)
    // Escucha el click en los enlaces de navegación
    navlinks.addEventListener('click', handleMenuClick)
};