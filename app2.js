// objecrt to store dom elements
const DOM = {
  formCancel: document.querySelector('#formCancel'),
  newBook: document.querySelector('.newBook'),
  form: document.querySelector('form'),
  addBook: document.querySelector('form :nth-child(6)'),
  bookTitle: document.querySelector('#title'),
  bookAutor: document.querySelector('#author'),
  bookPages: document.querySelector('#pages'),
  readStatus: document.querySelector('#status'),
  booksContainer: document.querySelector('.booksContainer'),
};

// Event listiner to show the form when the plus button is clickes
DOM.newBook.addEventListener('click', () => {
  DOM.form.style.visibility = 'visible';
});
// Event listiner to hide the form when cancel button is clicked
DOM.formCancel.addEventListener('click', () => {
  DOM.form.style.visibility = 'hidden';
});

// the library array that will take all books
const theLibrary = [];

// the constructor function that will create books
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  this.update = function update() {
    if (this.status === 'Completed') {
      this.status = 'Not yet';
    } else if (this.status === 'Not yet') {
      this.status = 'Currently Reading';
    } else if (this.status === 'Currently Reading') {
      this.status = 'Completed';
    }
  };
}

// function that will create cards and append them to dom
function createCard(book) {
  const card = document.createElement('div');
  card.classList.add('card');
  const title = document.createElement('div');
  const cancel = document.createElement('button');
  const author = document.createElement('div');
  const pages = document.createElement('div');
  const status = document.createElement('div');
  const update = document.createElement('button');
  title.textContent = book.title;
  cancel.textContent = 'x';
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  status.textContent = book.status;
  update.textContent = 'Update';
  card.appendChild(title);
  card.appendChild(cancel);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(status);
  card.appendChild(update);
  DOM.booksContainer.appendChild(card);
  // event listiner for each cancel button to delete the card and update theLibrary
  cancel.addEventListener('click', () => {
    DOM.booksContainer.removeChild(card);
    theLibrary.forEach((bk) => {
      if (bk.title === title.textContent) {
        theLibrary.splice(theLibrary.indexOf(bk), 1);
      }
    });
  });
  update.addEventListener('click', () => {
    book.update();
    if (status.textContent === 'Completed') {
      status.textContent = 'Not yet';
    } else if (status.textContent === 'Not yet') {
      status.textContent = 'Currently Reading';
    } else if (status.textContent === 'Currently Reading') {
      status.textContent = 'Completed';
    }
  });
}

function render() {
  const numOfCards = DOM.booksContainer.children.length - 2;
  if (theLibrary.length > numOfCards) {
    createCard(theLibrary[theLibrary.length - 1]);
  }
}

// event listiner to add book to the library and append it to dom
DOM.addBook.addEventListener('click', (e) => {
  e.preventDefault();
  const book = new Book(
    DOM.bookTitle.value,
    DOM.bookAutor.value,
    DOM.bookPages.value,
    DOM.readStatus.value
  );
  theLibrary.push(book);
  DOM.form.style.visibility = 'hidden';
  render();
});
