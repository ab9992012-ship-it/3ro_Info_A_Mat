/* =========================
   CARRUSEL
========================= */

const track =
    document.querySelector('.carousel-track');

const slides =
    Array.from(track.children);

const nextButton =
    document.querySelector('.btn-next');

const prevButton =
    document.querySelector('.btn-prev');

let currentSlideIndex = 0;


const updateCarousel = (index) => {

    track.style.transform =
        'translateX(-' +
        (index * 100) +
        '%)';


    const currentSlide =
        track.querySelector(
            '.current-slide'
        );


    if (currentSlide) {

        currentSlide.classList.remove(
            'current-slide'
        );

    }


    slides[index].classList.add(
        'current-slide'
    );


    currentSlideIndex = index;

    updateButtonVisibility(index);

};


const updateButtonVisibility = (index) => {

    prevButton.style.opacity =
        index === 0 ? '0.2' : '1';

    prevButton.style.pointerEvents =
        index === 0 ? 'none' : 'auto';


    nextButton.style.opacity =
        index === slides.length - 1
            ? '0.2'
            : '1';

    nextButton.style.pointerEvents =
        index === slides.length - 1
            ? 'none'
            : 'auto';

};


updateButtonVisibility(0);


nextButton.addEventListener(
    'click',
    () => {

        if (
            currentSlideIndex <
            slides.length - 1
        ) {

            updateCarousel(
                currentSlideIndex + 1
            );

        }

    }
);


prevButton.addEventListener(
    'click',
    () => {

        if (
            currentSlideIndex > 0
        ) {

            updateCarousel(
                currentSlideIndex - 1
            );

        }

    }
);


/* =========================
   VIDEO AUTOMÁTICO
========================= */

const promoVideo =
    document.querySelector('.promo-video');


promoVideo.muted = true;


promoVideo.setAttribute(
    'muted',
    ''
);


promoVideo.setAttribute(
    'playsinline',
    ''
);


const startVideo = () => {

    const playPromise =
        promoVideo.play();


    if (
        playPromise !== undefined
    ) {

        playPromise.catch(() => {

            console.log(
                'El navegador bloqueó temporalmente el autoplay.'
            );

        });

    }

};


window.addEventListener(
    'load',
    startVideo
);


/* =========================
   CARRITO
========================= */

let cart = [];


const openCartBtn =
    document.getElementById(
        'openCartBtn'
    );


const closeCartBtn =
    document.getElementById(
        'closeCartBtn'
    );


const cartSidebar =
    document.getElementById(
        'cartSidebar'
    );


const cartOverlay =
    document.getElementById(
        'cartOverlay'
    );


const cartItemsContainer =
    document.getElementById(
        'cartItemsContainer'
    );


const cartTotalValue =
    document.getElementById(
        'cartTotalValue'
    );


const cartBadgeCount =
    document.getElementById(
        'cartBadgeCount'
    );


const clearCartBtn =
    document.getElementById(
        'clearCartBtn'
    );


const toggleCart = () => {

    cartSidebar.classList.toggle(
        'open'
    );


    cartOverlay.classList.toggle(
        'open'
    );

};


openCartBtn.addEventListener(
    'click',
    toggleCart
);


closeCartBtn.addEventListener(
    'click',
    toggleCart
);


cartOverlay.addEventListener(
    'click',
    toggleCart
);


/* =========================
   PRODUCTOS
========================= */

document
    .querySelectorAll(
        '.add-to-cart-btn'
    )
    .forEach(button => {

        button.addEventListener(
            'click',
            (e) => {

                const card =
                    e.target.closest(
                        '.product-card'
                    );


                const id =
                    card.getAttribute(
                        'data-id'
                    );


                const name =
                    card.getAttribute(
                        'data-name'
                    );


                const price =
                    parseFloat(
                        card.getAttribute(
                            'data-price'
                        )
                    );


                const img =
                    card.getAttribute(
                        'data-img'
                    );


                const existingItem =
                    cart.find(
                        item =>
                            item.id === id
                    );


                if (existingItem) {

                    existingItem.quantity += 1;

                } else {

                    cart.push({

                        id,
                        name,
                        price,
                        img,
                        quantity: 1

                    });

                }


                updateCartUI();

            }
        );

    });


/* =========================
   ACTUALIZAR CARRITO
========================= */

const updateCartUI = () => {

    cartItemsContainer.innerHTML = '';

    let total = 0;

    let totalItems = 0;


    cart.forEach(item => {

        total +=
            item.price *
            item.quantity;


        totalItems +=
            item.quantity;


        const itemHTML = `

            <div class="cart-item">

                <img
                    src="${item.img}"
                    class="cart-item-img"
                    alt="${item.name}"
                >

                <div class="cart-item-info">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        ${item.quantity}x -
                        $${item.price.toFixed(2)}
                    </p>

                </div>

                <button
                    class="remove-item-btn"
                    onclick="removeItem('${item.id}')">

                    <i
                        class="fas fa-trash-alt">
                    </i>

                </button>

            </div>

        `;


        cartItemsContainer.insertAdjacentHTML(
            'beforeend',
            itemHTML
        );

    });


    cartTotalValue.innerText =
        `$${total.toFixed(2)}`;


    cartBadgeCount.innerText =
        totalItems;

};


/* =========================
   ELIMINAR PRODUCTO
========================= */

window.removeItem = (id) => {

    cart =
        cart.filter(
            item =>
                item.id !== id
        );


    updateCartUI();

};


/* =========================
   VACIAR CARRITO
========================= */

clearCartBtn.addEventListener(
    'click',
    () => {

        cart = [];

        updateCartUI();

    }
);