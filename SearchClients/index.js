
// main container of the clients
const clientContainer = document.querySelector(".main-container");

// fetch the client data from local storage of the philippines
const clientListJSON = localStorage.getItem("clients");

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
