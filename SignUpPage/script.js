function signup() {
    const signupUsername = document.getElementById("signupUsername").value;
    const signupPassword = document.getElementById("signupPassword").value;

    if (signupUsername === "" || signupPassword === "") {
        alert("Please fill in the fields first!");
    } else {
        const user = {
            username: signupUsername,
            password: signupPassword
        };

        localStorage.setItem('user', JSON.stringify(user));
        alert("Sign-up successful! You can now log in.");
    }
}
