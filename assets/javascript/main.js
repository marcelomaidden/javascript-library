let myLibrary = [];

function Book(title, author, pages, description,read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.description = description;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book)
  console.log(myLibrary)
}
let book= new Book("100 rules of love", "ABC", "A great book", true)

addBookToLibrary(book);