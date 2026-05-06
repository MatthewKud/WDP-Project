import { fetchData, getCurrentUser } from './main.js'

class JournalEntry {
    constructor(content, userID, categoryID) {
        this.content = content;
        this.userID = userID;
        this.categoryID = categoryID;
    }
}

const postForm = document.getElementById("postForm");

if (postForm) {
    postForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const content = document.getElementById("journal_entry").value;
        const categoryName = document.getElementById("category").value;

        const currentUser = getCurrentUser();

        const category = await fetchData('/categories/createCategory', { categoryName: categoryName }, "POST")

        const newEntry = new JournalEntry(content, currentUser.UserID, category.CategoryID);

        fetchData('/journalEntries/createEntry', newEntry, "POST")
        .then(data => {
            if (!data.message || data.message === 'Entry created successfully') {
                window.location.href = "post.html"
            }
        })
        .catch(err => {
            let errorSection = document.querySelector("#postForm .error")
            errorSection.innerText = err.message
        })
    });
}
