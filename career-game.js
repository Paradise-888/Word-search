const words = [
    "DOCTOR", "POLICE", "TEACHER", "ENGINEER", "DESIGNER",
    "ARTIST", "WRITER", "CHEF", "FARMER", "PILOT", "SINGER"
];

const gridSize = 10;
const grid = [];
let foundWords = [];
let currentSelection = [];
let isSelecting = false;

const wordGridElement = document.getElementById('word-grid');
const wordListElement = document.getElementById('word-list');

function createGrid() {
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = Math.floor(i / gridSize);
        cell.dataset.col = i % gridSize;
        const span = document.createElement('span');
        cell.appendChild(span);
        wordGridElement.appendChild(cell);
        grid.push({ element: cell, letter: '' });
    }
}

function placeWords() {
    const sortedWords = words.sort((a, b) => b.length - a.length);
    sortedWords.forEach(word => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
            const direction = Math.floor(Math.random() * 4); // 0: horizontal, 1: vertical, 2: diagonal right, 3: diagonal left
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);

            if (canPlaceWord(word, row, col, direction)) {
                placeWord(word, row, col, direction);
                placed = true;
            }
            attempts++;
        }
    });
}

function canPlaceWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        let newRow = row;
        let newCol = col;
        if (direction === 0) newCol += i; // Horizontal
        if (direction === 1) newRow += i; // Vertical
        if (direction === 2) { newRow += i; newCol += i; } // Diagonal Right
        if (direction === 3) { newRow += i; newCol -= i; } // Diagonal Left

        if (newRow < 0 || newRow >= gridSize || newCol < 0 || newCol >= gridSize) {
            return false;
        }

        const cellIndex = newRow * gridSize + newCol;
        if (grid[cellIndex].letter !== '' && grid[cellIndex].letter !== word[i]) {
            return false;
        }
    }
    return true;
}

function placeWord(word, row, col, direction) {
    for (let i = 0; i < word.length; i++) {
        let newRow = row;
        let newCol = col;
        if (direction === 0) newCol += i;
        if (direction === 1) newRow += i;
        if (direction === 2) { newRow += i; newCol += i; }
        if (direction === 3) { newRow += i; newCol -= i; }
        
        const cellIndex = newRow * gridSize + newCol;
        grid[cellIndex].letter = word[i];
    }
}

function fillEmptyCells() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    grid.forEach(cell => {
        if (cell.letter === '') {
            const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
            cell.letter = randomLetter;
        }
        cell.element.querySelector('span').textContent = cell.letter;
    });
}

function setupEventListeners() {
    wordGridElement.addEventListener('mousedown', (e) => {
        const cell = e.target.closest('.grid-cell');
        if (cell) {
            isSelecting = true;
            clearSelection();
            selectCell(cell);
        }
    });

    wordGridElement.addEventListener('mouseover', (e) => {
        if (isSelecting) {
            const cell = e.target.closest('.grid-cell');
            if (cell) {
                selectCell(cell);
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (isSelecting) {
            isSelecting = false;
            checkSelection();
        }
    });
}

function selectCell(cell) {
    if (!currentSelection.includes(cell) && !cell.classList.contains('found')) {
        currentSelection.push(cell);
        cell.classList.add('highlighted');
    }
}

function clearSelection() {
    currentSelection.forEach(cell => cell.classList.remove('highlighted'));
    currentSelection = [];
}

function checkSelection() {
    if (currentSelection.length < 2) {
        clearSelection();
        return;
    }

    const selectedWord = currentSelection.map(cell => cell.textContent).join('');
    const reversedWord = selectedWord.split('').reverse().join('');

    let foundMatch = false;

    if (words.includes(selectedWord)) {
        foundMatch = true;
        markAsFound(selectedWord);
    } else if (words.includes(reversedWord)) {
        foundMatch = true;
        markAsFound(reversedWord);
    }
    
    clearSelection();

    if (foundWords.length === words.length) {
        setTimeout(() => alert('ยินดีด้วย! คุณหาคำศัพท์ครบทุกคำแล้ว!'), 500);
    }
}

function markAsFound(word) {
    foundWords.push(word);
    currentSelection.forEach(cell => {
        cell.classList.remove('highlighted');
        cell.classList.add('found');
    });

    const wordListItem = document.getElementById(word);
    if (wordListItem) {
        wordListItem.classList.add('found');
    }
}

function displayWords() {
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        li.id = word;
        wordListElement.appendChild(li);
    });
}

function initGame() {
    createGrid();
    placeWords();
    fillEmptyCells();
    displayWords();
    setupEventListeners();
}

initGame();