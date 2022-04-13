let inputForm = document.querySelector("#inputForm");
let enteredMovie;
// read movieSearches from localStorage if available, otherwise set to empty array
// set data from each fetch to a var for easy manipulation
let movieData;
let youtubeData;
let movieTitle = document.querySelector("#movieTitle");
let trailerHeader = document.querySelector("#trailerHeader");
let castMember1 = document.querySelector("#castMember1");
let castMember2 = document.querySelector("#castMember2");
let castMember3 = document.querySelector("#castMember3");
let synopsis = document.querySelector("#movieSynopsis");
let moviePoster = document.querySelector("#moviePoster");
let youTubeVideo = document.querySelector("#youtubeVideo");
let youtubeKeyIndex = 0;
inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    enteredMovie = document.querySelector(".enteredMovie").value;
    pullMovieInfo();
    pullMovieTrailer();
    inputForm.reset();
});

let formButton = document.querySelector("#inputForm a.btn");
formButton.addEventListener("click", function (event) {
    enteredMovie = document.querySelector(".enteredMovie").value;
    pullMovieInfo();
    pullMovieTrailer();
    inputForm.reset();
});

function pullMovieInfo() {
    let apiKeyOMDB = "477f75d3";
    let castMembers = [];
    fetch(
        `https://www.omdbapi.com/?apikey=${apiKeyOMDB}&t=${enteredMovie}&type=movie&plot=full`
    )
        .then((response) => response.json())
        .then((data) => {
            movieTitle.innerText = data.Title + " (" + data.Year + ")";
            trailerHeader.innerText =
                "Movie clips from " + data.Title + " (" + data.Year + ")";
            castMembers = data.Actors.split(", ");
            castMember1.innerText = castMembers[0];
            castMember2.innerText = castMembers[1];
            castMember3.innerText = castMembers[2];
            synopsis.innerText = data.Plot;
            moviePoster.src = data.Poster;
            movieData = data;
            console.log(data);
            console.log(data.imdbID);
            storeMovieSearch(data, enteredMovie);
        });
}

function pullMovieTrailer() {
    let youtubeKeys = [
        "AIzaSyAqFrtQreRkV1LkaZO8evfjc0ArN7GeCv4", // jason
        "AIzaSyDVFRBhkTYIeODoHkwB_HGX0a0Otbip_NM", // josh
        "AIzaSyCV42eYIcxlTbBmhr4pILqBTVMprY02esQ", // gene
    ];
    let apiKeyYouTube = youtubeKeys[youtubeKeyIndex];
    youtubeKeyIndex += 1;
    if (youtubeKeyIndex > youtubeKeys[youtubeKeyIndex]) {
        youtubeKeyIndex = 0;
    }
    fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${enteredMovie}+trailer&key=${apiKeyYouTube}`,
        {
            header: "Accept: application/json",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            youtubeData = data;
            youTubeVideo.src =
                "https://www.youtube.com/embed/" + data.items[0].id.videoId;
            console.log(data);
            console.log(data.items[0].id.videoId);
        });
}

let movieSearches = JSON.parse(localStorage.getItem("movieSearches"));
if (movieSearches === null) {
    movieSearches = {};
}
function storeMovieSearch(data, search) {
    // build object for the current search
    search = search.toLowerCase();
    if (movieSearches[search] === undefined) {
        movieSearches[search] = {};
    }
    console.log(search);
    let currentSearch = {};
    currentSearch = {
        imdb: data.imdbID,
        search: search,
    };
    movieSearches[search] = currentSearch;
    console.log(movieSearches);
    // submit to localStorage
    localStorage.setItem("movieSearches", JSON.stringify(movieSearches));
}

function pullThemeMusic() {
    fetch(
        `https://[ENDPOINT].api.tunefind.com/api/v2/movie/matrix?id-type=tmbd/username=gwg1387:ABC#abc#789#`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(
                `https://[ENDPOINT].api.tunefind.com/api/v2/movie/matrix?id-type=tmbd`
            );
        });
}
