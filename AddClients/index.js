// const to make sure shit wont change #pranning
const form = document.getElementById("input-form");
const fieldsets = form.querySelectorAll("fieldset");
const nextButtons = form.querySelectorAll(".next");
const backButtons = form.querySelectorAll(".back");

const progressBarItems = document.querySelectorAll("#progress-bar li");
let currentFieldsetIndex = 0;

//initially, only show the first fieldset
showFieldset(currentFieldsetIndex);

function showFieldset(index) {
    fieldsets[index].style.display = "block";
}

function hideFieldset(index) {
    fieldsets[index].style.display = "none";
}

// func for the next button
function nextFieldset() {
    if (currentFieldsetIndex < fieldsets.length - 1) {
        hideFieldset(currentFieldsetIndex);
        currentFieldsetIndex++;
        showFieldset(currentFieldsetIndex);
        progressBarItems[currentFieldsetIndex].classList.add("active");
    }
}

// func for the back button
function previousFieldset() {
    if (currentFieldsetIndex > 0) {
        hideFieldset(currentFieldsetIndex);
        currentFieldsetIndex--;
        showFieldset(currentFieldsetIndex);
        progressBarItems[currentFieldsetIndex + 1].classList.remove("active");
    }
}


// func to validate the form
function validateForm() {
    const currentFieldset = fieldsets[currentFieldsetIndex];
    const inputs = currentFieldset.querySelectorAll('input, select');

    for (const input of inputs) {
        if (input.hasAttribute('required') && input.value.trim() === '') {
            alert('Please fill in all required fields.');
            return false;
        }
    }

    return true;
}

nextButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        // check if current form is valid
        if (validateForm()) {
            if (currentFieldsetIndex < fieldsets.length - 1) {
                nextFieldset();
            }
        }
    });
});

backButtons.forEach((button, index) => {
    button.addEventListener("click", previousFieldset);
});


submitButton.addEventListener("click", function () {
    // if form is valid, user can submit the form 
    if (validateForm()) {

    }
});
