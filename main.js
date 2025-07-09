let vimMode = false;
let activeCardIndex = 0;

window.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "Escape":
            toggleVimMode();
            break;
        case "h":
            vimMode && navigateLeft();
            break;
        case "l":
            vimMode && navigateRight();
            break;
    }
});

function toggleVimMode() {
    vimMode = !vimMode;
    activeCardIndex = 0;
    if (vimMode) {
        document.querySelector(".card").classList.add("active");
    } else {
        document.querySelector(".card.active").classList.remove("active");
    }
}

function navigateLeft() {
    if (activeCardIndex > 0) {
        const currentActive = document.querySelector(".card.active");
        currentActive.previousElementSibling.classList.add("active");
        currentActive.classList.remove("active");
        activeCardIndex--;
    }
}

function navigateRight() {
    const numberOfCards = document.querySelectorAll(".card").length;
    if (activeCardIndex < numberOfCards - 1) {
        const currentActive = document.querySelector(".card.active");
        currentActive.nextElementSibling.classList.add("active");
        currentActive.classList.remove("active");
        activeCardIndex++;
    }
}
