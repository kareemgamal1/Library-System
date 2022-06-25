let addButton = document.querySelector(".main-btn");
let input = document.querySelector(".input-container");
let books = document.querySelectorAll(".book-body");
let myLibrary = [];
let title, author, pages, read;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  console.log("read:", read);
  //better to handle read status seperately.
  read == "on" ? (this.read = true) : (this.read = false);
}

books.forEach((element) => {
  title = element.querySelector(".book-title").textContent;
  author = element.querySelector(".book-author").textContent;
  pages = element.querySelector(".book-noOfPages").textContent;
  read = element.querySelector(".book-status").value;
  let currentBook = new Book(title, author, pages, read);
  myLibrary.push(currentBook);
});

addButton.addEventListener("click", () => {
  input.style.display = "flex";
});

Book.prototype.info = () => {
  return (
    "Title: " +
    this.title +
    "\n" +
    "Author: " +
    this.author +
    "\n" +
    "No of pages: " +
    this.pages +
    "\n" +
    "Status: " +
    this.read
  );
  //shows all books on the screen.
};

Book.prototype.infoAll = () => {
  myLibrary.forEach((element) => {
    element.info();
  });
};

function addBook() {
  //
}
