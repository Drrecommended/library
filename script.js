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

Book.prototype.markAsRead = function () {
  console.log(this)
}

const addBookToLibrary = (event) => {
  event.preventDefault()
  const bookTitle = document.getElementById('book-title').value
  const bookAuthor = document.getElementById('book-author').value
  const bookPages = document.getElementById('book-pages').value
  const hasRead = document.getElementById('has-read').checked
  const newBook = new Book(bookTitle, bookAuthor, bookPages, hasRead)
  myLibrary.push(newBook)
  displayBooks()
}

const throwBookAway = (index) => {
  for (let book in myLibrary) {
    if (book == index) {
      myLibrary.splice(index, 1)
      displayBooks()
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
            <p>By: <em>${book.author}</em></p>
            <p>${book.pages}</p>
            <button class="read-button">${
              book.hasRead ? 'reading' : 'not reading'
            }</button>
          </li>`
    )
    .join('')
}sadfs

bookForm.addEventListener('submit', addBookToLibrary)
