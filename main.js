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
        case "1":
            vimMode && setCardColor(1);
            break;
        case "2":
            vimMode && setCardColor(2);
            break;
        case "3":
            vimMode && setCardColor(3);
            break;
        case "4":
            vimMode && setCardColor(4);
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

function setCardColor(colorIndex) {
    switch (colorIndex) {
        case 1:
            document.querySelector(".card.active").style.backgroundColor =
                "#ffff99";
            break;
        case 2:
            document.querySelector(".card.active").style.backgroundColor =
                "#ff7eb9";
            break;
        case 3:
            document.querySelector(".card.active").style.backgroundColor =
                "#7afcff";
            break;
        case 4:
            document.querySelector(".card.active").style.backgroundColor =
                "#46c45a";
            break;
    }
}
