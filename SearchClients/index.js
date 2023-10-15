// main container of the clients
const clientContainer = document.querySelector(".main-container");

// Fetch the client data from local storage
const clientListJSON = localStorage.getItem("clients");

if (clientListJSON) {
    const clientList = JSON.parse(clientListJSON);

    // Loop through the array of client objects
    clientList.forEach((clientJSON, index) => {
        const clientData = JSON.parse(clientJSON);

        // Create a new client object container
        const clientObjectContainer = document.createElement("div");
        clientObjectContainer.classList.add("client-object");

        // Create and populate client info
        const clientInfo = document.createElement("div");
        clientInfo.classList.add("client-info");
        clientInfo.innerHTML = `
            <h1>${clientData.personalInfo.firstName} ${clientData.personalInfo.lastName}</h1>
            <p>Program: ${clientData.programs}</p>
        `;

        if (clientData.programs === null) {
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

        // Get filter values
        const selectedGender = genderFilter.value;
        const selectedGoalType = goalTypeFilter.value;
        const selectedFitnessLevel = fitnessLevelFilter.value;
        const physicalLimitationChecked = physicalLimitationFilter.checked;
        const medicationsChecked = medicationsFilter.checked;
        const medicalHistoryChecked = medicalHistoryFilter.checked;

        recordFound = false;

        clientContainer.querySelectorAll(".client-object").forEach((clientObject) => {
            const clientName = clientObject.querySelector(".client-info h1").textContent.toLowerCase();
            const healthInfoDiv = clientObject.querySelector(".client-data .data:nth-child(3)");

            let hasMedicalHistory = false;
            let hasMedications = false;
            let hasPhysicalLimitations = false;

            if (healthInfoDiv) {
                healthInfoDiv.querySelectorAll('p').forEach(p => {
                    const content = getTextAfterColon(p.textContent).trim();

                    console.log(`For "${p.textContent}", content after colon is: "${content}"`);

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

            // Check fitness and personal information based on dropdowns
            const fitnessInfo = clientObject.querySelector(".client-data .data h4");
            const matchesGender = !selectedGender || (clientObject.querySelector(".client-data .data p").textContent.includes(selectedGender));
            const matchesGoalType = !selectedGoalType || (fitnessInfo && fitnessInfo.textContent.includes("Goal Type") && fitnessInfo.nextElementSibling.nextElementSibling.textContent.includes(selectedGoalType));
            const matchesFitnessLevel = !selectedFitnessLevel || (fitnessInfo && fitnessInfo.textContent.includes("Fitness Level") && fitnessInfo.nextElementSibling.textContent.includes(selectedFitnessLevel));

            // Final check to decide whether to display the client or not
            if (
                clientName.startsWith(searchText) &&
                (!physicalLimitationChecked || hasPhysicalLimitations) &&
                (!medicationsChecked || hasMedications) &&
                (!medicalHistoryChecked || hasMedicalHistory) &&
                matchesGender && matchesGoalType && matchesFitnessLevel
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
    // Bind filterAndDisplayClients function to the input/change events of all filters
    genderFilter.addEventListener("change", filterAndDisplayClients);
    goalTypeFilter.addEventListener("change", filterAndDisplayClients);
    fitnessLevelFilter.addEventListener("change", filterAndDisplayClients);
    physicalLimitationFilter.addEventListener("change", filterAndDisplayClients);
    medicationsFilter.addEventListener("change", filterAndDisplayClients);
    medicalHistoryFilter.addEventListener("change", filterAndDisplayClients);
    // display all clients initially
    filterAndDisplayClients();
});
