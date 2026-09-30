API = "http://www.omdbapi.com/?i=tt3896198&apikey=d39ef08d"

const movieForm = document.querySelector("#movieForm")
const movieInput = document.querySelector("#movieInput")
const movieHub = document.querySelector("#movie-hub")


movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim()
    if (!query) {
        return
    }
    console.log(query);
    searchMovies(query);
})


async function searchMovies(movieName) {
    movieHub.innerHTML = `<p class="status">Searching for movies...</p>`
    let response = await fetch(`http://www.omdbapi.com/?s=${movieName}&apikey=d39ef08d`)
    let data = await response.json()
    console.log(data);
    if (data.Response === "True"){
        displayMovies(data.Search)
    }
    else{
        movieHub.innerHTML = `<p class="status">${data.Error}</p>`
    }
}


function displayMovies(data) {
    movieHub.innerHTML = ""
    data.forEach(movie => {
        const div = document.createElement("div")

        div.dataset.id = movie.imdbID
        div.setAttribute("class" , "movie-card")
        div.innerHTML = `<div class="poster-wrap">
                <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/500x750?text=No+Poster"}" alt="${movie.Title}">
            </div>
            <div class="movie-info">
                <p class="movie-title">${movie.Title}</p>
                <p class="movie-year">${movie.Year}</p>
            </div>`
        movieHub.append(div)
    });
}

movieHub.addEventListener("click" , (e) => {
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-card")
    if (!movieCard) return
    const imdbID = movieCard.dataset.id
    location.href = `movie-detail.html?id=${imdbID}` //Used from redirecting to the other file of HTML , like pages separately mai open hona..
})