
let myLibrary = [];

function Book(title, author, pages, description,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function listBooks() {

  

  var content = document.querySelector('.content');
  myLibrary.forEach (function(item) {
    var card = document.createElement('div');
    card.setAttribute('class', 'card');
    var card_body = document.createElement('div');
    card_body.setAttribute('class', 'card-body');
    card_body.innerText = item.title;
    var p = document.createElement('p');
    p.setAttribute('class', 'card-text');
    p.innerText = item.author;
    
    card.appendChild(card_body);
    card.appendChild(p);

    content.appendChild(card);
  })
}

let book= new Book("100 rules of love", "ABC", "A great book", true)

addBookToLibrary(book);

let book1= new Book("200 rules of love", "DBD", "A great book", true)

addBookToLibrary(book1);

let book2= new Book("300 rules of love", "Umair", "A great book", true)

addBookToLibrary(book2);

listBooks()