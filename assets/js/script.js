let searchBtn = document.querySelector("#searchBtn");
let enteredMovie;
searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    enteredMovie = document.querySelector("#enteredMovie").value;
    pullMovieInfo();
    pullMovieTrailer();
});

function pullMovieInfo() {
    let apiKeyOMDB = "477f75d3";
    fetch(
        `http://www.omdbapi.com/?apikey=${apiKeyOMDB}&t=${enteredMovie}&type=movie`
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.imdbID);
            storeMovieData(data)
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
            console.log(data.items[0].id.videoId);
        });
}

function storeMovieData(data) {
    localStorage.setItem(data.imdbID, enteredMovie);
}
