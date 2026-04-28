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
