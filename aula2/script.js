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

//Valor do frete
const deliveryFree = 5;

// Cria um objeto state que guarda o estado atual do carrinho.

//cart é um objeto onde cada chave é o id do produto e o valor é um objeto com o produto e a quantidade.
const state = {
cart: {}, // id => { product, qty }
};

//Converte números (como 12.5) para moeda brasileira (R$ 12,50)
function formatBRL(value) {
return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

//Essa função monta o HTML de um produto no menu, com imagem, nome, descrição, preço e botão “Adicionar”.

// Cria um contêiner (div) com a classe "card", que será o bloco do produto.
function createCard(product) {
const card = document.createElement('div');
card.className = 'card';

// Se o produto tiver imagem, cria uma tag <img> com a foto, define o caminho (src) e o texto alternativo (alt), e adiciona ao card.
if (product.img) {
const img = document.createElement('img');
img.className = 'card__img';
img.src = product.img;
img.alt = product.name;
card.appendChild(img);
}

// Cria o título (<h4>) com o nome do produto.
const title = document.createElement('h4');
title.className = 'card__title';
title.textContent = product.name;


// Cria a descrição (<p>) com o texto descritivo do produto.
const desc = document.createElement('p');
desc.className = 'card__desc';
desc.textContent = product.desc;


// Cria o rodapé (<div>) que vai conter o preço e o botão.
const footer = document.createElement('div');
footer.className = 'card__footer';


// Cria o preço (<span>), formatando o valor em reais com formatBRL(product.price).
const price = document.createElement('span');
price.className = 'price';
price.textContent = formatBRL(product.price);


// Cria o botão “Adicionar”, que ao ser clicado chama addToCart(product) para adicionar o item ao carrinho
const btn = document.createElement('button');
btn.className = 'btn';
btn.textContent = 'Adicionar';
btn.addEventListener('click', () => addToCart(product));


// Adiciona o preço e o botão dentro do rodapé do card (footer)
footer.append(price, btn);

// Adiciona o título, a descrição e o rodapé dentro do card principal (card).
card.append(title, desc, footer);

// Adiciona campo de observação para personalização
if (product.id.startsWith('b')) { // Só para hambúrgueres
const obs = document.createElement('input');
obs.type = 'text';
obs.placeholder = 'Observação (ex: sem cebola, extra bacon)';
obs.className = 'card__obs';
card.appendChild(obs);
btn.addEventListener('click', () => {
product.obs = obs.value;
});
}

return card;
}

//Pega as seções do HTML (burgers e drinks).
//Para cada produto, cria um card com createCard() e coloca na tela.
function renderMenu() {
const burgersEl = document.getElementById('burgers');
const drinksEl = document.getElementById('drinks');

products.burgers.forEach(p => burgersEl.appendChild(createCard(p)));
products.drinks.forEach(p => drinksEl.appendChild(createCard(p)));
}


//Verifica se o produto já está no carrinho (current).

//Se sim ➜ aumenta a quantidade.

//Se não ➜ adiciona com qty: 1.

//Depois chama renderCart() (que atualiza a visualização do carrinho)
function addToCart(product) {
const current = state.cart[product.id];
state.cart[product.id] = {
product,
qty: current ? current.qty + 1 : 1,
};
renderCart();
}


//delta pode ser +1 (aumentar) ou -1 (diminuir).

//Se a quantidade chegar a 0, o item é removido do carrinho.

//Depois atualiza a tela novamente com renderCart().
function changeQty(productId, delta) {
const entry = state.cart[productId];
if (!entry) return;

entry.qty += delta;
if (entry.qty <= 0) {
delete state.cart[productId];
}

renderCart();
}

// Apresentar carrinho na tela
function renderCart() {
const cartEl = document.getElementById('cart');
// Limpando a lista de produtos do carrinho de compras
cartEl.innerHTML = '';

let total = 0;

// Esse código percorre todos os itens do carrinho de compras (state.cart) e monta na tela (no HTML) uma listagem com os produtos, quantidades e valores.


// Percorre os intens do carrinho
Object.values(state.cart).forEach(({ product, qty }) => {

//Cria um elemento visual para cada item
const item = document.createElement('div');
item.className = 'cart__item';
item.textContent = `${qty}x ${product.name} - ${formatBRL(product.price * qty)}`;


// Cria botões + e - para alterar quantidade
const plus = document.createElement('button');
plus.textContent = '+';
plus.onclick = () => changeQty(product.id, 1);

const minus = document.createElement('button');
minus.textContent = '-';
minus.onclick = () => changeQty(product.id, -1);


// Adiciona os botões ao item e o item ao carrinho 
item.append(plus, minus);
cartEl.appendChild(item);


// Atualiza o total da compra
total += product.price * qty;
});


// Mostra os Valores finais na tela 
document.getElementById('subtotal').textContent = formatBRL(total);
document.getElementById('delivery').textContent = formatBRL(deliveryFree);
document.getElementById('total').textContent = formatBRL(total + deliveryFree);
}


function handleCheckoutSubmit(event) {
  event.preventDefault(); // evita o recarregamento da página

  const form = event.currentTarget;
  const name = form.elements.name.value.trim();
  const address = form.elements.address.value.trim();
  const payment = form.elements.payment.value;
  const hasItems = Object.keys(state.cart).length > 0;

  // verifica se algum campo está vazio ou se o carrinho está vazio
  if (!name || !address || !payment || !hasItems) {
    alert('Preencha os dados e adicione itens ao carrinho.');
    return;
  }

  alert('Pedido realizado com sucesso!');
  startOrderSimulation(name); // Inicia a simulação do pedido
}


// Simulação do pedido 
let lastOrderTimer = [];

function startOrderSimulation(customer) {
  const OrderBox = document.getElementById('order-status');
  const stepEl = document.getElementById('order-steps');
  const barEl = document.getElementById('order-bar');
  const orderIdel = document.getElementById('order-id');
  
  if (!OrderBox || !stepEl || !barEl || !orderIdel) return;

  // Limpar timers anteriores
  lastOrderTimer.forEach(clearTimeout);
  lastOrderTimer = [];

  // Criar ID numérico de 6 dígitos
  const OrderID = Math.floor(100000 + Math.random() * 900000);
  orderIdel.textContent = `Pedido nº ${OrderID}`;

  OrderBox.classList.remove('order--hidden');

  const steps = Array.from(stepEl.children);
  steps.forEach(s => s.classList.remove('is-done'));

  barEl.style.width = '0%';

  const durations = [1000, 3000, 4000, 3000];
  let acc = 0;

  steps.forEach((step, i) => {
    acc += durations[i]; 

    const timer = setTimeout(() => {
      step.classList.add('is-done');
      const progress = ((i + 1) / steps.length) * 100;
      barEl.style.width = `${progress}%`;
    }, acc);

    lastOrderTimer.push(timer);
  });
}

// conecta o evento de envio ao formulário
document
  .getElementById('check-form')
  .addEventListener('submit', handleCheckoutSubmit);


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

// Adiciona evento ao botão de limpar carrinho
// Quando clicado, esvazia o carrinho e atualiza a tela
document.getElementById('clear-cart').addEventListener('click', () => {
  state.cart = {};
  renderCart();
});
