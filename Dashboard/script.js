const themeToggler = document.querySelector(".theme-toggler");
const aboutLink = document.getElementById("about-link");
const aboutContent = document.getElementById("about-content");



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

