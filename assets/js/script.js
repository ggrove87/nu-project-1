let inputForm = document.querySelector("#inputForm");
let enteredMovie;
// read movieSearches from localStorage if available, otherwise set to empty array
let movieSearches = JSON.parse(localStorage.getItem("movieSearches"));
if (movieSearches === null) {
    movieSearches = [];
}
// set data from each fetch to a var for easy manipulation
let movieData;
let youtubeData;
inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    enteredMovie = document.querySelector("#enteredMovie").value;
    pullMovieInfo();
    pullMovieTrailer();
    inputForm.reset();
});

function pullMovieInfo() {
    let apiKeyOMDB = "477f75d3";
    fetch(
        `http://www.omdbapi.com/?apikey=${apiKeyOMDB}&t=${enteredMovie}&type=movie`
    )
        .then((response) => response.json())
        .then((data) => {
            movieData = data;
            console.log(data);
            console.log(data.imdbID);
            storeMovieSearch(data, enteredMovie);
        });
}

function pullMovieTrailer() {
    let apiKeyYouTube = "AIzaSyAqFrtQreRkV1LkaZO8evfjc0ArN7GeCv4";
    fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${enteredMovie}+trailer&key=${apiKeyYouTube}`,
        {
            header: "Accept: application/json",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            youtubeData = data;
            console.log(data.items[0].id.videoId);
        });
}

function storeMovieSearch(data, search) {
    // build object for the current search
    search = search.toLowerCase();
    currentSearch = {
        imdb: data.imdbID,
        search: search,
    };
    movieSearches.unshift(currentSearch);
    console.log(movieSearches);
    // submit to localStorage
    localStorage.setItem("movieSearches", JSON.stringify(movieSearches));
}
