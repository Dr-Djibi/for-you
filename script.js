document.addEventListener('DOMContentLoaded', () => {
    const giftContainer = document.getElementById('gift-container');
    const openGiftBtn = document.getElementById('open-gift');

    const countdownContainer = document.getElementById('countdown-container');
    const countdownText = document.getElementById('countdown-text');

    const celebrationContainer = document.getElementById('celebration-container');
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');

    const title = document.querySelector('.title');
    const messages = document.querySelectorAll('.message');

    // Clic sur le cadeau
    openGiftBtn.addEventListener('click', () => {
        // Disparition du cadeau
        giftContainer.classList.remove('active');

        // Apparition du décompte après un court délai
        setTimeout(() => {
            countdownContainer.classList.add('active');
            startCountdown();
        }, 800);
    });

    // Fonction pour gérer le décompte de 5 à 0
    function startCountdown() {
        let count = 5;

        // Effet pop initial
        countdownText.classList.add('pop');

        const interval = setInterval(() => {
            count--;

            // Retirer la classe pour relancer l'animation
            countdownText.classList.remove('pop');

            if (count > 0) {
                setTimeout(() => {
                    countdownText.innerText = count;
                    countdownText.classList.add('pop');
                }, 50);
            } else if (count === 0) {
                setTimeout(() => {
                    countdownText.innerText = "0";
                    countdownText.classList.add('pop');
                }, 50);
            } else {
                clearInterval(interval);
                startCelebration();
            }
        }, 1000);
    }

    // Fonction pour lancer la célébration romantique
    function startCelebration() {
        countdownContainer.classList.remove('active');

        // Démarrer la musique (après interaction de l'utilisateur, c'est autorisé par le navigateur)
        bgMusic.volume = 0.6; // Volume modéré
        bgMusic.play().catch(e => console.log("Erreur lors de la lecture audio:", e));

        if (musicToggle) {
            musicToggle.style.display = 'block';
        }

        // Afficher l'écran de célébration
        setTimeout(() => {
            celebrationContainer.classList.add('active');
            createHearts(); // Lancer la pluie de coeurs
            revealText();   // Afficher le texte progressivement
        }, 1000);
    }

    // Afficher le texte progressivement avec des délais
    function revealText() {
        // Apparition du titre principal
        setTimeout(() => {
            title.classList.add('reveal');
        }, 500);

        // Apparition des paragraphes l'un après l'autre
        messages.forEach((msg, index) => {
            setTimeout(() => {
                msg.classList.add('reveal');
            }, 2000 + (index * 2500)); // Un message toutes les 2.5 secondes
        });
    }

    // Créer des coeurs qui flottent en continu
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');

            // Choisir un coeur aléatoire
            const hearts = ['❤️', '💖', '💕', '💗', '💓', '💘'];
            heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

            // Positionnement horizontal aléatoire
            heart.style.left = Math.random() * 100 + 'vw';

            // Durée de l'animation aléatoire pour donner un effet plus naturel (entre 4 et 7 secondes)
            heart.style.animationDuration = Math.random() * 3 + 4 + 's';

            // Taille aléatoire du coeur
            heart.style.fontSize = Math.random() * 1.5 + 1 + 'rem';

            document.body.appendChild(heart);

            // Supprimer le coeur du DOM une fois l'animation terminée pour éviter de surcharger le navigateur
            setTimeout(() => {
                heart.remove();
            }, 7000);
        }, 200); // Générer un nouveau coeur toutes les 200 ms
    }

    // Gestion du bouton de musique
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.innerHTML = "🔊 Pause";
            } else {
                bgMusic.pause();
                musicToggle.innerHTML = "🔇 Lecture";
            }
        });
    }
});
