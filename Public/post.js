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

class JournalEntry {
    constructor(content, category) {
        this.content = content;
        this.category = category;
    }
}

const postForm = document.getElementById("postForm");

if (postForm) {
    postForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const content = document.getElementById("journal_entry").value;
        const category = document.getElementById("category").value;

        const newEntry = new JournalEntry(content, category);
        console.log(newEntry);
    });
}
