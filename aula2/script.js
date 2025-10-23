// Dados Simples do cardápio
const products = {
  burgers: [
    { id: 'b1', name: 'Clássico', desc: 'Pão, carne, queijo, alface e tomate', price: 18.9, img: 'images/hamb_1.jpg' },
    { id: 'b2', name: 'Cheddar Bacon', desc: 'Pão, carne, cheddar cremoso, bacon, alface e tomate', price: 18.9, img: 'images/hamb_2.jpg' },
    { id: 'b3', name: 'Vegano', desc: 'Pão, grão de bico, queijo, alface e tomate', price: 18.9, img: 'images/hamb_1.jpg' }
  ],
  drinks: [
    { id: 'd1', name: 'Refrigerante Lata', desc: '350 ml', price: 5.9, img: 'images/refri_2.jpg' },
    { id: 'd2', name: 'Refrigerante 600ml', desc: 'Garrafa 600ml', price: 6.9, img: 'images/refri_1.jpg' },
  ],
};

const deliveryFree = 5;

const state = {
  cart: {}, // id => { product, qty }
};

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createCard(product) {
  const card = document.createElement('div');
  card.className = 'card';

  if (product.img) {
    const img = document.createElement('img');
    img.className = 'card__img';
    img.src = product.img;
    img.alt = product.name;
    card.appendChild(img);
  }

  const title = document.createElement('h4');
  title.className = 'card__title';
  title.textContent = product.name;

  const desc = document.createElement('p');
  desc.className = 'card__desc';
  desc.textContent = product.desc;

  const footer = document.createElement('div');
  footer.className = 'card__footer';

  const price = document.createElement('span');
  price.className = 'price';
  price.textContent = formatBRL(product.price);

  const btn = document.createElement('button');
  btn.className = 'btn';
  btn.textContent = 'Adicionar';
  btn.addEventListener('click', () => addToCart(product));

  footer.append(price, btn);
  card.append(title, desc, footer);

  return card;
}

function renderMenu() {
  const burgersEl = document.getElementById('burgers');
  const drinksEl = document.getElementById('drinks');

  products.burgers.forEach(p => burgersEl.appendChild(createCard(p)));
  products.drinks.forEach(p => drinksEl.appendChild(createCard(p)));
}

function addToCart(product) {
  const current = state.cart[product.id];
  state.cart[product.id] = {
    product,
    qty: current ? current.qty + 1 : 1,
  };
  renderCart();
}

function changeQty(productId, delta) {
  const entry = state.cart[productId];
  if (!entry) return;

  entry.qty += delta;
  if (entry.qty <= 0) {
    delete state.cart[productId];
  }

  renderCart();
}

function renderCart() {
  const cartEl = document.getElementById('cart');
  cartEl.innerHTML = '';

  let total = 0;

  Object.values(state.cart).forEach(({ product, qty }) => {
    const item = document.createElement('div');
    item.className = 'cart__item';
    item.textContent = `${qty}x ${product.name} - ${formatBRL(product.price * qty)}`;

    const plus = document.createElement('button');
    plus.textContent = '+';
    plus.onclick = () => changeQty(product.id, 1);

    const minus = document.createElement('button');
    minus.textContent = '-';
    minus.onclick = () => changeQty(product.id, -1);

    item.append(plus, minus);
    cartEl.appendChild(item);

    total += product.price * qty;
  });

  document.getElementById('subtotal').textContent = formatBRL(total);
  document.getElementById('delivery').textContent = formatBRL(deliveryFree);
  document.getElementById('total').textContent = formatBRL(total + deliveryFree);
}

// ------------------------
// Carrossel
// ------------------------

function initCarousel() {
  const track = document.getElementById('carousel__track');
  const slides = Array.from(track?.children || []);
  if (!track || slides.length === 0) return;

  // Cria e insere os dots
  const dotsWrap = document.createElement('div');
  dotsWrap.className = 'carousel__dots';
  dotsWrap.id = 'carousel-dots';
  track.parentElement.appendChild(dotsWrap);

  let index = 0;

  const updateSlide = () => {
    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  };

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
    dot.setAttribute('aria-label', `Ir para banner ${i + 1}`);
    dot.addEventListener('click', () => {
      index = i;
      updateSlide();
    });
    dotsWrap.appendChild(dot);
    return dot;
  });

  // Avança automaticamente a cada 5 segundos
  setInterval(() => {
    index = (index + 1) % slides.length;
    updateSlide();
  }, 5000);
}

// ------------------------
// Inicialização
// ------------------------

function init() {
  renderMenu();
  initCarousel();
}

document.addEventListener('DOMContentLoaded', init);
