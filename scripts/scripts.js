class Library {
  constructor() {
    this.books = [];
    this.loadBooks();
    this.showBooks();

    const addButton = document.querySelector('#addButton');
    addButton.addEventListener('click', () => {
      const title = document.querySelector('#title').value;
      const author = document.querySelector('#author').value;

      if (title && author) {
        this.addBook(title, author);
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
      }
    });
  }

  showBooks() {
    const booksCont = document.querySelector('#books');
    booksCont.innerHTML = '';
    this.books.forEach((book, i) => {
      const li = document.createElement('li');
      li.style.listStyle = 'none';
      li.classList.add('booksLi');
      li.innerHTML = `"${book.title}" by ${book.author}`;
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Remove';
      deleteButton.classList.add('deleteButton');
      deleteButton.setAttribute('data-book-index', i);
      deleteButton.addEventListener('click', () => {
        this.removeBook(i);
      });
      li.appendChild(deleteButton);
      booksCont.appendChild(li);
    });
  }

  loadBooks() {
    if (localStorage.getItem('books')) {
      const savedBooks = JSON.parse(localStorage.getItem('books'));
      savedBooks.forEach((book) => {
        this.books.push({ title: book.title, author: book.author });
      });
    }
  }

  addBook(title, author) {
    const newBook = { title, author };
    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }

  removeBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }
}

// Create a new Library object
const library = new Library();

// Call loadBooks() once to load any saved books from local storage
library.loadBooks();

// Call showBooks() once to display any saved books when the page initially loads
library.showBooks();

// Step 7: Add button
const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', () => {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if (title && author) {
    library.addBook(title, author);
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }
});

// extra 1: Date and hour

const dt = new Date();
const month = dt.toLocaleString('default', { month: 'long' });
const day = dt.getDate();
const year = dt.getFullYear();
let hour = dt.getHours();
const ampm = hour >= 12 ? 'pm' : 'am';
hour %= 12;
hour = hour || 12;
const minutes = dt.getMinutes().toString().padStart(2, '0');
const timeString = `${hour}:${minutes} ${ampm}`;
const formattedDate = `${month} ${day} ${year}, ${timeString}`;

document.querySelector('#date-time').innerHTML = formattedDate;

// Change page function
// Buttons
const listButton = document.querySelector('.list');
const add = document.querySelector('.addButton');
const contactButton = document.querySelector('.contact');

// Containers
const bookList = document.querySelector('.awesomeBooks');
const createBook = document.querySelector('.form');
const contact = document.querySelector('.contactCont');

// Function
listButton.addEventListener('click', () => {
  bookList.classList.remove('switch');
  createBook.classList.add('switch');
  contact.classList.add('switch');
});

add.addEventListener('click', () => {
  createBook.classList.remove('switch');
  bookList.classList.add('switch');
  contact.classList.add('switch');
});

contactButton.addEventListener('click', () => {
  contact.classList.remove('switch');
  bookList.classList.add('switch');
  createBook.classList.add('switch');
});
