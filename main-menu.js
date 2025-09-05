document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const settingButton = document.getElementById('setting-button');

    if (playButton) {
        playButton.addEventListener('click', () => {
            alert('Play button clicked!'); // หรือเปลี่ยนไปหน้าเกมจริง
            // window.location.href = 'game.html'; // ตัวอย่าง: เปลี่ยนไปหน้าเกม
        });
    }

    if (settingButton) {
        settingButton.addEventListener('click', () => {
            alert('Setting button clicked!'); // หรือเปิดหน้าตั้งค่า
            // window.location.href = 'settings.html'; // ตัวอย่าง: เปลี่ยนไปหน้าตั้งค่า
        });
    }
});