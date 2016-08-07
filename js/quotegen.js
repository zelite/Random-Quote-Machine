//Needs JQuery
function getNewQuote(){
  //Changes the text of elements with class .quote-text
  //and .quote-author to have the corresponding
  //values on the json
  var leftQuoteIcon = "<i class='fa fa-quote-left'></i> ";
  //callback function that actually updates the DOM
  function updateQuote(json){
    $(".quote-text").fadeOut(1000, function() {
      $(this).html(leftQuoteIcon+json.quoteText);
    }).fadeIn(1000);

    var author = json.quoteAuthor;
    if (author === ""){//check if author is empty
      author= "Unknown";
    }
    $(".quote-author").fadeOut(1000, function() {
      $(this).text("-- "+author);
    }).fadeIn(1000);
    colorChange();
  }

  //makes json request
  $.getJSON("https://crossorigin.me/http://api.forismatic.com/api/1.0/",
            {_: new Date().getTime(), //to prevent caching http://stackoverflow.com/a/31948654/1952996
            method: "getQuote",
            format: "json",
            lang : "en"},
            updateQuote);
}

//Open new window with tweet ready with current quote
function tweet(){
  var author = $(".quote-author").text();
  var quote = $(".quote-text").text();
  window.open("https://twitter.com/intent/tweet?text="+quote+" "+author+"&hashtags=FamousQuotes");
}

function colorChange(){
  var colors = ["#E74C3C", "#9B59B6", "#3498DB", "#1ABC9C", "#27AE60",
                "#F1C40F", "#D35400", "#34495E", "#797D7F"];
  var newColor = colors[Math.floor(Math.random()*(colors.length))];
  //Change color of body, buttons and text
  $("body").css("background-color", newColor);
  $(".button-colored").css({"background-color": newColor,
                           "border-color": newColor});
  $(".quote").css("color", newColor);

}



$(document).ready(function(){
  getNewQuote();//Get first quote for page load

  $("#newquote").on("click", getNewQuote);//Associate getNewQuote with button

  $("#twitter-share").on("click", tweet);

  //Copy to clipboard
  new Clipboard("#copy-clipboard");

  $("#copy-clipboard").attr("data-clipboard-target", ".quote");
});
