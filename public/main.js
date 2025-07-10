"use strict";

const todoCards = document.querySelector(".column.todo .cards");
const doingCards = document.querySelector(".column.doing .cards");
const doneCards = document.querySelector(".column.done .cards");

readFromLocalStorage();

let vimMode = false;
let editingMode = false;
let activeCard = null;
let previouslyActiveCard = null;

const keysPressed = new Set();

window.addEventListener("keydown", (event) => {
    keysPressed.add(event.key);

    switch (event.key) {
        case "Tab":
            event.preventDefault();
            if (vimMode && !editingMode) {
                if (todoCards.contains(activeCard)) {
                    activeCard.classList.remove("active");
                    activeCard =
                        doingCards.querySelector(".card") ||
                        doneCards.querySelector(".card") ||
                        activeCard;
                    activeCard.classList.add("active");
                } else if (doingCards.contains(activeCard)) {
                    activeCard.classList.remove("active");
                    activeCard =
                        doneCards.querySelector(".card") ||
                        todoCards.querySelector(".card") ||
                        activeCard;
                    activeCard.classList.add("active");
                } else if (doneCards.contains(activeCard)) {
                    activeCard.classList.remove("active");
                    activeCard =
                        todoCards.querySelector(".card") ||
                        doingCards.querySelector(".card") ||
                        activeCard;
                    activeCard.classList.add("active");
                }
            }
            break;

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

        case "Backspace":
            if (keysPressed.has("Meta") && vimMode && !editingMode) {
                let nextActiveCard;
                if (activeCard.previousElementSibling) {
                    nextActiveCard = activeCard.previousElementSibling;
                } else if (activeCard.nextElementSibling) {
                    nextActiveCard = activeCard.nextElementSibling;
                } else {
                    nextActiveCard = document.querySelector(".card");
                }
                activeCard.remove();
                activeCard = nextActiveCard;
                activeCard.classList.add("active");
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

        case "/":
            if (keysPressed.has("Meta") && !editingMode) {
                console.log("create");
                const card = document.createElement("textarea");
                card.setAttribute("name", "card");
                card.setAttribute("rows", "3");
                card.setAttribute("class", "card");
                card.setAttribute("tabindex", "-1");
                card.value = "";
                todoCards.appendChild(card);
                if (activeCard) {
                    activeCard.classList.remove("active");
                }
                activeCard = card;
                editingMode = true;
                activeCard.classList.add("active");
                activeCard.classList.add("input");
                activeCard.focus();
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
        case "k":
            vimMode && !editingMode && navigateUp();
            break;
        case "j":
            vimMode && !editingMode && navigateDown();
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
            if (!editingMode) {
                event.preventDefault();
                enterCardInput();
            }
            break;
    }
});

window.addEventListener("keyup", (event) => {
    keysPressed.delete(event.key);
});

function handleEscape() {
    if (!vimMode && !editingMode) {
        vimMode = true;
        activeCard = previouslyActiveCard || document.querySelector(".card");
        activeCard.classList.add("active");
    } else if (vimMode && !editingMode) {
        vimMode = false;
        activeCard.classList.remove("active");
        previouslyActiveCard = activeCard;
        activeCard = null;
    } else if (vimMode && editingMode) {
        editingMode = false;
        activeCard.classList.remove("input");
        activeCard.blur();
    }
    saveToLocalStorage();
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

function navigateUp() {
    let cardSibling = activeCard.previousElementSibling;
    const cardOffset = activeCard.getBoundingClientRect();
    while (
        cardSibling &&
        (cardSibling.getBoundingClientRect().top === cardOffset.top ||
            cardSibling.getBoundingClientRect().left > cardOffset.left)
    ) {
        cardSibling = cardSibling.previousElementSibling;
    }

    if (cardSibling) {
        activeCard.classList.remove("active");
        activeCard = cardSibling;
        activeCard.classList.add("active");
    }
}

function navigateDown() {
    let cardSibling = activeCard.nextElementSibling;
    const cardOffset = activeCard.getBoundingClientRect();
    while (
        cardSibling &&
        (cardSibling.getBoundingClientRect().top === cardOffset.top ||
            cardSibling.getBoundingClientRect().left < cardOffset.left)
    ) {
        cardSibling = cardSibling.nextElementSibling;
    }

    if (cardSibling) {
        activeCard.classList.remove("active");
        activeCard = cardSibling;
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
    activeCard.classList.add("input");
    const cardValueLength = activeCard.value.length;
    activeCard.setSelectionRange(cardValueLength, cardValueLength);
    activeCard.focus();
}

function readFromLocalStorage() {
    const localTasksJSON = localStorage.getItem("tasks");
    if (!localTasksJSON) return;
    const localTasks = JSON.parse(localTasksJSON);
    for (const task of localTasks.todo) {
        const card = document.createElement("textarea");
        card.setAttribute("name", "card");
        card.setAttribute("rows", "3");
        card.setAttribute("class", "card");
        card.setAttribute("tabindex", "-1");
        card.value = task;
        todoCards.appendChild(card);
    }
    for (const task of localTasks.doing) {
        const card = document.createElement("textarea");
        card.setAttribute("name", "card");
        card.setAttribute("rows", "3");
        card.setAttribute("class", "card");
        card.setAttribute("tabindex", "-1");
        card.value = task;
        doingCards.appendChild(card);
    }
    for (const task of localTasks.done) {
        const card = document.createElement("textarea");
        card.setAttribute("name", "card");
        card.setAttribute("rows", "3");
        card.setAttribute("class", "card");
        card.setAttribute("tabindex", "-1");
        card.value = task;
        doneCards.appendChild(card);
    }
}

function saveToLocalStorage() {
    console.log("save");
    const tasks = {
        todo: [],
        doing: [],
        done: [],
    };
    for (const child of todoCards.children) {
        tasks.todo.push(child.value);
    }
    for (const child of doingCards.children) {
        tasks.doing.push(child.value);
    }
    for (const child of doneCards.children) {
        tasks.done.push(child.value);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
