var playButton = document.getElementById('playButton');
var languageContainer = document.getElementById('languageContainer');
var languageSelect = document.getElementById('languageSelect');
var directionContainer = document.getElementById('directionContainer');
var directionSelect = document.getElementById('directionSelect');
var numberOfQuestionsContainer = document.getElementById('numberOfQuestionsContainer');

// Ajoute un écouteur d'événement pour le clic sur le bouton
playButton.addEventListener('click', function() {
    // Cache le bouton lorsqu'il est cliqué
    playButton.style.display = 'none';
    // Affiche le conteneur du texte de langue
    languageContainer.style.display = 'block';
    // Affiche le conteneur de la direction du test
    directionContainer.style.display = 'block';
    // Affiche le conteneur du nombre de questions
    numberOfQuestionsContainer.style.display = 'block';

    addNumberOfQuestions();
    // Vérifie la langue sélectionnée lors du chargement de la page
    checkLanguage();
});

// Ajoute un écouteur d'événement pour le changement de sélection de langue
languageSelect.addEventListener('change', function() {
    checkLanguage();
});

// Fonction pour vérifier la langue sélectionnée et configurer la direction du test en conséquence
function checkLanguage() {
    if (languageSelect.value === 'Ukrainian') {
        // Si la langue est ukrainienne, définir la direction du test sur "Ukrainian-English" et désactiver le sélecteur
        directionSelect.innerHTML = '<option value="reverse">Ukrainian => English</option>';
        directionSelect.disabled = true;
    } else {
        // Si la langue est anglaise, activer le sélecteur et le définir sur "Both directions"
        directionSelect.innerHTML = '<option value="forward">English => Ukrainian</option><option value="reverse">Ukrainian => English</option>';
        directionSelect.disabled = false;
    }
}

function addNumberOfQuestions() {
    const select = document.getElementById('numberOfQuestionsSelect');
    // Clear previous options if any
    select.innerHTML = '';

    // Création d'une liste d'entiers de 1 à 100
    const numbers = Array.from(Array(100), (_, index) => index + 1);

    // Ajout des options au sélecteur
    numbers.forEach(number => {
        const option = document.createElement('option');
        option.value = number;
        option.textContent = number;
        select.appendChild(option);
    });
}
