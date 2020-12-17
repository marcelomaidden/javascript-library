const myLibrary = [];
let last = 0;

function Book(title, author, pages, description, read) {
  this.id = last;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
  this.read = read;
}

function deleteBook(event) {
  const id = event.target.getAttribute('delete-id');
  const data = `div[data-id="${id}"]`;
  delete myLibrary[id];
  const book = document.querySelector(data);
  book.remove();
}

function readStatus(event) {
  const id = event.target.getAttribute('read-id');
  const button = `button[read-id="${id}"]`;
  const readButton = document.querySelector(button);

  if (myLibrary[id].read === true) {
    myLibrary[id].read = false;
    readButton.innerText = 'Read';
  } else {
    myLibrary[id].read = true;
    readButton.innerText = 'Unread';
  }
}


function createCard(book) {
  const content = document.querySelector('.content');
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  const cardBody = document.createElement('div');
  cardBody.setAttribute('class', 'card-body');
  const cardTitle = document.createElement('h5');
  cardTitle.setAttribute('class', 'card-title');
  cardTitle.innerText = book.title;
  const p = document.createElement('p');
  p.setAttribute('class', 'card-text');
  p.innerText = book.author;
  const description = document.createElement('p');
  description.setAttribute('class', 'card-text');
  description.innerText = book.description;

  const readButton = document.createElement('button');
  readButton.setAttribute('class', 'btn btn-primary');
  readButton.setAttribute('read-id', book.id);
  readButton.addEventListener('click', readStatus, false);
  if (book.read === true) {
    readButton.innerText = 'Unread';
  } else {
    readButton.innerText = 'Read';
  }


  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('class', 'btn btn-danger');
  deleteButton.setAttribute('delete-id', book.id);
  deleteButton.addEventListener('click', deleteBook, false);
  deleteButton.innerText = 'Delete';

  card.setAttribute('data-id', book.id);
  cardBody.appendChild(cardTitle);
  card.appendChild(cardBody);
  card.appendChild(p);
  card.appendChild(description);
  card.appendChild(readButton);
  content.appendChild(card);

  card.appendChild(deleteButton);
}

function listBooks() {
  const content = document.querySelector('.content');

  content.innerHTML = '';

  for (let i = 0; i < myLibrary.length; i += 1) {
    createCard(myLibrary[i]);
  }
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  listBooks();
  last += 1;
}

function clearInputs() {
  const formInputs = document.querySelectorAll('input');
  formInputs.forEach(
    (item) => { item.value = ''; },
  );
  const checkbox = document.querySelector('#read');
  checkbox.checked = false;
}

function saveNewBook(event) {
  event.preventDefault();
  const title = document.getElementById('bookName').value;
  const author = document.getElementById('authorName').value;
  const pages = document.getElementById('bookPages').value;
  const description = document.getElementById('bookDescription').value;
  const read = document.getElementById('read').checked;

  const book = new Book(title, author, pages, description, read);
  addBookToLibrary(book);

  const modalBackdrop = document.querySelector('.modal-backdrop.show ');
  modalBackdrop.style.display = 'none';
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';

  clearInputs();
}

const saveBook = document.querySelector('.saveBook');
saveBook.addEventListener('click', saveNewBook);
