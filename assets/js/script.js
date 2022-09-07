
var searchBtn = $(".search");

initLocalStorage();

if (localStorage.getItem("prevCityWeatherSrch") != "[]") {
    var currentSrchHist = JSON.parse(localStorage.getItem("prevCityWeatherSrch"));
    
}

dispalySearchHist();

//retrieving city coordinates from server
$(document).on("click", ".past-search", function(event) {
    event.preventDefault();
    var cityName = $(this).attr("id");
    var apiKey = "6406ca836e96fe35d13d0645f945ad0b"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&cnt=5&units=imperial&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (results) {
        weatherForecast(results);
    })
})

searchBtn.on("click", function(event) {
    event.preventDefault();
    var cityName = $("#city-name").val();
    var apiKey = "6406ca836e96fe35d13d0645f945ad0b"
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&cnt=5&units=imperial&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(results){
        weatherForecast(results);
        addToSearchHist(results.name);
    });
    $("#city-name").val("")
});

function weatherForecast(results) {

}

function addToSearchHist(newCityName){
    
}

function initLocalStorage() {
    if (localStorage.getItem("prevCityWeatherSrch") === null) {
        localStorage.setItem("prevCityWeatherSrch", "[]"); 
    } else if (localStorage.getItem("prevCityWeatherSrch") === "[]") {
        return;
    };
}

var currentSrchHist = JSON.parse(localStorage.getItem("prevCityWeatherSrch"));

function dispalySearchHist() {
    $("#searchHistory").text("");
    var currentSrchHist = JSON.parse(localStorage.getItem("prevCityWeatherSrch"));
    for (i = 0; i < currentSrchHist.length; i++) {
        $("#searchHistory").append("<br>");
        var citySrchBtn = $("<button>");
        citySrchBtn.addClass("btn btn-info prvCity");
        citySrchBtn.attr("type", "button");
        citySrchBtn.attr("id", currentSrchHist[i]);
        citySrchBtn.text(currentSrchHist[i]);
        $("#searchHistory").append(citySrchBtn);
        if ([i] > 5) {
            return;
        };
    };
};



