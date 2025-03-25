// Letter Cursor

let lastTrailTime = 0;
const trailInterval = 100; // in ms, adjust to control spawn rate

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrailTime < trailInterval) return; // limit spawns
  lastTrailTime = now;

  const letter = document.createElement("span");
  letter.classList.add("trail-letter");

  const chars = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N",
    "✒️", "📖", "📚", "📘", "📕", "📙"
  ];
  const randomChar = chars[Math.floor(Math.random() * chars.length)];
  letter.textContent = randomChar;

  // More spacing around cursor
  const offsetX = Math.random() * 60 - 30;
  const offsetY = Math.random() * 60 - 30;
  letter.style.left = `${e.pageX + offsetX}px`;
  letter.style.top = `${e.pageY + offsetY}px`;

  document.body.appendChild(letter);

  setTimeout(() => {
    letter.remove();
  }, 1600);
});

// ABOUT ME - Page Flip

document.addEventListener("DOMContentLoaded", function () {
  const pageFlip = new St.PageFlip(document.getElementById("book"), {
    width: 400,
    height: 600,
    minWidth: 300,
    maxWidth: 1000,
    minHeight: 400,
    maxHeight: 1500,
    size: "fixed",
    maxShadowOpacity: 0.5,
    showCover: true,
    mobileScrollSupport: false
  });

  pageFlip.loadFromHTML(document.querySelectorAll(".my-page"));
});


// FAVORITES - Card Flip Animation
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    let isFlipped = false;

    card.addEventListener("mouseenter", () => {
      isFlipped = !isFlipped;
      anime({
        targets: card,
        rotateY: isFlipped ? "180deg" : "0deg",
        easing: "easeInOutSine",
        duration: 1000,
      });
    });
  });
});

// QUOTES

// Array of quotes
const quotes = [
  { text: "Not all those who wander are lost.", author: "J.R.R. Tolkien" },
  { text: "All we have to decide is what to do with the time that is given to us.", author: "Gandalf" },
  { text: "There is some good in this world, and it's worth fighting for.", author: "Samwise Gamgee" },
  { text: "If more of us valued food and cheer and song above hoarded gold, it would be a merrier world.", author: "J.R.R. Tolkien" },
  { text: "If my life is going to mean anything, I have to live it myself.", author: "Percy Jackson" },
  { text: "Knowing too much of your future is never a good thing.", author: "Chiron" },
  { text: "May the odds be ever in your favor.", author: "Effie Trinket" },
  { text: "Hope is the only thing stronger than fear.", author: "President Snow" },
  { text: "Winter is coming.", author: "Ned Stark" },
  { text: "When you play the game of thrones, you win or you die.", author: "Cersei Lannister" },
  { text: "Chaos isn't a pit. Chaos is a ladder.", author: "Petyr Baelish" },
  { text: "The game is afoot.", author: "Sherlock Holmes" },
  { text: "When you have eliminated the impossible, whatever remains, however improbable, must be the truth.", author: "Sherlock Holmes" },
  { text: "It's enough for me to be sure that you and I exist at this moment.", author: "Gabriel García Márquez" },
  { text: "Manuscripts don't burn.", author: "Mikhail Bulgakov" },
  { text: "Men go to far greater lengths to avoid what they fear than to obtain what they desire.", author: "Dan Brown" },
  { text: "Great minds are always feared by lesser minds.", author: "Dan Brown" },
  { text: "The measure of a man is what he does when he has power.", author: "Dan Brown" },
  { text: "We call them dumb animals, and so they are, for they cannot tell us how they feel, but they do not suffer less because they have no words.", author: "Anna Sewell" },
  { text: "A hero can go anywhere, challenge anyone, as long as he has the nerve.", author: "Rick Riordan" },
  { text: "The world is full of obvious things which nobody by any chance ever observes.", author: "Sherlock Holmes" },
  { text: "Do not say you are weak, because you are a woman.", author: "Mary Kom" },
  { text: "Magic is a secret, and secrets are magic.", author: "Pseudonymous Bosch" },
  { text: "Families are messy. Immortal families are eternally messy.", author: "Hermes" },
  { text: "You see, but you do not observe.", author: "Sherlock Holmes" }
];

// DOM elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const generateButton = document.getElementById('btn');
const favoriteButton = document.getElementById('favorite-btn');
const copyButton = document.getElementById('copy-btn');
const showListButton = document.getElementById('show-list');
const clearButton = document.getElementById('clear-button');
const closeFavoriteButton = document.getElementById('close-favorite');
const favoriteList = document.getElementById('list-of-favorite-quotes');
const favoriteContainer = document.querySelector('.favorite-container');

// Load favorites from local storage
let favoriteQuotes = JSON.parse(localStorage.getItem("favoriteQuotes")) || [];

// Function to generate a random quote
function generateRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteElement.textContent = randomQuote.text;
  authorElement.textContent = randomQuote.author;

  updateFavoriteButtonState();
}

// Function to check if the current quote is in favorites
function isQuoteFavorited() {
  return favoriteQuotes.some(q => q.text === quoteElement.textContent && q.author === authorElement.textContent);
}

// Function to update the favorite button state
function updateFavoriteButtonState() {
  let heartIcon = favoriteButton.firstElementChild;
  heartIcon.classList.toggle('fa-solid', isQuoteFavorited());
  heartIcon.classList.toggle('fa-regular', !isQuoteFavorited());
}

// Function to add or remove the current quote from favorites
const addToFavorites = () => {
  let heartIcon = favoriteButton.firstElementChild;
  heartIcon.classList.toggle('fa-solid');
  heartIcon.classList.toggle('fa-regular');

  const content = quoteElement.textContent;
  const authorName = authorElement.textContent;

  const existsInFavorites = isQuoteFavorited();

  if (!existsInFavorites) {
    favoriteQuotes.push({ text: content, author: authorName });
  } else {
    favoriteQuotes = favoriteQuotes.filter(q => q.text !== content || q.author !== authorName);
  }

  saveFavoritesToLocalStorage();
  displayFavorites();
};

// Function to save favorites to local storage
function saveFavoritesToLocalStorage() {
  localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes));
}

// Function to display favorite quotes with option to remove individually
function displayFavorites() {
  favoriteList.innerHTML = "";

  favoriteQuotes.forEach((quote, index) => {
    const li = document.createElement("li");
    li.classList.add("favorite-quote"); // Changed from favorite-item

    // Create a span to hold the quote text and author
    const quoteSpan = document.createElement("span");
    quoteSpan.innerText = `"${quote.text}" — ${quote.author}`;
    quoteSpan.style.flex = "1";

    // Create the remove button
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    removeBtn.title = "Remove from favorites";

    // Remove quote from favorites
    removeBtn.addEventListener("click", () => {
      favoriteQuotes.splice(index, 1);
      saveFavoritesToLocalStorage();
      displayFavorites();
      updateFavoriteButtonState();
    });

    // Append both to the li
    li.appendChild(quoteSpan);
    li.appendChild(removeBtn);

    // Append to the list
    favoriteList.appendChild(li);
  });
}


// Function to copy the current quote to clipboard
function copyQuote() {
  const currentQuote = quoteElement.textContent;
  const currentAuthor = authorElement.textContent;
  const fullQuote = `${currentQuote} — ${currentAuthor}`;

  navigator.clipboard.writeText(fullQuote).then(() => {
    alert('Quote copied to clipboard!');
  });
}

// Function to clear the favorites list
function clearFavorites() {
  favoriteQuotes = [];
  saveFavoritesToLocalStorage();
  displayFavorites();
}

// Function to toggle the visibility of the favorites container
function toggleFavoritesContainer() {
  favoriteContainer.classList.toggle('visible');
}

// Event listeners
generateButton.addEventListener('click', generateRandomQuote);
favoriteButton.addEventListener('click', addToFavorites);
copyButton.addEventListener('click', copyQuote);
showListButton.addEventListener('click', toggleFavoritesContainer);
clearButton.addEventListener('click', clearFavorites);
closeFavoriteButton.addEventListener('click', toggleFavoritesContainer);

// Initialize
generateRandomQuote();
displayFavorites();

