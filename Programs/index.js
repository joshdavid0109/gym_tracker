const themeToggler = document.querySelector(".theme-toggler");
const aboutLink = document.getElementById("about-link");
const aboutContent = document.getElementById("about-content");
const programs = document.getElementById("programs")
const programsContent = document.getElementById("programs-content")

const mainContent = document.querySelector("main");

programsContent.style.display = "none";
aboutContent.style.display = "none";

programs.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    programsContent.style.display = "block";
    aboutContent.style.display = "none";
});

aboutLink.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    aboutContent.style.display = "block";
    programsContent.style.display = "none";
});

document.querySelector(".sidebar a.active").addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "block";
    programsContent.style.display = "none";
    aboutContent.style.display = "none";
});

// change theme
// themeToggler.addEventListener('click', () => {
//     document.body.classList.toggle('dark-theme-variables');
// })

aboutContent.style.display = "none";

aboutLink.addEventListener("click", function (event) {
    event.preventDefault();

    document.querySelector("main").style.display = "none";

    aboutContent.style.display = "block";
});

document.querySelector(".sidebar a.active").addEventListener("click", function (event) {
    event.preventDefault();

    document.querySelector("main").style.display = "block";
    aboutContent.style.display = "none";
});




const body = document.body;
const activeIcon = themeToggler.querySelector(".active");
const inactiveIcon = themeToggler.querySelector(":not(.active)");

if (body.classList.contains("dark-theme-variables")) {
    activeIcon.classList.remove("active");
    inactiveIcon.classList.add("active");
}

function toggleTheme() {
    body.classList.toggle("dark-theme-variables");
    activeIcon.classList.toggle("active");
    inactiveIcon.classList.toggle("active");
}


themeToggler.addEventListener("click", toggleTheme);


const sidebarItems = document.querySelectorAll(".sidebar a");
sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {

        sidebarItems.forEach((sidebarItem) => {
            sidebarItem.classList.remove("active");
        });

        item.classList.add("active");
    });
});

const daysTag = document.querySelector(".days"),
    currentDate = document.querySelector(".current-date"),
    prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const profilePhoto = document.getElementById("profile-photo");
    const profileDropdown = document.getElementById("profile-dropdown");
    profilePhoto.addEventListener("click", function (e) {
        e.stopPropagation();
        if (profileDropdown.classList.contains("active")) {
            profileDropdown.classList.remove("active");
        } else {
            profileDropdown.classList.add("active");
        }
    });
    document.addEventListener("click", function () {
        profileDropdown.classList.remove("active");
    });
    profileDropdown.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const clients = document.querySelectorAll(".client");

    clients.forEach((client) => {
        const expandIcon = client.querySelector(".expand");
        const collapseIcon = client.querySelector(".collapse");
        const additionalDetails = client.querySelector(".additional-details");

        client.addEventListener("click", function (event) {
            event.stopPropagation();

            if (!client.classList.contains("expanded")) {

                clients.forEach((c) => {
                    c.classList.remove("expanded");
                    c.querySelector(".additional-details").style.display = "none";
                    c.querySelector(".expand").classList.remove("rotate");
                    c.querySelector(".collapse").classList.add("rotate");
                });


                client.classList.add("expanded");
                additionalDetails.style.display = "block";
                expandIcon.classList.add("rotate");
                collapseIcon.classList.remove("rotate");
            } else {

                client.classList.remove("expanded");
                additionalDetails.style.display = "none";
                expandIcon.classList.remove("rotate");
                collapseIcon.classList.add("rotate");
            }
        });

        expandIcon.addEventListener("click", function (event) {
            event.stopPropagation();
            client.click();
        });

        collapseIcon.addEventListener("click", function (event) {
            event.stopPropagation();
            client.click();
        });
    });
});


// Programs
// const programsButton = document.getElementById('programs');
// const accordion = document.querySelector('.accordion');

// programsButton.addEventListener('click', () => {
//     accordion.classList.toggle('active');
// });

// const assignWorkoutBtn = document.getElementById('assignWorkoutBtn');
// const createWorkoutBtn = document.getElementById('createWorkoutBtn');

// assignWorkoutBtn.addEventListener('click', () => {
//     console.log('Assign Workout button clicked');
// });

// createWorkoutBtn.addEventListener('click', () => {
//     console.log('Create New Workout button clicked');
// });


document.getElementById('saveWorkoutBtn').addEventListener('click', function () {

    const workoutName = document.querySelector('input[name="workoutName"]').value;
    const day = document.querySelector('input[name="day"]').value;
    const activity = document.querySelector('input[name="activity"]').value;
    const sets = document.querySelector('input[name="sets"]').value;
    const reps = document.querySelector('input[name="reps"]').value;
    const kg = document.querySelector('input[name="kg"]').value;
    const restTime = document.querySelector('input[name="restTime"]').value;

    document.querySelectorAll('.workout-table input').forEach(input => {
        input.value = '';
    });
});


function removeWorkoutRow(event) {
    const icon = event.target.closest('.removeWorkoutBtn');
    if (icon) {
        const row = icon.closest('tr');
        row.remove();
    }
}


document.getElementById('programs-content').addEventListener('click', function (event) {
    if (event.target.classList.contains('removeWorkoutBtn')) {
        removeWorkoutRow(event);
    }
});


document.getElementById('addWorkoutBtn').addEventListener('click', function () {
    const tableBody = document.querySelector('.workout-table tbody');
    const newRow = document.createElement('tr');
    const headers = ['workoutName', 'day', 'activity', 'sets', 'reps'];

    headers.forEach(header => {
        const td = document.createElement('td');
        const input = document.createElement('input');
        input.type = header === 'sets' || header === 'reps' ? 'number' : 'text';
        input.name = header;
        td.appendChild(input);
        newRow.appendChild(td);
    });

    const removeButton = document.createElement('td');
    removeButton.innerHTML = '<span class="removeWorkoutBtn material-icons-sharp">remove</span>';

    newRow.appendChild(removeButton);
    tableBody.appendChild(newRow);
});



const inputFields = document.querySelectorAll('.workout-table input[type="text"], .workout-table input[type="number"]');
const originalBackgroundColors = new Map();

inputFields.forEach(input => {
    originalBackgroundColors.set(input, getComputedStyle(input).backgroundColor);

    input.addEventListener('focus', () => {
        input.style.backgroundColor = '#e6f7ff';
    });

    input.addEventListener('blur', () => {
        input.style.backgroundColor = originalBackgroundColors.get(input);
    });
});



// Initialize a counter for generating unique Program IDs and workout IDs
let programIdCounter = 1;
let workoutIdCounter = 1;

document.getElementById('saveWorkoutBtn').addEventListener('click', function () {
    // Get all the rows in the workout table
    const rows = document.querySelectorAll('.workout-table tbody tr');
    const savedWorkoutsContainer = document.querySelector('.saved-programs');

    if (rows.length > 0) {
        // Create a new div for the program
        const programDiv = document.createElement('div');
        programDiv.classList.add('program');

        programDiv.setAttribute('data-program-id', `Program ID #${programIdCounter}`);

        // Create a header for the program
        const programHeader = document.createElement('h3');
        programHeader.textContent = `Program ID #${programIdCounter}`;
        programDiv.appendChild(programHeader);

        // Create a container for the workouts within the program
        const workoutsContainer = document.createElement('div');
        workoutsContainer.classList.add('workouts-container');
        programDiv.appendChild(workoutsContainer);

        rows.forEach(row => {
            const workoutName = row.querySelector('input[name="workoutName"]').value;
            const day = row.querySelector('input[name="day"]').value;
            const activity = row.querySelector('input[name="activity"]').value;
            const sets = row.querySelector('input[name="sets"]').value;
            const reps = row.querySelector('input[name="reps"]').value;

            if (workoutName && day && activity && sets && reps) {
                // Create a new div for the saved workout
                const savedWorkoutDiv = document.createElement('div');
                savedWorkoutDiv.classList.add('saved-workout');

                // Assign a unique Workout ID to the saved workout
                savedWorkoutDiv.setAttribute('data-workout-id', `Workout ID #${workoutIdCounter}`);

                // Construct the content for the saved workout
                savedWorkoutDiv.innerHTML = `
                    <h3>${workoutName}</h3>
                    <p>${day} days</p>
                    <p>${activity}</p>
                    <p>Sets: ${sets}, Reps: ${reps}</p>
                `;

                // Create the "Modify" and "Delete" buttons
                const modifyButton = document.createElement('button');
                modifyButton.innerText = 'Modify';
                const deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';

                // Create the "Assign" button
                const assignButton = document.createElement('button');
                assignButton.innerText = 'Assign';

                // Create an accordion for the client list
                const accordion = document.createElement('div');
                accordion.classList.add('accordion');

                // Example list of clients
                const clients = ['Client 1', 'Client 2'];

                // Create a list of clients in the accordion
                const clientList = document.createElement('ul');
                clientList.classList.add('client-list');

                clients.forEach(client => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('client-list-item');
                    listItem.innerText = client;
                    listItem.addEventListener('click', function () {
                        // Handle client selection logic here
                        console.log(`Assigned workout to ${client}`);
                    });
                    clientList.appendChild(listItem);
                });

                accordion.appendChild(clientList);

                // Add the "Modify," "Delete," and "Assign" buttons to the saved workout div
                savedWorkoutDiv.appendChild(modifyButton);
                savedWorkoutDiv.appendChild(deleteButton);
                savedWorkoutDiv.appendChild(assignButton);
                savedWorkoutDiv.appendChild(accordion);

                // Add the saved workout div to the workouts container
                workoutsContainer.appendChild(savedWorkoutDiv);

                // Increment the workout ID counter for the next saved workout
                workoutIdCounter++;
            }
        });

        // Add the program div to the "Saved Workouts" section
        savedWorkoutsContainer.appendChild(programDiv);

        // Increment the Program ID counter for the next program
        programIdCounter++;

        // Clear the input fields in all rows
        rows.forEach(row => {
            const inputs = row.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
        });
    }
});
