import { productsContainer } from "./products"
import { blurOverlay } from "../main"

// Selecciona el ícono del carrito en el DOM
const cart = document.querySelector('.cart')
// Selecciona el contenedor del carrito
const cartContainer = document.querySelector('.cart-container')
// Selecciona los enlaces de navegación
const navlinks = document.querySelector('.navlinks')
// Selecciona el contenedor de los productos en el carrito
const cartProductsContainer = document.querySelector('.cartproducts-container')
// Selecciona el contenedor del total del carrito
const total = document.querySelector('#cart-total')
// Selecciona los botones de eliminar y vaciar carrito
const BuyCartButton = document.querySelector('.buycart')
const clearCartButton = document.querySelector('.clearcart')
// Overlay para alertas
const alertOverlay = document.querySelector('.blur-alert-overlay');


///////////////////////////////////////////////////////////////
////////////// Logica apertura y cierre del carrito ///////////
///////////////////////////////////////////////////////////////


// Maneja el evento de click en el ícono del carrito
const handleCartClick = () => {
    // Alterna la visibilidad del carrito
    cartContainer.classList.toggle('cart-open')
    blurOverlay();
    // Si el menú de navegación está abierto, lo cierra
    if (navlinks.classList.contains('navlinks-open')) {
        navlinks.classList.remove('navlinks-open')
    }
}

///////////////////////////////////////////////////////////////
////////////// Logica productos del carrito ///////////////////
///////////////////////////////////////////////////////////////


// Template 

const creatCartProductTemplate = (cartProducts) => {
    const { id, name, price, image, quantity } = cartProducts;
    return `
    <div class="cart-item">
        <div class="info-item"> 
            <img src="${image}" alt="${name}"/>
            <div class="info-text">
                <p>${name}</p>
                <p>${price}$</p>
            </div>
        </div>
        <div class="item-quantity">
            <button class="btn btn-plus" data-id=${id}>+</button>
            <p>${quantity}</p>
            <button class="btn btn-minus" data-id=${id}>-</button>
        </div>
    </div>
`;

}
// Array para almacenar los productos en el carrito
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// Función para guardar el estado del carrito en localStorage
const saveCartInLocalStorage = () => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

// Renderizar productos en el carrito

const renderCart = () => {
    if (!cartProducts.length) {
        cartProductsContainer.innerHTML = '<p>El carrito está vacío</p>';
        return;
    } else {
        cartProductsContainer.innerHTML = cartProducts.map(creatCartProductTemplate).join('');
    }
}

// Calcular y mostrar el total del carrito
const getCartTotal = () => {
    const total = cartProducts.reduce((acc, cur) => acc + Number(cur.price) * cur.quantity, 0);
    return total;
}

// Mostrar el total en el DOM
const showCartTotal = () => {
    if (!cartProducts.length) {
        total.innerHTML = '$0';
        return;
    } else {
        total.innerHTML = `$${getCartTotal()}`;
    }
}


// Actualiza el estado del carrito: guarda en localStorage, renderiza y muestra el total
const UpdateCartState = () => {
    saveCartInLocalStorage();
    renderCart();
    showCartTotal();
    updateCartBadge(cartProducts.reduce((acc, cur) => acc + cur.quantity, 0));
}

// Agrega un producto al carrito cuando se hace click en el botón correspondiente
const addProductToCart = ({ target }) => {
    // Verifica si el elemento clickeado es un botón de producto
    if (!target.classList.contains('productsbutton')) return;
    const product = createProductData(target.dataset);
    // Valida si el producto ya está en el carrito
    if (isExistingProduct(product)) {
        addUnitToProduct(product)
    } else {

        cartProducts = [...cartProducts, { ...product, quantity: 1 }];


    }
    UpdateCartState();
};

// Función para agregar una unidad
const addUnitToProduct = (product) => {
    cartProducts = cartProducts.map((productCart) =>
        productCart.id === product.id
            ? { ...productCart, quantity: productCart.quantity + 1 }
            : productCart
    );
}


// Crea un objeto con la información del producto usando los atributos data
const createProductData = (product) => {
    const { id, name, price, image } = product;
    return { id, name, price, image };
}

// Función para saber si un producto ya está en el carrito
const isExistingProduct = (product) => {
    return cartProducts.find(item => item.id === product.id);
}

// Sumar cantidad de un producto
const handlePlus = (id) => {
    const existingCartProduct = cartProducts.find((item) => item.id === id);
    console.log(existingCartProduct);
    addUnitToProduct(existingCartProduct);
    UpdateCartState();
}

// Restar cantidad de un producto
const handleMinus = (id) => {
    const existingCartProduct = cartProducts.find((item) => item.id === id);

    if (existingCartProduct.quantity === 1) {
        removeProductFromCart(existingCartProduct);
        return;
    }
    removeUnitToProduct(existingCartProduct);
    UpdateCartState();

};

// Resta una unidad a un producto
const removeUnitToProduct = (existingProduct) => {
    cartProducts = cartProducts.map((product) => {
        return product.id === existingProduct.id
            ? { ...product, quantity: Number(product.quantity - 1) }
            : product;
    });
}

// Elimina un producto del carrito
const removeProductFromCart = (existingProduct) => {
    cartProducts = cartProducts.filter(product => product.id !== existingProduct.id);
    UpdateCartState();
}

// Verifica si el botón clickeado es para aumentar o disminuir la cantidad
const handleQuantity = ({ target }) => {
    if (target.classList.contains('btn-plus')) {
        console.log(target.dataset);
        handlePlus(target.dataset.id);
    } else if (target.classList.contains('btn-minus')) {
        console.log(target.dataset);
        handleMinus(target.dataset.id);
    }
}

///////////////////////////////////////////////////////////////
////////////// Logica alertas flotantes ////////////////////////
///////////////////////////////////////////////////////////////

// Duración para las alertas
let duration = 1500;

// Alerta difuminada        

const blurAlertOverlay = (autoHide = true) => {
    alertOverlay.style.display = 'block';
    if (autoHide) {
        setTimeout(() => {
            alertOverlay.style.display = 'none';
        }, duration);
    }
}

let alertDiv = null;

// Crear div de alerta flotante

const createAlertDiv = (message) => {
    if (alertDiv) alertDiv.remove();

    alertDiv = document.createElement('div');
    alertDiv.className = 'floating-alert';
    document.body.appendChild(alertDiv);
    alertDiv.textContent = message;

    setTimeout(() => {
        if (alertDiv) {
            alertDiv.remove();
            alertDiv = null;
            alertOverlay.style.display = 'none';
        }
    }, duration);
}

const removeAlertDiv = ({ target }) => {

    if (target.classList.contains('blur-alert-overlay') && alertDiv) {
        alertOverlay.style.display = 'none';
        alertDiv.remove();
        alertDiv = null;
    }
};


const showFloatingAlert = (message) => {
    blurAlertOverlay();
    createAlertDiv(message);
}
///////////////////////////////////////////////////////////////
////////////// Logica vaciar carrito /////////////////////////
///////////////////////////////////////////////////////////////

// Vaciar el carrito
const clearCart = () => {
    cartProducts = [];
    UpdateCartState();
}

// Alerta de carrito vacío al intentar finalizar compra
const alertClearCart = ({ target }) => {
    if (!cartProducts.length && target.classList.contains('clearcart')) {
        showFloatingAlert('No hay productos en el carrito para limpiar');
    }
    else {
        clearCart();
        showFloatingAlert('Carrito vaciado');
    }
}

///////////////////////////////////////////////////////////////
////////////// Logica finalizar compra ////////////////////////
///////////////////////////////////////////////////////////////

// Alerta de carrito vacío al intentar finalizar compra
const alertBuyCart = () => {
    if (!cartProducts.length) {
        showFloatingAlert('El carrito está vacío, agregue productos para finalizar la compra');
    }
}


// Crear div de confirmación de compra
const createPurchaseDiv = () => {
    blurAlertOverlay(false);
    const purchaseDiv = document.createElement('div');
    purchaseDiv.className = 'floating-alert';
    document.body.appendChild(purchaseDiv);
    purchaseDiv.innerHTML = `
        <p>¿Desea finalizar la compra?</p>
        <button class="confirm-yes purchasebtn">Sí</button>
        <button class="confirm-no purchasebtn">No</button>
    `;
    // Selecciona los botones y asigna los eventos
    purchaseDiv.querySelector('.confirm-yes').onclick = () => {
        showFloatingAlert('Compra realizada con éxito');
        clearCart();
        purchaseDiv.remove();
        blurAlertOverlay(true);
    };
    purchaseDiv.querySelector('.confirm-no').onclick = () => {
        purchaseDiv.remove();
        alertOverlay.style.display = 'none';
    };

}

// Maneja la confirmación de la compra
const confirmPurchaseAlert = () => {
    createPurchaseDiv();
}

// Finalizar compra

const completePurchase = () => {
    if (cartProducts.length) {
        confirmPurchaseAlert();
        return;
    } else {
        alertBuyCart();
    }
}

const updateCartBadge = (count) => {
    const cartIcon = document.querySelector('.cart-icon'); 
        cartIcon.setAttribute('data-count', count);
};


///////////////////////////////////////////////////////////////
////////////// Inicializadores ////////////////////////////////
///////////////////////////////////////////////////////////////

// Inicializa los eventos del carrito y la barra de navegación
export const InitCartNavbar = () => {
    // Escucha el click en el ícono del carrito
    cart.addEventListener('click', handleCartClick);
    // Escucha el click en cualquier parte del documento para agregar productos al carrito
    productsContainer.addEventListener('click', addProductToCart);
    // Renderiza el carrito inicialmente
    document.addEventListener('DOMContentLoaded', renderCart);
    // Muestra el total del carrito inicialmente
    document.addEventListener('DOMContentLoaded', showCartTotal);
    // Maneja la cantidad de cada producto en el carrito
    cartProductsContainer.addEventListener('click', handleQuantity);
    // Finaliza la compra
    BuyCartButton.addEventListener('click', completePurchase);
    // Elimina el carrito
    clearCartButton.addEventListener('click', alertClearCart);
    // Cierra la alerta difuminada al hacer click fuera del cuadro de alerta
    alertOverlay.addEventListener('click', removeAlertDiv);
    // Actualiza el badge del carrito al cargar la página
    document.addEventListener('DOMContentLoaded', () => updateCartBadge(cartProducts.reduce((acc, cur) => acc + cur.quantity, 0)));
}