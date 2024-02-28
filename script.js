"use strict";

const myLibrary = [];

const newBook = document.querySelector(".new-book");
const submit = document.querySelector(".submit");
const cancel = document.querySelector(".cancel");
const modalBtns = document.querySelectorAll(".dialog button");
const showBooks = document.querySelector(".show-books");
const dialog = document.querySelector(".dialog");
const table = document.querySelector(".table");

//Book constructor:
class Book {
  constructor(title, pages, read, liked) {
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.liked = liked;
  }
}

//Add book to library (final line of form submit add event listener)
function addBookToLibrary(book) {
  myLibrary.push(book);
}

//Generate table of books for show-books event listener
function displayBooks(books) {
  //first, clear the displayed table since we will add all the books again:
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }

  //Now generate the table. This will regenerate the entire table each time.
  //This is suboptimal but won't impact practical performance.
  //The delete button's event listener is also defined in here.
  //It was easiest to implement it this way since the form variables are readily accessible
  //and are needed for the deletion of the book from myLibrary by title.
  for (let book of books) {
    //Create row container
    let newRow = document.createElement("div");
    newRow.classList.add("row");

    //Create row cells
    let titleDiv = document.createElement("div");
    let pagesDiv = document.createElement("div");
    let likedDiv = document.createElement("div");
    let readDiv = document.createElement("div");
    let toggleReadButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    //Fill row cells with object attributes
    titleDiv.textContent = book.title;
    pagesDiv.textContent = book.pages;
    likedDiv.textContent = book.liked;
    toggleReadButton.textContent = book.read;
    deleteButton.textContent = "Delete";

    //Add classes for styling
    titleDiv.classList.add("title-div");
    pagesDiv.classList.add("pages-div");
    likedDiv.classList.add("liked-div");
    toggleReadButton.classList.add("read-div");
    deleteButton.classList.add("delete");

    //create row with child divs to make up cells
    newRow.appendChild(titleDiv);
    newRow.appendChild(pagesDiv);
    newRow.appendChild(likedDiv);
    newRow.appendChild(toggleReadButton);
    newRow.appendChild(deleteButton);

    //Add completed row to table
    table.appendChild(newRow);

    toggleReadButton.addEventListener("click", function () {
      toggleRead(book);
      toggleReadButton.parentElement.querySelector(".read-div").textContent =
        book.read;
    });

    //add event listener to delete:
    deleteButton.addEventListener("click", function (e) {
      e.preventDefault();
      //remove from library using title value
      let title = titleDiv.textContent;
      for (let book of myLibrary) {
        if (book.title === title) {
          myLibrary.splice(myLibrary.indexOf(book), 1);
        }
      }
      console.log(myLibrary);
      table.removeChild(newRow);
    });
  }
  console.log(myLibrary);
}

//toggle read
function toggleRead(book) {
  if (book.read == true) book.read = false;
  else if (book.read == false) book.read = true;
  else book.read = true;
}

//modal functionality
//First, bring up dialogue with new-book button
newBook.addEventListener("click", dialog.showModal.bind(dialog));

//This function will handle both the cancel and submit requests.
//Added the event listener to both buttons since there are only 2. Event
//propagation did not seem necessary.
for (let btn of modalBtns) {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    let title = document.querySelector(".title input").value;
    let pages = document.querySelector(".pages input").value;
    let read = document.querySelector(".read input").value;
    let liked = document.querySelector(".liked input").value;

    if ([...btn.classList].includes("submit")) {
      const book = new Book(title, pages, read, liked);
      addBookToLibrary(book);

      console.log(myLibrary);
    }

    //clear modal
    document.querySelector(".title input").value = "";
    document.querySelector(".pages input").value = "";
    document.querySelector(".read input").value = "";
    document.querySelector(".liked input").value = "";
    //cloase modal
    dialog.close();
  });
}

//Generate table
showBooks.addEventListener("click", () => displayBooks(myLibrary));
