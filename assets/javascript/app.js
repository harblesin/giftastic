//As much as it sounds like more excuses I got sick this whole weekend, which i 
//planned on dedicating to this assignment, and the reason i missed class today, 3/25
//and couldnt focus enough to use the remote attendance
$(document).ready(function () {

    //declaring the variables and the arrays, including the empty arrays that will
    //be populated by future functions. At the moment, or unless i forget to change this
    //I couldnt quite figure out how to activate the still and moving gif function
    //without using empty array, although i was still unable to make
    //the arrays unique to each api query, because of this, as youll see, the
    //sources when clicked will only be for the first 10 gifs populated
    var apiKey = "uEIIzOqhPqMTneiQHZJ0zFAnFZj6pmsW";
    var movies = ["danny devito", "kyle maclachlan", "emma stone", "glen close",
        "robert duvall", "cate blanchett", "julia louis-dreyfus", "peter falk"
    ];
    var srcArray = [];
    var stillArray = [];
    var buttonsMade = false;


    //this function sets up and llists the buttons on the top of the screen and
    //upon being called will empty and then include any new buttons that have
    //been added to the array it pulls from
    function makeButtons() {
        $(".buttons-display").empty();
        for (var i = 0; i < movies.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("btn btn-dark term");
            newButton.attr("value", movies[i]);
            newButton.text(movies[i]);
            $(".buttons-display").append(newButton);
            $("input").val("");
            buttonsMade = true;
        }
        if (buttonsMade) {
            $(".term").click(querySearch);
        }

    }

    //this is the initial call of the aforementioned function to initialize
    //the buttons on the top of the screen
    makeButtons();

    //this function sets up the logic for when you click the add button
    //very simple logic that pushes the text into the array from which the 
    //makeButtons functions calls from (from which the function calls),
    //and then immediately calls the makeButtons function to repopulate the
    //addition of what was typed in the input field
    function addButton() {
        var newSearch = $("input").val();
        movies.push(newSearch);
        makeButtons();
    }

    //the event listener that calls the function when the button is clicked
    $(".add").click(addButton);

    //here is where the function to search the giphy api is both written and called
    //use the this value to grab what is clicked to use the value as the search term
    function querySearch() {
        var select = ($(this).val());
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + select + "&limit=10";

        $.ajax({
                url: queryURL,
                method: "GET",
            })
            .then(function (res) {

                //this for loop runs through the results of the ajax GET method,
                //and for each increment, creates the elements for each gif and
                //corresponding values such as title and rating, then appending them
                //to the empty column created to display them
                //also
                //i regretfully did not ask why i had run into multiple problems
                //with appending the divs without making them an entire singlular 
                //column, and although my soltion was to use .add(), i feel it came 
                //across messy and unorganized
                for (var j = 0; j < res.data.length; j++) {
                    var content = $("<img>");
                    content.addClass("gif");
                    var rating = $("<p>").text("Rating: " + res.data[j].rating + " Title: " + res.data[j].title);
                    content.attr("status", "moving")
                    content.val(j);
                    content.attr("src", res.data[j].images.fixed_height.url);
                    srcArray.push(res.data[j].images.fixed_height.url);
                    stillArray.push(res.data[j].images.fixed_height_still.url);
                    $(".gifs-display").after(content);
                    content.after(rating);

                    //with the for loop, defining the function that dictates how 
                    //the gifs are paused, using the values of the gifs as they were
                    //pushed into the empty arrays inside of the last .then method
                    //inside the ajax call, it grabs the url variable with the 
                    //corresponding index. but like mentions before, the index being
                    //used to call is only 1-10, and will only call the initial 10
                    function pauseGif() {
                        var status = $(this).attr("status");
                        console.log(status);
                        var valid = $(this).val()
                        console.log(valid);

                        //tests if clicked gif has the status of moving, if it does
                        //change the status to stop, and if not change the status to moving
                        if (status === "moving") {
                            $(this).attr("src", stillArray[valid]);
                            $(this).attr("status", "stop");
                        } else {
                            $(this).attr("src", srcArray[valid]);
                            $(this).attr("status", "moving")
                        }
                    }
                }

                //finally within the ajax call so not to confuse anything and apply 
                //the click to the appropriate element, this even listener waits for
                //a click upon any of the created gifs
                $(".gif").click(pauseGif);
            })
    }








});