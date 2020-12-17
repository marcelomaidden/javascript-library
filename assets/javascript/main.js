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
    listBooks();
    count++;
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
    let book = document.querySelector(data);
    book.remove();
}

function readStatus(event){
  id = event.target.getAttribute('read-id');
  console.log(myLibrary[id].read)
  if(myLibrary[id].read == true){
    myLibrary[id].read=false
  }
  else{
    myLibrary[id].read=true
  }
  listBooks()
}

function listBooks() {
    var content = document.querySelector(".content");
    var card = document.createElement("div");
    card.setAttribute("class", "card");
    var card_body = document.createElement("div");
    card_body.setAttribute("class", "card-body");
    var card_title = document.createElement('h5');
    card_title.setAttribute('class', 'card-title');
    card_title.innerText = myLibrary[count].title;
    var p = document.createElement("p");
    p.setAttribute("class", "card-text");
    p.innerText = myLibrary[count].author;
    var description = document.createElement("p");
    description.setAttribute("class", "card-text");
    description.innerText = myLibrary[count].description;

   
    var read = document.createElement("p");
    read.setAttribute("class", "card-text");
    read.innerText = myLibrary[count].read;

    let readButton = document.createElement('button');
    readButton.setAttribute('class', 'btn btn-primary');
    readButton.setAttribute('read-id', count);
    readButton.addEventListener('click', readStatus,false);
    if (myLibrary[count].read == true){
      
      readButton.innerText = 'Unread';
    } else{
      readButton.innerText = 'Read';
    }
    

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.setAttribute('delete-id', count);
    deleteButton.addEventListener('click', deleteBook,false);
    deleteButton.innerText = 'Delete';

    card.setAttribute('data-id', count);
    card_body.appendChild(card_title);
    card.appendChild(card_body);
    card.appendChild(p);
    card.appendChild(description);
    card.appendChild(read);
    card.appendChild(readButton);
    content.appendChild(card);

    card.appendChild(deleteButton);
}
