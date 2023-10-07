// loading loading cinopy q lang to idk how it works
window.addEventListener("load", function () {
    document.querySelector(".loader-overlay").style.display = "none";
});

// for the datepicker (dueDate)
$(document).ready(function () {
    $(".datepicker").datepicker();
});

// reset button
function resetFields() {
    // ged reference
    var taskNameInput = document.getElementById("taskName");
    var dueDateInput = document.getElementById("dueDate");
    var categorySelect = document.getElementById("category");
    var statusSelect = document.getElementById("status");
    var prioritySelect = document.getElementById("priority");

    // reset values
    taskNameInput.value = "";
    dueDateInput.value = "";

    // first op is [0]
    categorySelect.selectedIndex = 0;
    statusSelect.selectedIndex = 0;
    prioritySelect.selectedIndex = 0;

    console.log("Values are set to default")
}

/*
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
*/

document.addEventListener("DOMContentLoaded", function () {
    var addCategoryButton = document.getElementById("addCategory");
    addCategoryButton.addEventListener("click", function () {
        var newCategory = prompt("Enter a new category:");
        if (newCategory) {
            var categorySelect = document.getElementById("category");
            var option = document.createElement("option");
            option.value = newCategory;
            option.text = newCategory;
            categorySelect.appendChild(option);
        }
    });
});


