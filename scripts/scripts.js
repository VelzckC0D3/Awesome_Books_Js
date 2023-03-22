// Step 1: Create a Book class
// eslint-disable-next-line max-classes-per-file
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

// Step 2: Create a Library class
class Library {
  constructor() {
    this.books = [];
  }

  // Step 3: Display the books
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

  // Step 4: Load saved books from local storage
  loadBooks() {
    if (localStorage.getItem('books')) {
      const savedBooks = JSON.parse(localStorage.getItem('books'));
      savedBooks.forEach((book) => {
        this.books.push(new Book(book.title, book.author));
      });
    }
  }

  // Step 5: Add a new book
  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    localStorage.setItem('books', JSON.stringify(this.books));
    this.showBooks();
  }

  // Step 6: Remove a book
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