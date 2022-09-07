

initLocalStorage();

if (localStorage.getItem("prevCityWeatherSrch") != "[]") {
    var currentSrchHist = JSON.parse(localStorage.getItem("prevCityWeatherSrch"));
    
}

dispalySearchHist();

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



