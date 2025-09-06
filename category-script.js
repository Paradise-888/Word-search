document.addEventListener('DOMContentLoaded', () => {
    const animalButton = document.getElementById('animal-button');
    const careerButton = document.getElementById('career-button');

    animalButton.addEventListener('click', () => {
        window.location.href = 'game.html?category=animal';
    });

    careerButton.addEventListener('click', () => {
        window.location.href = 'game.html?category=career';
    });
});