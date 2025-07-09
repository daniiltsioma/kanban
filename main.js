"use strict";

const todoCards = document.querySelector(".column.todo .cards");
const doingCards = document.querySelector(".column.doing .cards");
const doneCards = document.querySelector(".column.done .cards");

let vimMode = false;
let editingMode = false;
let activeCard = null;

const keysPressed = new Set();

window.addEventListener("keydown", (event) => {
    keysPressed.add(event.key);

    switch (event.key) {
        case "Enter":
            // meh, will fix later
            if (keysPressed.has("Meta") && vimMode && !editingMode) {
                const currentCard = document.querySelector(".card.active");
                if (todoCards.contains(currentCard)) {
                    doingCards.append(currentCard);
                } else if (doingCards.contains(currentCard)) {
                    doneCards.append(currentCard);
                }
            }
            break;
        case "\\":
            if (keysPressed.has("Meta") && vimMode && !editingMode) {
                event.preventDefault();
                const currentCard = document.querySelector(".card.active");
                if (doingCards.contains(currentCard)) {
                    todoCards.appendChild(currentCard);
                } else if (doneCards.contains(currentCard)) {
                    doingCards.appendChild(currentCard);
                }
            }
            break;
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
        activeCard = document.querySelector(".card");
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
    if (activeCard.previousElementSibling) {
        activeCard.classList.remove("active");
        activeCard = activeCard.previousElementSibling;
        activeCard.classList.add("active");
    }
}

function navigateRight() {
    if (activeCard.nextElementSibling) {
        activeCard.classList.remove("active");
        activeCard = activeCard.nextElementSibling;
        activeCard.classList.add("active");
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
    const cardValueLength = activeCard.value.length;
    activeCard.setSelectionRange(cardValueLength, cardValueLength);
    activeCard.focus();
}
