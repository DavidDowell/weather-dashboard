$(document).ready(function () {
    var searchBtn = $(".search");

    initLocalStorage();

    if (localStorage.getItem("prevCityWeatherSrch") != "[]") {
        var currentSrchHist = JSON.parse(localStorage.getItem("prevCityWeatherSrch"));
        renderLastCity(currentSrchHist[0]);
    };

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
        $(".hide").attr("class", "row");
        var currentCityName = results.name;
        $("#currentCityInfo").text(currentCityName + " ");
        var currentCityLon = results.coord.lon;
        var currentCityLat = results.coord.lat;
        findWithCoords(currentCityLat, currentCityLon);
        var currentCityDt = results.sys.sunrise;
        dateConverter(currentCityDt);
        var currentWethIcon = results.weather[0].icon;
        weatherIcon(currentWethIcon);
    }

 
function findWithCoords(currentCityCoLat, currentCityCoLon) {
    var apiKey = "6406ca836e96fe35d13d0645f945ad0b";
    var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentCityCoLat + "&lon=" + currentCityCoLon + "&exclude=minutely,hourly&units=imperial&appid=" + apiKey;
    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function (results) {
        var currentCityTemp = results.current.temp;
        $("#currentTemp").text("Temperature: " + currentCityTemp +" F");
        var currentCityHum = results.current.humidity;
        $("#currentHumid").text("Humidity: " + currentCityHum + "%");
        var currentCityWinSpeed = results.current.wind_speed;
        $("#currentWind").text("Wind Speed: " + currentCityWinSpeed + " mph")
        var currentCityUvi = results.current.uvi;
        uviIndex(currentCityUvi);
        fiveDayForecast();
    })
}

function fiveDayForecast(results) {
    $("#forecast").text("");
    var forecastHeader = $("<h4>");
    forecastHeader.text("5-Day Forecast: ");
    $("#forecast").append(forecastHeader);
    for (i = 1; i < 6; i++) {
        var forecastSquare = $("<div>");
        forecastSquare.attr("class", "col forecast-square")
        var fiveDayDateP = $("<p>");
        var fiveDayDate = results.daily[i].sunrise;
        var inMilliseconds = fiveDayDate * 1000;
        var inDateFormat = new Date(inMilliseconds);
        var currentIntMonth = inDateFormat.getMonth() + 1;
        var currentIntday = inDateFormat.getDate();
        var currentIntYear = inDateFormat.getFullYear();
        var monthDayYear = currentIntMonth + "/" + currentIntday + "/" + currentIntYear;
        //img
        var forecastWethImg = "assets/images/" + results.daily[i].weather[0].icon + "@2x.png";
        var forecastWethIcon = $("<img>");
        forecastWethIcon.attr("src", forecastWethImg);

        //temp, hum
        var forecastTempP = $("</p>");
        var forecastTemp = "Temp: " + results.daily[i].temp.max + " F";
        forecastTempP.append(forecastTemp);
        var forecastHumP = $("</p>");
        var forecastHum = "Humidity: " + results.daily[i].humidity + "%";
        forecastHumP.append(forecastHum);

    }
}

function uviIndex(currentCityUvi) {
    $("#currentUvi").text("");
    var uviIndexText = $("<span>");
    uviIndexText.text("UV Index: ");
    $("#currentUvi").append(uviIndexText);
    var currentCityUviContainer = $("<span>");
    if (currentCityUvi >= 0 && currentCityUvi <= 2) {
        currentCityUviContainer.attr("class", "low-uvi");
    } else if (currentCityUvi > 2 && currentCityUvi <= 5) {
        currentCityUviContainer.attr("class", "moderate-uvi");
    } else if (currentCityUvi > 5 && currentCityUvi <=7) {
        currentCityUviContainer.attr("class", "high-uvi");
    } else if (currentCityUvi > 7 && currentCityUvi <= 10) {
        currentCityUviContainer.attr("class", "very-high-uvi")
    } else if (currentCityUvi > 10) {
        currentCityUviContainer.attr("class", "extreme-uvi forecast-square");
    };
    currentCityUviContainer.text(currentCityUvi);
    $("#currentUvi").append(currentCityUviHolder);
}



    function addToSearchHist(newCityName){
        initLocalStorage();
        var currentSrchHist = JSON.parse(localStorage.getItem("prevCityWeatherSrch"));
        currentSrchHist.unshift(newCityName);
        localStorage.setItem("prevCityWeatherSrch", JSON.stringify(currentSrchHist));
        dispalySearchHist();
    }

    function initLocalStorage() {
        if (localStorage.getItem("prevCityWeatherSrch") === null) {
            localStorage.setItem("prevCityWeatherSrch", "[]"); 
        } else if (localStorage.getItem("prevCityWeatherSrch") === "[]") {
            return;
        };
    }

    var currentSrchHist = JSON.parse(localStorage.getItem("prevCityWeatherSrch"));

    function dateConverter(dt) {
        var inMil = dt * 1000;
        var inDateFormat = new Date(inMil);
        var currentIntMonth = inDateFormat.getMonth() + 1;
        var currentIntDay = inDateFormat.getDate();
        var currentIntYear = inDateFormat.getFullYear();
        $("currentCityInfo").append("<span>" + "(" + currentIntMonth + "/" + currentIntDay + "/" + currentIntYear + ")" + "</span>");
    }

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


});