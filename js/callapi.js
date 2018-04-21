function toggleInfo(toggle){
  if(toggle){
    $('#character-data').hide();
  }else{
    $('#character-data').show();

  }
}


function getApi(character){
  var character = $('#usercharacter').val();
  $('#movielist').empty();
  $('#character-movies').empty();

  $.ajax({
      url: `https://swapi.co/api/people/?search=${character}`,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        $('#usercharacter').val("");
        var result = response.results[0];
        if(result != undefined){
          toggleInfo(false);
          $('#character-name').text(`${result.name}`);
          $('#character-height').text(`${result.height}`);
          $('#character-hair-color').text(`${result.hair_color}`);
          $('#character-skin-color').text(`${result.skin_color}`);
          $('#character-eye-color').text(`${result.eye_color}`);

          var movies = result.films;
          unwrapMovies(movies);
        }
      },
      error: function() {

      }
    });
}

function unwrapMovies(arr) {
  for(var i = 0; i < arr.length ; i++){
    $.ajax({
        url: arr[i],
        type: 'GET',
        data: {
          format: 'json'
        },
        success: function(response) {
          var title = response.title;
          var date = response.release_date;

          unwrapMovieImage(response.title, title, date);
        },
        error: function() {

        }
      });
  }
}

function unwrapMovieImage(movie,title, release_date) {
  $.ajax({
      url: "https://api.themoviedb.org/3/search/movie?api_key=fe51f038699910f70a0a535bbbc2b968&query="+movie,
      type: 'GET',
      data: {
        format: 'json'
      },
      success: function(response) {
        var img = response.results[0].poster_path
        var imgpath = "http://image.tmdb.org/t/p/w185/"+img;
        $('#character-movies').append("<div class='card'>\
        <img class='card-img-top' src="+"'"+imgpath+"'"+"<div class='card-body'>\
            <h5 class='card-title'>"+title+"</h5>\
            Release Date: <span class='data'>"+release_date+"</span></div>\
          </div>");
      },
      error: function() {

      }
    });


}

function loadInfo(response){
  $('#character-name').setVal(`${response.main.name}`);
}
