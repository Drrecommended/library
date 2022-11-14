let myLibrary = []

class Book {
  constructor(title, author, pages, hasRead) {
    ;(this.title = title),
      (this.author = author),
      (this.pages = pages),
      (this.hasRead = hasRead)
  }

  markReadStatus = () => {
    if (!this.hasRead) {
      this.hasRead = true
    } else if (this.hasRead) {
      this.hasRead = false
    }
  }
}


console.log('test')
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
    if (bookIndex == target.dataset.index) {
      if (!myLibrary[bookIndex].hasRead) {
        target.textContent = 'FINISHED'
        target.classList.add('card-shade')

        myLibrary[bookIndex].markReadStatus()
      } else {
        target.textContent = 'READING'
        target.classList.remove('card-shade')

        myLibrary[bookIndex].markReadStatus()
      }
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

//Form module
const form = (() => {
  const bookForm = document.getElementById('book-form')

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

  bookForm.addEventListener('submit', addBookToLibrary)
  return { bookForm }
})()
