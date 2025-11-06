// Menu hamburger
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', function () {
        navLinks.classList.toggle('active');
    });
});

// carrousel - banner

(function () {
    // Seleciona o elemento do banner onde o carrousel está localizado
    const root = document.querySelector('#banner .carrousel');
    if (!root) return; // Se não encontrar o elemento encerra a execução

    // Seleciona o track do carrousel e os slides (cada item da sequência)
    const track = root.querySelector('.carrousel-track');
    const slides = Array.from(root.querySelectorAll('.carrousel-slide'));

    // Selecionar os botões da navegação anterior e próximo e o container de pontos
    const prevBtn = root.querySelector('.prev');
    const nextBtn = root.querySelector('.next');
    const dotsContainer = root.querySelector('.carrousel-dots');

    // Configuração do carrousel a partir do atributo HTML
    const autoplay = root.getAttribute('data-autoplay') === 'true'; // Verifica se o auto play está ativado no html como true
    const interValMs = parseInt(root.getAttribute('data-interval') || '4000', 10); // Define o intervalo de troca dos slides 

    // Estado inicial do carrousel
    let index = 0; // Índice do slide atual
    let timer = null; // Timer para o autoplay
    let isHovering = false; // Estado para controlar quando o mouse está sobre o carrousel

    // Criação dos pontos (indicadores) de navegação 
    const dots = slides.map((_, i) => {
        const b = document.createElement('button');
        b.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        b.addEventListener('click', () => goTo(i)); // ao clicar vai para o slide correspondente
        dotsContainer.appendChild(b);
        return b;
    });

    // Atualiza a interface, movendo o track e ativando o ponto correspondente
    function updateUI() {
        const offset = -index * 100; // Calcula a distância a ser movida para exibir o slide correto
        track.style.transform = `translateX(${offset}%)`; // Move o track para o slide correto 
        dots.forEach((d, i) => d.classList.toggle('active', i === index)); // Marcar o ponto ativo
    }

    // Função para navegar até o slide que eu quero
    function goTo(i) {
        index = (i + slides.length) % slides.length; // Garantir que o índice fique dentro dos limites 
        updateUI(); // Atualiza a interface após a navegação 
        restartAutoplay(); // Reinicia o autoplay 
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    // Funções para controlar o autoplay (auto-avançar os slides)
    function startAutoplay() {
        if (!autoplay || timer) return; // Não inicia o autoplay se já tiver ativo
        timer = setInterval(() => {
            if (!isHovering) next(); // Se o mouse não estiver sobre o carrousel, avança para o próximo slide
        }, interValMs); // Define o intervalo entre cada troca de slide 
    }

    function stopAutoplay() {
        if (timer) {
            clearInterval(timer); // para o Autoplay
            timer = null; // reseta o timer
        }
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pausa do autoPlay quando o mouse entra no carrousel e retoma quando sai 
    root.addEventListener('mouseenter', () => { isHovering = true; });
    root.addEventListener('mouseleave', () => { isHovering = false; });

    // Adiciona os eventos de click nos botões de navegação 
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);

    // Configura os eventos de toque para dispositivos móveis
    let startX = 0;
    let isSwiping = false;
    root.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; // Guarda a posição inicial do toque
        isSwiping = true; // indica que o usuário está tentando arrastar
        stopAutoplay(); // para o autoplay ao tocar
    }, { passive: true });

    // Detecta o movimento do dedo e determina se o usuário fez swipe para esquerda ou direita 
    root.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const dx = e.touches[0].clientX - startX; // Calcular o deslocamento horizontal 
        // Se o deslocamento for maior que 50px, é considerado um swipe
        if (Math.abs(dx) > 50) {
            isSwiping = false;
            if (dx < 0) next(); // Se deslizou para a esquerda vai para o próximo slide
            else prev(); // Se deslizou para a direita vai para o slide anterior
        }
    }, { passive: true });

    // Quando o toque termina, reinicia o autoplay 
    root.addEventListener('touchend', () => {
        isSwiping = false;
        startAutoplay();
    });

    // Adicionar o suporte para navegação via teclado (setas esquerda e direita) 
    root.setAttribute('tabindex', '0'); // Torna o carrousel navegável via teclado
    root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prev(); // Se pressionar para a esquerda navega para o slide anterior
        if (e.key === 'ArrowRight') next(); // Se pressionar para a direita navega para o próximo slide
    });

    // Inicializa o carrousel, configurando o estado inicial e começando o autoplay
    updateUI();
    startAutoplay();
})();