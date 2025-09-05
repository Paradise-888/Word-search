const words = ["JAVASCRIPT", "PYTHON", "HTML", "CSS", "CODE", "SEARCH", "GAME", "WEB"];
const gridSize = 10;
const grid = [];

let startCell = null;
let currentSelectedCells = [];
let foundWords = [];

const gridContainer = document.getElementById("grid-container");
const wordList = document.getElementById("word-list");
const messageDisplay = document.getElementById("message");

// สร้างตารางตัวอักษร
function createGrid() {
    gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    for (let i = 0; i < gridSize * gridSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        gridContainer.appendChild(cell);
        grid.push(cell);
    }
}

// วางคำลงบนตาราง
function placeWords() {
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.floor(Math.random() * 2); // 0: horizontal, 1: vertical
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

// ตรวจสอบว่าสามารถวางคำได้หรือไม่
function checkPlacement(word, row, col, direction) {
    if (direction === 0) { // horizontal
        if (col + word.length > gridSize) return false;
        for (let i = 0; i < word.length; i++) {
            const index = row * gridSize + col + i;
            if (grid[index].textContent && grid[index].textContent !== word[i]) {
                return false;
            }
        }
    } else { // vertical
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

// เติมตัวอักษรที่เหลือ
function fillGrid() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < grid.length; i++) {
        if (!grid[i].textContent) {
            grid[i].textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
        }
    }
}

// แสดงรายการคำศัพท์
function showWordList() {
    words.forEach(word => {
        const li = document.createElement("li");
        li.textContent = word;
        wordList.appendChild(li);
    });
}

// จัดการการเลือกตัวอักษร
function handleSelection(event) {
    const clickedCell = event.target;
    if (!clickedCell.classList.contains("grid-cell")) return;

    if (!startCell) {
        // เริ่มต้นการเลือก
        startCell = clickedCell;
        startCell.classList.add("selected");
        currentSelectedCells.push(startCell);
    } else {
        // กำลังลากเพื่อเลือก
        const startIndex = grid.indexOf(startCell);
        const endIndex = grid.indexOf(clickedCell);
        
        const startRow = Math.floor(startIndex / gridSize);
        const startCol = startIndex % gridSize;
        const endRow = Math.floor(endIndex / gridSize);
        const endCol = endIndex % gridSize;
        
        // ตรวจสอบว่าเป็นแนวตั้งหรือแนวนอน
        if (startRow === endRow || startCol === endCol) {
            clearSelection();
            if (startRow === endRow) { // Horizontal
                const minCol = Math.min(startCol, endCol);
                const maxCol = Math.max(startCol, endCol);
                for (let i = minCol; i <= maxCol; i++) {
                    const index = startRow * gridSize + i;
                    grid[index].classList.add("selected");
                    currentSelectedCells.push(grid[index]);
                }
            } else { // Vertical
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

// ล้างการเลือก
function clearSelection() {
    currentSelectedCells.forEach(cell => cell.classList.remove("selected"));
    currentSelectedCells = [];
}

// ตรวจสอบคำที่เลือก
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

// เมื่อพบคำ
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
    }
}

// แสดงข้อความ
function showMessage(msg, color = "red") {
    messageDisplay.textContent = msg;
    messageDisplay.style.color = color;
    setTimeout(() => messageDisplay.textContent = "", 2000);
}

// เริ่มต้นเกม
function init() {
    createGrid();
    placeWords();
    fillGrid();
    showWordList();

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
}

init();