let inputForm = document.querySelector("#inputForm");
let enteredMovie;
let movieTitle = document.querySelector("#movieTitle");
let trailerHeader = document.querySelector("#trailerHeader");
let castMember1 = document.querySelector("#castMember1");
let castMember2 = document.querySelector("#castMember2");
let castMember3 = document.querySelector("#castMember3");
let synopsis = document.querySelector("#movieSynopsis");
let moviePoster = document.querySelector("#moviePoster");
let youTubeVideo = document.querySelector("#youtubeVideo");
inputForm.addEventListener("submit", function (event) {
    event.preventDefault();
    enteredMovie = document.querySelector(".enteredMovie").value;
    pullMovieInfo();
    pullMovieTrailer();
    inputForm.reset();
});

function pullMovieInfo() {
    let apiKeyOMDB = "477f75d3";
    let castMembers = [];
    fetch(
        `http://www.omdbapi.com/?apikey=${apiKeyOMDB}&t=${enteredMovie}&type=movie&plot=full`
    )
        .then((response) => response.json())
        .then((data) => {
            movieTitle.innerText = data.Title + " (" + data.Year + ")";
            trailerHeader.innerText = "Movie clips from "+data.Title + " (" + data.Year + ")"
            castMembers = data.Actors.split(", ");
            castMember1.innerText = castMembers[0];
            castMember2.innerText = castMembers[1];
            castMember3.innerText = castMembers[2];
            synopsis.innerText = data.Plot;
            moviePoster.src = data.Poster;
            console.log(data);
            console.log(data.imdbID);
            storeMovieData(data);
        });
}

function pullMovieTrailer() {
    let apiKeyYouTube = "AIzaSyAqFrtQreRkV1LkaZO8evfjc0ArN7GeCv4";
    fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${enteredMovie}&key=${apiKeyYouTube}`,
        {
            header: "Accept: application/json",
        }
    )
        .then((response) => response.json())
        .then((data) => {
            youTubeVideo.src =
                "https://www.youtube.com/embed/" + data.items[0].id.videoId;
            console.log(data);
            console.log(data.items[0].id.videoId);
        });
}

function storeMovieData(data) {
    localStorage.setItem(data.imdbID, enteredMovie);
}
