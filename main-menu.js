document.addEventListener('DOMContentLoaded', () => {
    const playButton = document.getElementById('play-button');
    const settingButton = document.getElementById('setting-button');

    if (playButton) {
        playButton.addEventListener('click', () => {
            window.location.href = 'game.html'; // ลิงก์ไปที่หน้าเกม
        });
    }

    if (settingButton) {
        settingButton.addEventListener('click', () => {
            alert('Setting button clicked!'); // สามารถเปลี่ยนเป็นหน้าตั้งค่าได้ในอนาคต
        });
    }
});