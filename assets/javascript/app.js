$(document).ready(function () {

    var apiKey = "uEIIzOqhPqMTneiQHZJ0zFAnFZj6pmsW";
    
    var movies = ["Blue Velvet", "Jurassic Park", "The X-files"];


    for(var i = 0; i < movies.length; i++){
        var newButton = $("<button>");
        newButton.addClass("btn btn-dark term");
        newButton.attr("value", movies[i]);
        newButton.text(movies[i]);
        $(".buttons-display").append(newButton);
    }
    
    function makeButtons(){
        $(".buttons-display").empty();
        for(var i = 0; i < movies.length; i++){
        var newButton = $("<button>");
        newButton.addClass("btn btn-dark term");
        newButton.attr("value", movies[i]);
        newButton.text(movies[i]);
        $(".buttons-display").append(newButton);
    }
   }
    

    $(".add").click(function(){
        var newSearch = $("input").val();
        movies.push(newSearch);
        makeButtons();

        console.log(movies);
    })

    $(".term").click(function(){

        var select = ($(this).val());
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + select + "&limit=10";
       
        $.ajax({
            url: queryURL,
            method: "GET",
        })
        .then(function(res){
            
            console.log(res);
           for(var j = 0; j < res.data.length; j++){
                var content = $("<img>");
                var rating = $("<p>").text("Rating: " + res.data[j].rating);
                console.log(res);
                content.text(res.data)
                content.attr("src", res.data[j].images.fixed_height.url);
                $(".gifs-display").append(rating);
                $(".gifs-display").append(content);
           }
            
        })
        console.log(select);
    })

    makeButtons();

});