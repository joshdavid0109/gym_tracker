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
