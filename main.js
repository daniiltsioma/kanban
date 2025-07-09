let vimMode = false;
let activeCardIndex = 0;

window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        vimMode = !vimMode;
        if (vimMode) {
            document.querySelector(".card").classList.add("active");
        } else {
            document.querySelector(".card").classList.remove("active");
        }
    }
});
