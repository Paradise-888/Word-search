document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const settingButton = document.getElementById('setting-button');

    if (playButton) {
        playButton.addEventListener('click', () => {
            window.location.href = 'game.html';
        });
    }

    if (settingButton) {
        settingButton.addEventListener('click', () => {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            localStorage.setItem('darkMode', !isDarkMode);
            
            if (!isDarkMode) {
                alert('Dark Mode is now ON. Enjoy playing in low light!');
            } else {
                alert('Dark Mode is now OFF. Back to the light theme!');
            }
        });
    }
});