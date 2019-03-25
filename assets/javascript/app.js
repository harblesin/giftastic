$(document).ready(function () {

    var apiKey = "uEIIzOqhPqMTneiQHZJ0zFAnFZj6pmsW";

    var movies = ["Blue Velvet", "Jurassic Park", "The X-files"];
    var srcArray = [];
    var stillArray = [];
    var buttonsMade = false;
    var gifsMade = false;



    function makeButtons() {
        $(".buttons-display").empty();
        for (var i = 0; i < movies.length; i++) {
            var newButton = $("<button>");
            buttonsMade = true;
            //assignButtons();
            newButton.addClass("btn btn-dark term");
            newButton.attr("value", movies[i]);
            newButton.text(movies[i]);
            $(".buttons-display").append(newButton);
            $("input").val("");
        }
    }

    makeButtons();

    if (buttonsMade) {

        $(".term").click(querySearch);
    }




    function pauseGif() {

        var status = $(this).attr("status");

        if (status === "moving") {
            $(this).attr("src", res.data[j].images.fixed_height.url);
            $(this).attr("status", "moving");
        } else {


            $(this).attr("src", res.data[j].images.fixed_height_still);
            $(this).attr("status", "stop")

        }



    }

    function querySearch() {

        console.log("yes");
        var select = ($(this).val());
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + select + "&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET",
            })
            .then(function (res) {

                console.log(res);
                for (var j = 0; j < res.data.length; j++) {
                    var content = $("<img>");
                    content.addClass("gif");
                    var rating = $("<p>").text("Rating: " + res.data[j].rating);
                    console.log(res);
                    //  content.text(res.data.rating);
                    content.attr("src", res.data[j].images.fixed_height.url);
                    srcArray.push(res.data[j].images.fixed_height.url);
                    stillArray.push(res.data[j].images.fixed_height_still);
                    $(".gifs-display").prepend(rating);
                    $(".gifs-display").prepend(content);
                    var gifsMade = true;
                    if (gifsMade) {
                        $(".gif").click(function () {

                            if (status === "moving") {
                                $(this).attr("src", srcArray[j]);
                                $(this).attr("status", "moving");
                            } else {


                                $(this).attr("src", stillArray[j]);
                                $(this).attr("status", "stop")

                            }
                        });
                    }
                }



                makeButtons();

                function addButton() {

                }
                $(".add").click(function (event) {
                    event.preventDefault();
                    var newSearch = $("input").val();
                    movies.push(newSearch);
                    makeButtons();

                    console.log(movies);
                })




            })
        console.log(select);

    }








});