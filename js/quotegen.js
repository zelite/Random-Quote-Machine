//Needs JQuery
function getNewQuote(){
  //Changes the text of elements with class .quote-text
  //and .quote-author to have the corresponding
  //values on the json

  //callback function that actually updates the DOM
  function updateQuote(json){
    $(".quote-text").text(json.quoteText);
    var author = json.quoteAuthor;
    if (author === ""){//check if author is empty
      author= "Unknown";
    }
    $(".quote-author").text("-- "+author);
  }

  //makes json request using jsonp method which circunvents cross origin problem
  $.getJSON("https://crossorigin.me/http://api.forismatic.com/api/1.0/",
            {method: "getQuote",
            format: "json",
            lang : "en"},
            updateQuote);
}


$(document).ready(function(){
  getNewQuote();//Get first quote for page load

  $("#newquote").on("click", getNewQuote);//Associate getNewQuote with button
});
