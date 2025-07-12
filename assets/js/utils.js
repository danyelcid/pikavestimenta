function productos(idProducto) {
    // Lista de productos
    const productos = [
        {
            "idProducto": "001",
            "nombre": "Buzo Pikachu",
            "precio": 29.99,
            "precioLista": 37.49,
            "descuento": 20,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
            "categoria": "Ofertas"
        },
        {
            "idProducto": "002",
            "nombre": "Camiseta Charizard",
            "precio": 24.99,
            "precioLista": 24.99,
            "descuento": 0,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
            "categoria": "Ofertas"
        },
        {
            "idProducto": "003",
            "nombre": "Gorra Jigglypuff",
            "precio": 19.99,
            "precioLista": 23.52,
            "descuento": 15,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png",
            "categoria": "Ofertas"
        },
        {
            "idProducto": "004",
            "nombre": "Pijama Snorlax",
            "precio": 39.99,
            "precioLista": 39.99,
            "descuento": 0,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png",
            "categoria": "Ofertas"
        },
        {
            "idProducto": "005",
            "nombre": "Camiseta Squirtle",
            "precio": 22.99,
            "precioLista": 22.99,
            "descuento": 0,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
            "categoria": "Camisetas"
        },
        {
            "idProducto": "006",
            "nombre": "Mochila Eevee",
            "precio": 34.99,
            "precioLista": 34.99,
            "descuento": 0,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png",
            "categoria": "Accesorios"
        },
        {
            "idProducto": "007",
            "nombre": "Sudadera Bulbasaur",
            "precio": 27.99,
            "precioLista": 37.32,
            "descuento": 25,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
            "categoria": "Buzos"
        },
        {
            "idProducto": "008",
            "nombre": "Paraguas Psyduck",
            "precio": 18.99,
            "precioLista": 18.99,
            "descuento": 0,
            "rutaImagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png",
            "categoria": "Accesorios"
        }
    ]
    if (!idProducto) {
        return productos; // Retorna todos los productos si no se especifica un idProducto
    }
    // Busca el producto por idProducto
    const productoEncontrado = productos.find(p => p.idProducto === idProducto);

    if (productoEncontrado) {
        return productoEncontrado; // Retorna el producto encontrado
    } else {
        return null; // Retorna null si no se encuentra el producto
    }

}

// Función para mostrar productos por categoría
function showCategory(category) {
    $('.card').each(function () {
        if (category === 'todos' || $(this).data('category') === category) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    $('.category-btn').removeClass('active');
    $('.category-btn').filter(function () {
        return $(this).text().toLowerCase() === category;
    }).addClass('active');
}

// Función para marcar y desmarcar favoritos
function toggleFavorite(button) {
    $(button).toggleClass('active-favorite');
    if ($(button).hasClass('active-favorite')) {
        $(button).text('⭐ Favorito');
    } else {
        $(button).text('⭐ Añadir a favoritos');
    }
}

// arreglo de productos en el carrito
// acelera la búsqueda y evita duplicados
const carrito = [];

// Función para añadir productos al carrito
function addToCart(idProducto) {
    // Verifica hay otros productos en el carrito
    if (carrito.length === 0) {
        $('#cartItems').html(''); // Limpia el carrito si está vacío
    }
    const producto = productos(idProducto);
    // Verifica si el producto ya está en el carrito
    if (carrito.includes(idProducto)) {
        // Si ya está, incrementa la cantidad
        let itemCount = $(`#cart-item-${idProducto} .count`).text();
        itemCount = parseInt(itemCount) + 1;
        $(`#cart-item-${idProducto} .count`).text(itemCount);
    } else {
        // Si no está, añádelo al carrito
        carrito.push(idProducto);
        const itemsCart = $('#cartItems');

        const htmlProducto = `<div class="cart-item" id="cart-item-${idProducto}">
                                    <div class="cart-item-image"
                                        style="background-image: url(${producto.rutaImagen});">
                                    </div>
                                    <div class="cart-item-details px-4 py-2 mb-2">
                                        <h5 class="cart-item-title h5 fw-bold ">${producto.nombre}</h5>
                                        <p class="cart-item-price ${producto.descuento == 0 ? '' : 'has-discount'} mb-1">${producto.precio} <span class="list-price ${producto.descuento == 0 ? 'd-none' : ''}">$37.50</span></p>
                                        <p class="cart-item-cont text-center">
                                            <span class="action minus" onclick="minusOne('${idProducto}')"><ion-icon name="remove"></ion-icon></span>
                                            <span class="action count">1</span>
                                            <span class="action plus" onclick="plusOne('${idProducto}')"><ion-icon name="add"></ion-icon></span>
                                        </p>
                                    </div>
                                    <div class="actions d-flex justify-content-center align-items-center">
                                        <span class="action delete" onclick="removeFromCart('${idProducto}')"><ion-icon name="trash"></ion-icon></span>
                                    </div>
                                </div>`
        $(itemsCart).html($(itemsCart).html() + htmlProducto);

    }
    updateCart();

}

// función para eliminar productos del carrito
function removeFromCart(idProducto) {

    // Elimina el producto del carrito
    carrito.splice(carrito.indexOf(idProducto), 1);

    // Elimina el elemento del DOM
    $(`#cart-item-${idProducto}`).remove();

    // Actualiza el contador del carrito
    updateCart();

}

function minusOne(idProducto) {
    let itemCount = $(`#cart-item-${idProducto} .count`).text();
    itemCount = parseInt(itemCount) - 1;
    if (itemCount <= 0) {
        removeFromCart(idProducto);

    } else {
        $(`#cart-item-${idProducto} .count`).text(itemCount);
    }
    updateCart();
}
// función para incrementar el conteo de productos en el carrito
function plusOne(idProducto) {


    let itemCount = $(`#cart-item-${idProducto} .count`).text();
    itemCount = parseInt(itemCount) + 1;
    $(`#cart-item-${idProducto} .count`).text(itemCount);
    updateCart();
}

// actualizar conteo del carrito e importe total
function updateCart() {
    const cartCount = $('.cart-count');
    let count = 0;
    let total = 0;

    carrito.forEach(idProducto => {
        const producto = productos(idProducto);
        count += parseInt($(`#cart-item-${idProducto} .count`).text());
        total += producto.precio * parseInt($(`#cart-item-${idProducto} .count`).text());
    });

    cartCount.text(count);
    $('#cart-total').text(`$${total.toFixed(2)}`);
    // Si el carrito está vacío, actualiza el contador a 0
    if (carrito.length === 0) {
        const itemsCart = $('#cartItems');
        $(itemsCart).html('<p class="text-center text-danger">El carrito está vacío 😒</p> ');
    }
    // Calcula el ahorro total
    calculateSavings();
}

// calcular ahorro en la compra
function calculateSavings() {
    let totalAhorro = 0;
    carrito.forEach(idProducto => {
        const producto = productos(idProducto);
        if (producto.descuento > 0) {
            const ahorro = producto.precioLista - producto.precio;
            totalAhorro += ahorro * parseInt($(`#cart-item-${idProducto} .count`).text());
        }
    });
    $('#total-savings').text(`Ahorro total: $${totalAhorro.toFixed(2)}`);
    if (totalAhorro > 0) {
        $('#total-savings').removeClass('d-none');
    } else {
        $('#total-savings').addClass('d-none');
    }
}

