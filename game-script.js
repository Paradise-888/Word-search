document.addEventListener('DOMContentLoaded', () => {
    // โค้ดสำหรับ Dark Mode: ตรวจสอบสถานะและเปลี่ยนธีมทันทีที่หน้าโหลด
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // ชุดคำศัพท์หลัก
    const wordSets = [
        ["JAVASCRIPT", "PYTHON", "HTML", "CSS", "CODE", "SEARCH", "GAME", "WEB"],
        ["LION", "TIGER", "BEAR", "ELEPHANT", "ZEBRA", "PANDA", "MONKEY"],
        ["PARIS", "TOKYO", "LONDON", "ROME", "CAIRO", "SYDNEY", "BANGKOK"]
    ];

    let currentWordSetIndex = 0;
    let words = wordSets[currentWordSetIndex];
    const gridSize = 10;
    const grid = [];

    let startCell = null;
    let currentSelectedCells = [];
    let foundWords = [];

    const gridContainer = document.getElementById("grid-container");
    const wordList = document.getElementById("word-list");
    const messageDisplay = document.getElementById("message");
    const nextButton = document.getElementById("next-button");

    // สร้างตารางตัวอักษร
    function createGrid() {
        gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
        gridContainer.innerHTML = '';
        grid.length = 0; // Clear the grid array
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("grid-cell");
            gridContainer.appendChild(cell);
            grid.push(cell);
        }
    }

    // วางคำลงบนตาราง
    function placeWords() {
        // Clear all cell contents before placing new words
        grid.forEach(cell => cell.textContent = '');

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
        wordList.innerHTML = ''; // Clear previous list
        words.forEach(word => {
            const li = document.createElement("li");
            li.textContent = word;
            wordList.appendChild(li);
        });
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
            nextButton.style.display = 'block'; // Show the Next button
        }
    }

    // แสดงข้อความ
    function showMessage(msg, color = "red") {
        messageDisplay.textContent = msg;
        messageDisplay.style.color = color;
        // Keep the message visible until the game is reset
        if (msg.includes("Congratulations")) {
            return;
        }
        setTimeout(() => messageDisplay.textContent = "", 2000);
    }

    // จัดการการเลือกตัวอักษรด้วยเมาส์และนิ้ว
    function handleSelection(event) {
        let targetElement;
        if (event.type.startsWith("mouse")) {
            targetElement = event.target;
        } else { // Touch event
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

    // ฟังก์ชันสำหรับเริ่มเกมใหม่
    function startNewGame() {
        nextButton.style.display = 'none'; // Hide the Next button
        currentSelectedCells = [];
        foundWords = [];
        messageDisplay.textContent = '';
        
        // สลับไปใช้ชุดคำศัพท์ถัดไป
        currentWordSetIndex = (currentWordSetIndex + 1) % wordSets.length;
        words = wordSets[currentWordSetIndex];
        
        init();
    }

    // เริ่มต้นเกม
    function init() {
        createGrid();
        placeWords();
        fillGrid();
        showWordList();
    }

    // Event listener สำหรับปุ่ม Next
    nextButton.addEventListener('click', startNewGame);

    // Event listeners สำหรับการควบคุมด้วยเมาส์และนิ้ว
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

    // เรียกฟังก์ชันเริ่มต้นเกมเมื่อโหลดหน้า
    init();
});