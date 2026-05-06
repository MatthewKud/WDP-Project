export async function fetchData(route = '', data = {}, methodType) {
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

export function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export function removeCurrentUser() {
    localStorage.removeItem('user');
}

const nav = document.querySelector('nav');
if (getCurrentUser()) {
    nav.innerHTML = `
        <a href="post.html">Journal</a>
        <a href="cats.html">Cats?</a>
        <a id="logout" href="#">Logout</a>
    `
    document.getElementById('logout').addEventListener('click', () => {
        removeCurrentUser()
        window.location.href = 'login.html'
    })
} else {
    nav.innerHTML = `
        <a href="login.html">Home</a>
        <a href="register.html">Register</a>
        <a href="post.html">Journal</a>
        <a href="cats.html">Cats?</a>
    `
}