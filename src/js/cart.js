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
// Selecciona el div para mostrar alertas de unidades
const unitDiv = document.querySelector('.unit-alert');


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
    };
};

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
    toggleCartButtons();
}

// Muestra una alerta de unidad agregada
const showUnitTemplate = (message) => {
    unitDiv.innerHTML = `<p>${message}</p>`;
    unitDiv.classList.add('unit-alert-show');

    setTimeout(() => {
        unitDiv.classList.remove('unit-alert-show');
    }, 1500);
}


// Agrega un producto al carrito cuando se hace click en el botón correspondiente
const addProductToCart = ({ target }) => {
    // Verifica si el elemento clickeado es un botón de producto
    if (!target.classList.contains('productsbutton')) return;
    const product = createProductData(target.dataset);
    if (isExistingProduct(product)) {
        addUnitToProduct(product);
        showUnitTemplate('Se agregó una unidad más al carrito');
        UpdateCartState();
    } else {
        cartProducts = [...cartProducts, { ...product, quantity: 1 }];
        showUnitTemplate('Producto agregado al carrito');
        UpdateCartState();
    }
    
};

// Función para agregar una unidad
const addUnitToProduct = (product) => {
    cartProducts = cartProducts.map((productCart) =>
        productCart.id === product.id
            ?  { ...productCart, quantity: productCart.quantity + 1 }
            : productCart
    );
}


// Crea un objeto con la información del producto usando los atributos data
const createProductData = (product) => {
    const { id, name, price, image } = product;
    return { id: String(id), name, price, image };
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

// Si el carrito está vacío, desactiva los botones de comprar y vaciar
const toggleCartButtons = () => {
    const disabled = !cartProducts.length;
    BuyCartButton.disabled = disabled;
    clearCartButton.disabled = disabled;
    BuyCartButton.style.cursor = disabled ? 'not-allowed' : 'pointer';
    clearCartButton.style.cursor = disabled ? 'not-allowed' : 'pointer';
};

///////////////////////////////////////////////////////////////
////////////// Logica alertas flotantes ////////////////////////
///////////////////////////////////////////////////////////////

// Duración para las alertas
let duration = 1500;

const showFloatingAlert = (message) => {
    document.body.style.overflow = 'hidden';
    // Crea el div de alerta
    const alertDiv = document.createElement('div');
    alertDiv.className = 'background-alert';
    document.body.appendChild(alertDiv);
    alertDiv.innerHTML = `<div class="floating-alert"><p>${message}</p></div>`;
    // Elimina el div después de la duración especificada
    setTimeout(() => {
        alertDiv.remove();
        document.body.style.overflow = 'auto';
    }, duration);

}

const showConfirmation = (message, onConfirm) => {
    document.body.style.overflow = 'hidden';
    const confirmDiv = document.createElement('div');
    confirmDiv.className = 'background-alert';
    confirmDiv.innerHTML = `
        <div class="floating-alert">
            <p>${message}</p>
            <div class="confirm-buttons">
                <button class="confirm-yes purchasebtn">Sí</button>
                <button class="confirm-no purchasebtn">No</button>
            </div>
        </div>
    `;
    document.body.appendChild(confirmDiv);

    confirmDiv.querySelector('.confirm-yes').addEventListener('click', () => {
        confirmDiv.remove();
        onConfirm();
    });
    confirmDiv.querySelector('.confirm-no').addEventListener('click', () => {
        confirmDiv.remove();
    });
};

///////////////////////////////////////////////////////////////
////////////// Logica vaciar carrito /////////////////////////
///////////////////////////////////////////////////////////////

// Vaciar el carrito
const clearCart = () => {
    cartProducts = [];
    UpdateCartState();
}

// Vaciar carrito con confirmación
const alertClearCart = ({ target }) => {
    if (cartProducts.length && target.classList.contains('clearcart')) {
        showConfirmation('¿Estás seguro que deseas vaciar el carrito?', () => {
            showFloatingAlert('Carrito vaciado');
            clearCart();
        });
    }
};

///////////////////////////////////////////////////////////////
////////////// Logica finalizar compra ////////////////////////
///////////////////////////////////////////////////////////////

// Finalizar compra con confirmación
const alertBuyCart = ({ target }) => {
    if (cartProducts.length && target.classList.contains('buycart')) {
        showConfirmation('¿Estás seguro que deseas finalizar la compra?', () => {
            showFloatingAlert('Compra finalizada con éxito');
            clearCart();
        });
    }
};

const updateCartBadge = (count) => {
    const cartIcon = document.querySelector('.cart-bubble');
    cartIcon.setAttribute('data-count', count);
};


///////////////////////////////////////////////////////////////
////////////// Inicializadores ////////////////////////////////
///////////////////////////////////////////////////////////////

// Inicializa los eventos del carrito y la barra de navegación
export const initCartNavbar = () => {
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
    BuyCartButton.addEventListener('click', alertBuyCart);
    // Vaciar el carrito
    clearCartButton.addEventListener('click', alertClearCart);
    // Actualiza el badge del carrito al cargar la página
    document.addEventListener('DOMContentLoaded', () => updateCartBadge(cartProducts.reduce((acc, cur) => acc + cur.quantity, 0)));
    // Inicializa el estado de los botones del carrito al cargar la página
    document.addEventListener('DOMContentLoaded', toggleCartButtons);
}