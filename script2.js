let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
let username = localStorage.getItem("username") || "";
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const moviesList = document.getElementById("movies-list");
const searchInput = document.querySelector(".search-bar input");

const logoutBtn = document.getElementById("logoutBtn");
const usernameDisplay = document.getElementById("username-display");

const btn1 = document.getElementById("sort_rating");
const btn2 = document.getElementById("sort_titlu");

async function loadMovies() {
  try {
    incarca.classList.add("hidden");
    btn1.classList.remove("hidden");
    btn2.classList.remove("hidden");
    const response = await fetch("movies.json");
    const data = await response.json();
    console.log("Movies loaded:", data);
    let movies = data["movies"];
    for (let i = 0; i < movies.length; ++i) {
      const movie_card = document.createElement("div");
      let movie = movies[i];
      console.log(movie);
      movie_card.innerHTML = `<div class="movie-card" data-category=${movie.category}>
      <img src=${movie.imageUrl} alt="film" />
        <h2>${movie.title}</h2>
        <p>${movie.rating}</p>
        <a href=${movie.imdbUrl}>Detalii</a>
        </div>`;

      moviesList.appendChild(movie_card);
    }
  } catch (e) {
    console.log(e);
  }
}
const incarca = document.querySelector(".incarca");
incarca.addEventListener("click", loadMovies);

const movieCardsOriginal = document.querySelectorAll(".movie-card");
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  e.stopPropagation();

  let movieCards = document.querySelectorAll(".movie-card");

  moviesArray = Array.from(movieCards);
  let newArray = [];
  let nr = 0;
  moviesArray.forEach((movie) => {
    let titlu = movie.querySelector("h2").textContent.toLowerCase();

    let include = titlu.startsWith(value);
    if (include) {
      newArray.push(movie);
      movie.classList.remove("hidden");
    } else {
      movie.classList.add("hidden");
      nr++;
    }
  });

  console.log(nr);
  newArray.forEach((movie) => {
    moviesList.prepend(movie);
  });
});

document.querySelectorAll(".dropdown-menu a").forEach((element) => {
  element.addEventListener("click", (e) => {
    e.preventDefault();
    const categorie = e.target.dataset.category.toLowerCase();
    console.log(categorie);
    let movieCards = document.querySelectorAll(".movie-card");
    movieCards.forEach((movie) => {
      let include =
        movie.dataset.category.toLowerCase() === categorie ||
        categorie === "toate";
      movie.classList.toggle("hidden", !include);
    });
  });
});

btn1.addEventListener("click", (e) => {
  let movieCards = document.querySelectorAll(".movie-card");
  moviesArray = Array.from(movieCards);

  moviesArray.sort((a, b) => {
    rating = parseFloat(a.querySelector("p").textContent);

    rating2 = parseFloat(b.querySelector("p").textContent);
    return rating2 - rating;
  });
  moviesArray.forEach((movie) => {
    moviesList.appendChild(movie);
  });
});
btn2.addEventListener("click", (e) => {
  let movieCards = document.querySelectorAll(".movie-card");
  moviesArray = Array.from(movieCards);

  moviesArray.sort((a, b) => {
    titlu = a.querySelector("h2").textContent;

    titlu2 = b.querySelector("h2").textContent;
    return titlu.localeCompare(titlu2);
  });
  moviesArray.forEach((movie) => {
    moviesList.appendChild(movie);
  });
});
function randomStyleChanges() {
  setInterval(() => {
    let movieCards = document.querySelectorAll(".movie-card");

    const randomCard =
      movieCards[Math.floor(Math.random() * movieCards.length)];
    const originalColor = getComputedStyle(randomCard).backgroundColor;
    randomCard.style.backgroundColor = `hsl(${Math.random() * 360}, 50%, 25%)`;

    setTimeout(() => {
      randomCard.style.backgroundColor = originalColor;
    }, 1000);
  }, 2000);
}
randomStyleChanges();
function desen() {
  const canvas = document.getElementById("cameraCanvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ff9800";
    ctx.fillRect(50, 40, 100, 70);

    ctx.beginPath();
    ctx.arc(100, 75, 25, 0, Math.PI * 2);
    ctx.fillStyle = "#1e1e1e";
    ctx.fill();
    ctx.strokeStyle = "#ff9800";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(100, 75, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();

    ctx.fillStyle = "#ff9800";
    ctx.fillRect(70, 20, 60, 20);

    ctx.beginPath();
    ctx.arc(160, 60, 15, 0, Math.PI * 2);
    ctx.fillStyle = "#1e1e1e";
    ctx.fill();
    ctx.strokeStyle = "#ff9800";
    ctx.stroke();
  }
}
desen();
