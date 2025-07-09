let vimMode = false;
let editingMode = false;
let activeCardIndex = 0;

const keysPressed = new Set();

window.addEventListener("keydown", (event) => {
    keysPressed.add(event.key);
    switch (event.key) {
        case "Escape":
            handleEscape();
            break;
        case "h":
            vimMode && !editingMode && navigateLeft();
            break;
        case "l":
            vimMode && !editingMode && navigateRight();
            break;
        case "1":
            vimMode &&
                !editingMode &&
                !keysPressed.has("Meta") &&
                setCardColor(1);
            break;
        case "2":
            vimMode &&
                !editingMode &&
                !keysPressed.has("Meta") &&
                setCardColor(2);
            break;
        case "3":
            vimMode &&
                !editingMode &&
                !keysPressed.has("Meta") &&
                setCardColor(3);
            break;
        case "4":
            vimMode &&
                !editingMode &&
                !keysPressed.has("Meta") &&
                setCardColor(4);
            break;
        case "i":
            event.preventDefault();
            enterCardInput();
            break;
    }
});

window.addEventListener("keyup", (event) => {
    keysPressed.delete(event.key);
});

function handleEscape() {
    if (!vimMode && !editingMode) {
        vimMode = true;
        activeCardIndex = 0;
        document.querySelector(".card").classList.add("active");
    } else if (vimMode && !editingMode) {
        vimMode = false;
        document.querySelector(".card.active").classList.remove("active");
    } else if (vimMode && editingMode) {
        editingMode = false;
        document.querySelector(".card.active").blur();
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

function enterCardInput() {
    editingMode = true;
    const activeCard = document.querySelector(".card.active");
    const cardValueLength = activeCard.value.length;
    activeCard.setSelectionRange(cardValueLength, cardValueLength);
    activeCard.focus();
}
