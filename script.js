const bookForm = document.getElementById('book-form')

let myLibrary = []

class Book {
  constructor(title, author, pages, hasRead) {
    ;(this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.hasRead = hasRead)
  }
}

Book.prototype.markReadStatus = function () {
  if (!this.hasRead) {
    console.log(this.hasRead)
    this.hasRead = true
  } else if (this.hasRead) {
    console.log(this.hasRead)
    this.hasRead = false
  }
}

//collect data from the form
const addBookToLibrary = (event) => {
  event.preventDefault()
  const bookTitle = document.getElementById('book-title').value
  const bookAuthor = document.getElementById('book-author').value
  const bookPages = document.getElementById('book-pages').value
  const hasRead = document.getElementById('has-read').checked
  //push the new book object into myLibrary
  const newBook = new Book(bookTitle, bookAuthor, bookPages, hasRead)
  myLibrary.push(newBook)
  displayBooks()
  bookForm.reset()
}

//index is passed in from the displayBooks function below
const throwBookAway = (index) => {
  for (let book in myLibrary) {
    if (book == index) {
      myLibrary.splice(index, 1)
    }
  }
  displayBooks()
}

//for each read button attach a event handler
const attachReadHandler = () => {
  const readBtns = document.querySelectorAll('.read-btn')
  readBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      changeReadStatus(e.target)
    })
  })
}

//from the event handler above check the read status
const changeReadStatus = (target) => {
  for (let bookIndex in myLibrary) {
    if (!myLibrary[bookIndex].hasRead && bookIndex == target.dataset.index) {
      target.textContent = 'FINISHED'
      myLibrary[bookIndex].markReadStatus()
    } else if (
      myLibrary[bookIndex].hasRead &&
      bookIndex == target.dataset.index
    ) {
      target.textContent = 'READING'
      myLibrary[bookIndex].markReadStatus()
    }
  }
}

const displayBooks = () => {
  const bookShelf = document.getElementById('book-cards')
  bookShelf.innerHTML = myLibrary
    .map(
      (book, index) =>
        `<li class="card">
            <div class="flex">
              <h2 class="book-title">${book.title}</h2>
              <span id="trash" data-index=${index} onclick="throwBookAway(${index})" class="material-symbols-outlined trash-can">
                  delete
              </span>
            </div>
            <hr>
            <p class="card-author">By: <em>${book.author}</em></p>
            <p class="card-pages">Pages: ${book.pages}</p>
            <button class="read-btn btn" data-index=${index}>${
          book.hasRead ? 'FINISHED' : 'READING'
        }</button>
          </li>`
    )
    .join('')
  attachReadHandler()
}

bookForm.addEventListener('submit', addBookToLibrary)
