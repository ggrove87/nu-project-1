let searchBtn = document.querySelector(".searchBtn");
let enteredMovie;
searchBtn.addEventListener("click", function(event){
    event.preventDefault();
    enteredMovie = document.querySelector(".enteredMovie").textContent;
    pullMovieInfo();
    pullMovieTrailer();
})

function pullMovieInfo() {
    let apiKeyOMDB = "477f75d3";
    fetch(`http://www.omdbapi.com/?apikey=${apiKeyOMDB}&t=${enteredMovie}`)
    .then(response => response.json())
    .then(data =>{
        console.log(data.imdbID);
        storeMovieData(data.imdbID)
    })

}

function pullMovieTrailer(){
    let apiKeyYouTube = "";
    fetch(``)
    .then(response => response.json())
    .then(data => {

    })
}

function storeMovieData(data){
    localStorage.setItem(data.imdbID, enteredMovie);
}