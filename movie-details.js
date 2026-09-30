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
    movieCardDetails.innerHTML =  ` <div>
            <img src="${data.Poster}" alt="">
        </div>

        <div>
            <h2>${data.Title}</h2>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Released}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>${data.imdbRating} / 10</p>
            </section>

            <div>
                <p>Plot Overview</p>
                <p>${data.Plot}</p>
            </div>

            <div>
                <section>
                    <p>Director</p>
                    <p>${data.Director}</p>
                </section>
                <section>
                    <p>Writer</p>
                    <p>${data.Writer}</p>
                </section>
            </div>
            <div>
               <section>
                    <p>Actors</p>
                    <p>${data.Actors}</p>
                </section> 
            </div>
            <div>
                <section>
                    <p>Language</p>
                    <p>${data.Language}</p>
                </section>
                 <section>
                    <p>Country</p>
                    <p>${data.Country}</p>
                </section>
            </div>
             <button><a href = https://www.imdb.com/title/${data.imdbID} target="_blank"  >View On IMDb</a>
             </button>
        </div>`
}