"use strict";

// Github link for Movie recommendation app using javascript: https://github.com/BahadurKhan10/Movie-Recommendation-App-using-Javascript.git


const form = document.getElementById("form");
const genreSelect = document.getElementById("genre");
const ratingSelect = document.getElementById("rating");
const yearSelect = document.getElementById("year");
const resultsContainer = document.getElementById("results-container");
// If Submit form, then fetch data and do: 2 functions
// 1: getFilteredMovies()
// 2: displayMovies(filteredMovies)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const genre = genreSelect.value;
    const rating = ratingSelect.value;
    const year = yearSelect.value;
    fetch("movies.json")
        .then((response) => response.json())
        .then((movies) => {
        const filteredMovies = getFilteredMovies(movies, genre, rating, year);
        displayMovies(filteredMovies);
    });
});
// Function 1: getFilteredMovies (Recommendation Logic)
function getFilteredMovies(movies, genre, rating, year) {
    console.log("genre: " + genre + ", rating: " + rating + ", year: " + year);
    let filteredMovies = movies;
    // Using closures
    if (genre && genre !== "All") {
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.genres.includes(genre);
        });
    }
    if (year && year !== "All") {
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.release_date.includes(year);
        });
    }
    if (rating && rating !== "All") {
        filteredMovies = filteredMovies.filter(function (movie) {
            return movie.vote_average >= parseFloat(rating);
        });
    }
    console.log(filteredMovies);
    return filteredMovies;
}
// Function 2: displayMovies (Movie recommendation display)
function displayMovies(movies) {
    resultsContainer.innerHTML = "";
    if (movies.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No movies found.";
        resultsContainer.appendChild(message);
    }
    else {
        const table = document.createElement("table");
        table.innerHTML = `
          <thead>
            <tr>
              <th>Rank</th>
              <th>Movie</th>
              <th>Genre</th>
              <th>Rating</th>
              <th>Year</th>
            </tr>
          </thead>
        `;
        const tbody = document.createElement("tbody");
        let rank = 1;
        movies.forEach((movie) => {
            const row = document.createElement("tr");
            const rankCell = document.createElement("td");
            rankCell.textContent = rank.toString();
            row.appendChild(rankCell);
            const nameCell = document.createElement("td");
            const posterContainer = document.createElement("div");
            const posterImg = document.createElement("img");
            posterImg.src = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
            // Formatting the poster image
            posterImg.style.width = "80px";
            posterImg.style.height = "120px";
            posterContainer.style.display = "flex";
            posterContainer.style.alignItems = "center";
            posterContainer.appendChild(posterImg);
            const nameContainer = document.createElement("div");
            nameContainer.style.marginLeft = "10px";
            nameContainer.style.textAlign = "left";
            const movieName = document.createElement("p");
            movieName.textContent = movie.title;
            movieName.style.marginBottom = "0";
            nameContainer.appendChild(movieName);
            // taking year (eg 2021,1999,2000) from release_date from movies.json
            const year = movie.release_date.split("-")[0];
            const movieYear = document.createElement("p");
            movieYear.textContent = year;
            movieYear.style.marginTop = "0";
            nameContainer.appendChild(movieYear);
            // appending poster inside the name cell = good display
            posterContainer.appendChild(nameContainer);
            nameCell.appendChild(posterContainer);
            row.appendChild(nameCell);
            const genreCell = document.createElement("td");
            genreCell.textContent = Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres;
            row.appendChild(genreCell);
            const ratingCell = document.createElement("td");
            ratingCell.textContent = movie.vote_average.toString();
            row.appendChild(ratingCell);
            const yearCell = document.createElement("td");
            yearCell.textContent = year;
            row.appendChild(yearCell);
            tbody.appendChild(row);
            rank++;
        });
        table.appendChild(tbody);
        resultsContainer.appendChild(table);
    }
}
//# sourceMappingURL=app.js.map
