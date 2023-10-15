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

// Rest of your JavaScript code...



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

        if(currMonth < 0 || currMonth > 11) {
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
          // Collapse all clients
          clients.forEach((c) => {
            c.classList.remove("expanded");
            c.querySelector(".additional-details").style.display = "none";
            c.querySelector(".expand").classList.remove("rotate");
            c.querySelector(".collapse").classList.add("rotate");
          });
  
          // Expand the clicked client
          client.classList.add("expanded");
          additionalDetails.style.display = "block";
          expandIcon.classList.add("rotate");
          collapseIcon.classList.remove("rotate");
        } else {
          // Collapse the clicked client
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


  document.getElementById('saveWorkoutBtn').addEventListener('click', function() {

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
