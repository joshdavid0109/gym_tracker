document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("login-form");
    const message = document.getElementById("message");

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === "yourusername" && password === "yourpassword") {
            message.textContent = "Login successful!";
        } else {
            message.textContent = "Invalid username or password. Please try again.";
        }
    });
});
