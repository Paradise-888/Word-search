document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    const wordSets = {
        animal: ["LION", "TIGER", "BEAR", "ELEPHANT", "ZEBRA", "PANDA", "MONKEY"],
        career: ["DOCTOR", "TEACHER", "CHEF", "ENGINEER", "ARTIST", "POLICE", "PILOT"]
    };

    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category') || 'animal';

    let words = wordSets[selectedCategory.toLowerCase()];
    const gridSize = 10;
    const grid = [];

    let startCell = null;
    let currentSelectedCells = [];
    let foundWords = [];

    const gridContainer = document.getElementById("grid-container");
    const wordList = document.getElementById("word-list");
    const messageDisplay = document.getElementById("message");
    const nextButton = document.getElementById("next-button");

    function createGrid() {
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gridContainer.innerHTML = '';
        grid.length = 0;
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            gridContainer.appendChild(cell);
            grid.push(cell);
        }
    }

    function placeWords() {
        grid.forEach(cell => cell.textContent = '');
        words.forEach(word => {
            let placed = false;
            while (!placed) {
                const direction = Math.floor(Math.random() * 2);
                const row = Math.floor(Math.random() * gridSize);
                const col = Math.floor(Math.random() * gridSize);

                if (checkPlacement(word, row, col, direction)) {
                    for (let i = 0; i < word.length; i++) {
                        const index = (direction === 0) ? (row * gridSize + col + i) : ((row + i) * gridSize + col);
                        grid[index].textContent = word[i];
                    }
                    placed = true;
                }
            }
        });
    }

    function checkPlacement(word, row, col, direction) {
        if (direction === 0) {
            if (col + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                const index = row * gridSize + col + i;
                if (grid[index].textContent && grid[index].textContent !== word[i]) {
                    return false;
                }
            }
        } else {
            if (row + word.length > gridSize) return false;
            for (let i = 0; i < word.length; i++) {
                const index = (row + i) * gridSize + col;
                if (grid[index].textContent && grid[index].textContent !== word[i]) {
                    return false;
                }
            }
        }
        return true;
    }

    function fillGrid() {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let i = 0; i < grid.length; i++) {
            if (!grid[i].textContent) {
                grid[i].textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
            }
        }
    }

    function showWordList() {
        wordList.innerHTML = '';
        words.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            wordList.appendChild(li);
        });
    }

    function clearSelection() {
        currentSelectedCells.forEach(cell => cell.classList.remove("selected"));
        currentSelectedCells = [];
    }

    function checkWord() {
        if (currentSelectedCells.length === 0) return;
        
        let selectedWord = "";
        currentSelectedCells.forEach(cell => selectedWord += cell.textContent);
        
        const reversedWord = selectedWord.split("").reverse().join("");

        if (words.includes(selectedWord) && !foundWords.includes(selectedWord)) {
            foundWord(selectedWord);
        } else if (words.includes(reversedWord) && !foundWords.includes(reversedWord)) {
            foundWord(reversedWord);
        } else {
            clearSelection();
            startCell = null;
            showMessage("Try again!");
        }
    }

    function foundWord(word) {
        foundWords.push(word);
        currentSelectedCells.forEach(cell => cell.classList.add("found"));
        
        const li = [...wordList.children].find(li => li.textContent === word);
        if (li) {
            li.classList.add("found");
        }

        clearSelection();
        startCell = null;
        showMessage("Great! Word Found!");

        if (foundWords.length === words.length) {
            showMessage("Congratulations! You found all the words!", "green");
            nextButton.style.display = 'block';
        }
    }

    function showMessage(msg, color = "red") {
        messageDisplay.textContent = msg;
        messageDisplay.style.color = color;
        if (msg.includes("Congratulations")) {
            return;
        }
        setTimeout(() => messageDisplay.textContent = "", 2000);
    }

    function handleSelection(event) {
        let targetElement;
        if (event.type.startsWith("mouse")) {
            targetElement = event.target;
        } else {
            targetElement = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
        }

        if (!targetElement || !targetElement.classList.contains("grid-cell")) return;
        
        const clickedCell = targetElement;
        
        if (!startCell) {
            startCell = clickedCell;
            startCell.classList.add("selected");
            currentSelectedCells.push(startCell);
        } else {
            const startIndex = grid.indexOf(startCell);
            const endIndex = grid.indexOf(clickedCell);
            
            const startRow = Math.floor(startIndex / gridSize);
            const startCol = startIndex % gridSize;
            const endRow = Math.floor(endIndex / gridSize);
            const endCol = endIndex % gridSize;
            
            if (startRow === endRow || startCol === endCol) {
                clearSelection();
                if (startRow === endRow) {
                    const minCol = Math.min(startCol, endCol);
                    const maxCol = Math.max(startCol, endCol);
                    for (let i = minCol; i <= maxCol; i++) {
                        const index = startRow * gridSize + i;
                        grid[index].classList.add("selected");
                        currentSelectedCells.push(grid[index]);
                    }
                } else {
                    const minRow = Math.min(startRow, endRow);
                    const maxRow = Math.max(startRow, endRow);
                    for (let i = minRow; i <= maxRow; i++) {
                        const index = i * gridSize + startCol;
                        grid[index].classList.add("selected");
                        currentSelectedCells.push(grid[index]);
                    }
                }
            }
        }
    }

    function startNewGame() {
        nextButton.style.display = 'none';
        currentSelectedCells = [];
        foundWords = [];
        messageDisplay.textContent = '';
        
        init();
    }

    function init() {
        createGrid();
        placeWords();
        fillGrid();
        showWordList();
    }

    nextButton.addEventListener('click', startNewGame);

    gridContainer.addEventListener("mousedown", (e) => {
        startCell = e.target;
        startCell.classList.add("selected");
        currentSelectedCells.push(startCell);
    });
    gridContainer.addEventListener("mousemove", (e) => {
        if (!startCell) return;
        handleSelection(e);
    });
    gridContainer.addEventListener("mouseup", () => {
        checkWord();
        startCell = null;
    });
    gridContainer.addEventListener("touchstart", (e) => {
        e.preventDefault();
        startCell = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
        startCell.classList.add("selected");
        currentSelectedCells.push(startCell);
    });
    gridContainer.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (!startCell) return;
        handleSelection(e);
    });
    gridContainer.addEventListener("touchend", () => {
        checkWord();
        startCell = null;
    });

    init();
});