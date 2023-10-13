const form = document.getElementById("input-form");
const fieldsets = form.querySelectorAll("fieldset");
const nextButtons = form.querySelectorAll(".next");
const backButtons = form.querySelectorAll(".back");

const progressBarItems = document.querySelectorAll("#progress-bar li");
let currentFieldsetIndex = 0;

function showFieldset(index) {
    fieldsets[index].style.display = "block";
}

function hideFieldset(index) {
    fieldsets[index].style.display = "none";
}



function nextFieldset() {
    hideFieldset(currentFieldsetIndex);
    progressBarItems[currentFieldsetIndex].classList.remove("active");
    currentFieldsetIndex++;

    if (currentFieldsetIndex < fieldsets.length) {
        showFieldset(currentFieldsetIndex);
        progressBarItems[currentFieldsetIndex].classList.add("active");
    }
}

// Initially, only show the first fieldset
showFieldset(currentFieldsetIndex);

// Add event listeners to "Next" buttons
nextButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (currentFieldsetIndex < fieldsets.length - 1) {
            nextFieldset();
        }
    });
});