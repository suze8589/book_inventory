document.addEventListener("DOMContentLoaded", function() {
    loadBooks();

    document.getElementById("addBookForm").addEventListener("submit", function(event) {
        event.preventDefault();
        let bookId = document.getElementById("bookId").value;
        if (bookId) {
            updateBook(bookId);
        } else {
            addBook();
        }
    });
});

function loadBooks() {
    fetch("/api/books")
        .then(response => response.json())
        .then(data => {
            let booksTable = document.querySelector("#booksTable tbody");
            booksTable.innerHTML = "";
            data.forEach(book => {
                let row = `<tr>
                    <td>${book.id}</td>
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td>${new Date(book.publishedDate).toLocaleDateString()}</td>
                    <td>${book.price.toFixed(2)}</td>
                    <td>
                        <button onclick="editBook(${book.id})">Edit</button>
                        <button onclick="deleteBook(${book.id})">Delete</button>
                    </td>
                </tr>`;
                booksTable.innerHTML += row;
            });
        });
}

function addBook() {
    let book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        isbn: document.getElementById("isbn").value,
        publishedDate: document.getElementById("publishedDate").value,
        price: parseFloat(document.getElementById("price").value)
    };

    fetch("/api/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
    .then(() => {
        clearForm();
        loadBooks();
    });
}

function editBook(id) {
    fetch(`/api/books/${id}`)
        .then(response => response.json())
        .then(book => {
            document.getElementById("bookId").value = book.id;
            document.getElementById("title").value = book.title;
            document.getElementById("author").value = book.author;
            document.getElementById("isbn").value = book.isbn;
            document.getElementById("publishedDate").value = new Date(book.publishedDate).toISOString().split('T')[0];
            document.getElementById("price").value = book.price;
        });
}

function updateBook(id) {
    let book = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        isbn: document.getElementById("isbn").value,
        publishedDate: document.getElementById("publishedDate").value,
        price: parseFloat(document.getElementById("price").value)
    };

    fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(book)
    })
    .then(() => {
        clearForm();
        loadBooks();
    });
}

function deleteBook(id) {
    fetch(`/api/books/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        loadBooks();
    });
}

function clearForm() {
    document.getElementById("bookId").value = "";
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("publishedDate").value = "";
    document.getElementById("price").value = "";
}
