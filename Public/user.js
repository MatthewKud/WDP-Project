

class User{
    constructor(firstName, lastName, userName, password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
    }
}

//Register form
const registerForm = document.getElementById("registerForm");

if (registerForm){
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const firstName = document.getElementById("first_name").value;
        const lastName = document.getElementById("last_name").value;
        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const newUser = new User(firstName, lastName, userName, password);
        console.log(newUser);
    });
}

// Login form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const loginUser = new User(null, null, userName, password);
        console.log(loginUser);
    });
}