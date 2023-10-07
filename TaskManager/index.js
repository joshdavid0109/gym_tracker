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
    var dueDateInput = document.getElementById("dueDate");
    var statusSelect = document.getElementById("status");
    var prioritySelect = document.getElementById("priority");

    // reset values
    dueDateInput.value = "";
    statusSelect.selectedIndex = 0; // first op is [0]
    prioritySelect.selectedIndex = 0;

    console.log("Values are set to default")
}

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