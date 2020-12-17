let myLibrary = [];
let count = 0;
function Book(title, author, pages, description, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    listBooks(myLibrary, count);
    count++;
    console.log(myLibrary);
}

function saveNewBook(event) {
    event.preventDefault();
    let title = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let pages = document.getElementById("bookPages").value;
    let description = document.getElementById("bookDescription").value;
    let read = document.getElementById("read").value;

    book = new Book(title, author, pages, description, read);
    addBookToLibrary(book);
}
function listBooks(myLibrary, count) {
    var content = document.querySelector(".content");
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");
    card_body.innerText = myLibrary[count].title;
    var p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.innerText = myLibrary[count].author;
    var description = document.createElement("p");
    description.setAttribute("class", "card-text");
    description.innerText = myLibrary[count].description;
    card.appendChild(card_body);
    card.appendChild(p);
    card.appendChild(description);
    content.appendChild(card);
}
