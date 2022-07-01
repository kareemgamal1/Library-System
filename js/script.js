let addButton = document.querySelector(".main-btn");
let input = document.querySelector(".input-container");
let add = document.querySelector(".add");
let deleteBook = document.querySelector(".delete");
let bookStatus = document.querySelector(".book-status");
let cancel = document.querySelector(".cancel");
let booksArea = document.querySelector(".row");
let bookHolder = document.querySelector(".book-holder");
let myLibrary = [];
let title, author, pages, read;
let ID = 1;

//default book, if we are starting out with a couple of books, loop over them instead.
addDeleteFunctionality(deleteBook);
addStatusFunctionality(bookStatus);
myLibrary.push(bookHolder);

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  /*first function is better because it's much shorter and easier to read&maintain, 
  however, it's not future proof (what if I decided to start with no initial books instead?) 
  and makes the HTMl file larger.*/
  appendBook() {
    let newBookHolder = bookHolder.cloneNode(true);

    let newBook = newBookHolder.querySelector(".book");
    let newBookTitle = newBookHolder.querySelector(".book-title");
    let newBookAuthor = newBookHolder.querySelector(".book-author");
    let newBookNoOfPages = newBookHolder.querySelector(".book-noOfPages");
    let newBookStatus = newBookHolder.querySelector(".book-status");
    let newDeleteButton = newBookHolder.querySelector(".delete");

    addStatusFunctionality(newBookStatus);
    addDeleteFunctionality(newDeleteButton);

    ID++;
    newBookHolder.id = ID;
    newBook.setAttribute("id", ID);
    newBookStatus.setAttribute("id", ID);
    newDeleteButton.setAttribute("id", ID);

    newBookTitle.textContent = this.title;
    newBookAuthor.textContent = "By " + this.author;
    newBookNoOfPages.textContent = this.pages + " pages.";
    newBookStatus.checked = this.read;

    if (this.read) newBook.classList.add("read"); //if a book is added as read, style it as such.

    booksArea.appendChild(newBookHolder);
    myLibrary.push(newBookHolder);
  }

  appendCreatedBook() {
    let newBookHolder = document.createElement("div");
    newBookHolder.classList.add(
      "col-sm-6",
      "col-md-4",
      "col-lg-3",
      "book-holder"
    );
    let newBook = document.createElement("div");
    newBook.className = "book";
    let newBookTitle = document.createElement("h5");
    newBookTitle.className = "book-title";
    newBookTitle.textContent = this.title;
    let newBookAuthor = document.createElement("h5");
    newBookAuthor.className = "book-author";
    newBookAuthor.textContent = "By " + this.author;
    let newBookNoOfPages = document.createElement("h5");
    newBookNoOfPages.className = "book-noOfPages";
    newBookNoOfPages.textContent = this.pages + " pages.";
    let newBookButtons = document.createElement("div");
    newBookButtons.classList.add(
      "book-buttons",
      "d-flex",
      "justify-content-between"
    );
    let newBookSwitch = document.createElement("label");
    newBookSwitch.className = "switch";
    let newBookStatus = document.createElement("input");
    newBookStatus.classList.add("book-status", "mt-4");
    newBookStatus.textContent = this.status;
    newBookStatus.type = "checkbox";
    let newBookSlider = document.createElement("span");
    newBookSlider.className = "slider round";
    let newDeleteButton = document.createElement("button");
    newDeleteButton.className = "main-btn delete cancel";
    newDeleteButton.textContent = "Delete";

    addStatusFunctionality(newBookStatus);
    addDeleteFunctionality(newDeleteButton);

    ID++;
    newBookHolder.id = ID;
    newBook.setAttribute("id", ID);
    newBookStatus.setAttribute("id", ID);
    newDeleteButton.setAttribute("id", ID);

    newBookSwitch.appendChild(newBookStatus);
    newBookSwitch.appendChild(newBookSlider);
    newBookButtons.appendChild(newBookSwitch);
    newBookButtons.appendChild(newDeleteButton);
    newBook.appendChild(newBookTitle);
    newBook.appendChild(newBookAuthor);
    newBook.appendChild(newBookNoOfPages);
    newBook.appendChild(newBookButtons);
    newBookHolder.appendChild(newBook);

    booksArea.appendChild(newBookHolder);
    myLibrary.push(newBookHolder);
  }
}

addButton.addEventListener("click", () => {
  input.style.display = "flex";
});

add.addEventListener("click", () => {
  author = document.querySelector(".input-author").value;
  title = document.querySelector(".input-title").value;
  pages = document.querySelector(".input-noOfPages").value;
  read = document.querySelector(".input-status").checked;
  let currentBook = new Book(title, author, pages, read);
  if (validateForm()) {
    currentBook.appendBook();
    resetForm();
    input.style.display = "none";
  }
});

cancel.addEventListener("click", () => {
  input.style.display = "none";
  resetForm();
});

function addDeleteFunctionality(currentDelete) {
  currentDelete.addEventListener("click", () => {
    let currentID = currentDelete.id;
    let currentContainer = document.getElementById(currentID);
    currentContainer.remove();
  });
}

function addStatusFunctionality(currentStatus) {
  currentStatus.addEventListener("click", () => {
    let currentID = currentStatus.id;
    let currentContainer = document.getElementById(currentID);
    let currentBook = currentContainer.querySelector(".book");
    if (currentStatus.checked) {
      currentBook.classList.add("read");
    } else {
      currentBook.classList.remove("read");
    }
  });
}

function resetForm() {
  document.querySelector(".input-author").value = "";
  document.querySelector(".input-title").value = "";
  document.querySelector(".input-noOfPages").value = "";
  document.querySelector(".input-status").checked = false;
}

function validateForm() {
  let firstInput = document.querySelector(".input-author").checkValidity();
  let secondInput = document.querySelector(".input-title").checkValidity();
  let thirdInput = document.querySelector(".input-noOfPages").checkValidity();
  if (!firstInput || !secondInput || !thirdInput) {
    return false;
  }
  return true;
}
