$(document).ready(function(){
    // open the modal html on click
    $('.modal').modal();

// global varible for storing the recipe IDs retunred
var recipeList = []
    
$(function() {

    var ingredients = "";

    /* Function makes API request for three recipes. 
       It uses the ingredients argument as search term. */

    function getRecipe(ingredients) {

        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + ingredients + "&number=3&apiKey=88df5afa7d444635ad16e4505c402a69";

        $.ajax({

            url: queryURL,
            method: "GET"

        }).then(function (response) {
            // response.forEach(function(response) {
            // var objList = {};
            // objList.id = response.id;
            // objList.img = response.image;
            // objList.title = response.title;
            // recipeList.push(objList);
            // })

            $("#recipe-div").empty();

            response.forEach(function (recipe) {


                $.ajax({

                    url: "https://api.spoonacular.com/recipes/" + recipe.id + "/summary?apiKey=88df5afa7d444635ad16e4505c402a69",
                    method: "GET"
                }).then(function (summary) {

                    // $("#recipe-div").append(
                    // `<div class="col s12 m7 l4">\
                    //     <div class="card">\
                    //         <div class="card-image"> \
                    //             <img src="` + recipe.image + `">\
                    //             <span class="shadow-text card-title">` + recipe.title + `</span>\
                    //         </div> \
                    //         <div class="card-action text-size">\
                    //             <a href="#">Make This!</a> \
                    //             <button data-target="modal1" class="btn modal-trigger" data-summary="`+summary.summary+`">Modal</button>\
                    //         </div>\
                    //   </div>\
                    // </div>`);

                    var column = $('<div class="col s12 m7 l4">')
                    var card = $('<div class="card">');
                    var cardImage = $('<div class="card-image">')
                    var image = $('<img>')
                    image.attr('src', recipe.image);
                    var span = $('<span class="shadow-text card-title">');
                    span.text(recipe.title);
                    var fab = $('<button data-target="modal1" class="btn-floating halfway-fab waves-effect waves-light teal modal-trigger"><i class="material-icons">unfold_more</i></button>')
                    var actionDiv = $('<div class="card-action text-size">');
                    var makeThis = $('<a href="#">Make This!</a>');
                    // var modalButton = $("<button data-target='modal1' class='btn modal-trigger'>Summary</button>")
                    fab.attr('data-summary', summary.summary);
                    actionDiv.append([makeThis]);
                    cardImage.append([image, span, fab]);
                    card.append([cardImage, actionDiv]);
                    column.append(card);
                    

                    $("#recipe-div").append(column);

                    $(".modal-trigger").on("click", function() {
                        console.log(this);
                        // console.log($(this).data("summary"))
                        var summary = $(this).attr("data-summary");
                        $(".modal-content").append(summary);
                    })

                    // $("#recipe-div").append("<div class='card col s12 m7 l4'> <div class='card-image waves-effect waves-block waves-light'><img class='activator' src='" + recipe.image + "'><span class='card-title activator text-size shadow-text'>" + recipe.title + "</div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>Summary<i class='material-icons right'>more_vert</i></span> <p><a class='waves-effect waves-light btn'>Make This!</a></p></div><div class='card-reveal'><span class='card-title'>Summary<i class='material-icons right'>close</i></span><p class='text-size'>" + summary.summary + "</p></div></div>")
                    // $("#recipe-div").append("<div class='card'> <div class='card-image waves-effect waves-block waves-light'><img class='activator' src='images/office.jpg'></div><div class='card-content'><span class='card-title activator grey-text text-darken-4'>Card Title<i class='material-icons right'>more_vert</i></span><p><a href='#'>This is a link</a></p></div><div class='card-reveal'><span class='card-title grey-text text-darken-4'>Card Title<i class='material-icons right'>close</i></span> <p>Here is some more information about this product that is only revealed once clicked on.</p> </div></div>")
                });

            });

        });
    }
    /* Add click event to input-ingredients__button */

    $("#input-ingredients__button").click(function () {

        /* Store user input ingredients in global variable */

        ingredients = $("#user-input-ingredients").val();

        /* Clear user ingredients input */

        $("#user-input-ingredients").val("");

        /* Store list array of ingredients */

        var ingredientsList = ingredients.split(",");

        /* Loop through ingredients list and creates a list element with the ingredient text and
           then append it to ingredients list HTML */

        ingredientsList.forEach(function (ingredient) {

            var li = $("<li class='collection-item'>").html(ingredient);
            // var li = $("<li class='collection-item'><div>"+ingredient+"<a href='#!' class='secondary-content'><i class='material-icons'>delete</i></a></div></li>")

            $(".ingredients-list ul").append(li);

        });

    });

    $("#get-recipe-button").on("click", function () {

        /* Call getRecipe function to make API request with ingredients argument */

        getRecipe(ingredients); /* Uncomment for testing API only  */

        // new

        // new
    })

    

    // <div id='modal1' class='modal'> <div class='modal-content'> <h4>Modal Header</h4> <p>A bunch of text</p> </div> <div class='modal-footer'><a href='#!' class='modal-close waves-effect waves-green btn-flat'>Agree</a> </div>

   

});

});