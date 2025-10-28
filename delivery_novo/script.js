// Dados simples do cardápio
const products = {
  burgers: [
    { id: 'b1', name: 'Clássico', desc: 'Pão, carne, queijo, alface e tomate', price: 18.9, img: './images/hamb_1.jpg' },
    { id: 'b2', name: 'Cheddar Bacon', desc: 'Cheddar cremoso e bacon crocante', price: 24.5, img: './images/hamb_2.jpg' },
    { id: 'b3', name: 'Veggie', desc: 'Grão-de-bico, alface, tomate e maionese', price: 21.0, img: './images/hamb_3.jpg' },
  ],
  drinks: [
    { id: 'd1', name: 'Refrigerante Lata', desc: '350 ml', price: 6.0, img: './images/refri_2.jpg' },
    { id: 'd2', name: 'Refrigerante 600 ml', desc: 'Garrafa 600 ml', price: 9.5, img: './images/refri_1.jpg' },
    { id: 'd3', name: 'Água', desc: 'Sem gás 500 ml', price: 4.5, img: './images/refri_3.jpg' },
  ],
  pizzas: [
    { id: 'p1', name: 'Muzzarela', desc: 'Muzzarela com tomates', price: 30.0, img: './images/pizza1.png' },
    { id: 'p2', name: 'Calabreza', desc: 'Calabreza fresca fatiada', price: 35.0, img: './images/pizza2.png' },
    { id: 'p3', name: 'Atum', desc: 'Atum Solido com cebola', price: 40.5, img: './images/pizza3.png' },
  ],  
};

const deliveryFee = 5;

const state = {
  cart: {}, // id -> { product, qty }
};

function formatBRL(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Cria um cartão de produto
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
  // Quando clicar, adicionar ao carrinho
  btn.addEventListener('click', () => addToCart(product));
  footer.append(price, btn);
  card.append(title, desc, footer);
  return card;
}

function renderMenu() {
  // Renderiza os itens do cardápio
  const burgersEl = document.getElementById('burgers');
  const drinksEl = document.getElementById('drinks');
  const pizzasEl = document.getElementById('pizzas');
  products.burgers.forEach(p => burgersEl.appendChild(createCard(p)));
  products.drinks.forEach(p => drinksEl.appendChild(createCard(p)));
  products.pizzas.forEach(p => pizzasEl.appendChild(createCard(p)));
}

function addToCart(product) {
  // Adiciona um produto ao carrinho
  const current = state.cart[product.id];
  state.cart[product.id] = {
    product,
    qty: current ? current.qty + 1 : 1,
  };
  renderCart();
}

function changeQty(productId, delta) {
  // Altera a quantidade de um item no carrinho
  const entry = state.cart[productId];
  if (!entry) return;
  entry.qty += delta;
  if (entry.qty <= 0) {
    delete state.cart[productId];
  }
  renderCart();
}

function renderCart() {
  // Renderiza o carrinho de compras
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  let subtotal = 0;
  let count = 0;
  Object.values(state.cart).forEach(({ product, qty }) => {
    subtotal += product.price * qty;
    count += qty;
    const li = document.createElement('li');
    li.className = 'cart__item';
    const title = document.createElement('p');
    title.className = 'cart__item-title';
    title.textContent = `${product.name} × ${qty}`;
    const right = document.createElement('div');
    right.className = 'cart__qty';
    const minus = document.createElement('button');
    minus.className = 'btn btn--ghost';
    minus.setAttribute('aria-label', `Diminuir ${product.name}`);
    // alt = 2212
    minus.textContent = '−';
    minus.addEventListener('click', () => changeQty(product.id, -1));
    
    const plus = document.createElement('button');
    plus.className = 'btn btn--ghost';
    plus.setAttribute('aria-label', `Aumentar ${product.name}`);
    plus.textContent = '+';
    plus.addEventListener('click', () => changeQty(product.id, 1));
    const line = document.createElement('span');
    line.className = 'cart__line';
    line.textContent = formatBRL(product.price * qty);
    right.append(minus, plus, line);
    li.append(title, right);
    list.appendChild(li);
  });
// Atualiza os totais
  document.getElementById('subtotal').textContent = formatBRL(subtotal);
  document.getElementById('delivery').textContent = formatBRL(subtotal > 0 ? deliveryFee : 0);
  document.getElementById('total').textContent = formatBRL(subtotal + (subtotal > 0 ? deliveryFee : 0));
  document.getElementById('cart-count').textContent = `(${count})`;
}

function handleCheckoutSubmit(event) {
  // Impede o envio padrão do formulário
  event.preventDefault();
  const form = event.currentTarget;
  const name = form.name.value.trim();
  const address = form.address.value.trim();
  const payment = form.payment.value;
  const hasItems = Object.keys(state.cart).length > 0;

  if (!name || !address || !payment || !hasItems) {
    alert('Preencha os dados e adicione itens ao carrinho.');
    return;
  }

  // Simulação de pedido com status
  startOrderSimulation({ name, address, payment });
}

function init() {
  // Inicializa a aplicação
  renderMenu();
  renderCart();
  document.getElementById('checkout-form').addEventListener('submit', handleCheckoutSubmit);
  document.getElementById('year').textContent = new Date().getFullYear();
  // Inicializa o carrossel
  initCarousel();
}

document.addEventListener('DOMContentLoaded', init);

// Carousel simples
function initCarousel() {
  const track = document.getElementById('carousel-track');
  const slides = Array.from(track?.children || []);
  const dotsWrap = document.getElementById('carousel-dots');
  if (!track || slides.length === 0 || !dotsWrap) return;

  let index = 0;
  const total = slides.length;
  const dots = slides.map((_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
    d.setAttribute('aria-label', `Ir para banner ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
    return d;
  });

  function update() {
    // 
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
  }
  // funções de navegação
  function goTo(i) { index = i; update(); }
  // função para ir para o próximo slide
  function next() { index = (index + 1) % total; update(); }

  // iniciar autoplay
  let timer = setInterval(next, 8000);
  // pausando no foco/hover
  track.addEventListener('mouseenter', () => clearInterval(timer));
  track.addEventListener('mouseleave', () => { timer = setInterval(next, 4000); });
}

// Simulação de pedido
let lastOrderTimer = [];
function startOrderSimulation(customer) {
  const orderBox = document.getElementById('order-status');
  const stepsEl = document.getElementById('order-steps');
  const barEl = document.getElementById('order-bar');
  const orderIdEl = document.getElementById('order-id');
  // verifica elementos
  if (!orderBox || !stepsEl || !barEl || !orderIdEl) return;

  // limpar timers anteriores
  lastOrderTimer.forEach(clearTimeout);
  lastOrderTimer = [];

  // criar ID simples
  const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
  orderIdEl.textContent = `#${orderId}`;
  // mostrar box de status

  orderBox.classList.remove('order--hidden');
  const steps = Array.from(stepsEl.children);
  steps.forEach(s => s.classList.remove('is-done'));
  barEl.style.width = '0%';
  // simular passos do pedido
  const durations = [2000, 3000, 4000, 3000]; // total ~11s
  let acc = 0;
  steps.forEach((step, i) => {
    acc += durations[i];
    const t = setTimeout(() => {
      step.classList.add('is-done');
      // atualizar barra
      barEl.style.width = `${((i + 1) / steps.length) * 100}%`;
      // finalizar pedido
      if (i === steps.length - 1) {
        alert(`Pedido entregue! Obrigado, ${customer.name}.`);
        // reset carrinho e formulário
        state.cart = {};
        renderCart();
        const form = document.getElementById('checkout-form');
        if (form) form.reset();
      }
    }, acc);
    lastOrderTimer.push(t);
  });
}


