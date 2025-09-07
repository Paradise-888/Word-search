document.addEventListener('DOMContentLoaded', () => {
    const animalButton = document.getElementById('animal-button');
    const careerButton = document.getElementById('career-button');

    // เมื่อคลิกปุ่ม "Animal"
    animalButton.addEventListener('click', () => {
        // ส่งผู้ใช้ไปที่หน้าเกมพร้อมกับระบุหมวดหมู่ "animal"
        window.location.href = 'game.html?category=animal';
    });

    // เมื่อคลิกปุ่ม "Career"
    careerButton.addEventListener('click', () => {
        // ส่งผู้ใช้ไปที่หน้าเกมพร้อมกับระบุหมวดหมู่ "career"
        window.location.href = 'game.html?category=career';
    });
});