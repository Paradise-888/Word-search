document.addEventListener('DOMContentLoaded', () => {
    const lightModeButton = document.getElementById('light-mode-button');
    const darkModeButton = document.getElementById('dark-mode-button');

    lightModeButton.addEventListener('click', () => {
        localStorage.setItem('darkMode', 'false');
        alert('Switched to Light Mode!');
    });

    darkModeButton.addEventListener('click', () => {
        localStorage.setItem('darkMode', 'true');
        alert('Switched to Dark Mode!');
    });
});