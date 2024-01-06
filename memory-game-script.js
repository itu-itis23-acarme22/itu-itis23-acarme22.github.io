const images = [
    'e1.png',
    'm1.png',
    'I1.png',
    'n1.png',
    '11.png'
];
let shuffledLetters = [];
let sequence = [];
let score = 0;
let cardsClickable = false;
const gameBoard = document.getElementById('game-board');


display();

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', restartGame);

function turnCardsClickable(clickable) {
    cardsClickable = clickable;
}
function startGame() {
    display();
    resetGame();
    shuffleLetters(); 
    displayCards()
    setTimeout(turnCardsFaceDown, 2000);
    
}
function startGame0() {
    resetGame0()
    shuffleLetters(); 
    displayCards()
    setTimeout(turnCardsFaceDown, 2000);
    
}
function resetGame() {
    shuffledLetters = [];
    sequence = [];
    score = 0;
    updateScoreDisplay();
    clearGameBoard();
    turnCardsClickable(false)
}
function resetGame0() {
    shuffledLetters = [];
    sequence = [];
    
    updateScoreDisplay();
    clearGameBoard();
    turnCardsClickable(false)
}

function shuffleLetters() {
    shuffledLetters = images.slice(); 
    shuffledLetters.sort(() => Math.random() - 0.5);
}

function displayCards() {
    clearGameBoard();

    shuffledLetters.forEach((image) => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = image;
        img.style.width = '100px'; 
        img.style.height = '100px'; 

        card.appendChild(img);

        card.addEventListener('click', () => handleCardClick(card, image));
        gameBoard.appendChild(card);
    });
}
function display() {
    clearGameBoard();
    normalLetters = images.slice()

    normalLetters.forEach((image) => {
        const card = document.createElement('div');
        card.className = 'card';

        const img = document.createElement('img');
        img.src = image;
        img.style.width = '100px'; 
        img.style.height = '100px'; 

        card.appendChild(img);

        card.addEventListener('click', () => handleCardClick(card, image));
        gameBoard.appendChild(card);
    });
}

function clearGameBoard() {
    gameBoard.innerHTML = '';
}

function turnCardsFaceDown() {
    turnCardsClickable(true)
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => {
        card.firstChild.src = 't1.png';
        card.style.backgroundColor = '#060b21';
    });
}

function handleCardClick(card, image) {
    if (!cardsClickable) {
        return; //
    }
    const expectedImage = images[sequence.length];
    card.firstChild.src = image;
    card.style.backgroundColor = '#202b58';

    if (image === expectedImage) {
        sequence.push(image);
        score += 20;

        if (sequence.length === images.length) {
            
            setTimeout(() => {
                alert('Congratulations! You completed the game.');
                
                startGame0()
            }, 500); 
        }
    } else {
        
        setTimeout(() => {
            card.firstChild.src = 't1.png';
            card.style.backgroundColor = '#878682';
        }, 500);

        alert('Wrong attempt! Game over.');
        resetGame();
        display();
    }

    updateScoreDisplay();
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
}

function restartGame() {
    resetGame();
    startGame();
}