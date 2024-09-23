const playerBoard = document.getElementById('player-board');
const computerBoard = document.getElementById('computer-board');
const status = document.getElementById('status');
const botao = document.getElementById('botaoReset');

let placarComputador = document.getElementById('placarRobo');
let placarPlayer = document.getElementById('placarPlayer');

let navioComputador = 10;
let navioPlayer = 10;

let playerGrid = [];
let computerGrid = [];
let playerCor = [];
let computerCor = [];
let jogoActive = true;
let playerTurn = true;

// Função para inicializar o tabuleiro
function initializeBoard(board, grid, cores) {
    board.innerHTML = '';
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.index = i;

        if (board === computerBoard) {
            cell.addEventListener('click', () => handleClick(cell));
            cell.addEventListener('mouseover', () => handleMouseOver(cell));
            cell.addEventListener('mouseout', () => handleMouseOut(cell));
        }

        board.appendChild(cell);
        grid[i] = 0; // 0 significa célula vazia
        cores[i] = 0; // definição para separar as cores depois
    }
}

// Função para reiniciar o jogo
function resetJogo() {
    playerGrid = Array(100).fill(0);
    computerGrid = Array(100).fill(0);
    playerCor = Array(100).fill(0);
    computerCor = Array(100).fill(0);
    jogoActive = true;
    playerTurn = true;
    status.textContent = 'Sua vez!';
    reinicarPlacar();
    initializeBoard(playerBoard, playerGrid, playerCor);
    initializeBoard(computerBoard, computerGrid, computerCor);
    placeShips(playerGrid, playerCor);
    placeShips(computerGrid, computerCor);
}

// Função para adicionar navios aleatoriamente
function placeShips(grid, cores) {
    const shipTypes = [
        { size: 5, count: 1, cor: 10 },
        { size: 4, count: 2, cor: 20 },
        { size: 3, count: 3, cor: 30 },
        { size: 2, count: 4, cor: 40 }
    ];

    for (const shipType of shipTypes) {
        for (let i = 0; i < shipType.count; i++) {
            let shipPlaced = false;
            while (!shipPlaced) {
                const direction = Math.random() < 0.5 ? 'horizontal' : 'vertical';
                const startIndex = Math.floor(Math.random() * (direction === 'horizontal' ? 100 - shipType.size : 100 - shipType.size * 10));

                let isValid = true;
                for (let j = 0; j < shipType.size; j++) {
                    const index = direction === 'horizontal' ? startIndex + j : startIndex + j * 10;
                    if (grid[index] !== 0) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) {
                    for (let j = 0; j < shipType.size; j++) {
                        const index = direction === 'horizontal' ? startIndex + j : startIndex + j * 10;
                        grid[index] = 1;
                        cores[index] = shipType.cor;
                    }
                    shipPlaced = true;
                }
            }
        }
    }
}

// Função para lidar com o mouse sobre a célula
function handleMouseOver(cell) {
    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
        cell.style.backgroundColor = '#7f7f7f'; // Muda a cor da célula ao passar o mouse
    }
}

// Função para lidar com o mouse fora da célula
function handleMouseOut(cell) {
    if (!cell.classList.contains('hit') && !cell.classList.contains('miss')) {
        cell.style.backgroundColor = ''; // Volta a cor original da célula
    }
}

// Função para lidar com o clique na célula
function handleClick(cell) {
    if (jogoActive && playerTurn && !cell.classList.contains('hit') && !cell.classList.contains('miss')) {
        const index = cell.dataset.index;

        if (computerGrid[index] === 1 && computerCor[index]=== 10) {
            cell.classList.add('hit');
            computerGrid[index] = 2; // Marca como acertado
            cell.style.backgroundColor = '#f53b07';
            status.textContent = "Você acertou!";
            navioPlayer--;
            placarAtual();

        }
        else if (computerGrid[index] === 1 && computerCor[index]=== 20) {
            cell.classList.add('hit');
            computerGrid[index] = 2; // Marca como acertado
            cell.style.backgroundColor = '#56f507';
            status.textContent = "Você acertou!";
            navioPlayer--;
            placarAtual();

        }
        else if (computerGrid[index] === 1 && computerCor[index]=== 30) {
            cell.classList.add('hit');
            computerGrid[index] = 2; // Marca como acertado
            cell.style.backgroundColor = '#f507e9';
            status.textContent = "Você acertou!";
            navioPlayer--;
            placarAtual();

        }else if (computerGrid[index] === 1 && computerCor[index]=== 40) {
            cell.classList.add('hit');
            computerGrid[index] = 2; // Marca como acertado
            cell.style.backgroundColor = '#eb4034';
            status.textContent = "Você acertou!";
            navioPlayer--;
            placarAtual();

        }
        
        else {
            cell.classList.add('miss');
            computerGrid[index] = -1; // Marca como erro
            status.textContent = "Você errou!";
            playerTurn = false; // Troca para o computador
            setTimeout(computerTurn, 1000); // Espera um segundo antes do turno do computador
        }

        checkJogoStatus();
    }
}

// Função para o turno do computador
function computerTurn() {
    if (jogoActive) {
        let index;
        do {
            index = Math.floor(Math.random() * 100);
        } while (playerGrid[index] === -1 || playerGrid[index] === 2);

        const playerCell = playerBoard.children[index];

        if (playerGrid[index] === 1) {
            playerCell.classList.add('hit');
            playerGrid[index] = 2; // Marca como acertado
            status.textContent = "O computador acertou!";
            navioComputador--;
            setTimeout(computerTurn, 1500); // Espera um segundo antes do turno do computador

        } else {
            playerCell.classList.add('miss');
            playerGrid[index] = -1; // Marca como erro
            status.textContent = "O computador errou!";
            playerTurn = true; // Volta para o jogador
        }
        placarAtual();
        checkJogoStatus();
    }
}

function checkJogoStatus() {
    const playerShips = playerGrid.filter(cell => cell === 1).length;
    const computerShips = computerGrid.filter(cell => cell === 1).length;

    if (playerShips === 0) {
        jogoActive = false;
        alert("Computador ganhou!");
    } else if (computerShips === 0) {
        jogoActive = false;
        alert("Você ganhou!");
    }
}

const placarAtual = () => {
    placarComputador.innerText = navioComputador;
    placarPlayer.innerText = navioPlayer;
}

const reinicarPlacar = () => {
    navioComputador = 30;
    navioPlayer = 30;

    placarComputador.innerText = navioComputador;
    placarPlayer.innerText = navioPlayer;
}

// Inicializa o jogo
resetJogo();

botao.addEventListener('click', resetJogo);
placarAtual();