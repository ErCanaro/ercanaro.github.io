let finalValue = 1;
const selections = {}; // Objeto para guardar las selecciones del usuario

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function shuffleScreenImages(screenNumber) {
    const images = Array.from(document.querySelectorAll(`#screen${screenNumber} img`));
    const imgSrcs = images.map(img => img.getAttribute('src'));
    
    shuffleArray(imgSrcs); // Mezcla las URLs de las imágenes

    images.forEach((img, index) => {
        img.setAttribute('src', imgSrcs[index]); // Asigna la URL mezclada a las imágenes
    });
}

function nextScreen(screenNumber) {
    if (screenNumber === 7) {
        // Mostrar la imagen final basada en el valor de `finalValue`
        document.querySelector(".screen.active").classList.remove("active");
        document.getElementById("screen" + screenNumber).classList.add("active");

        const finalImage = document.querySelector("#screen7 img");
        finalImage.src = "images/imagen" + finalValue + ".png";
        finalImage.alt = "Imagen Final " + finalValue;
    } else {
        shuffleScreenImages(screenNumber);
        document.querySelector(".screen.active").classList.remove("active");
        document.getElementById("screen" + screenNumber).classList.add("active");
    }
}

function prevScreen(screenNumber) {
    if (selections[screenNumber + 1]) {
        // Restar el valor agregado previamente si el usuario retrocede
        finalValue -= selections[screenNumber + 1];
    }
    document.querySelector(".screen.active").classList.remove("active");
    document.getElementById("screen" + screenNumber).classList.add("active");
}

function enableNextButton(screenNumber) {
    const selectedOption = document.querySelector('input[name="option' + screenNumber + '"]:checked').value;
    document.getElementById("nextBtn" + screenNumber).disabled = false;

    // Calcular el incremento para `finalValue` según la selección
    let increment = 0;
    switch (screenNumber) {
        case 2:
            increment = (selectedOption === "SI") ? 16 : 0;
            break;
        case 3:
            increment = (selectedOption === "SI") ? 8 : 0;
            break;
        case 4:
            increment = (selectedOption === "SI") ? 4 : 0;
            break;
        case 5:
            increment = (selectedOption === "SI") ? 2 : 0;
            break;
        case 6:
            increment = (selectedOption === "SI") ? 1 : 0;
            break;
    }

    // Guardar la selección del usuario
    selections[screenNumber] = increment;

    // Actualizar `finalValue`
    finalValue = 1; // Reiniciar a 1 antes de recalcular
    for (let i = 2; i <= 6; i++) {
        if (selections[i]) {
            finalValue += selections[i];
        }
    }
}

function resetApp() {
    document.querySelector(".screen.active").classList.remove("active");
    document.getElementById("screen1").classList.add("active");

    // Resetear el valor de la variable `finalValue` y deshabilitar botones "Siguiente"
    finalValue = 1;
    for (let i = 2; i <= 6; i++) {
        document.getElementById("nextBtn" + i).disabled = true;
    }

    // Limpiar las selecciones
    for (let key in selections) {
        delete selections[key];
    }
}
