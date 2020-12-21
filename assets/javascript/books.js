export default class Book {
  constructor(bookTitle, bookAuthor, bookPages, bookDescription, bookRead, last) {
    this.id = last;
    this.title = bookTitle;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.description = bookDescription;
    this.read = bookRead;
  }
}