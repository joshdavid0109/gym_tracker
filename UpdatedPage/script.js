const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

if (typeof(Storage) !== "undefined") {
    
    function saveCredentials(username, password) {
        
        let users = localStorage.getItem('users');
        if (!users) {
            users = {};
        } else {
            users = JSON.parse(users);
        }

        
        users[username] = password;

       
        localStorage.setItem('users', JSON.stringify(users));
    }

    
    function signUp() {
        const username = document.querySelector('.sign-up input[type="Username"]').value;
        const password = document.querySelector('.sign-up input[type="password"]').value;
        saveCredentials(username, password);
    }

    
    function signIn() {
        const username = document.querySelector('.sign-in input[type="Username"]').value;
        const password = document.querySelector('.sign-in input[type="password"]').value;

        
        let users = localStorage.getItem('users');
        if (users) {
            users = JSON.parse(users);
            if (users[username] === password) {
                alert('Login successful!');
            } else {
                alert('Invalid username or password.');
            }
        } else {
            alert('No users found. Please sign up first.');
        }
    }

    
    const signUpButton = document.querySelector('.sign-up button');
    signUpButton.addEventListener('click', signUp);

   
    const loginButton = document.querySelector('.sign-in button');
    loginButton.addEventListener('click', signIn);
} else {
    console.log('Local storage is not supported in this browser.');
}
