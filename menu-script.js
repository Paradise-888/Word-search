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
            // ตรวจสอบสถานะโหมดมืดปัจจุบัน
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            
            // สลับสถานะและบันทึกใน localStorage
            localStorage.setItem('darkMode', !isDarkMode);

            // แสดงข้อความแจ้งเตือนผู้ใช้
            if (!isDarkMode) {
                alert('Dark Mode is ON. Enjoy playing in low light!');
            } else {
                alert('Dark Mode is OFF. Back to light theme!');
            }
        });
    }
});