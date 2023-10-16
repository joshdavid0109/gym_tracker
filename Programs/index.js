const themeToggler = document.querySelector(".theme-toggler");
const aboutLink = document.getElementById("about-link");
const aboutContent = document.getElementById("about-content");
const programs = document.getElementById("programs");
const programsContent = document.getElementById("programs-content");

const dashboardButt = document.getElementsByClassName("active")[0];

const addClient = document.getElementById("add-client");
const addClientContent = document.getElementById("add-client-content");

const searchClient = document.getElementById("search-client");
const searchClientContent = document.getElementById("search-client-content");

const mainContent = document.querySelector("main");

programsContent.style.display = "none";
aboutContent.style.display = "none";
addClientContent.style.display = "none";
searchClientContent.style.display = "none";

dashboardButt.addEventListener("click", function (event) {
    mainContent.style.display = "block";
    addClientContent.style.display = "none";
    programsContent.style.display = "none";
    aboutContent.style.display = "none";
    searchClientContent.style.display = "none";
});

addClient.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    addClientContent.style.display = "block";
    programsContent.style.display = "none";
    aboutContent.style.display = "none";
    searchClientContent.style.display = "none";
});

searchClient.addEventListener("click", function (event) {
    event.preventDefault();
    searchClientContent.style.display = "block";
    mainContent.style.display = "none";
    addClientContent.style.display = "none";
    programsContent.style.display = "none";
    aboutContent.style.display = "none";
});
programs.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    programsContent.style.display = "block";
    aboutContent.style.display = "none";
    addClientContent.style.display = "none";
});

aboutLink.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    aboutContent.style.display = "block";
    programsContent.style.display = "none";
    addClientContent.style.display = "none";
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


// add client
// const to make sure shit wont change #pranning
const form = document.getElementById("input-form");
const fieldsets = form.querySelectorAll("fieldset");
const nextButtons = form.querySelectorAll(".next");
const backButtons = form.querySelectorAll(".back");
const submitButton = document.querySelector(".submit");

const progressBarItems = document.querySelectorAll("#progress-bar li");
let currentFieldsetIndex = 0;

// retrieve client ob from localstorage
const clientListJSON = localStorage.getItem("clients");

if (clientListJSON) {
    const clientList = JSON.parse(clientListJSON);

    // loop sa array of client objess
    clientList.forEach((clientJSON, index) => {
        const clientData = JSON.parse(clientJSON);
        console.log(`Client Object ${index + 1}:`, clientData.personalInfo.gender);
    });
} else {
    console.log("No client data found in local storage.");
}

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
    if (validateForm()) {
        // populate the client object with form data
        populateClientObject();
        // Cceate a JSON representation of the client object
        const clientJSON = JSON.stringify(client);
        // save the JSON object in local storage
        saveClientData(clientJSON);
    }
});

// client object
let client = {
    personalInfo: {
        firstName: '',      // First Name
        lastName: '',       // Last Name
        gender: '',         // Gender
        contactNo: '',      // Contact No.
        address: '',        // Address
        dateOfBirth: '',    // Date of Birth
    },
    fitnessInfo: {
        fitnessLevel: '',   // Fitness Level
        goalType: '',       // Goal Type
        goalDetails: '',    // Goal Details
    },
    healthInfo: {
        medicalHistory: '',         // Medical History
        medications: '',            // Medications
        physicalLimitations: '',    // Physical Limitations
    },
    programs: null // no programs assigned yet to a new client
};


// function to populate the client object with form data
function populateClientObject() {
    // personal Information
    const personalInfoFieldset = fieldsets[0];
    client.personalInfo.firstName = personalInfoFieldset.querySelector('input[name="First Name"]').value;
    client.personalInfo.lastName = personalInfoFieldset.querySelector('input[name="Last Name"]').value;
    client.personalInfo.gender = personalInfoFieldset.querySelector('select[name="Gender"]').value;
    client.personalInfo.contactNo = personalInfoFieldset.querySelector('input[name="Contact No."]').value;
    client.personalInfo.address = personalInfoFieldset.querySelector('input[name="Address"]').value;
    client.personalInfo.dateOfBirth = personalInfoFieldset.querySelector('input[name="Date of Birth"]').value;

    // fitness information
    const fitnessInfoFieldset = fieldsets[1];
    client.fitnessInfo.fitnessLevel = fitnessInfoFieldset.querySelector('select[name="FitnessLevel"]').value;
    client.fitnessInfo.goalType = fitnessInfoFieldset.querySelector('select[name="GoalType"]').value;
    client.fitnessInfo.goalDetails = fitnessInfoFieldset.querySelector('input[name="Goal Details"]').value;

    // health Information
    const healthInfoFieldset = fieldsets[2];
    client.healthInfo.medicalHistory = healthInfoFieldset.querySelector('input[name="Medical History"]').value;
    client.healthInfo.medications = healthInfoFieldset.querySelector('input[name="Medications"]').value;
    client.healthInfo.physicalLimitations = healthInfoFieldset.querySelector('input[name="Physical Limitations"]').value;
}
// function to save client data to local storage
function saveClientData(clientJSON) {

    // check if local storage is available
    if (typeof Storage !== "undefined") {
        // get existing client data from local storage (if any)
        let existingClients = JSON.parse(localStorage.getItem("clients")) || [];
        // add the new client data to the existing data
        existingClients.push(clientJSON);
        // save the updated client data to local storage
        localStorage.setItem("clients", JSON.stringify(existingClients)); // KEY IS clients
        console.log("Client data saved to local storage.");

    } else {
        alert("Local storage is not available. Client data cannot be saved.");
        console.log("Local storage is not available. Client data cannot be saved.");
    }
}

// main container of the clients
const clientContainer = document.querySelector(".main-container");

if (clientListJSON) {
    const clientList = JSON.parse(clientListJSON);

    // loop through the da array of client objects
    clientList.forEach((clientJSON, index) => {
        const clientData = JSON.parse(clientJSON);

        // create a new client object container
        const clientObjectContainer = document.createElement("div");
        clientObjectContainer.classList.add("client-object");

        // create and populate client info
        const clientInfo = document.createElement("div");
        clientInfo.classList.add("client-info");
        clientInfo.innerHTML = `
            <h1>${clientData.personalInfo.firstName} ${clientData.personalInfo.lastName}</h1>
            <p>Program: ${clientData.programs}</p>
        `;

        if (clientData.programs === null) { // still gonan do dis btttttich
            clientInfo.innerHTML = `
            <h1>${clientData.personalInfo.firstName} ${clientData.personalInfo.lastName}</h1>
            <p>No program assigned to client</p>
        `;
        }

        // create and populate client data
        const clientDataContainer = document.createElement("div");
        clientDataContainer.classList.add("client-data");

        // create and populate personal information
        const personalInfo = document.createElement("div");
        personalInfo.classList.add("data");
        personalInfo.innerHTML = `
            <h4>Email</h4>
            <p>Gender: ${clientData.personalInfo.gender}</p>
            <p>Date of Birth: ${clientData.personalInfo.dateOfBirth}</p>
            <p>Contact: ${clientData.personalInfo.contactNo}</p>
            <p>Address: ${clientData.personalInfo.address}</p>
        `;

        // create and populate fitness information
        const fitnessInfo = document.createElement("div");
        fitnessInfo.classList.add("data");
        fitnessInfo.innerHTML = `
            <h4>Fitness Goals</h4>
            <p>Fitness Level: ${clientData.fitnessInfo.fitnessLevel}</p>
            <p>Goal Type: ${clientData.fitnessInfo.goalType}</p>
            <p>Goal Details: ${clientData.fitnessInfo.goalDetails}</p>
        `;

        // create and populate health information
        const healthInfo = document.createElement("div");
        healthInfo.classList.add("data");
        healthInfo.innerHTML = `
            <h4>Health Information</h4>
            <p>Medical History: ${clientData.healthInfo.medicalHistory}</p>
            <p>Medications: ${clientData.healthInfo.medications}</p>
            <p>Physical Limitations: ${clientData.healthInfo.physicalLimitations}</p>
        `;

        // append elements to the clientDataContainer
        clientDataContainer.appendChild(personalInfo);
        clientDataContainer.appendChild(fitnessInfo);
        clientDataContainer.appendChild(healthInfo);

        // append elements to the clientObjectContainer
        clientObjectContainer.appendChild(clientInfo);
        clientObjectContainer.appendChild(clientDataContainer);

        // append the clientObjectContainer to the main container in the HTML
        clientContainer.appendChild(clientObjectContainer);
    });
} else {
    console.log("No client data found in local storage.");
}

document.addEventListener("DOMContentLoaded", function () {
    const clientContainer = document.querySelector(".main-container");
    const searchBar = document.getElementById("search-bar");
    const noRecordsFound = document.getElementById("no-records-found");

    const genderFilter = document.getElementById("gender-filter");
    const goalTypeFilter = document.getElementById("goal-type-filter");
    const fitnessLevelFilter = document.getElementById("fitness-level-filter");
    const physicalLimitationFilter = document.getElementById("physical-limitation-filter");
    const medicationsFilter = document.getElementById("medications-filter");
    const medicalHistoryFilter = document.getElementById("medical-history-filter");
    let recordFound = false;

    // function to display the clients based on the search
    function filterAndDisplayClients() {
        const searchText = searchBar.value.toLowerCase();

        // get filter values
        const selectedGender = genderFilter.value;
        const selectedGoalType = goalTypeFilter.value;
        const selectedFitnessLevel = fitnessLevelFilter.value;
        const physicalLimitationChecked = physicalLimitationFilter.checked;
        const medicationsChecked = medicationsFilter.checked;
        const medicalHistoryChecked = medicalHistoryFilter.checked;

        let recordFound = false;

        clientContainer.querySelectorAll(".client-object").forEach((clientObject) => {
            const clientName = clientObject.querySelector(".client-info h1").textContent.toLowerCase();

            let clientGender = '';
            let clientGoalType = '';
            let clientFitnessLevel = '';

            // nth child(n) gets the 3 existing divs within the parent div client data

            const personalInfoDiv = clientObject.querySelector(".client-data .data:nth-child(1)");
            if (personalInfoDiv) {
                personalInfoDiv.querySelectorAll('p').forEach(p => {
                    if (p.textContent.includes('Gender:')) {
                        clientGender = getTextAfterColon(p.textContent).trim();
                    }

                });
            }

            const goalsDiv = clientObject.querySelector(".client-data .data:nth-child(2)");
            if (goalsDiv) {
                goalsDiv.querySelectorAll('p').forEach(p => {
                    if (p.textContent.includes('Goal Type:')) {
                        clientGoalType = getTextAfterColon(p.textContent).trim();
                    }
                    if (p.textContent.includes('Fitness Level:')) {
                        clientFitnessLevel = getTextAfterColon(p.textContent).trim();
                    }

                });
            }

            let hasMedicalHistory = false;
            let hasMedications = false;
            let hasPhysicalLimitations = false;

            const healthInfoDiv = clientObject.querySelector(".client-data .data:nth-child(3)");
            if (healthInfoDiv) {
                healthInfoDiv.querySelectorAll('p').forEach(p => {
                    const content = getTextAfterColon(p.textContent).trim();
                    if (p.textContent.includes('Medical History:') && content !== "") {
                        hasMedicalHistory = true;
                    }
                    if (p.textContent.includes('Medications:') && content !== "") {
                        hasMedications = true;
                    }
                    if (p.textContent.includes('Physical Limitations:') && content !== "") {
                        hasPhysicalLimitations = true;
                    }
                });
            }

            // functions says it all hheuehue
            function getTextAfterColon(text) {
                const parts = text.split(":");
                return parts.length > 1 ? parts[1].trim() : "";
            }

            // cccccccccccccccccheck fitness and personal information based on dropdowns
            const matchesGender = !selectedGender || clientGender.toLowerCase() === selectedGender.toLowerCase();
            const matchesGoalType = !selectedGoalType || clientGoalType.toLowerCase() === selectedGoalType.toLowerCase();
            const matchesFitnessLevel = !selectedFitnessLevel || clientFitnessLevel.toLowerCase() === selectedFitnessLevel.toLowerCase();

            // final check
            if (
                clientName.startsWith(searchText) &&
                matchesGender &&
                matchesGoalType &&
                matchesFitnessLevel &&
                (!physicalLimitationChecked || hasPhysicalLimitations) &&
                (!medicationsChecked || hasMedications) &&
                (!medicalHistoryChecked || hasMedicalHistory)
            ) {
                clientObject.style.display = "block";
                recordFound = true;
            } else {
                clientObject.style.display = "none";
            }
        });

        if (!recordFound) {
            noRecordsFound.style.display = "block";
        } else {
            noRecordsFound.style.display = "none";
        }
    }


    // add an input event listener to the search bar to update results while type type
    searchBar.addEventListener("input", filterAndDisplayClients);
    genderFilter.addEventListener("change", filterAndDisplayClients);
    goalTypeFilter.addEventListener("change", filterAndDisplayClients);
    fitnessLevelFilter.addEventListener("change", filterAndDisplayClients);
    physicalLimitationFilter.addEventListener("change", filterAndDisplayClients);
    medicationsFilter.addEventListener("change", filterAndDisplayClients);
    medicalHistoryFilter.addEventListener("change", filterAndDisplayClients);
    // display all clients initially
    filterAndDisplayClients();
});
