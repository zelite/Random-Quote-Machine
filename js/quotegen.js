//Needs JQuery
function getNewQuote(){
  //Changes the text of elements with class .quote-text
  //and .quote-author to have the corresponding
  //values on the json

  //makes json request using jsonp method which circunvents cross origin problem
  $.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=updateQuote&?callback=?");
}

//callback function that actually updates the DOM
function updateQuote(json){
  $(".quote-text").text(json.quoteText);
  var author = json.quoteAuthor;
  if (author === ""){//check if author is empty
    author= "Unknown";
  }
  $(".quote-author").text("-- "+author);
}

getNewQuote();//Get first quote for page load

$("#newquote").on("click", getNewQuote);//Associate getNewQuote with button
