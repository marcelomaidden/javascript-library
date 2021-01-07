/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint-disable import/extensions */

import Book from './books.js';

let last = 0;
function clearInputs() {
  const formInputs = document.querySelectorAll('input');
  formInputs.forEach(
    (item) => { item.value = ''; },
  );
  const checkbox = document.querySelector('#read');
  checkbox.checked = false;
}

class Library {
  constructor() {
    if (localStorage.myLibrary) {
      this.myLibrary = JSON.parse(localStorage.myLibrary || '[]');
    } else {
      this.myLibrary = [];
    }

    this.setStorage = this.setStorage.bind(this);
    this.readStatus = this.readStatus.bind(this);
    this.createCard = this.createCard.bind(this);
    this.listBooks = this.listBooks.bind(this);
    this.addBookToLibrary = this.addBookToLibrary.bind(this);
    this.saveNewBook = this.saveNewBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);

    this.listBooks();
  }

  setStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(this.myLibrary));
  }

  readStatus(event) {
    const id = event.target.getAttribute('read-id');
    const button = `button[read-id="${id}"]`;
    const readButton = document.querySelector(button);

    if (this.myLibrary[id].read === true) {
      this.myLibrary[id].read = false;
      readButton.innerText = 'Read';
    } else {
      this.myLibrary[id].read = true;
      readButton.innerText = 'Unread';
    }
    this.setStorage();
  }

  createCard(book) {
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
    readButton.addEventListener('click', this.readStatus, false);
    if (book.read === true) {
      readButton.innerText = 'Unread';
    } else {
      readButton.innerText = 'Read';
    }


    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'btn btn-danger deleteButton');
    deleteButton.addEventListener('click', this.deleteBook, false);
    deleteButton.setAttribute('delete-id', book.id);
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

  listBooks() {
    const content = document.querySelector('.content');

    content.innerHTML = '';

    for (let i = 0; i < this.myLibrary.length; i += 1) {
      this.createCard(this.myLibrary[i]);
    }
  }

  addBookToLibrary(book) {
    this.myLibrary.push(book);
    this.listBooks();
    last += 1;

    this.setStorage();
  }

  deleteBook(event) {
    const id = event.target.getAttribute('delete-id');
    this.myLibrary.splice(id, 1);
    let newId = 0;
    const newLibrary = [];

    this.myLibrary.map(book => {
      book.id = newId;
      newId += 1;
      newLibrary.push(book);
      return newLibrary;
    });

    this.myLibrary = newLibrary;
    this.listBooks();

    this.setStorage();
  }

  saveNewBook(event) {
    event.preventDefault();
    const form = document.querySelector('form');
    if (!form.checkValidity() === false) {
      const title = document.getElementById('bookName').value;
      const author = document.getElementById('authorName').value;
      const pages = document.getElementById('bookPages').value;
      const description = document.getElementById('bookDescription').value;
      const read = document.getElementById('read').checked;

      const book = new Book(title, author, pages, description, read, last);
      this.addBookToLibrary(book);

      const modalBackdrop = document.querySelector('.modal-backdrop.show ');
      modalBackdrop.style.display = 'none';
      const modal = document.querySelector('.modal');
      modal.style.display = 'none';

      clearInputs();
    }

    form.classList.add('was-validated');
  }
}

const library = new Library();

const saveBook = document.querySelector('.saveBook');
saveBook.addEventListener('click', library.saveNewBook);
