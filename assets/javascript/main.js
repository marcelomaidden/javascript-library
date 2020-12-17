let myLibrary = [];
let count = 0;
let last = 0;

function Book(title, author, pages, description, read) {
    this.id = last;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.description = description;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    listBooks();
    last++;
}

function clearInputs()
{
    let formInputs = document.querySelectorAll('input');
    formInputs.forEach(item => item.value = '')
    let checkbox = document.querySelector('#read');
    checkbox.checked = false;
}

function saveNewBook(event) {
    event.preventDefault();
    let title = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let pages = document.getElementById("bookPages").value;
    let description = document.getElementById("bookDescription").value;
    let read = document.getElementById("read").checked;

    book = new Book(title, author, pages, description, read);
    addBookToLibrary(book);

    let modal_backdrop = document.querySelector('.modal-backdrop.show ');
    modal_backdrop.style.display = 'none';
    let modal = document.querySelector('.modal');
    modal.style.display = 'none';

    clearInputs();
}

function deleteBook(event) {
    id = event.target.getAttribute('delete-id');
    data='div[data-id="'+id+'"]';
    delete myLibrary[id];
    let book = document.querySelector(data);
    book.remove();
}

function readStatus(event){
  id = event.target.getAttribute('read-id');
  if(myLibrary[id].read == true){
    myLibrary[id].read=false
  }
  else{
    myLibrary[id].read=true
  }
  listBooks()
}

function createCard(book) {
    var content = document.querySelector(".content");
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");
    var card_title = document.createElement('h5');
    card_title.setAttribute('class', 'card-title');
    card_title.innerText = book.title;
    var p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.innerText = book.author;
    var description = document.createElement("p");
    description.setAttribute("class", "card-text");
    description.innerText = book.description;

   
    var read = document.createElement("p");
    read.setAttribute("class", "card-text");
    read.innerText = book.read;

    let readButton = document.createElement('button');
    readButton.setAttribute('class', 'btn btn-primary');
    readButton.setAttribute('read-id', book.id);
    readButton.addEventListener('click', readStatus,false);
    if (book.read == true){
      
      readButton.innerText = 'Unread';
    } else{
      readButton.innerText = 'Read';
    }
    

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.setAttribute('delete-id', book.id);
    deleteButton.addEventListener('click', deleteBook,false);
    deleteButton.innerText = 'Delete';

    card.setAttribute('data-id', book.id);
    card_body.appendChild(card_title);
    card.appendChild(card_body);
    card.appendChild(p);
    card.appendChild(description);
    card.appendChild(read);
    card.appendChild(readButton);
    content.appendChild(card);

    card.appendChild(deleteButton);
}

function listBooks() {  
    content = document.querySelector('.content');

    content.innerHTML = '';

    for (let i in myLibrary) {
        createCard(myLibrary[i])
    }
}
