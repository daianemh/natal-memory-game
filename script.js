// Imagens para o jogo (nomes das imagens em imagens/)
const images = [
    'imagens/tree.png', 'imagens/gift.jpg', 'imagens/santa.jpg', 'imagens/reindeer.avif', 'imagens/snowman.jpg', 'imagens/bell.png', 'imagens/star.avif', 'imagens/natal.webp',
    'imagens/tree.png', 'imagens/gift.jpg', 'imagens/santa.jpg', 'imagens/reindeer.avif', 'imagens/snowman.jpg', 'imagens/bell.png', 'imagens/star.avif', 'imagens/natal.webp'
];

// Elementos do jogo
const gameBoard = document.querySelector('.game-board');
const restartButton = document.getElementById('restart-button');
let flippedCards = [];
let matchedCards = [];

// Função para embaralhar as imagens
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Função para iniciar o jogo
function startGame() {
    // Embaralha as imagens
    shuffle(images);
    gameBoard.innerHTML = ''; // Limpa o tabuleiro

    // Cria as cartas
    images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-image', image);
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });

    flippedCards = [];
    matchedCards = [];
}

// Função que vira a carta
function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped') || this.classList.contains('matched')) return;

    this.classList.add('flipped');
    // Ajuste para usar o caminho correto da imagem
    this.style.backgroundImage = `url('${this.getAttribute('data-image')}')`;

    flippedCards.push(this);

    // Verifica se duas cartas foram viradas
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Função para checar se as cartas viradas são iguais
function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.getAttribute('data-image') === card2.getAttribute('data-image')) {
        // Cartas iguais
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        // Cartas diferentes
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.style.backgroundImage = '';
            card2.style.backgroundImage = '';
        }, 1000);
    }

    flippedCards = [];

    // Verifica se o jogo acabou
    if (matchedCards.length === images.length) {
        alert('Você venceu!');
    }
}

// Função para reiniciar o jogo
restartButton.addEventListener('click', startGame);

// Inicia o jogo ao carregar
startGame();
