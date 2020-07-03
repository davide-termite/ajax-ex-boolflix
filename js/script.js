$(document).ready(function(){

  // Al click del bottone "Cerca" vengono mostrati risultati che
  // contengono la query inserita
  $("#searchbutton").on('click', function(){
    reset()

    // Richiamo il valore dell'input SEARCHBAR in una variabile
    var searchQuery = $("#searchbar").val();

    // Se la searchbar non è vuota, richiamo funzione
    if (searchQuery != "") {
      searchMovie(searchQuery);
      searchSerie(searchQuery);
      $("#searchbar").text(" ");
    }
  });

  // Al premere del tasto invio vengono mostrati risultati che
  // contengono la query inserita
  $("#searchbar").keypress(function(){
    reset()

    // Richiamo il valore dell'input SEARCHBAR in una variabile
    var searchQuery = $("#searchbar").val();

    if (event.which == 13 || event.keycode == 13) {
      // Se la searchbar non è vuota, richiamo funzione
      if (searchQuery != "") {
        searchMovie(searchQuery);
        searchSerie(searchQuery);
        $("#searchbar").text(" ");
      }
    }
  });
});

// funzione che resetta risultati ricerca precedente
//   --> return: nulla
function reset() {
  $(".results").html("");
}

// funzione che permette di cercare film tramito l'utilizzo dell'API
//   --> query: stringa, contiene parola o nome del film
//   --> return: nulla
function searchMovie(query) {
  var urlMovies = "https://api.themoviedb.org/3/search/movie";
  var api_key = "021f10396f4dfd536802346c3b13f5d1";

  $.ajax(
    {
      url: urlMovies,
      method: "GET",
      data: {
        api_key: api_key,
        query: query,
        language: "it-IT",
      },

      success: function(data){
        var queryResult = data.results;
        populateMovie(queryResult);

      },

      error: function(errore){
        alert("C'è stato un errore " + errore);
      },
    }
  )
};
function searchSerie(query) {

  var urlSeries = "https://api.themoviedb.org/3/search/tv";
  var api_key = "021f10396f4dfd536802346c3b13f5d1";

  $.ajax(
    {
      url: urlSeries,
      method: "GET",
      data: {
        api_key: api_key,
        query: query,
        language: "it-IT",
      },

      success: function(data){
        var queryResult = data.results;
        populateSeries(queryResult);

      },

      error: function(errore){
        alert("C'è stato un errore " + errore);
      },
    }
  )
}

// funzione che permette di cercare film tramito l'utilizzo dell'API
//   --> queryResult: array, contiene oggetti, risultati della ricerca
//   --> return: nulla
function populateMovie(queryResult) {
  var imgServer = "https://image.tmdb.org/t/p/w342";

  var cover = "";

  for (var i = 0; i < queryResult.length; i++) {
    var poster = queryResult[i].poster_path;

    if (poster == null){
      cover = "assets/img/covernull.jpg"
    } else {
      cover = imgServer + poster;
    }

    var movie = {
      title: queryResult[i].title,
      cover: imgServer + queryResult[i].poster_path,
      original_title: queryResult[i].original_title,
      overview: queryResult[i].overview,
      lang: queryResult[i].original_language,
      rate: ratingStar(queryResult[i].vote_average),
    }

    displayResult(movie);
  }

}
function populateSeries(queryResult) {
  var imgServer = "https://image.tmdb.org/t/p/w342";

  var cover = "";

  for (var i = 0; i < queryResult.length; i++) {
    var poster = queryResult[i].poster_path;

    if (poster == null){
      cover = "assets/img/covernull.jpg"
    } else {
      cover = imgServer + poster;
    }

    var serie = {
      cover: cover,
      title: queryResult[i].name,
      original_title: queryResult[i].original_name,
      overview: queryResult[i].overview,
      lang: queryResult[i].original_language,
      rate: ratingStar(queryResult[i].vote_average),
    }

    displayResult(serie);
  }

}

// funzione che converte rating da un max di 10 a un max di 5
//   --> number: voto del film
//   --> return: stars >> array mostra voto in stelle
function ratingStar(number){
  if (number !== 0 || number !== ""){

    var rating = Math.ceil(number/2);
    var stars = "";
    var i = 0;

    while (i < 5) {
      if(i <= rating) {
        stars += '<i class="fas fa-star"></i>';
        i++
      } else {
        stars += '<i class="far fa-star"></i>';
        i++
      }
    }
  }

  return stars;
}
// funzione che stampa film con l'utilizzo di Handlebars
//   --> movie: oggetto, contiene dati con cui popolare il template
//   --> return: nulla
function displayResult(movie){
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  var html = template(movie);
  $(".results").append(html);
}


/////////////////////////////////////////////////
////////////////// API DATAS ////////////////////
/////////////////////////////////////////////////

// api_key: 021f10396f4dfd536802346c3b13f5d1
// endpoint movie: https://developers.themoviedb.org/3/search/movie
// endpoint serie: https://developers.themoviedb.org/3/search/tv
