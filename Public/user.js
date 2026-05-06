import { fetchData, setCurrentUser } from './main.js'

class User {
    constructor(firstName, lastName, userName, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = userName;
        this.password = password;
    }
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const firstName = document.getElementById("first_name").value;
        const lastName = document.getElementById("last_name").value;
        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const newUser = new User(firstName, lastName, userName, password);

        fetchData('/users/register', newUser, "POST")
        .then(data => {
            if (!data.message) {
                setCurrentUser(data)
                window.location.href = "post.html"
            }
        })
        .catch(err => {
            let errorSection = document.querySelector("#registerForm .error")
            errorSection.innerText = err.message
        })
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const userName = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const loginUser = new User(null, null, userName, password);

        fetchData('/users/login', loginUser, "POST")
        .then(data => {
            if (!data.message) {
                setCurrentUser(data)
                window.location.href = "post.html"
            }
        })
        .catch(err => {
            let errorSection = document.querySelector("#loginForm .error")
            errorSection.innerText = err.message
        })
    });
}