async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3500${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

class User {
    constructor(firstName, lastName, userName, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = userName;
        this.password = password;
    }
}

// Register form
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
                window.location.href = "post.html"
            }
        })
        .catch(err => {
            let errorSection = document.querySelector("#registerForm .error")
            errorSection.innerText = err.message
        })
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

        fetchData('/users/login', loginUser, "POST")
        .then(data => {
            if (!data.message) {
                window.location.href = "post.html"
            }
        })
        .catch(err => {
            let errorSection = document.querySelector("#loginForm .error")
            errorSection.innerText = err.message
        })
    });
}