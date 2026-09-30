//Ye tareeka hai kisi aur previous page ki details new file mai laane ka.
const params = new URLSearchParams(location.search)
const imdbID = params.get("id")
const movieCardDetails = document.querySelector("#movie-card-details")

if (imdbID){
    searchMovie(imdbID.trim())
}

async function searchMovie(imdbID) {

    let response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=d39ef08d`)
    let data = await response.json()
    console.log(data);
    if (data.Response === "True"){
        displayMovie(data)
    }
    else{
        console.log(data.Error);
    }
}


function displayMovie(data){
    movieCardDetails.innerHTML = `
        <article class="details-card">
            <div class="details-poster">
                <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/500x750?text=No+Poster"}" alt="${data.Title}">
            </div>

            <div class="details-content">
                <h1>${data.Title}</h1>

                <div class="meta">
                    <span>${data.Year}</span>
                    <span>${data.Rated}</span>
                    <span>${data.Runtime}</span>
                    <span>⭐ ${data.imdbRating} / 10</span>
                    <span>${data.Genre}</span>
                </div>

                <div class="detail-section">
                    <p class="detail-label">Plot Overview</p>
                    <p class="detail-value">${data.Plot}</p>
                </div>

                <div class="people-grid">
                    <section class="detail-section">
                        <p class="detail-label">Director</p>
                        <p class="detail-value">${data.Director}</p>
                    </section>

                    <section class="detail-section">
                        <p class="detail-label">Writer</p>
                        <p class="detail-value">${data.Writer}</p>
                    </section>

                    <section class="detail-section">
                        <p class="detail-label">Actors</p>
                        <p class="detail-value">${data.Actors}</p>
                    </section>

                    <section class="detail-section">
                        <p class="detail-label">Language</p>
                        <p class="detail-value">${data.Language}</p>
                    </section>

                    <section class="detail-section">
                        <p class="detail-label">Country</p>
                        <p class="detail-value">${data.Country}</p>
                    </section>

                    <section class="detail-section">
                        <p class="detail-label">Released</p>
                        <p class="detail-value">${data.Released}</p>
                    </section>
                </div>

                <a class="imdb-btn" href="https://www.imdb.com/title/${data.imdbID}" target="_blank" rel="noopener noreferrer">
                    View on IMDb ↗
                </a>
            </div>
        </article>`;
}
