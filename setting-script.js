document.addEventListener('DOMContentLoaded', () => {
    const lightModeButton = document.getElementById('light-mode-button');
    const darkModeButton = document.getElementById('dark-mode-button');
    const body = document.body;

    // ตรวจสอบสถานะ Dark Mode ที่บันทึกไว้เมื่อโหลดหน้า
    if (localStorage.getItem('darkMode') === 'true') {
        body.classList.add('dark-mode');
    }

    lightModeButton.addEventListener('click', () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'false');
    });

    darkModeButton.addEventListener('click', () => {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'true');
    });
});