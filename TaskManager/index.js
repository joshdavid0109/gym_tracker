// loading loading cinopy q lang to idk how it works
window.addEventListener("load", function () {
    document.querySelector(".loader-overlay").style.display = "none";
});

/*for the datepicker (dueDate)
$(document).ready(function () {
    $(".datepicker").datepicker();
});
*/

function Task(taskName, dueDate, category, status, priority) {
    this.taskName = taskName;
    this.dueDate = dueDate;
    this.category = category;
    this.status = status;
    this.priority = priority;
}


// reset button
function resetFields() {
    var formElements = ["taskName", "dueDate", "category", "status", "priority"];

    formElements.forEach(function (elementId) {
        var element = document.getElementById(elementId);

        // check first if any element
        if (element) {
            element.value = "";
            // if element is tag name
            if (element.tagName === "SELECT") {
                element.selectedIndex = 0;
            }
        }
    });

    console.log("Values are set to defaulttt");

    // Change the message to "Fields are set to default"
    var inputMessage = document.querySelector(".input-message");
    inputMessage.textContent = "Fields are set to default";
    inputMessage.classList.remove("message-fade-hidden");
    inputMessage.classList.add("message-fade");

    // Clear the message after 5 seconds
    setTimeout(function () {
        inputMessage.classList.add("message-fade-hidden");
    }, 3000);

}

document.addEventListener("DOMContentLoaded", function () {
    var categoryDialog = document.getElementById("categoryDialog");
    var categoryAddButton = document.getElementById("categoryAddButton");
    var categoryCancelButton = document.getElementById("categoryCancelButton");
    var newCategoryInput = document.getElementById("newCategoryInput");
    var categorySelect = document.getElementById("category");
    var inputMessage = document.querySelector(".input-message");
    var selectWithButton = document.querySelector(".select-with-button");


    var isDialogVisible = false;

    //initallly, dialog is hidden unless + button is pressed
    if (!isDialogVisible) {
        categoryDialog.style.display = "none";
    }

    // listen for clicks sa button bseide select element (+)
    selectWithButton.addEventListener("click", function () {
        categoryDialog.style.display = "block";
        isDialogVisible = true;
    });

    // when canceled, clear the inputs
    categoryCancelButton.addEventListener("click", function () {
        categoryDialog.style.display = "none";
        newCategoryInput.value = "";
        isDialogVisible = false;
    });

    categorySelect.addEventListener("click", function (e) {
        e.stopPropagation(); // prevent the click event from propagating to the parent
    });

    categoryAddButton.addEventListener("click", function () {
        var newCategory = newCategoryInput.value.trim();

        if (newCategory) {
            var option = document.createElement("option");
            option.value = newCategory;
            option.text = newCategory;
            categorySelect.appendChild(option);
            categoryDialog.style.display = "none";
            newCategoryInput.value = "";
            isDialogVisible = false;

            inputMessage.textContent = "Option [" + option.value + "] added!";
            inputMessage.classList.remove("message-fade-hidden");
            inputMessage.classList.add("message-fade");

            // clear msg after 3 sec
            setTimeout(function () {
                inputMessage.classList.add("message-fade-hidden");
            }, 3000);

        }
    });

});



// functioanlity of drag and drop using classes list and box
let ele = document.querySelectorAll(".list");
let boxes = document.querySelectorAll(".box");

let selected = null;

ele.forEach((list) => {
    list.addEventListener("dragstart", function (e) {
        selected = e.target;
    });
});

boxes.forEach((box) => {
    box.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    box.addEventListener("drop", function (e) {
        if (selected) {
            box.appendChild(selected);
            selected = null;
        }
    });
});



