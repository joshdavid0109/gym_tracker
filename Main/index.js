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
});

aboutLink.addEventListener("click", function (event) {
    event.preventDefault();
    mainContent.style.display = "none";
    aboutContent.style.display = "block";
    programsContent.style.display = "none";
    addClientContent.style.display = "none";
    searchClientContent.style.display = "none";
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

// Load saved workouts from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
    const savedWorkoutsContainer = document.querySelector('.saved-programs');

    // Find the highest programId in the savedWorkouts
    let highestProgramId = 0;
    savedWorkouts.forEach(savedWorkout => {
        const programId = parseInt(savedWorkout.id.match(/\d+/));
        if (programId > highestProgramId) {
            highestProgramId = programId;
        }
    });

    programIdCounter = highestProgramId + 1;

    savedWorkouts.forEach(savedWorkout => {
        const programDiv = createProgramDiv(savedWorkout);
        savedWorkoutsContainer.appendChild(programDiv);

        programIdCounter++;
        workoutIdCounter++;
    });
});

document.getElementById('saveWorkoutBtn').addEventListener('click', function () {
    const rows = document.querySelectorAll('.workout-table tbody tr');
    const savedWorkoutsContainer = document.querySelector('.saved-programs');
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];

    if (rows.length > 0) {
        const savedProgram = {
            id: `Program ID #${programIdCounter}`,
            workouts: [],
        };

        rows.forEach(row => {
            const workoutName = row.querySelector('input[name="workoutName"]').value;
            const day = row.querySelector('input[name="day"]').value;
            const activity = row.querySelector('input[name="activity"]').value;
            const sets = row.querySelector('input[name="sets"]').value;
            const reps = row.querySelector('input[name="reps"]').value;

            if (workoutName && day && activity && sets && reps) {
                savedProgram.workouts.push({
                    id: `Workout ID #${workoutIdCounter}`,
                    workoutName,
                    day,
                    activity,
                    sets,
                    reps,
                });

                workoutIdCounter++;
            }
        });

        if (savedProgram.workouts.length > 0) {
            savedWorkouts.push(savedProgram);
            localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));

            const programDiv = createProgramDiv(savedProgram);
            savedWorkoutsContainer.appendChild(programDiv);

            updateProgramIdCounter();

            // Clear the input fields in all rows
            rows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                inputs.forEach(input => {
                    input.value = '';
                });
            });


        }
    }
});

function removeProgramFromLocalStorage(programId) {
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
    const updatedSavedWorkouts = savedWorkouts.filter(savedProgram => savedProgram.id !== programId);
    localStorage.setItem('savedWorkouts', JSON.stringify(updatedSavedWorkouts));

    updateProgramIdCounter();
}

function createProgramDiv(savedProgram) {
    const programDiv = document.createElement('div');
    programDiv.classList.add('program');
    programDiv.setAttribute('data-program-id', savedProgram.id);

    const programHeader = document.createElement('h3');
    programHeader.textContent = savedProgram.id;
    programDiv.appendChild(programHeader);

    const workoutsContainer = document.createElement('div');
    workoutsContainer.classList.add('workouts-container');
    programDiv.appendChild(workoutsContainer);

    savedProgram.workouts.forEach(workout => {
        const savedWorkoutDiv = document.createElement('div');
        savedWorkoutDiv.classList.add('saved-workout');
        savedWorkoutDiv.setAttribute('data-workout-id', workout.id);

        savedWorkoutDiv.innerHTML = `
            <h3>${workout.workoutName}</h3>
            <p>${workout.day} days</p>
            <p>${workout.activity}</p>
            <p>Sets: ${workout.sets}, Reps: ${workout.reps}
        `;

        const modifyButton = document.createElement('button');
        modifyButton.innerText = 'Modify';
        modifyButton.addEventListener('click', function () {
            const editDiv = savedWorkoutDiv.querySelector('.edit-div');

            if (!editDiv) {
                const setsRepsText = savedWorkoutDiv.querySelectorAll('p')[2].textContent;
                const setsRepsMatch = /Sets: (\d+), Reps: (\d+)/.exec(setsRepsText);

                const newEditDiv = document.createElement('div');
                newEditDiv.classList.add('edit-div');
                newEditDiv.innerHTML = `
                    <div class="edit-header">Workout Name</div>
                    <input type="text" class="edit-input" value="${savedWorkoutDiv.querySelector('h3').textContent}" id="edit-workout-name">
                    <div class="edit-header">Day</div>
                    <input type="text" class="edit-input" value="${savedWorkoutDiv.querySelectorAll('p')[0].textContent.replace(' days', '')}" id="edit-workout-day">
                    <div class="edit-header">Activity</div>
                    <input type="text" class="edit-input" value="${savedWorkoutDiv.querySelectorAll('p')[1].textContent}" id="edit-workout-activity">
                    <div class="edit-header">Sets</div>
                    <input type="number" class="edit-input" value="${setsRepsMatch[1]}" id="edit-workout-sets">
                    <div class="edit-header">Reps</div>
                    <input type="number" class="edit-input" value="${setsRepsMatch[2]}" id="edit-workout-reps">
                `;

                // Append the small div to the savedWorkoutDiv
                savedWorkoutDiv.appendChild(newEditDiv);
                modifyButton.innerText = 'Update';
            } else {
                if (modifyButton.innerText === 'Update') {
                    // Update the displayed values with the edited values
                    const editedWorkoutName = editDiv.querySelector('#edit-workout-name').value;
                    const editedWorkoutDay = editDiv.querySelector('#edit-workout-day').value;
                    const editedWorkoutActivity = editDiv.querySelector('#edit-workout-activity').value;
                    const editedWorkoutSets = editDiv.querySelector('#edit-workout-sets').value;
                    const editedWorkoutReps = editDiv.querySelector('#edit-workout-reps').value;

                    // Update the existing elements with new values
                    const workoutNameElement = savedWorkoutDiv.querySelector('h3');
                    const dayElement = savedWorkoutDiv.querySelectorAll('p')[0];
                    const activityElement = savedWorkoutDiv.querySelectorAll('p')[1];
                    const setsRepsElement = savedWorkoutDiv.querySelectorAll('p')[2];

                    workoutNameElement.textContent = editedWorkoutName;
                    dayElement.textContent = `${editedWorkoutDay} days`;
                    activityElement.textContent = editedWorkoutActivity;
                    setsRepsElement.textContent = `Sets: ${editedWorkoutSets}, Reps: ${editedWorkoutReps}`;

                    // Update the workout details in localStorage
                    updateWorkoutInLocalStorage(savedProgram.id, workout.id, {
                        workoutName: editedWorkoutName,
                        day: editedWorkoutDay,
                        activity: editedWorkoutActivity,
                        sets: editedWorkoutSets,
                        reps: editedWorkoutReps,
                    });

                    modifyButton.innerText = 'Modify';

                    // Remove the edit form after updating
                    editDiv.remove();
                }
            }
        });

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

        savedWorkoutDiv.appendChild(modifyButton);
        savedWorkoutDiv.appendChild(deleteButton);
        savedWorkoutDiv.appendChild(assignButton);
        savedWorkoutDiv.appendChild(accordion);

        workoutsContainer.appendChild(savedWorkoutDiv);
    });

    return programDiv;
}

function assignProgramToClient(programId, workoutDiv) {
    const clientListJSON = localStorage.getItem("clients");
    if (clientListJSON) {
        const clientList = JSON.parse(clientListJSON);

        const accordion = workoutDiv.querySelector('.accordion');
        const clientListContainer = accordion.querySelector('.client-list');
        clientListContainer.innerHTML = "";

        clientList.forEach((clientJSON) => {
            const clientData = JSON.parse(clientJSON);

            // checks if the client already has this program assigned
            if (clientData.programs && clientData.programs.includes(programId)) {
                return; // skips this client if program is already assigned
            }

            // creates a list item for the client
            const listItem = document.createElement('li');
            listItem.textContent = `${clientData.personalInfo.firstName} ${clientData.personalInfo.lastName}`;
            listItem.addEventListener('click', function () {
                // updates the client's program assignment
                if (!clientData.programs) {
                    clientData.programs = [];
                }
                clientData.programs.push(programId);

                // updates the client's data in local storage
                updateClientInLocalStorage(clientData.id, clientData);

                // updates the accordion to reflect the assignment
                accordion.style.display = 'none';
                listItem.style.display = 'none'; // hides the clicked client in the list
                alert(`${clientData.personalInfo.firstName} ${clientData.personalInfo.lastName} has been assigned the ${programId}`)
            });

            clientListContainer.appendChild(listItem);
        });

        accordion.style.display = 'block'; // Show the accordion with the list of available clients
    }
}

// Function to update a client's data in local storage
function updateClientInLocalStorage(clientId, clientData) {
    const existingClients = JSON.parse(localStorage.getItem("clients")) || [];
    const updatedClients = existingClients.map((clientJSON) => {
        const client = JSON.parse(clientJSON);
        if (client.id === clientId) {
            return JSON.stringify(clientData);
        } else {
            return clientJSON;
        }
    });
    localStorage.setItem('clients', JSON.stringify(updatedClients));
}

// Update program id counter
function updateProgramIdCounter() {
    // Find the highest programId in the savedWorkouts
    let highestProgramId = 0;
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
    savedWorkouts.forEach(savedProgram => {
        const programId = parseInt(savedProgram.id.match(/\d+/));
        if (programId > highestProgramId) {
            highestProgramId = programId;
        }
    });

    programIdCounter = highestProgramId + 1;
}

// Function to update the workout details in localStorage
function updateWorkoutInLocalStorage(programId, workoutId, updatedDetails) {
    const savedWorkouts = JSON.parse(localStorage.getItem('savedWorkouts')) || [];
    const program = savedWorkouts.find(program => program.id === programId);
    if (program) {
        const workout = program.workouts.find(workout => workout.id === workoutId);
        if (workout) {
            Object.assign(workout, updatedDetails);
            localStorage.setItem('savedWorkouts', JSON.stringify(savedWorkouts));
        }
    }
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
function assignClientID() {
    let existingClients = JSON.parse(localStorage.getItem("clients")) || [];
    let maxID = 0;

    // find the maximum ID from existing clients
    existingClients.forEach((clientJSON) => {
        const clientData = JSON.parse(clientJSON);
        const clientID = parseInt(clientData.id.substring(1)); // Remove the '#' and convert to integer
        if (clientID > maxID) {
            maxID = clientID;
        }
    });

    // increment the maxID by 1 regardless of other conditions
    maxID++;

    // assign the next available ID
    client.id = `#${String(maxID).padStart(5, '0')}`;
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
        // create a JSON representation of the client object
        const clientJSON = JSON.stringify(client);

        // Send data to the server
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/add-client',
            data: clientJSON,
            contentType: 'application/json',
            success: function (response) {

                alert(response.message);
                saveClientDataToJSONFile(clientJSON);
            },
            error: function (error) {
                // Handle error
                alert('Error adding client data to the server: ' + error.statusText);
            }
        });

        // Save the JSON object in local storage regardless of server success/failure
        saveClientData(clientJSON);

        // Show success message for local storage save
        alert('Client data saved locally.');
    }
});

// Function to save client data to the external JSON file
function saveClientDataToJSONFile(clientData) {
    // Send a request to your server to update the JSON file
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/update-client-json', // Define the correct server endpoint
        data: clientData,
        contentType: 'application/json',
        success: function (response) {
            // Handle the response from the server (e.g., show a success message)
            alert(response.message);
        },
        // it goes here pero gumagana naman? wtf
        error: function (error) {
            // Handle error (e.g., show an error message)
            //alert('Error updating external JSON file: ' + error.statusText);
        }
    });
}


// client object
let client = {
    id: '',
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
    assignClientID();
    const firstName = personalInfoFieldset.querySelector('input[name="First Name"]').value;
    const lastName = personalInfoFieldset.querySelector('input[name="Last Name"]').value;
    // Set the name property by concatenating firstName and lastName
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

// SEARCH CLIENT FUNCTIONALITY
// main container of the clients
const clientContainer = document.querySelector(".main-container");

if (clientListJSON) {
    const clientList = JSON.parse(clientListJSON);

    // loop through the da array of client objects
    clientList.forEach((clientJSON, index) => {
        const clientData = JSON.parse(clientJSON);

        // console.log(clientData)

        // create a new client object container
        const clientObjectContainer = document.createElement("div");
        clientObjectContainer.classList.add("client-object");

        // create and populate client info
        const clientInfo = document.createElement("div");
        clientInfo.classList.add("client-info");
        clientInfo.innerHTML = `
            <h1>${clientData.name}</h1>
            <h2>${clientData.id}</h2>
            <p>Program: ${clientData.programs}</p>
        `;



        const editButton = document.createElement("button");
        editButton.classList.add("edit-button");


        clientObjectContainer.appendChild(editButton);


        if (clientData.programs === null) { // still gonan do dis btttttich
            clientInfo.innerHTML = `
            <h1>${clientData.name}</h1>
            <h2>${clientData.id}</h2>
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
            <h4>Personal Information</h4>
            <p>Gender: ${clientData.gender}</p>
            <p>Age: ${clientData.age}</p> 
            <p>Date of Birth: ${clientData.birthDate}</p>
            <p>Contact: ${clientData.phone}</p>
            <p>Address: ${clientData.address}</p>
        `;
        // console.log(client.goals)
        // create and populate fitness information
        const fitnessInfo = document.createElement("div");
        fitnessInfo.classList.add("data");
        fitnessInfo.innerHTML = `
            <h4>Fitness Goals</h4>
            <p>Fitness Level: ${clientData.goals.level}</p>
            <p>Goal Type: ${clientData.goals.goal}</p>
            <p>Goal Details: ${clientData.goals.goalDetails}</p>
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
        deleteButton.innerHTML = "❌";
        deleteButton.addEventListener("click", function () {
            deleteClient(index); // Pass the index to the deleteClient function
        });
        clientObjectContainer.appendChild(deleteButton);

        editButton.innerHTML = '✏️';
        editButton.addEventListener("click", function () {

        });

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

function deleteClient(index) {
    let existingClients = JSON.parse(localStorage.getItem("clients")) || [];
    if (existingClients.length > 0) {
        existingClients.splice(index, 1);
        localStorage.setItem('clients', JSON.stringify(existingClients));

        // Remove the client card from the DOM
        const clientObjectContainer = document.querySelector(".main-container .client-object:nth-child(" + (index + 1) + ")");
        if (clientObjectContainer) {
            clientObjectContainer.remove();
        }

        // Attempt to send a request to the server for deletion (even if the server is not available)
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3000/delete-client', // Change to your server endpoint for deleting a client
            data: JSON.stringify({ index }), // Send the index of the deleted client
            contentType: 'application/json',
            success: function (response) {
                // Show success message if the server is available
                alert(response.message);
            },
            error: function (error) {
                // If the server is not available, this will handle the error
                console.error('Error deleting client data on the server:', error);
            }
        });
    }
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

fetch('ClientData.json')
    .then(response => response.json())
    .then(data => {
        let clientDataClients = data.clients ? data.clients : data;
        if (!Array.isArray(clientDataClients)) {
            throw new Error("expected clientDataClients to be an array but it isn't.");
        }
        displayClients(clientDataClients);


    })
    .catch(error => {
        console.error("Error fetching client data from JSON file:", error);
    });

function displayClients(clientsList) {
    const clientContainer = document.querySelector(".main-container");

    if (clientsList) {
        clientsList.forEach((clientData, index) => {
            const clientObjectContainer = document.createElement("div");
            clientObjectContainer.classList.add("client-object");
            const clientInfo = document.createElement("div");
            clientInfo.classList.add("client-info");
            clientInfo.innerHTML = `
                <h1>${clientData.name}</h1>
                <h2>${clientData._id}</h2>
                <p>Program: ${clientData.programs}</p>
                <p>test</p>
            `;

            clientObjectContainer.appendChild(clientInfo);

            // add client data sections
            clientObjectContainer.innerHTML += `
                <div class="client-data">
                    <div class="data">
                        <h2>Personal Info</h2>
                        <p>Gender: ${clientData.gender || "Unknown"}</p>
                        <p>Date of Birth: ${clientData.birthDate || "Unknown"}</p>
                        <p>Age: ${clientData.age || "Unknown"}</p>
                    </div>
                    <div class="data">
                        <h2>Goals</h2>
                        <p>Fitness Level: ${clientData.goals.level}</p>
                        <p>Goal Type: ${clientData.goals.goal}</p>
                        <p>Goal Details: ${clientData.goals.goaldetails || "Unknown"}</p>
                    </div>
                    <div class="data">
                        <h2>Health</h2>
                        <p>Medical History: ${clientData.healthInfo.medicalHistory || "None"}</p>
                        <p>Medications: ${clientData.healthInfo.medications || "None"}</p>
                        <p>Physical Limitations: ${clientData.healthInfo.physicalLimitations || "None"}</p>
                    </div>
                </div>
            `;

            clientContainer.appendChild(clientObjectContainer);
        });
    }
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
        const asd = findLatestCheckIn(json);
        console.log(asd.id);

        fetch('ClientData.json')
            .then(res => {
                return res.json();
            })
            .then(json2 => {
                json2.forEach(el => {
                    // console.log(el)
            if (el._id == asd.id) {
                        console.log(el.name);
                        const recentClient = document.getElementById("recent-client");
                        recentClient.innerHTML = `${el.name}`
                    }
                }) 
        // console.log(clientCounter);
    })




    })


fetch('ClientData.json')
    .then(res => {
        return res.json();
    })
    .then(json => {
        var clientCounter = 0;
        json.forEach(el => {
            switch (el.coach) {
                case 'Kiko': {
                    clientCounter++;
                }
            }
        })
    });

fetch('ClientData.json')
    .then(res => {
        return res.json();
    })
    .then(json => {
        var clientCounter = 0;

        json.forEach(el => {
            switch (el.coach) {
                case 'Kiko': {
                    clientCounter++;
                }
            }
        });

        // console.log(clientCounter);

        var clientCount = document.getElementById('client-count');
        var content = document.createTextNode(clientCounter);

        clientCount.appendChild(content);

        json.forEach(el => {

            var parent = document.getElementById("client-list");

            switch (el.coach) {
                case 'Kiko': {

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
            }
        })
        console.log("qwecas");
        const clients = document.querySelectorAll(".client");

        console.log("clients " + clients.length)
        
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
                    console.log("expand")
                    client.classList.add("expanded");
                    additionalDetails.style.display = "block";
                    expandIcon.classList.add("rotate");
                    collapseIcon.classList.remove("rotate");
                } else {
                    console.log("click")
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
            });    });

    })
