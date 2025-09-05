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
            alert('Setting button clicked!');
        });
    }
});