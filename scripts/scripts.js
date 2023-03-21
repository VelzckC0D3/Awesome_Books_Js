// Step 1: Create an empty array
let books = [];

// Step 2: Select the elements where we're going to be working
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const addButton = document.querySelector("#addButton");
const booksCont = document.querySelector("#books");

console.log(title, author, addButton, booksCont);

// Step 3: Display the books
function showBooks() {
  booksCont.innerHTML = '';
  books.forEach((book, i) => {
    const li = document.createElement("li");
    li.style.listStyle = "none";
    li.innerHTML = `${book.bookTitle} <br> ${book.bookAuthor} <br>`;

    li.appendChild(deleteButton);
    booksCont.appendChild(li);
  });
};

// Step 4: local storage
if (localStorage.getItem('books')) {
  books = JSON.parse(localStorage.getItem('books'));
}

// Call showBooks() once to display any saved books when the page initially loads
showBooks();

// Step 5: Add button
addButton.addEventListener('click', () => {
  const bookTitle = title.value;
  const bookAuthor = author.value;

  if (bookTitle && bookAuthor) {
    books.push({ bookTitle, bookAuthor });
    localStorage.setItem('books', JSON.stringify(books));

    title.value = '';
    author.value = '';

    showBooks();
  } else {
    console.log('Please enter a title and author');
  }
});
