window.addEventListener('scroll', function() {
    const scrollY = window.scrollY; // Get the current scroll value
    const classesToUnzoom = ['img-container'];

    classesToUnzoom.forEach(className => {
        const images = document.querySelectorAll(`.${className}`);
        
        // Adjust the scale for each image based on the scroll position
        images.forEach(image => {
            const scaleValue = Math.max(1 - scrollY / 8000, 0.1); // Slower scaling
            image.style.transform = `scale(${scaleValue})`;
        });
    });
});


// div changing color

let isScrolling = false;

// Distance fixe en pixels avant laquelle le dégradé commence et se termine
const fixedScrollStart = 0; // Distance après laquelle le dégradé commence
const fixedScrollEnd = 400; // Distance après laquelle le dégradé se termine

function updateGradient() {
    const gradientDiv = document.getElementById('gradient-div');
    const rect = gradientDiv.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || window.pageYOffset;

    // Calculer la position absolue de la div par rapport au haut de la page
    const divTop = rect.top + scrollTop;
    const divBottom = divTop + rect.height;

    // Calculer le début et la fin de la zone de dégradé
    const startScroll = divTop - fixedScrollStart;
    const endScroll = divBottom - fixedScrollEnd;

    // Vérifie si la div est dans la zone de dégradé
    if (scrollTop >= startScroll && scrollTop <= endScroll) {
        const scrolledRatio = Math.min((scrollTop - startScroll) / (endScroll - startScroll), 1);
        const startColorRgb = [250, 243, 237]; // #f8f8f8 en RGB
        const endColorRgb = [250, 243, 237]; // Bleu en RGB

        const [r1, g1, b1] = startColorRgb;
        const [r2, g2, b2] = endColorRgb;

        const r = Math.round(r1 + (r2 - r1) * scrolledRatio);
        const g = Math.round(g1 + (g2 - g1) * scrolledRatio);
        const b = Math.round(b1 + (b2 - b1) * scrolledRatio);

        gradientDiv.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    } else if (scrollTop < startScroll) {
        // Avant le début de la zone de dégradé
        gradientDiv.style.backgroundColor = `rgb(${250}, ${243}, ${237})`; // Couleur de départ
    } else if (scrollTop > endScroll) {
        // Après la fin de la zone de dégradé
        gradientDiv.style.backgroundColor = `rgb(${250}, ${243}, ${237})`; // Couleur de fin
    }

    isScrolling = false;
}

document.addEventListener('scroll', () => {
    if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(updateGradient);
    }
});

// script.js
document.addEventListener('scroll', () => {
    const hiddenDiv = document.getElementById('hidden-div');
    const rect = hiddenDiv.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Définir la condition pour faire apparaître la div
    if (rect.top <= windowHeight / 1.2 && rect.bottom >= 0) {
        hiddenDiv.classList.add('visible');
    } else {
        hiddenDiv.classList.remove('visible');
    }
});

