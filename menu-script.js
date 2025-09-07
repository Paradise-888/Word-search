document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const settingButton = document.getElementById('setting-button');

    if (playButton) {
        playButton.addEventListener('click', () => {
            // เปลี่ยนเส้นทางจาก game.html เป็น category.html
            window.location.href = 'category.html';
        });
    }

    if (settingButton) {
        settingButton.addEventListener('click', () => {
            window.location.href = 'setting.html';
        });
    }
});