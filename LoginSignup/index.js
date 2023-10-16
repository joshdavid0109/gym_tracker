const loginFormContainer = document.querySelector("#login-form"),
    signupFormContainer = document.querySelector("#signup-form"),
    signupBtn = document.querySelector("#signup"),
    loginBtn = document.querySelector("#login")

signupBtn.addEventListener("click", (e) =>  {
    e.preventDefault();
    signupFormContainer.classList.add("active");
});

loginBtn.addEventListener("click", (e) =>  {
    e.preventDefault();
    signupFormContainer.classList.remove("active");
});