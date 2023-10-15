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

    let recordFound = false;

    // function to display the clients based on the search
    function filterAndDisplayClients() {
        const searchText = searchBar.value.toLowerCase();

        // Reset recordFound before searching
        recordFound = false;

        // loop through the client objects and check if they include the text from the search bar
        clientContainer.querySelectorAll(".client-object").forEach((clientObject) => {
            const clientName = clientObject.querySelector(".client-info h1").textContent.toLowerCase();

            if (clientName.startsWith(searchText)) {
                clientObject.style.display = "block"; // show client obj
                recordFound = true;
            } else {
                clientObject.style.display = "none"; // hide client obj
            }
        });

        if (!recordFound) {
            noRecordsFound.style.display = "block";
        } else {
            noRecordsFound.style.display = "none";
        }
    }

    // add an input event listener to the search bar to update results as you type
    searchBar.addEventListener("input", filterAndDisplayClients);

    // display all clients initially
    filterAndDisplayClients();
});

const filterButton = document.getElementById("filter-button");
