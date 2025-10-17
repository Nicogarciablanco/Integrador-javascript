// Importa la función para inicializar los productos
import {initProducts} from "./js/products";
// Importa la función para inicializar el menú de navegación
import { InitMenuNavbar } from "./js/navbar";
// Importa la función para inicializar el carrito
import { InitCartNavbar } from "./js/cart";

// Selecciona el formulario de contacto por su id
const enviarFormulario = document.getElementById('formulario')

// Evita el comportamiento por defecto del formulario y muestra un mensaje en consola
enviarFormulario.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("form enviado");
})

// Selecciona todos los elementos con la clase 'logo'
const toTop = document.querySelectorAll('.logo');

// Función para hacer scroll al inicio de la página
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
    });
}

// Función para que se cierre el menú y el carrito al hacer scroll
window.onscroll = () => {
    const navlinks = document.querySelector('.navlinks');
    const cartContainer = document.querySelector('.cart-container');
    const overlay = document.querySelector('.blur-overlay');
    if (navlinks.classList.contains('navlinks-open') || cartContainer.classList.contains('cart-open')) {
        navlinks.classList.remove('navlinks-open');
        cartContainer.classList.remove('cart-open');
        overlay.classList.remove('blur-active');
    }
    return;
}

// Asigna el evento de click a cada logo para volver al inicio
toTop.forEach((element) => {
    element.addEventListener('click', scrollToTop);
});

//Overlay para navbar y carrito
const overlay = document.querySelector('.blur-overlay');
const cartContainer = document.querySelector('.cart-container');
const navlinks = document.querySelector('.navlinks');

// Función para manejar la visibilidad del overlay

const openOverlay = () => {
if (cartContainer.classList.contains('cart-open') || (navlinks.classList.contains('navlinks-open') && window.innerWidth < 850)) {
        overlay.classList.add('blur-active');
    } else {
        overlay.classList.remove('blur-active');
    } return;
};

const closeOverlay = ({target}) => {
    if (target.classList.contains('blur-active')) {
        overlay.classList.remove('blur-active');
        cartContainer.classList.remove('cart-open');
        navlinks.classList.remove('navlinks-open');
    } return;
};

// Función para activar el overlay y asignar el evento de cierre
export const blurOverlay = () => {
    openOverlay();
    overlay.addEventListener('click', closeOverlay);
};

/* // Función para cerrar el carrito y el menu al cambiar el tamaño de la ventana
export const closeOnResize = () => {
    window.addEventListener('resize', () => {
        if (window.innerWidth > 850) {
            navlinks.classList.remove('navlinks-open');
            overlay.classList.remove('blur-active');
        }
    });
}; */

// Función principal que inicializa los módulos de la app
const init = () => {
    initProducts(); // Inicializa la lógica de productos
    InitMenuNavbar(); // Inicializa la barra de navegación
    InitCartNavbar(); // Inicializa el carrito
}

// Ejecuta la función principal al cargar el archivo
init();