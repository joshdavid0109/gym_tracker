// console.log('Age is ' + computeAge('2000-11-01'));
// json-generator.com 
// code below
/*

[
  '{{repeat(10, 15)}}',
  {
    _id: '{{objectId()}}',
    index: '{{index()}}',
    guid: '{{guid()}}',
    isActive: '{{bool()}}',
    picture: 'http://placehold.it/32x32',
    age: '{{integer(20, 40)}}',
    name: '{{firstName()}} {{surname()}}',
    gender: '{{gender()}}',
    email: '{{email()}}',
    phone: '+639 {{phone(xxx - xxx)}}',
    address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
    birthDate: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
     coach: function (tags) {
      var coaches = ['AJ', 'Joshua', 'Kiko'];
      return coaches[tags.integer(0, coaches.length - 1)];
    },
    
    goals: {
      level: function (tags) {
        var levels = ['Beginner', 'Intermediate', 'Advanced'];
        return levels[tags.integer(0, levels.length-1)];
      },
      goal: function(tags) {
        var goals = ['Muscle Gain', 'Weight Loss',
                     'Body Recomposition'];
      },
      goaldetails:{}
    }
  }
]

*/


const themeToggler = document.querySelector(".theme-toggler");
const aboutLink = document.getElementById("about-link");
const aboutContent = document.getElementById("about-content");
const programs = document.getElementById("programs");
const programsContent = document.getElementById("programs-content");
const calendar = document.getElementById("calendar");

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
    calendar.style.display = "block";
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
    calendar.style.display = "none";
});

searchClient.addEventListener("click", function (event) {
    event.preventDefault();
    searchClientContent.style.display = "block";
    mainContent.style.display = "none";
    addClientContent.style.display = "none";
    programsContent.style.display = "none";
    aboutContent.style.display = "none";
    calendar.style.display = "none";
});
programs.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    programsContent.style.display = "block";
    aboutContent.style.display = "none";
    addClientContent.style.display = "none";
    searchClientContent.style.display = "none";
    calendar.style.display = "none";
});

aboutLink.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    aboutContent.style.display = "block";
    programsContent.style.display = "none";
    addClientContent.style.display = "none";
    searchClientContent.style.display = "none";
    calendar.style.display = "none";
});

document.querySelector(".sidebar a.active").addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "block";
    programsContent.style.display = "none";
    aboutContent.style.display = "none";
});


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


const topIcon = document.getElementById('top-icon');

function changeColors() {
    const randomHue = Math.floor(Math.random() * 360);
    topIcon.style.setProperty('--hue-rotate', `${randomHue}deg`);
}
changeColors();


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

// PROFILE PHOTO DROPDOWN - SETTINGS, LOG-OUT 
// document.addEventListener("DOMContentLoaded", function () {
//     const profilePhoto = document.getElementById("profile-photo");
//     const profileDropdown = document.getElementById("profile-dropdown");
//     profilePhoto.addEventListener("click", function (e) {
//         e.stopPropagation();
//         if (profileDropdown.classList.contains("active")) {
//             profileDropdown.classList.remove("active");
//         } else {
//             profileDropdown.classList.add("active");
//         }
//     });
//     document.addEventListener("click", function () {
//         profileDropdown.classList.remove("active");
//     });
//     profileDropdown.addEventListener("click", function (e) {
//         e.stopPropagation();
//     });
// });





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
// });F

// createWorkoutBtn.addEventListener('click', () => {
//     console.log('Create New Workout button clicked');
// });

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

// This function gets the highest program ID from the saved workouts
function getHighestProgramId(savedWorkouts) {
    if (savedWorkouts.length === 0) return 0;
    return Math.max(...savedWorkouts.map(program => parseInt(program.id)));
}

document.getElementById('saveWorkoutBtn').addEventListener('click', function () {
    const rows = document.querySelectorAll('.workout-table tbody tr');
    const savedWorkoutsContainer = document.querySelector('.saved-programs');
    let savedWorkouts = JSON.parse(localStorage.getItem('workoutData')) || [];

    rows.forEach(row => {
        const highestProgramId = getHighestProgramId(savedWorkouts);
        const newProgramId = (highestProgramId + 1).toString().padStart(5, '0');

        const workoutName = row.querySelector('input[name="workoutName"]').value;
        const day = row.querySelector('input[name="day"]').value;
        const activity = row.querySelector('input[name="activity"]').value;
        const sets = row.querySelector('input[name="sets"]').value;
        const reps = row.querySelector('input[name="reps"]').value;

        if (workoutName && day && activity && sets && reps) {
            const savedProgram = {
                id: newProgramId,
                workouts: {
                    day,
                    activity,
                    sets,
                    reps,
                    workoutName
                }
            };

            savedWorkouts.push(savedProgram);
            localStorage.setItem('workoutData', JSON.stringify(savedWorkouts));

            const programDiv = createProgramDiv(savedProgram); // Assuming you have this function defined somewhere
            savedWorkoutsContainer.appendChild(programDiv);
            alert("Added new program!")
            location.reload();
        }

        // Clear the input fields in all rows
        const inputs = row.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
        });
    });
});



// Function to fetch the data from the JSON file
function fetchDataAndStore() {
    // Check if 'workoutData' exists in local storage
    if (!localStorage.getItem('workoutData')) {
        // If not, fetch the data
        fetch('Programs.json') // Replace with the actual path to your JSON file
            .then(response => response.json())
            .then(data => {
                // Store the data in local storage
                localStorage.setItem('workoutData', JSON.stringify(data));
                location.reload();
            })
            .catch(error => {
                console.error('Error fetching workout data:', error);
            });
    } else {
        console.log('Workout data already exists in local storage. Not fetching again.');
    }

    // Check if 'clients' exists in local storage
    if (!localStorage.getItem('clients')) {
        // If not, fetch the data
        fetch('ClientData.json') // Replace with the actual path to your JSON file
            .then(response => response.json())
            .then(data => {
                // Store the data in local storage
                localStorage.setItem('clients', JSON.stringify(data));
                location.reload();
            })
            .catch(error => {
                console.error('Error fetching client data:', error);
            });
    } else {
        console.log('Client data already exists in local storage. Not fetching again.');
    }



}

// Call the function to fetch and store the data
fetchDataAndStore();
// Retrieve the JSON string from local storage
var storedData = localStorage.getItem('workoutData');
// Parse the JSON string back into an array
var workouts = JSON.parse(storedData);

// Check if there is data in local storage
if (workouts) {
    // Loop through the array and display the data on the webpage
    for (var i = 0; i < workouts.length; i++) {
        var workout = workouts[i];
        console.log(workout);

        // Create HTML elements to display the workout data
        var workoutElement = document.createElement('div');
        workoutElement.className = 'workout-item';  // Add a class for styling

        // Break down each piece of data into its own element for more structure and styling
        workoutElement.innerHTML = `
            <div class="workout-id">Workout ID: ${workout.id}</div>
            <div class="workout-name">Workout Name: ${workout.workouts.workoutName}</div>
            <div class="workout-day">Day: ${workout.workouts.day}</div>
            <div class="workout-activity">Activity: ${workout.workouts.activity}</div>
            <div class="workout-sets">Sets: ${workout.workouts.sets}</div>
            <div class="workout-reps">Reps: ${workout.workouts.reps}</div>
        `;

        // Create the assign button
        var assignButton = document.createElement('button');
        assignButton.textContent = 'Assign';
        assignButton.className = 'assign-button';  // Add a class for styling

        assignButton.addEventListener('click', function (workout) {
            return function () {
                displayClientDialog(workout);
            };
        }(workout));

        // Append the button to the workout element
        workoutElement.appendChild(assignButton);
        console.log(workoutElement);

        // Append the workout element to the webpage
        const savedWorkoutsContainer = document.querySelector('.saved-programs');
        savedWorkoutsContainer.appendChild(workoutElement);
    }
} else {
    // Handle the case where there is no data in local storage
    console.log('No workout data found in local storage.');
}

function displayClientDialog(workout) {
    let clients = JSON.parse(localStorage.getItem('clients')) || [];

    // No filter, directly use all clients
    let availableClients = clients;

    // Create a modal dialog
    let modal = document.createElement('div');
    modal.className = 'modal';

    // Create a close button
    let closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.textContent = 'x';
    closeButton.addEventListener('click', function () {
        document.body.removeChild(modal); // Close the modal when the close button is clicked
    });

    modal.appendChild(closeButton);

    let clientList = document.createElement('ul');

    availableClients.forEach(client => {
        let listItem = document.createElement('li');

        // Create a span element for the client ID
        let clientIdSpan = document.createElement('span');
        clientIdSpan.textContent = client._id;
        clientIdSpan.className = 'client-id';

        // Create a span element for the client name
        let clientNameSpan = document.createElement('span');
        clientNameSpan.textContent = client.name;

        // Add both spans to the list item
        listItem.appendChild(clientIdSpan);
        listItem.appendChild(clientNameSpan);

        listItem.addEventListener('click', function () {
            // Toggle the 'selected' class on the clicked item
            listItem.classList.toggle('selected');
        });

        clientList.appendChild(listItem);
    });

    modal.appendChild(clientList);

    // Create an "Add" button
    let addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.textContent = 'Add';

    addButton.addEventListener('click', function () {
        // Get all selected clients
        let selectedClients = modal.querySelectorAll('.selected');

        // Build the confirmation message
        let confirmationMessage = `Are you sure you want to add the selected clients to Program ID: ${workout.id}?\n\n`;

        // Ask for confirmation

        if (selectedClients.length > 0 && confirm(confirmationMessage)) {
            // Initialize an array to keep track of clients who were successfully assigned the program
            const successfullyAssignedClients = [];

            // Update selected clients with the entire workout (program)
            selectedClients.forEach(selectedClient => {
                const clientId = selectedClient.querySelector('.client-id').textContent;
                const selectedClientObj = availableClients.find(client => client._id === clientId);

                if (selectedClientObj) {
                    if (!selectedClientObj.programs) {
                        selectedClientObj.programs = [];
                    }

                    // Check if the program ID already exists in the client's programs
                    const programExists = selectedClientObj.programs.some(program => program.id === workout.id);

                    if (!programExists) {
                        // Add the program to the client's programs
                        selectedClientObj.programs.push(workout);
                        successfullyAssignedClients.push(selectedClientObj.name);
                    }
                }
            });

            // Update localStorage
            localStorage.setItem('clients', JSON.stringify(availableClients)); // Update availableClients, not clients

            if (successfullyAssignedClients.length > 0) {
                alert(`Successfully assigned the program to: ${successfullyAssignedClients.join(', ')}`);
                location.reload();
            } else {
                alert('Client already assigned to this program!');
            }
        }


        // Close the modal
        document.body.removeChild(modal);
    });

    modal.appendChild(addButton);

    // Close the modal when clicking outside of it
    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });

    document.body.appendChild(modal);
}
function createProgramDiv(savedProgram) {
    console.log(savedProgram)
    const programDiv = document.createElement('div');
    programDiv.classList.add('program');
    programDiv.setAttribute('data-program-id', savedProgram.id);

    const programHeader = document.createElement('h3');
    programHeader.textContent = savedProgram.id;
    programDiv.appendChild(programHeader);

    const workoutsContainer = document.createElement('div');
    workoutsContainer.classList.add('workouts-container');
    programDiv.appendChild(workoutsContainer);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', function () {
        const programId = programDiv.getAttribute('data-program-id');
        // Remove the program div from the local storage
        removeProgramFromLocalStorage(programId);
        // Remove the program div from the displayed programs
        programDiv.remove();
    });

    const assignButton = document.createElement('button');
    assignButton.innerText = 'Assign';
    assignButton.addEventListener('click', function () {
        const programId = programDiv.getAttribute('data-program-id');
        assignProgramToClient(programId, savedWorkoutDiv);
    });

    const accordion = document.createElement('div');
    accordion.classList.add('accordion');
    const clientList = document.createElement('ul');
    clientList.classList.add('client-list');


    accordion.appendChild(clientList);
    return programDiv;
}


// ADD CLIENT FUNCTIONALITY
// const to make sure it wont change 
const form = document.getElementById("input-form");
const fieldsets = form.querySelectorAll("fieldset");
const nextButtons = form.querySelectorAll(".next");
const backButtons = form.querySelectorAll(".back");
const submitButton = document.querySelector(".submit");

const progressBarItems = document.querySelectorAll("#progress-bar li");
let currentFieldsetIndex = 0;

// retrieve client ob from localstorage
const clientListJSON = localStorage.getItem("clients");

// func to assign an ID
// Function to assign a new client ID
function assignClientID() {
    let existingClients = JSON.parse(localStorage.getItem("clients")) || [];
    let maxID = 0;

    // Find the maximum ID from existing clients
    existingClients.forEach((clientData) => {
        const clientID = parseInt(clientData._id);
        if (!isNaN(clientID) && clientID > maxID) {
            maxID = clientID;
        }
    });

    // Increment the maxID by 1
    maxID++;

    // Assign the next available ID
    return `${String(maxID).padStart(5, '0')}`;
}

function assignClientIndex() {
    let existingClients = JSON.parse(localStorage.getItem("clients")) || [];
    let maxID = 0;

    // Find the maximum ID from existing clients
    existingClients.forEach((clientData) => {
        const clientID = parseInt(clientData._id);
        if (!isNaN(clientID) && clientID > maxID) {
            maxID = clientID;
        }
    });

    // Increment the maxID by 1
    maxID++;
    
    // Assign the next available ID
    return maxID-1;
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
        populateClientObject();
        // Save the JSON object in local storage regardless of server success/failure
        saveClientData(client);
        // Show success message for local storage save
        alert('Client data saved locally.');
        // the holy auto refresh
        location.reload();
    }
});


// client object
let client = {
    _id: '',
    index: 0,
    isActive: true,
    picture: "http://placehold.it/32x32",
    name: '',
    gender: '',
    age: 0,
    email: '',
    phone: '',
    address: '',
    birthDate: '',
    coach: 'Kiko', // default?
    goals: {
        level: '',
        goal: '',
        goaldetails: ''
    },
    healthInfo: {
        medicalHistory: '',
        medications: '',
        physicalLimitations: ''
    },
    programs: null
};


function computeAge(dob) {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const m = currentDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// function to populate the client object with form data
function populateClientObject() {
    // personal Information
    const personalInfoFieldset = fieldsets[0];
    client._id = assignClientID();
    client.index = assignClientIndex();
    const firstName = personalInfoFieldset.querySelector('input[name="First Name"]').value;
    const lastName = personalInfoFieldset.querySelector('input[name="Last Name"]').value;
    // con cat the first and last name
    client.name = `${firstName} ${lastName}`;

    client.gender = personalInfoFieldset.querySelector('select[name="Gender"]').value;
    client.email = personalInfoFieldset.querySelector('input[name="Email"]').value;
    client.phone = personalInfoFieldset.querySelector('input[name="Contact No."]').value;
    client.address = personalInfoFieldset.querySelector('input[name="Address"]').value;
    client.birthDate = personalInfoFieldset.querySelector('input[name="Date of Birth"]').value;
    client.age = computeAge(client.birthDate);

    // fitness information
    const fitnessInfoFieldset = fieldsets[1];
    client.goals.level = fitnessInfoFieldset.querySelector('select[name="FitnessLevel"]').value;
    client.goals.goal = fitnessInfoFieldset.querySelector('select[name="GoalType"]').value;
    client.goals.goaldetails = fitnessInfoFieldset.querySelector('input[name="Goal Details"]').value;

    // health Information
    const healthInfoFieldset = fieldsets[2];
    client.healthInfo.medicalHistory = healthInfoFieldset.querySelector('input[name="Medical History"]').value;
    client.healthInfo.medications = healthInfoFieldset.querySelector('input[name="Medications"]').value;
    client.healthInfo.physicalLimitations = healthInfoFieldset.querySelector('input[name="Physical Limitations"]').value;
}
// function to save client data to local storage
function saveClientData(clientData) {
    // Check if local storage is available
    if (typeof Storage !== "undefined") {
        // Get existing client data from local storage (if any)
        let existingClients = JSON.parse(localStorage.getItem("clients")) || [];
        // Add the new client data to the existing data
        existingClients.push(clientData);
        // Save the updated client data to local storage
        localStorage.setItem("clients", JSON.stringify(existingClients)); // KEY IS clients
        console.log("Client data saved to local storage.");
    } else {
        alert("Local storage is not available. Client data cannot be saved.");
        console.log("Local storage is not available. Client data cannot be saved.");
    }
}

const clientContainer = document.querySelector(".main-container");

if (clientListJSON) {
    const clientList = JSON.parse(clientListJSON);

    // Function to retrieve all program names from the client's programs array
    function getClientProgramNames(programs) {
        if (programs && Array.isArray(programs) && programs.length > 0) {
            // Map through each program and return the workoutName
            return "Programs: " + programs.map(program => program.workouts.workoutName).join(", ");
        } else {
            return "No program assigned to client";
        }
    }

    // Loop through the array of client objects
    clientList.forEach((clientData, index) => {
        // create a new client object container
        const clientObjectContainer = document.createElement("div");
        clientObjectContainer.classList.add("client-object");

        // Create and populate client info
        const clientInfo = document.createElement("div");
        clientInfo.classList.add("client-info");

        // Retrieve all program names for the client
        const programNames = getClientProgramNames(clientData.programs);

        clientInfo.innerHTML = `
          <h1>${clientData.name}</h1>
          <h2>${clientData._id}</h2>
          <p>${programNames}</p>
        `;

        // create and populate client data
        const clientDataContainer = document.createElement("div");
        clientDataContainer.classList.add("client-data");

        // create and populate personal information
        const personalInfo = document.createElement("div");
        personalInfo.classList.add("data");
        personalInfo.innerHTML = `
            <h4>Personal Information</h4>
            <p>Gender: ${clientData.gender}</p>
            <p>Age: ${clientData.age}</p> 
            <p>Date of Birth: ${clientData.birthDate}</p>
            <p>Contact: ${clientData.phone}</p>
            <p>Address: ${clientData.address}</p>
        `;

        // create and populate fitness information
        const fitnessInfo = document.createElement("div");
        fitnessInfo.classList.add("data");
        fitnessInfo.innerHTML = `
        <h4>Fitness Goals</h4>
        <p>Fitness Level: ${clientData.goals ? clientData.goals.level : "Not specified"}</p>
        <p>Goal Type: ${clientData.goals ? clientData.goals.goal : "Not specified"}</p>
        <p>Goal Details: ${clientData.goals ? clientData.goals.goalDetails : "Not specified"}</p>
    `;

        // create and populate health information
        const healthInfo = document.createElement("div");
        healthInfo.classList.add("data");
        healthInfo.innerHTML = `
            <h4>Health Information</h4>
            <p>Medical History: ${clientData.healthInfo?.medicalHistory || "None"}</p>
            <p>Medications: ${clientData.healthInfo?.medications || "None"}</p>
            <p>Physical Limitations: ${clientData.healthInfo?.physicalLimitations || "None"}</p>
        `;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "❌";
        deleteButton.addEventListener("click", function () {

            let isConfirmed = window.confirm(`Are you sure you want to delete ${clientData.name}?`);

            if (isConfirmed) {
                deleteClient(index); // Pass the index to the deleteClient function
                alert(`Deleted ${clientData.name}`);
            } else {
                // User cancelled the action
                console.log(`Delete action for ${clientName} was cancelled by the user.`);
            }
        });
        clientObjectContainer.appendChild(deleteButton);

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

function getClientProgramName(programs) {
    if (programs && programs.length > 0) {
        // Assume you have a variable 'programData' containing program data.
        const programData = [
            { id: "00001", name: "Program 1" }, // Replace with your program data
            { id: "00002", name: "Program 2" }, // Replace with your program data
            // Add more program data as needed
        ];

        const programIds = programs.map(program => program.id);
        const programNames = programData
            .filter(program => programIds.includes(program.id))
            .map(program => program.name);

        return programNames.join(", ");
    }
    return null;
}


// DELETE CLIENT
function deleteClient(index) {
    let existingClients = JSON.parse(localStorage.getItem("clients")) || [];

    if (index >= 0 && index < existingClients.length) {
        // Get the deleted client's details before removing them from the array
        const deletedClient = existingClients[index];

        // Log the details of the deleted client
        console.log("Deleted client with ID: " + deletedClient._id + ", Name: " + deletedClient.name);

        // Remove the client from the array
        existingClients.splice(index, 1);

        // Update the local storage with the modified data
        localStorage.setItem('clients', JSON.stringify(existingClients));

        // Remove the client card from the DOM
        const clientObjectContainer = document.querySelector(".main-container .client-object:nth-child(" + (index + 1) + ")");
        if (clientObjectContainer) {
            clientObjectContainer.remove();
        }
    } else {
        console.error("Invalid index or client not found.");
    }
}


// SEARCH CLIENT
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

    function filterAndDisplayClients() {
        const searchText = searchBar.value.toLowerCase();

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

            function getTextAfterColon(text) {
                const parts = text.split(":");
                return parts.length > 1 ? parts[1].trim() : "";
            }

            const matchesGender = !selectedGender || clientGender.toLowerCase() === selectedGender.toLowerCase();
            const matchesGoalType = !selectedGoalType || clientGoalType.toLowerCase() === selectedGoalType.toLowerCase();
            const matchesFitnessLevel = !selectedFitnessLevel || clientFitnessLevel.toLowerCase() === selectedFitnessLevel.toLowerCase();

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

    searchBar.addEventListener("input", filterAndDisplayClients);
    genderFilter.addEventListener("change", filterAndDisplayClients);
    goalTypeFilter.addEventListener("change", filterAndDisplayClients);
    fitnessLevelFilter.addEventListener("change", filterAndDisplayClients);
    physicalLimitationFilter.addEventListener("change", filterAndDisplayClients);
    medicationsFilter.addEventListener("change", filterAndDisplayClients);
    medicalHistoryFilter.addEventListener("change", filterAndDisplayClients);

    filterAndDisplayClients();
});


function statusCheck(data) {
    const date = new Date();

    let latestCheckIn = null;
    let day = date.getDate();

    const idsWithNoCheckIns = [];
    const idsWithCheckIns = [];

    data.forEach((client) => {

        const clientId = client.id;
        const checkIns = client.checkIns?.October || {};

        // Check if the target date is missing in the client's check-ins for October
        if (!checkIns[day]) {
            idsWithNoCheckIns.push(clientId);
        } else {
            idsWithCheckIns.push(clientId);
        }
    });

    console.log(`IDs with no check-ins for ${day}:`, idsWithNoCheckIns);

    idsWithCheckIns.forEach(e => {

        fetch('ClientData.json')
            .then(res => {
                return res.json();
            })
            .then(json2 => {
                json2.forEach(el => {
                    // console.log(el)
                    if (el._id == e) {
                        const clientStatusParent = document.getElementById("client-status");
                        const csMarkup = `  <li>${el.name} <button class="invoice-btn">Check</button></li>
                `;
                        clientStatusParent.insertAdjacentHTML("beforeend", csMarkup);
                    }
                })
                // console.log(clientCounter);
            })
    })



    idsWithNoCheckIns.forEach(e => {

        fetch('ClientData.json')
            .then(res => {
                return res.json();
            })
            .then(json2 => {
                json2.forEach(el => {
                    // console.log(el)
                    if (el._id == e) {
                        const clientStatusParent = document.getElementById("client-status");
                        const csMarkup = `  <li>${el.name} <button class="invoice-btn-red">Not Yet</button></li>
                `;
                        clientStatusParent.insertAdjacentHTML("beforeend", csMarkup);
                    }
                })
                console.log("Client count: " + clientCounter);
            })

    })
}

function findLatestCheckIn(data) {
    const date = new Date();

    let latestCheckIn = null;
    let day = date.getDate(); ''

    data.forEach(element => {
        const checkIns = element.checkIns.October;
        for (const date in checkIns) {
            if (day == date) {
                if (checkIns.hasOwnProperty(date)) {
                    const time = checkIns[date];
                    const checkInDateTime = new Date(`2023-10-${date}T${time}:00`);

                    if (!latestCheckIn || checkInDateTime > latestCheckIn.dateTime) {
                        latestCheckIn = {
                            id: element.id,
                            dateTime: checkInDateTime,
                            time: time
                        };
                    }
                }
            }
        }
    });

    return latestCheckIn;
}

fetch('ClientCheckIns.json')
    .then(res => {
        return res.json();
    })
    .then(json => {
        statusCheck(json)
        const latestcheckin = findLatestCheckIn(json);
        console.log("latest")
        console.log(latestcheckin)


        if (latestcheckin != null) {
        json.forEach(element => {
            fetch('ClientData.json')
                .then(res => {
                    return res.json();
                })
                .then(json2 => {
                    json2.forEach(el => {
                        // console.log("hello")
                        // console.log(json2)
                        if (el._id == element.id && el._id == latestcheckin.id) {

                            const recentClient = document.getElementById("recent-client");
                            recentClient.innerHTML = `${el.name}`
                        }
                    })
                    // console.log(clientCounter);
                })

        })
    }
    })


// CLIENT COUNT
// Retrieve data from local storage
let clientDataString = localStorage.getItem('clients');
let json = JSON.parse(clientDataString); // Parse the string into a JSON object

var clientCounter = 0;

json.forEach(el => {
    if (el.coach === 'Kiko') {
        clientCounter++;
    }
});

// Updating the client count
var clientCount = document.getElementById('client-count');
var content = document.createTextNode(clientCounter);
clientCount.appendChild(content);

// Print client cards
json.forEach(el => {
    var parent = document.getElementById("client-list");
    if (el.coach === 'Kiko') {
        const clientMarkup =
            ` <div class="client">
            <ul id="client-d" class="client-details">
            <img src="/images/profile-1.png">
            <li id="client-id"><span>Client ID:</span> ${el._id}</li>
            <li id="client-name"><span>Name:</span> ${el.name}</li>
            <li id="expand-icon" class="expand-icon" data-expanded="false">
                <span class="material-icons-sharp expand">expand_more</span>
                <span class="material-icons-sharp collapse">expand_less</span>
            </li>
            <li class="additional-details">
                <span class="details-label">Additional Details:</span>
                <ul id="additional-details">
                    <li id="contact" class="contact"><span>Contact:</span> ${el.phone}</li>
                    <li id="address" class="address"><span>Address:</span> ${el.address}</li>
                    <li id="dob" class="dob"><span>Date of Birth:</span> ${el.birthDate}</li>
                    <li id="gender" class="gender"><span>Gender:</span> ${el.gender.charAt(0).toUpperCase() + el.gender.slice(1)}</li>
                    <li class="program">Programs:</li>
                </ul>
            </li>
            </ul>
         </div>`

        parent.insertAdjacentHTML("beforeend", clientMarkup);
    }
});

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