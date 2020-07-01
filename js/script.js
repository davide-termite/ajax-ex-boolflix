$(document).ready(function(){

  // Al click del bottone "Cerca" vengono mostrati film che
  // contengono la query inserita
  $("#searchbutton").on('click', function(){

    // Richiamo il valore dell'input SEARCHBAR in una variabile
    var searchQuery = $("#searchbar").val();

    // Se la searchbar non è vuota, richiamo funzione
    if (searchQuery != "") {
      searchMovie(searchQuery);
      $(".results").text(" ");
    }
  });
});


// funzione che permette di cercare film tramito l'utilizzo dell'API
//   --> movieQuery: stringa, contiene parola o nome del film
//   --> return: nulla
function searchMovie(movieQuery) {
  $.ajax(
    {
      url: "https://api.themoviedb.org/3/search/movie",
      method: "GET",
      data: {
        api_key:"021f10396f4dfd536802346c3b13f5d1",
        query: movieQuery,
        language: "it-IT",
      },
      success: function(data){
        var queryResult = data.results;

        for (var i = 0; i < queryResult.length; i++) {

          var movie = {
            title: queryResult[i].title,
            // cover: ""queryResult[i].poster_path,
            original_title: queryResult[i].original_title,
            tagline: queryResult[i].tagline,
            lang: queryResult[i].original_language,
            rate: queryResult[i].vote_average,
          }

          displayMovie(movie)
        }

      },
      error: function(errore){
        alert("C'è stato un errore " + errore);
      }
    }
  )
};

// funzione che stampa film con l'utilizzo di Handlebars
//   --> movie: oggetto, contiene dati con cui popolare il template
//   --> return: nulla
function displayMovie(movie){
  var source = $("#movie-template").html();
  var template = Handlebars.compile(source);

  var html = template(movie);
  $(".results").append(html);
}

////////////////// API DATAS ////////////////////

// api_key: 021f10396f4dfd536802346c3b13f5d1
// endpoint: https://developers.themoviedb.org/3/search/movie
