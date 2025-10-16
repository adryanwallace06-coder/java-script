// Dados Simples dos cardápio
burger: [
    {id: 'b1', name: 'Clássico', desc: 'Pão, carne, queijo, alface e tomate', price: 18.9,  img: 'images/hamb_1'},
    {id: 'b2', name: 'Cheddar Bacon', desc: 'Pão, carne, cheddar cremoso, bacon, alface e tomate', price: 18.9,  img: 'images/hamb_2'},
   {id: 'b3', name: 'Vegano', desc: 'Pão, grão de bico, queijo, alface e tomate', price: 18.9,  img: 'images/hamb_1'}
];


drinks: [
    {id: 'd1', name: 'Refrigerante Lata', desc: '350 ml', price: 18.9,  img: '..images/refri_1'},
    {id: 'd2', name: 'refrigerante 600ml', desc: 'Garrafa 600ml', price: 18.9,  img: '..images/refri_2'},
];



// Corousel simples

function init () {
    initCarousel();


}

document.addEventListener('DOMContentLoaded', init)

function initCarousel () {
    const track = document.getElementById ('carousel__track');
    const slides = Array.from (track?.children || []);
    const dotsWrap = document.getElementById ('carousel-dots');
    if (!track || slides.length === 0 || !dotsWrap) return;

    let index = 0;
    const total = slides.length;
    const dots = slides.map((_, i) => {
    const d = document.createElement('button')
    d.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
    d.setAttribute('arial-label', `ir para banner $(i = 1)`);
    d.addEventListener('click', () => goTo(1));
    dotsWrap.appendChild(d);
    }
)
}