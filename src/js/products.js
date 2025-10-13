// Array con la información de todos los productos de la tienda
const productsData = [
    {
        id: 1,
        name: 'ASUS AMD RX 9070 XT TUF GAMING',
        price: 720,
        image: "/img/products/asus_amd_radeon_rx_9070_xt_tuf_gaming.png",
        category: ["Placas de video", "AMD"],
    },
    {
        id: 2,
        name: 'GIGABYTE AMD X870 AORUS MASTER',
        price: 450,
        image: "/img/products/gigabyte_amd_x870_aorus_master.png",
        category: ["Motherboards", "AMD"]
    },
    {
        id: 3,
        name: 'ASUS NVIDIA GeForce RTX 5080 ROG ASTRAL',
        price: 1000,
        image: "/img/products/asus_nvidia_rtx_5080.png",
        category: ["Placas de video", "Nvidia"]
    },
    {
        id: 4,
        name: 'GIGABYTE AMD Radeon RX 9070 XT AORUS ELITE',
        price: 700,
        image: "/img/products/gigabyte_amd_rx_9070_xt.png",
        category: ["Placas de video", "AMD"],
    },
    {
        id: 5,
        name: 'ASUS AMD X870 ROG STRIX',
        price: 400,
        image: "/img/products/asus_amd_x870_rogstrix.png",
        category: ["Motherboards", "AMD"],
    },
    {
        id: 6,
        name: 'ASUS AMD Radeon RX 9070 OC',
        price: 650,
        image: "/img/products/asus_amd_radeon_rx_9070_oc.png",
        category: ["Placas de video", "AMD"],
    },
    {
        id: 7,
        name: 'AMD RYZEN 7 9800X3D',
        price: 450,
        image: "/img/products/amd_ryzen_7_9800x3d.png",
        category: ["Procesadores", "AMD"],
    },
    {
        id: 8,
        name: 'AMD RYZEN 7 9900X3D',
        price: 550,
        image: "/img/products/amd_ryzen_7_9900x3d.png",
        category: ["Procesadores", "AMD"],
    },
    {
        id: 9,
        name: 'AMD RYZEN 7 9700X',
        price: 300,
        image: "/img/products/amd_ryzen_7_9700x.png",
        category: ["Procesadores", "AMD"]
    },
    {
        id: 10,
        name: 'AMD RYZEN 7 9950X3D',
        price: 600,
        image: "/img/products/amd_ryzen_7_9900x3d.png",
        category: ["Procesadores", "AMD"],
    },
    {
        id: 11,
        name: 'ASUS NVIDIA RTX 5090 TUF GAMING',
        price: 2000,
        image: "/img/products/asus_nvidia_rtx_5090_tuf_gaming.png",
        category: ["Placas de video", "Nvidia"],
    },
    {
        id: 12,
        name: 'GIGABYTE NVIDIA RTX 5090 AORUS MASTER XTREME WATERFORCE',
        price: 2300,
        image: "/img/products/gigabyte_nvidia_rtx_5090_aorus_master_extreme_waterforce.png",
        category: ["Placas de video", "Nvidia"],
    },
    {
        id: 13,
        name: 'GIGABYTE NVIDIA RTX 5080 AORUS MASTER',
        price: 1100,
        image: "/img/products/gigabyte_nvidia_rtx_5080_aorus_master.png",
        category: ["Placas de video", "Nvidia"],
    },
    {
        id: 14,
        name: 'GIGABYTE NVIDIA RTX 5070 GAMING OC',
        price: 600,
        image: "/img/products/gigabyte_nvidia_rtx_5070_gamingoc.png",
        category: ["Placas de video", "Nvidia"],
    },
    {
        id: 15,
        name: 'GIGABYTE NVIDIA RTX 5060 TI 16GB AERO OC',
        price: 400,
        image: "/img/products/gigabyte_nvidia_rtx_5060_ti_16gb_aerooc.png",
        category: ["Placas de video", "Nvidia"]
    },
    {
        id: 16,
        name: 'ASUS NVIDIA RTX 5070 PRIME OC ',
        price: 550,
        image: "/img/products/asus_nvidia_rtx_5070_primeoc.png",
        category: ["Placas de video", "Nvidia"],
    },
    {
        id: 17,
        name: 'ASUS AMD RX 9060 XT 16GB TUF GAMING',
        price: 400,
        image: "/img/products/asus_amd_radeon_rx_9060_xt_16gb_tuf_gaming.png",
        category: ["Placas de video", "AMD"],
    },
    {
        id: 18,
        name: 'GIGABYTE AMD Radeon RX 9060 XT 16GB GAMING OC',
        price: 420,
        image: "/img/products/gigabyte_amd_rx_9060_xt_16gb_gamingoc.png",
        category: ["Placas de video", "AMD"],
    },
    {
        id: 19,
        name: 'INTEL CORE ULTRA 5 235',
        price: 200,
        image: "/img/products/intel_core_ultra_5_235.png",
        category: ["Procesadores", "Intel"],
    },
    {
        id: 20,
        name: 'INTEL CORE ULTRA 9 285K',
        price: 600,
        image: "/img/products/intel_core_ultra_9_285k.png",
        category: ["Procesadores", "Intel"],
    },
    {
        id: 21,
        name: 'INTEL CORE ULTRA 5 245K',
        price: 300,
        image: "/img/products/intel_core_ultra_5_245k.png",
        category: ["Procesadores", "Intel"],
    },
    {
        id: 22,
        name: 'INTEL CORE ULTRA 7 265K',
        price: 400,
        image: "/img/products/intel_core_ultra_7_265k.png",
        category: ["Procesadores", "Intel"],
    },
    {
        id: 23,
        name: 'ASUS INTEL Z890 ROG STRIX GAMING WIFI',
        price: 400,
        image: "/img/products/asus_intel_z890-f_rogstrix-gaming-wifi.png",
        category: ["Motherboards", "Intel"],
    },
    {
        id: 24,
        name: 'GIGABYTE INTEL Z890 AORUS ELITE WIFI7',
        price: 380,
        image: "/img/products/gigabyte_intel_z890_aorus_elite_wifi7.png",
        category: ["Motherboards", "Intel"],
    },
]

// Selecciona el contenedor donde se mostrarán los productos
export const productsContainer = document.querySelector('.products-cards');
// Selecciona el botón para mostrar más productos
const showMoreButton = document.querySelector('.show-more');
// Selecciona el contenedor de los botones de categorías
const categoriesButtons = document.querySelector('.buttons-categories');
// Selecciona todos los botones de filtro de productos
const filterButtons = document.querySelectorAll('.filterbuttons');

// Ordena los productos por precio de menor a mayor
const productsPriceSorted = [...productsData].sort((a, b) => a.price - b.price);

// Genera el HTML para cada producto
const productsTemplate = (product => {
    const { id, name, price, image } = product;
    return `
        <div class="card" key=${id}>
            <img src="${image}" alt="${name}">
            <h4>${name}</h4>
            <p>$${price}</p>
            <button class="productsbutton"
            data-id=${id}
            data-name="${name}"
            data-price=${price}
            data-image=${image}
            >Agregar al carrito</button>
        </div>
    `;
});



// Divide el array de productos en partes para paginación
const divideProductsInParts = (products, size) => {
    let productsList = [];

    for (let i = 0; i < products.length; i += size) {
        productsList.push(products.slice(i, i + size));
    }
    return productsList;
}



// Cantidad de productos por página
const productsSize = 6;

// Estado de los productos y filtros
const productsState =  {
    products: divideProductsInParts(productsPriceSorted, productsSize), // Productos paginados
    filteredProducts: null, // Productos filtrados
    Index: 0, // Página actual
    activeFilter: null // Filtro activo
}

// Devuelve el array de productos según el filtro activo
const getActiveArray = () => (
    productsState.activeFilter ? productsState.filteredProducts : productsState.products
)

// Muestra más productos al hacer click en el botón correspondiente
const handleShowMoreProducts = () => {
    const productsSelected = getActiveArray();
    productsState.Index += 1;

    renderProducts(productsSelected[productsState.Index]);

    // Oculta el botón si ya no hay más productos para mostrar
    if (productsState.Index === productsSelected.length - 1) {
        showMoreButton.style.display = 'none';
    }

}

// Verifica si el botón de filtro no está activo
const inactiveFilterButtons = (element) => {
    return (
        element.classList.contains('filterbuttons') && 
        !element.classList.contains('active')
    );
}

// Cambia el estado visual del botón de filtro activo
const changeActiveButton = (activeFilter) => {
    const categoriesButtons = [...filterButtons];
    categoriesButtons.forEach((categoryButton) => {
        if (categoryButton.dataset.category !== activeFilter) {
            categoryButton.classList.remove('active');
            return;
        }
        categoryButton.classList.add('active');
    });

}

// Cambia el filtro activo según el botón seleccionado
const changeFilterState = (btn) => {
    productsState.activeFilter = btn.dataset.category || null;
    changeActiveButton(productsState.activeFilter);
}

// Aplica el filtro de productos según la categoría seleccionada
const applyFilter = (e) => {
    if (!inactiveFilterButtons(e.target)) return;

    changeFilterState(e.target);

    productsContainer.innerHTML = '';
    productsState.Index = 0;

    if (productsState.activeFilter){
        // Filtra los productos por la categoría seleccionada
        const filtered = productsPriceSorted.filter(products => products.category && products.category.includes(productsState.activeFilter));
        productsState.filteredProducts = divideProductsInParts(filtered, productsSize);
        
        renderProducts(productsState.filteredProducts[0] || ["No hay productos para mostrar"]);

        showMoreButton.style.display = productsState.filteredProducts.length > 1 ? 'flex' : 'none';
        return;
    }
    // Si no hay filtro, muestra todos los productos
    productsState.filteredProducts = null;
    renderProducts(productsState.products[0]);
    showMoreButton.style.display = productsState.products.length > 1 ? 'flex' : 'none';
}

// Renderiza los productos en el contenedor
const renderProducts = (products) => {
    productsContainer.innerHTML += products.map(productsTemplate).join('');
};


// Inicializa la lógica de productos y los eventos de la tienda
export const initProducts = () => {
    // Muestra los primeros productos al cargar
    renderProducts(productsState.products[0]);
    // Evento para mostrar más productos
    showMoreButton.addEventListener('click', handleShowMoreProducts);
    // Evento para aplicar filtros por categoría
    categoriesButtons.addEventListener('click', applyFilter);
}