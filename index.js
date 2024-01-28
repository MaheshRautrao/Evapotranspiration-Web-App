// hide and show the elements
$(".crop-coefficient-container").hide();

$("#reference").click(function () {
  $(".crop-coefficient-container").slideUp();
});

$("#crop").click(function () {
  $(".crop-coefficient-container").slideDown();
});

$(".standard-clock-time-container").hide();

$("#monthly").click(function () {
  $(".standard-clock-time-container").slideUp();
});

$("#daily").click(function () {
  $(".standard-clock-time-container").slideUp();
});

$("#hourly").click(function () {
  $(".standard-clock-time-container").slideDown();
});

// find the city

$(".city-finder-btn").click(function () {
  const baseUrlGeocoder = "https://api.openweathermap.org/geo/1.0/direct?";
  const APIKEY = "bf04dc00e793b192235443734832a0c9";
  const queryCity = document.querySelector('[name="cityQuery"]').value;
  const urlForGeocoder =
    baseUrlGeocoder + "q=" + queryCity + "&limit=4&appid=" + APIKEY;

  if (queryCity === "") {
    $(".available-cities").empty();
    $(".available-cities-heading").empty();
    $(".final-result").empty();

    var cityCard = "<p>Please Enter a city</p>";

    $(".available-cities").append(cityCard);
  } else {
    fetch(urlForGeocoder)
      .then((response) => response.json())
      .then((data) => {
        $(".available-cities").empty();
        $(".available-cities-heading").empty();
        $(".final-result").empty();
        if (data.length) {
          var cityCardHeading = `<div class="available-cities-heading"> <p> Select The City You are Looking For </p></div>`;

          $(".available-cities-container").prepend(cityCardHeading);

          for (var i = 0; i < data.length && i < 4; i++) {
            var city = data[i];

            var cityName = city.name;
            var cityState = city.state;
            var cityCountry = city.country;
            var cityLatitude = city.lat;
            var cityLongitude = city.lon;

            var cityCard = `<div class="col-3 ">
            <div class="custom-card">
              <div class="custom-card-body city-selected">
               <p>Name : ${cityName}  </p>
               <p>State :${cityState}</p>
               <p>Country :</b>${cityCountry}</p>
               <p class="city-selected-latitude"><span>Latitude : </span>${cityLatitude}</p>
               <p class="city-selected-longitude"><span>Longitude : </span>${cityLongitude}</p>
              </div>
            </div>
          </div>`;

            $(".available-cities").append(cityCard);
          }
        } else {
          $(".available-cities").empty();
          $(".available-cities-heading").empty();
          $(".final-result").empty();
          var cityCard = "<p>Please Enter a valid city</p>";

          $(".available-cities").append(cityCard);
        }
      });
  }
});

$(".available-cities").on("click", ".city-selected", function () {
  var children = this.children;

  var selectedCityLatitude = children[3].lastChild.data;
  var selectedCityLongitude = children[4].lastChild.data;

  var selectedTypeRadio = $('[name="typeOfEvapotranspiration"]');
  var selectedTimePeriodRadio = $('[name="timePeriod"]');

  for (i = 0; i < selectedTypeRadio.length; i++) {
    if (selectedTypeRadio[i].checked) {
      var typeOfEvapotranspiration = selectedTypeRadio[i].value;
    }
  }

  for (i = 0; i < selectedTimePeriodRadio.length; i++) {
    if (selectedTimePeriodRadio[i].checked) {
      var timePeriodOfEvapotranspiration = selectedTimePeriodRadio[i].value;
    }
  }

  if (typeOfEvapotranspiration == "reference") {
    if (timePeriodOfEvapotranspiration === "hourly") {
      var year = document.querySelector('[name="year"]').value;
      var month = document.querySelector('[name="month"]').value;
      var day = document.querySelector('[name="date"]').value;
      var midpoint_of_time = document.querySelector(
        '[name="standardTime"]'
      ).value;
      var latitude_degree = selectedCityLatitude;
      var longitude_degree = selectedCityLongitude;
      var actual_duration_of_sunshine_hours = document.querySelector(
        '[name="actualSunshineHours"]'
      ).value;

      var modifiedMonth = ("0" + month).slice(-2);
      var modifiedDay = ("0" + day).slice(-2);

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCityLatitude}&longitude=${selectedCityLongitude}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m&wind_speed_unit=ms&timezone=auto&start_date=${year}-${modifiedMonth}-${modifiedDay}&end_date=${year}-${modifiedMonth}-${modifiedDay}`
      )
        .then((response) => response.json())
        .then((data) => {
          var index = Number(midpoint_of_time);
          index = Math.floor(index);

          var elevation = data.elevation;
          var temperature = data.hourly.temperature_2m[index];
          var humidity = data.hourly.relative_humidity_2m[index];
          var pressure = data.hourly.surface_pressure[index];
          var windspeed_10m = data.hourly.wind_speed_10m[index];
          var timezone = data.timezone_abbreviation;

          pressure = pressure * 0.1;

          // default value
          var longitude_of_central_time_zone = 0;

          switch (timezone) {
            case "GMT":
              longitude_of_central_time_zone = 0;
              break;

            case "UTC":
              longitude_of_central_time_zone = 0;
              break;

            case "ECT":
              longitude_of_central_time_zone = 15;
              break;

            case "EET":
              longitude_of_central_time_zone = 30;
              break;

            case "ART":
              longitude_of_central_time_zone = 30;
              break;

            case "EAT":
              longitude_of_central_time_zone = 45;
              break;

            case "MET":
              longitude_of_central_time_zone = 52.5;
              break;

            case "NET":
              longitude_of_central_time_zone = 60;
              break;

            case "PLT":
              longitude_of_central_time_zone = 75;
              break;

            case "IST":
              longitude_of_central_time_zone = 82.5;
              break;

            case "BST":
              longitude_of_central_time_zone = 90;
              break;

            case "VST":
              longitude_of_central_time_zone = 105;
              break;

            case "CTT":
              longitude_of_central_time_zone = 120;
              break;

            case "JST":
              longitude_of_central_time_zone = 135;
              break;

            case "ACT":
              longitude_of_central_time_zone = 142.5;
              break;

            case "AET":
              longitude_of_central_time_zone = 150;
              break;

            case "SST":
              longitude_of_central_time_zone = 165;
              break;

            case "NST":
              longitude_of_central_time_zone = 180;
              break;

            case "MIT":
              longitude_of_central_time_zone = 165;
              break;

            case "HST":
              longitude_of_central_time_zone = 150;
              break;

            case "AST":
              longitude_of_central_time_zone = 135;
              break;

            case "PST":
              longitude_of_central_time_zone = 120;
              break;

            case "PNT":
              longitude_of_central_time_zone = 105;
              break;

            case "MST":
              longitude_of_central_time_zone = 105;
              break;

            case "CST":
              longitude_of_central_time_zone = 90;
              break;

            case "EST":
              longitude_of_central_time_zone = 75;
              break;

            case "IET":
              longitude_of_central_time_zone = 75;
              break;

            case "PRT":
              longitude_of_central_time_zone = 60;
              break;

            case "CNT":
              longitude_of_central_time_zone = 52.5;
              break;

            case "AGT":
              longitude_of_central_time_zone = 45;
              break;

            case "BET":
              longitude_of_central_time_zone = 45;
              break;

            case "CAT":
              longitude_of_central_time_zone = 15;
              break;

            default:
              longitude_of_central_time_zone = 0;
          }

          returnData = referenceEvapotranspirationHourly(
            elevation,
            pressure,
            temperature,
            humidity,
            month,
            day,
            latitude_degree,
            actual_duration_of_sunshine_hours,
            windspeed_10m,
            midpoint_of_time,
            longitude_of_central_time_zone,
            longitude_degree
          );

          var finalResultCard = `<div class="col-6 ">
                <div class="custom-card">
                  <div class="custom-card-body city-selected">
                  <p >Elevation : ${returnData.elevation}&nbsp;m</p>
                  <p >pressure : ${returnData.pressure}&nbsp;kpa</p>
                  <p >psychrometric_constant : ${returnData.psychrometric_constant}</p>
                  <p > temperature : ${returnData.temperature}&nbsp;degrees</p>
                  <p > humidity : ${returnData.humidity}&nbsp;%</p>
                  <p >year : ${year}</p>
                  <p >month : ${returnData.month}</p>
                  <p >day : ${returnData.day}</p>
                  <p >latitude : ${returnData.latitude}</p>
                  <p >actual_duration_of_sunshine_hours : ${returnData.actual_duration_of_sunshine_hours}</p>
                  <p >wind_speed_2m : ${returnData.wind_speed_2m}&nbsp;m/s</p>
                  <p >Midpoint of time : ${returnData.midpoint_time}</p>
                  <p >Longitude of the centre of local time zone : ${returnData.longitude_of_the_centre_of_local_time_zone}</p>
                  <p >longitude of the measurement site : ${returnData.longitude_of_the_measurement_site}</p>
                  <p >reference_evapotranspiration : ${returnData.reference_evapotranspiration}&nbsp;mm/hr</p>
                  </div>
                </div>
              </div>`;

          $(".final-result").empty();
          $(".final-result").append(finalResultCard);
        });
    } else if (timePeriodOfEvapotranspiration === "daily") {
      var year = document.querySelector('[name="year"]').value;
      var month = document.querySelector('[name="month"]').value;
      var day = document.querySelector('[name="date"]').value;
      var latitude_degree = selectedCityLatitude;
      var actual_duration_of_sunshine_hours = document.querySelector(
        '[name="actualSunshineHours"]'
      ).value;

      var modifiedMonth = ("0" + month).slice(-2);
      var modifiedDay = ("0" + day).slice(-2);

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCityLatitude}&longitude=${selectedCityLongitude}&hourly=relative_humidity_2m,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto&start_date=${year}-${modifiedMonth}-${modifiedDay}&end_date=${year}-${modifiedMonth}-${modifiedDay}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          var size = data.hourly.time.length || 24;

          var pressure_accu = 0;
          var wind_speed_10m_accu = 0;
          var humidity_min = 100;
          var humidity_max = 0;

          for (var i = 0; i < size; i++) {
            wind_speed_10m_accu += data.hourly.wind_speed_10m[i];
            pressure_accu += data.hourly.surface_pressure[i];
            humidity_min = Math.min(
              humidity_min,
              data.hourly.relative_humidity_2m[i]
            );
            humidity_max = Math.max(
              humidity_max,
              data.hourly.relative_humidity_2m[i]
            );
          }

          var pressure = pressure_accu / size;
          pressure = pressure * 0.1;
          var wind_speed_10m = wind_speed_10m_accu / size;
          var max_temp_for_day = data.daily.temperature_2m_max[0];
          var min_temp_for_day = data.daily.temperature_2m_min[0];
          var elevation = data.elevation;

          returnData = referenceEvapotranspirationDaily(
            elevation,
            pressure,
            max_temp_for_day,
            min_temp_for_day,
            humidity_max,
            humidity_min,
            month,
            day,
            latitude_degree,
            actual_duration_of_sunshine_hours,
            wind_speed_10m
          );

          var finalResultCard = `<div class="col-6 ">
              <div class="custom-card">
                <div class="custom-card-body city-selected">
                <p >Elevation : ${returnData.elevation}&nbsp;m</p>
                <p >pressure : ${returnData.pressure}&nbsp;kpa</p>
                <p >psychrometric_constant : ${returnData.psychrometric_constant}</p>
                <p >max_temp_for_day : ${returnData.max_temp_for_day}&nbsp;degrees</p>
                <p > min_temp_for_day : ${returnData.min_temp_for_day}&nbsp;degrees</p>
                <p >relative_humidity_max : ${returnData.relative_humidity_max}&nbsp;%</p>
                <p >relative_humidity_min : ${returnData.relative_humidity_min}&nbsp;%</p>
                <p >year : ${year}</p>
                <p >month : ${returnData.month}</p>
                <p >day : ${returnData.day}</p>
                <p >latitude : ${returnData.latitude}</p>
                <p >actual_duration_of_sunshine_hours : ${returnData.actual_duration_of_sunshine_hours}</p>
                <p >wind_speed_2m : ${returnData.wind_speed_2m}&nbsp;m/s</p>
                <p >reference_evapotranspiration : ${returnData.reference_evapotranspiration}&nbsp;mm/day</p>
                </div>
              </div>
            </div>`;

          $(".final-result").empty();
          $(".final-result").append(finalResultCard);
        });
    } else {
      var year = document.querySelector('[name="year"]').value;
      var month = document.querySelector('[name="month"]').value;
      var day = document.querySelector('[name="date"]').value;
      var latitude_degree = selectedCityLatitude;
      var actual_duration_of_sunshine_hours = document.querySelector(
        '[name="actualSunshineHours"]'
      ).value;

      var startDay = "01";
      var endDay = 30;
      if (
        month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12
      ) {
        endDay = 31;
      }
      if (month === 2) endDay = 28;

      // to get the month in right format like 01,02,12
      var modifiedMonth = ("0" + month).slice(-2);

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCityLatitude}&longitude=${selectedCityLongitude}&hourly=relative_humidity_2m,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto&start_date=${year}-${modifiedMonth}-${startDay}&end_date=${year}-${modifiedMonth}-${endDay}`
      )
        .then((response) => response.json())
        .then((data) => {
          var minAvgTemp = 200;
          var maxAvgTemp = 0;

          var sizeForTempMax = data.daily.temperature_2m_max.length;
          var sizeForTempMin = data.daily.temperature_2m_min.length;

          for (var i = 0; i < sizeForTempMax; i++) {
            maxAvgTemp = Math.max(maxAvgTemp, data.daily.temperature_2m_max[i]);
          }

          for (var i = 0; i < sizeForTempMin; i++) {
            minAvgTemp = Math.min(minAvgTemp, data.daily.temperature_2m_min[i]);
          }

          // pressure average over data;
          var pressure_accu = 0;
          var sizeForPressure = data.hourly.surface_pressure.length;
          for (var i = 0; i < sizeForPressure; i++) {
            pressure_accu += data.hourly.surface_pressure[i];
          }
          var pressure = pressure_accu / sizeForPressure;
          pressure = pressure * 0.1;

          // wind average over data;
          var wind_accu_10m = 0;
          var sizeForwind = data.hourly.wind_speed_10m.length;
          for (var i = 0; i < sizeForwind; i++) {
            wind_accu_10m += data.hourly.wind_speed_10m[i];
          }
          var wind_speed_10m = wind_accu_10m / sizeForwind;

          var i = 0;
          var DailyMaxHumiAccu = 0;
          var DailyMinHumiAccu = 0;
          while (i < data.hourly.relative_humidity_2m.length) {
            var j = 0;
            var DailyMaxHumi = 0;
            var DailyMinHumi = 100;
            while (j < 24) {
              DailyMaxHumi = Math.max(
                DailyMaxHumi,
                data.hourly.relative_humidity_2m[i]
              );
              DailyMinHumi = Math.min(
                DailyMinHumi,
                data.hourly.relative_humidity_2m[i]
              );
              i++;
              j++;
            }
            DailyMaxHumiAccu += DailyMaxHumi;
            DailyMinHumiAccu += DailyMinHumi;
          }

          var AvgMaxHumidity =
            DailyMaxHumiAccu / (data.hourly.relative_humidity_2m.length / 24);
          var AvgMinHumidity =
            DailyMinHumiAccu / (data.hourly.relative_humidity_2m.length / 24);

          //  elevation
          var elevation = data.elevation;

          returnData = referenceEvapotranspirationMonthly(
            elevation,
            pressure,
            maxAvgTemp,
            minAvgTemp,
            AvgMaxHumidity,
            AvgMinHumidity,
            month,
            day,
            latitude_degree,
            actual_duration_of_sunshine_hours,
            wind_speed_10m
          );

          var finalResultCard = `<div class="col-6 ">
              <div class="custom-card">
                <div class="custom-card-body city-selected">
                <p >Elevation : ${returnData.elevation}&nbsp;m</p>
                <p >pressure : ${returnData.pressure}&nbsp;kpa</p>
                <p >psychrometric_constant : ${returnData.psychrometric_constant}</p>
                <p >average_max_temp_for_day : ${returnData.max_temp_for_day}&nbsp;degrees</p>
                <p >average_min_temp_for_day : ${returnData.min_temp_for_day}&nbsp;degrees</p>
                <p >average_relative_humidity_max : ${returnData.relative_humidity_max}&nbsp;%</p>
                <p >average_relative_humidity_min : ${returnData.relative_humidity_min}&nbsp;%</p>
                <p >year : ${year}</p>
                <p >month : ${returnData.month}</p>
                <p >day : ${returnData.day}</p>
                <p >latitude : ${returnData.latitude}</p>
                <p >actual_duration_of_sunshine_hours : ${returnData.actual_duration_of_sunshine_hours}</p>
                <p >average_wind_speed_2m : ${returnData.wind_speed_2m}&nbsp;m/s</p>
                <p >monthly_reference_evapotranspiration : ${returnData.reference_evapotranspiration_month}&nbsp;mm/month</p>
                </div>
              </div>
            </div>`;

          $(".final-result").empty();
          $(".final-result").append(finalResultCard);
        });
    }
  } else {
    if (timePeriodOfEvapotranspiration === "hourly") {
      var cropCoefficient = document.querySelector(
        '[name="cropCoefficient"]'
      ).value;

      var year = document.querySelector('[name="year"]').value;
      var month = document.querySelector('[name="month"]').value;
      var day = document.querySelector('[name="date"]').value;
      var midpoint_of_time = document.querySelector(
        '[name="standardTime"]'
      ).value;
      var latitude_degree = selectedCityLatitude;
      var longitude_degree = selectedCityLongitude;
      var actual_duration_of_sunshine_hours = document.querySelector(
        '[name="actualSunshineHours"]'
      ).value;

      var modifiedMonth = ("0" + month).slice(-2);
      var modifiedDay = ("0" + day).slice(-2);

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCityLatitude}&longitude=${selectedCityLongitude}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,wind_speed_10m&wind_speed_unit=ms&timezone=auto&start_date=${year}-${modifiedMonth}-${modifiedDay}&end_date=${year}-${modifiedMonth}-${modifiedDay}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          var index = Number(midpoint_of_time);
          index = Math.floor(index);

          var elevation = data.elevation;
          var temperature = data.hourly.temperature_2m[index];
          var humidity = data.hourly.relative_humidity_2m[index];
          var pressure = data.hourly.surface_pressure[index];
          var windspeed_10m = data.hourly.wind_speed_10m[index];
          var timezone = data.timezone_abbreviation;

          pressure = pressure * 0.1;

          // default value
          var longitude_of_central_time_zone = 0;

          switch (timezone) {
            case "GMT":
              longitude_of_central_time_zone = 0;
              break;

            case "UTC":
              longitude_of_central_time_zone = 0;
              break;

            case "ECT":
              longitude_of_central_time_zone = 15;
              break;

            case "EET":
              longitude_of_central_time_zone = 30;
              break;

            case "ART":
              longitude_of_central_time_zone = 30;
              break;

            case "EAT":
              longitude_of_central_time_zone = 45;
              break;

            case "MET":
              longitude_of_central_time_zone = 52.5;
              break;

            case "NET":
              longitude_of_central_time_zone = 60;
              break;

            case "PLT":
              longitude_of_central_time_zone = 75;
              break;

            case "IST":
              longitude_of_central_time_zone = 82.5;
              break;

            case "BST":
              longitude_of_central_time_zone = 90;
              break;

            case "VST":
              longitude_of_central_time_zone = 105;
              break;

            case "CTT":
              longitude_of_central_time_zone = 120;
              break;

            case "JST":
              longitude_of_central_time_zone = 135;
              break;

            case "ACT":
              longitude_of_central_time_zone = 142.5;
              break;

            case "AET":
              longitude_of_central_time_zone = 150;
              break;

            case "SST":
              longitude_of_central_time_zone = 165;
              break;

            case "NST":
              longitude_of_central_time_zone = 180;
              break;

            case "MIT":
              longitude_of_central_time_zone = 165;
              break;

            case "HST":
              longitude_of_central_time_zone = 150;
              break;

            case "AST":
              longitude_of_central_time_zone = 135;
              break;

            case "PST":
              longitude_of_central_time_zone = 120;
              break;

            case "PNT":
              longitude_of_central_time_zone = 105;
              break;

            case "MST":
              longitude_of_central_time_zone = 105;
              break;

            case "CST":
              longitude_of_central_time_zone = 90;
              break;

            case "EST":
              longitude_of_central_time_zone = 75;
              break;

            case "IET":
              longitude_of_central_time_zone = 75;
              break;

            case "PRT":
              longitude_of_central_time_zone = 60;
              break;

            case "CNT":
              longitude_of_central_time_zone = 52.5;
              break;

            case "AGT":
              longitude_of_central_time_zone = 45;
              break;

            case "BET":
              longitude_of_central_time_zone = 45;
              break;

            case "CAT":
              longitude_of_central_time_zone = 15;
              break;

            default:
              longitude_of_central_time_zone = 0;
          }

          returnData = referenceEvapotranspirationHourly(
            elevation,
            pressure,
            temperature,
            humidity,
            month,
            day,
            latitude_degree,
            actual_duration_of_sunshine_hours,
            windspeed_10m,
            midpoint_of_time,
            longitude_of_central_time_zone,
            longitude_degree
          );

          var cropEvapotranspiration =
            cropCoefficient * returnData.reference_evapotranspiration;

          var finalResultCard = `<div class="col-6 ">
                <div class="custom-card">
                  <div class="custom-card-body city-selected">
                  <p >Elevation : ${returnData.elevation}&nbsp;m</p>
                  <p >pressure : ${returnData.pressure}&nbsp;kpa</p>
                  <p >psychrometric_constant : ${returnData.psychrometric_constant}</p>
                  <p > temperature : ${returnData.temperature}&nbsp;degrees</p>
                  <p > humidity : ${returnData.humidity}&nbsp;%</p>
                  <p >year : ${year}</p>
                  <p >month : ${returnData.month}</p>
                  <p >day : ${returnData.day}</p>
                  <p >latitude : ${returnData.latitude}</p>
                  <p >actual_duration_of_sunshine_hours : ${returnData.actual_duration_of_sunshine_hours}</p>
                  <p >wind_speed_2m : ${returnData.wind_speed_2m}&nbsp;m/s</p>
                  <p >Midpoint of time : ${returnData.midpoint_time}</p>
                  <p >Longitude of the centre of local time zone : ${returnData.longitude_of_the_centre_of_local_time_zone}</p>
                  <p >longitude of the measurement site : ${returnData.longitude_of_the_measurement_site}</p>
                  <p >reference_evapotranspiration : ${returnData.reference_evapotranspiration}&nbsp;mm/hr</p>
                  <p >Crop coefficient : ${cropCoefficient}</p>
                  <p >crop_evapotranspiration : ${cropEvapotranspiration}&nbsp;mm/hr</p>
                  </div>
                </div>
              </div>`;

          $(".final-result").empty();
          $(".final-result").append(finalResultCard);
        });
    } else if (timePeriodOfEvapotranspiration === "daily") {
      var cropCoefficient = document.querySelector(
        '[name="cropCoefficient"]'
      ).value;
      var year = document.querySelector('[name="year"]').value;
      var month = document.querySelector('[name="month"]').value;
      var day = document.querySelector('[name="date"]').value;
      var latitude_degree = selectedCityLatitude;
      var actual_duration_of_sunshine_hours = document.querySelector(
        '[name="actualSunshineHours"]'
      ).value;

      var modifiedMonth = ("0" + month).slice(-2);
      var modifiedDay = ("0" + day).slice(-2);

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCityLatitude}&longitude=${selectedCityLongitude}&hourly=relative_humidity_2m,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto&start_date=${year}-${modifiedMonth}-${modifiedDay}&end_date=${year}-${modifiedMonth}-${modifiedDay}`
      )
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);

          var size = data.hourly.time.length;

          var pressure_accu = 0;
          var wind_speed_10m_accu = 0;
          var humidity_min = 100;
          var humidity_max = 0;

          for (var i = 0; i < size; i++) {
            wind_speed_10m_accu += data.hourly.wind_speed_10m[i];
            pressure_accu += data.hourly.surface_pressure[i];
            humidity_min = Math.min(
              humidity_min,
              data.hourly.relative_humidity_2m[i]
            );
            humidity_max = Math.max(
              humidity_max,
              data.hourly.relative_humidity_2m[i]
            );
          }

          var pressure = pressure_accu / size;
          pressure = pressure * 0.1;
          var wind_speed_10m = wind_speed_10m_accu / size;
          var max_temp_for_day = data.daily.temperature_2m_max[0];
          var min_temp_for_day = data.daily.temperature_2m_min[0];
          var elevation = data.elevation;

          returnData = referenceEvapotranspirationDaily(
            elevation,
            pressure,
            max_temp_for_day,
            min_temp_for_day,
            humidity_max,
            humidity_min,
            month,
            day,
            latitude_degree,
            actual_duration_of_sunshine_hours,
            wind_speed_10m
          );

          var cropEvapotranspiration =
            returnData.reference_evapotranspiration * cropCoefficient;
          var finalResultCard = `<div class="col-6 ">
              <div class="custom-card">
                <div class="custom-card-body city-selected">
                <p >Elevation : ${returnData.elevation}&nbsp;m</p>
                <p >pressure : ${returnData.pressure}&nbsp;kpa</p>
                <p >psychrometric_constant : ${returnData.psychrometric_constant}</p>
                <p >max_temp_for_day : ${returnData.max_temp_for_day}&nbsp;degrees</p>
                <p > min_temp_for_day : ${returnData.min_temp_for_day}&nbsp;degrees</p>
                <p >relative_humidity_max : ${returnData.relative_humidity_max}&nbsp;%</p>
                <p >relative_humidity_min : ${returnData.relative_humidity_min}&nbsp;%</p>
                <p >month : ${returnData.month}</p>
                <p >day : ${returnData.day}</p>
                <p >latitude : ${returnData.latitude}</p>
                <p >actual_duration_of_sunshine_hours : ${returnData.actual_duration_of_sunshine_hours}</p>
                <p >wind_speed_2m : ${returnData.wind_speed_2m}&nbsp;m/s</p>
                <p >Crop Coefficient : ${cropCoefficient}</p> 
                <p >Reference_evapotranspiration : ${returnData.reference_evapotranspiration} &nbsp;mm/day</p>
                <p >Crop_evapotranspiration : ${cropEvapotranspiration}&nbsp;mm/day</p>
                </div>
              </div>
            </div>`;

          $(".final-result").empty();
          $(".final-result").append(finalResultCard);
        });
    } else {
      var cropCoefficient = document.querySelector(
        '[name="cropCoefficient"]'
      ).value;
      var year = document.querySelector('[name="year"]').value;
      var month = document.querySelector('[name="month"]').value;
      var day = document.querySelector('[name="date"]').value;
      var latitude_degree = selectedCityLatitude;
      var actual_duration_of_sunshine_hours = document.querySelector(
        '[name="actualSunshineHours"]'
      ).value;

      var startDay = "01";
      var endDay = 30;
      if (
        month === 1 ||
        month === 3 ||
        month === 5 ||
        month === 7 ||
        month === 8 ||
        month === 10 ||
        month === 12
      ) {
        endDay = 31;
      }
      if (month === 2) endDay = 28;

      // to get the month in right format like 01,02,12
      var modifiedMonth = ("0" + month).slice(-2);

      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${selectedCityLatitude}&longitude=${selectedCityLongitude}&hourly=relative_humidity_2m,surface_pressure,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&wind_speed_unit=ms&timezone=auto&start_date=${year}-${modifiedMonth}-${startDay}&end_date=${year}-${modifiedMonth}-${endDay}`
      )
        .then((response) => response.json())
        .then((data) => {
          var minAvgTemp = 200;
          var maxAvgTemp = 0;
          var sizeForTempMax = data.daily.temperature_2m_max.length;
          var sizeForTempMin = data.daily.temperature_2m_min.length;
          for (var i = 0; i < sizeForTempMax; i++) {
            maxAvgTemp = Math.max(maxAvgTemp, data.daily.temperature_2m_max[i]);
          }

          for (var i = 0; i < sizeForTempMin; i++) {
            minAvgTemp = Math.min(minAvgTemp, data.daily.temperature_2m_min[i]);
          }

          // pressure average over data;
          var pressure_accu = 0;
          var sizeForPressure = data.hourly.surface_pressure.length;
          for (var i = 0; i < sizeForPressure; i++) {
            pressure_accu += data.hourly.surface_pressure[i];
          }
          var pressure = pressure_accu / sizeForPressure;
          pressure = pressure * 0.1;

          // wind average over data;
          var wind_accu_10m = 0;
          var sizeForwind = data.hourly.wind_speed_10m.length;
          for (var i = 0; i < sizeForwind; i++) {
            wind_accu_10m += data.hourly.wind_speed_10m[i];
          }
          var wind_speed_10m = wind_accu_10m / sizeForwind;

          var i = 0;
          var DailyMaxHumiAccu = 0;
          var DailyMinHumiAccu = 0;
          while (i < data.hourly.relative_humidity_2m.length) {
            var j = 0;
            var DailyMaxHumi = 0;
            var DailyMinHumi = 100;
            while (j < 24) {
              DailyMaxHumi = Math.max(
                DailyMaxHumi,
                data.hourly.relative_humidity_2m[i]
              );
              DailyMinHumi = Math.min(
                DailyMinHumi,
                data.hourly.relative_humidity_2m[i]
              );
              i++;
              j++;
            }
            DailyMaxHumiAccu += DailyMaxHumi;
            DailyMinHumiAccu += DailyMinHumi;
          }

          var AvgMaxHumidity =
            DailyMaxHumiAccu / (data.hourly.relative_humidity_2m.length / 24);
          var AvgMinHumidity =
            DailyMinHumiAccu / (data.hourly.relative_humidity_2m.length / 24);

          //  elevation
          var elevation = data.elevation;

          returnData = referenceEvapotranspirationMonthly(
            elevation,
            pressure,
            maxAvgTemp,
            minAvgTemp,
            AvgMaxHumidity,
            AvgMinHumidity,
            month,
            day,
            latitude_degree,
            actual_duration_of_sunshine_hours,
            wind_speed_10m
          );

          var cropEvapotranspirationMonth =
            returnData.reference_evapotranspiration_month * cropCoefficient;

          var finalResultCard = `<div class="col-6 ">
              <div class="custom-card">
                <div class="custom-card-body city-selected">
                <p >Elevation : ${returnData.elevation}&nbsp;m</p>
                <p >pressure : ${returnData.pressure}&nbsp;kpa</p>
                <p >psychrometric_constant : ${returnData.psychrometric_constant}</p>
                <p >average_max_temp_for_day : ${returnData.max_temp_for_day}&nbsp;degrees</p>
                <p >average_min_temp_for_day : ${returnData.min_temp_for_day}&nbsp;degrees</p>
                <p >average_relative_humidity_max : ${returnData.relative_humidity_max}&nbsp;%</p>
                <p >average_relative_humidity_min : ${returnData.relative_humidity_min}&nbsp;%</p>
                <p >year : ${year}</p>
                <p >month : ${returnData.month}</p>
                <p >day : ${returnData.day}</p>
                <p >latitude : ${returnData.latitude}</p>
                <p >actual_duration_of_sunshine_hours : ${returnData.actual_duration_of_sunshine_hours}</p>
                <p >average_wind_speed_2m : ${returnData.wind_speed_2m}&nbsp;m/s</p>
                <p >monthly_reference_evapotranspiration : ${returnData.reference_evapotranspiration_month}&nbsp;mm/month</p>
                <p >Crop coefficient : ${cropCoefficient}</p>
                <p >monthly_crop_evapotranspiration : ${cropEvapotranspirationMonth}&nbsp;mm/month</p>
                </div>
              </div>
            </div>`;

          $(".final-result").empty();
          $(".final-result").append(finalResultCard);
        });
    }
  }
});

// functions

function referenceEvapotranspirationMonthly(
  z,
  pressure,
  max_temp_for_day,
  min_temp_for_day,
  humidity_max,
  humidity_min,
  month,
  day,
  latitude_degree,
  actual_duration_of_sunshine_hours,
  wind_speed_10m
) {
  var psychrometric_constant = 0.000665 * pressure;

  var max_temp = max_temp_for_day;
  var min_temp = min_temp_for_day;
  var mean_temp = (min_temp + max_temp) / 2;

  var saturation_vapour_pressure_max =
    0.6108 * Math.exp((17.27 * max_temp) / (max_temp + 237.3));
  var saturation_vapour_pressure_min =
    0.6108 * Math.exp((17.27 * min_temp) / (min_temp + 237.3));
  var saturation_vapour_pressure_mean =
    (saturation_vapour_pressure_max + saturation_vapour_pressure_min) / 2;

  var temp = mean_temp + 237.3;
  var temp1 = temp * temp;
  var slope_sat_vap_pre_curve =
    (4098 * (0.6108 * Math.exp((17.27 * mean_temp) / temp))) / temp1;

  var relative_humidity_max = humidity_max;
  var relative_humidity_min = humidity_min;

  var actual_vapour_pressure =
    (saturation_vapour_pressure_max * relative_humidity_min +
      saturation_vapour_pressure_min * relative_humidity_max) /
    (2 * 100);

  var vapour_pressure_deficit =
    saturation_vapour_pressure_mean - actual_vapour_pressure;

  var solar_constant = 0.082;

  var j = 30 * (month - 1) + day + Math.ceil(day / 2);

  var inverse_relative_distance = 1 + 0.033 * Math.cos((2 * 3.1415 * j) / 365);

  var solar_declination = 0.409 * Math.sin((2 * 3.1415 * j) / 365 - 1.39);

  var temp_lat = latitude_degree;

  var latitude = (3.1415 * temp_lat) / 180;

  var temp2 = Math.tan(latitude);
  var temp3 = Math.tan(solar_declination);
  var temp4 = 1 - temp2 * temp2 * temp3 * temp3;
  if (temp4 <= 0) temp4 = 0.00001;

  var sunset_hour_angle =
    3.1415 / 2 - Math.atan((-temp2 * temp3) / Math.pow(temp4, 0.5));

  var temp5 = (24 * 60) / 3.1415;
  var temp6 = temp5 * solar_constant * inverse_relative_distance;
  var temp7 =
    sunset_hour_angle * Math.sin(solar_declination) * Math.sin(latitude) +
    Math.cos(latitude) *
      Math.cos(solar_declination) *
      Math.sin(sunset_hour_angle);

  var extraterrestrial_radiation = temp6 * temp7;

  var daylight_hours = (24 * sunset_hour_angle) / 3.1415;

  var actual_duration_of_sunshine = actual_duration_of_sunshine_hours;

  var temp8 = actual_duration_of_sunshine / daylight_hours;
  var solar_radiation = (0.25 + 0.5 * temp8) * extraterrestrial_radiation;

  var clear_sky_solar_radiation =
    (0.75 + 0.00002 * z) * extraterrestrial_radiation;

  var net_shortwave_radiation = (1 - 0.23) * solar_radiation;

  var temp9 =
    4.903 *
    0.0001 *
    0.00001 *
    (0.34 - 0.14 * Math.sqrt(actual_vapour_pressure));
  var temp10 = (1.35 * solar_radiation) / clear_sky_solar_radiation - 0.35;
  var temp11 = (max_temp + 273.16 + (min_temp + 273.16)) / 2;

  var net_longwave_radiation = temp9 * temp10 * temp11;

  var net_radiation = net_shortwave_radiation - net_longwave_radiation;

  // for simplicity purpose i am assuming the difference to be 2';
  // var soil_heat_flux = 0.14 * (mean_temp - prev_temp);
  var soil_heat_flux = 0.14 * 2;

  var wind_speed_height = wind_speed_10m;

  var temp50 = Math.log(67.8 * 10 - 5.42);

  var wind_speed = (wind_speed_height * 4.87) / temp50;

  var temp12 =
    0.408 * slope_sat_vap_pre_curve * (net_radiation - soil_heat_flux);
  var temp13 =
    (psychrometric_constant * 900 * wind_speed * vapour_pressure_deficit) /
    (mean_temp + 273);
  var temp14 =
    slope_sat_vap_pre_curve + psychrometric_constant * (1 + 0.34 * wind_speed);

  var reference_evapotranspiration = (temp12 + temp13) / temp14;

  var reference_evapotranspiration_month = reference_evapotranspiration * 30;

  return {
    elevation: z,
    pressure: pressure,
    psychrometric_constant: psychrometric_constant,
    max_temp_for_day: max_temp,
    min_temp_for_day: min_temp,
    relative_humidity_max: humidity_max,
    relative_humidity_min: humidity_min,
    month: month,
    day: day,
    latitude: latitude_degree,
    actual_duration_of_sunshine_hours: actual_duration_of_sunshine,
    wind_speed_2m: wind_speed,
    reference_evapotranspiration_month: reference_evapotranspiration_month,
  };
}

function referenceEvapotranspirationDaily(
  z,
  pressure,
  max_temp_for_day,
  min_temp_for_day,
  humidity_max,
  humidity_min,
  month,
  day,
  latitude_degree,
  actual_duration_of_sunshine_hours,
  wind_speed_10m
) {
  var psychrometric_constant = 0.000665 * pressure;

  var max_temp = max_temp_for_day;
  var min_temp = min_temp_for_day;

  var mean_temp = (min_temp + max_temp) / 2;

  var saturation_vapour_pressure_max =
    0.6108 * Math.exp((17.27 * max_temp) / (max_temp + 237.3));

  var saturation_vapour_pressure_min =
    0.6108 * Math.exp((17.27 * min_temp) / (min_temp + 237.3));

  var saturation_vapour_pressure_mean =
    (saturation_vapour_pressure_max + saturation_vapour_pressure_min) / 2;

  var temp = mean_temp + 237.3;
  var temp1 = temp * temp;
  var slope_sat_vap_pre_curve =
    (4098 * (0.6108 * Math.exp((17.27 * mean_temp) / temp))) / temp1;

  var relative_humidity_max = humidity_min;
  var relative_humidity_min = humidity_max;

  var actual_vapour_pressure =
    (saturation_vapour_pressure_max * relative_humidity_min +
      saturation_vapour_pressure_min * relative_humidity_max) /
    (2 * 100);

  var vapour_pressure_deficit =
    saturation_vapour_pressure_mean - actual_vapour_pressure;

  var solar_constant = 0.082;

  var j = 30 * (month - 1) + day + Math.ceil(day / 2);

  var inverse_relative_distance = 1 + 0.033 * Math.cos((2 * 3.1415 * j) / 365);

  var solar_declination = 0.409 * Math.sin((2 * 3.1415 * j) / 365 - 1.39);

  var temp_lat = latitude_degree;

  var latitude = (3.1415 * temp_lat) / 180;

  var temp2 = Math.tan(latitude);
  var temp3 = Math.tan(solar_declination);
  var temp4 = 1 - temp2 * temp2 * temp3 * temp3;
  if (temp4 <= 0) temp4 = 0.00001;

  var sunset_hour_angle =
    3.1415 / 2 - Math.atan((-temp2 * temp3) / Math.pow(temp4, 0.5));

  var temp5 = (24 * 60) / 3.1415;
  var temp6 = temp5 * solar_constant * inverse_relative_distance;
  var temp7 =
    sunset_hour_angle * Math.sin(solar_declination) * Math.sin(latitude) +
    Math.cos(latitude) *
      Math.cos(solar_declination) *
      Math.sin(sunset_hour_angle);

  var extraterrestrial_radiation = temp6 * temp7;

  var daylight_hours = (24 * sunset_hour_angle) / 3.1415;

  var actual_duration_of_sunshine = actual_duration_of_sunshine_hours;

  var temp8 = actual_duration_of_sunshine / daylight_hours;

  var solar_radiation = (0.25 + 0.5 * temp8) * extraterrestrial_radiation;

  var clear_sky_solar_radiation =
    (0.75 + 0.00002 * z) * extraterrestrial_radiation;

  var net_shortwave_radiation = (1 - 0.23) * solar_radiation;

  var temp9 =
    4.903 *
    0.0001 *
    0.00001 *
    (0.34 - 0.14 * Math.sqrt(actual_vapour_pressure));
  var temp10 = (1.35 * solar_radiation) / clear_sky_solar_radiation - 0.35;
  var temp11 = (max_temp + 273.16 + (min_temp + 273.16)) / 2;

  var net_longwave_radiation = temp9 * temp10 * temp11;

  var net_radiation = net_shortwave_radiation - net_longwave_radiation;

  // here assume the value of soil heat flux;
  var soil_heat_flux = 0;

  var wind_speed_height = wind_speed_10m;

  var temp50 = Math.log(67.8 * 10 - 5.42);

  // wind speed at 2m
  var wind_speed = (wind_speed_height * 4.87) / temp50;

  var temp12 =
    0.408 * slope_sat_vap_pre_curve * (net_radiation - soil_heat_flux);
  var temp13 =
    (psychrometric_constant * 900 * wind_speed * vapour_pressure_deficit) /
    (mean_temp + 273);
  var temp14 =
    slope_sat_vap_pre_curve + psychrometric_constant * (1 + 0.34 * wind_speed);

  // in mm/day
  var reference_evapotranspiration = (temp12 + temp13) / temp14;
  return {
    elevation: z,
    pressure: pressure,
    psychrometric_constant: psychrometric_constant,
    max_temp_for_day: max_temp,
    min_temp_for_day: min_temp,
    relative_humidity_max: humidity_max,
    relative_humidity_min: humidity_min,
    month: month,
    day: day,
    latitude: latitude_degree,
    actual_duration_of_sunshine_hours: actual_duration_of_sunshine,
    wind_speed_2m: wind_speed,
    reference_evapotranspiration: reference_evapotranspiration,
  };
}

function referenceEvapotranspirationHourly(
  z,
  pressure,
  temperature,
  humidity,
  month,
  day,
  latitude_degree,
  actual_duration_of_sunshine_hours,
  wind_speed_10m,
  midpoint_time,
  longitude_of_the_centre_of_local_time_zone,
  longitude_of_the_measurement_site
) {
  // this pressure is in kpa
  var psychrometric_constant = 0.000665 * pressure;

  // temperature is in celcius
  // for hourly calculations min and max temp are considered same
  var max_temp = temperature;
  var min_temp = temperature;
  var mean_temp = (min_temp + max_temp) / 2;

  // lets calculate saturation vapour pressure
  var saturation_vapour_pressure_max =
    0.6108 * Math.exp((17.27 * max_temp) / (max_temp + 237.3));
  var saturation_vapour_pressure_min =
    0.6108 * Math.exp((17.27 * min_temp) / (min_temp + 237.3));
  var saturation_vapour_pressure_mean =
    (saturation_vapour_pressure_max + saturation_vapour_pressure_min) / 2;

  // calculation of slope of ssaturation vapour pressure
  var temp = mean_temp + 237.3;
  var temp1 = temp * temp;
  var slope_sat_vap_pre_curve =
    (4098 * (0.6108 * Math.exp((17.27 * mean_temp) / temp))) / temp1;

  // maximum and minimum relative humidity are considered equal for hourly periods
  // humidity is in %
  var relative_humidity_max = humidity;
  var relative_humidity_min = humidity;

  // actual vapour pressure
  var actual_vapour_pressure =
    (saturation_vapour_pressure_max * relative_humidity_min +
      saturation_vapour_pressure_min * relative_humidity_max) /
    (2 * 100);

  // deficit
  var vapour_pressure_deficit =
    saturation_vapour_pressure_mean - actual_vapour_pressure;

  // radiation
  // extraterrestrial_radiation

  var solar_constant = 0.082;
  var j = 30 * (month - 1) + day + Math.ceil(day / 2);
  var inverse_relative_distance = 1 + 0.033 * Math.cos((2 * 3.1415 * j) / 365);
  var solar_declination = 0.409 * Math.sin((2 * 3.1415 * j) / 365 - 1.39);

  // latitude is in degrees
  var latitude = (3.1415 * latitude_degree) / 180;

  var temp2 = Math.tan(latitude);
  var temp3 = Math.tan(solar_declination);
  var temp4 = 1 - temp2 * temp2 * temp3 * temp3;
  if (temp4 <= 0) temp4 = 0.00001;

  var sunset_hour_angle =
    3.1415 / 2 - Math.atan((-temp2 * temp3) / Math.pow(temp4, 0.5));

  var standard_clock_time_at_midpoint = Number(midpoint_time);

  var temp15 = 3.1415 / 12;
  var temp22 = j - 81;
  var b = (2 * 3.1415 * temp22) / 364;

  var seasonal_correction_of_solar_time =
    0.1645 * Math.sin(2 * b) - 0.1255 * Math.cos(b) - 0.025 * Math.sin(b);

  var temp23 =
    0.06667 *
    (longitude_of_the_centre_of_local_time_zone -
      longitude_of_the_measurement_site);

  var tempNew1 = standard_clock_time_at_midpoint + temp23;
  var tempNew2 = seasonal_correction_of_solar_time - 12;

  var tempNew = tempNew1 + tempNew2;

  var solar_time_angle_at_midpoint_of_period = temp15 * tempNew;

  var solar_time_angle_at_start =
    solar_time_angle_at_midpoint_of_period - (3.1415 * 1) / 24;
  // console.log(solar_time_angle_at_start, "solar_time_angle_at_start");
  var solar_time_angle_at_end =
    solar_time_angle_at_midpoint_of_period + (3.1415 * 1) / 24;

  var temp5 = (12 * 60) / 3.1415;
  var temp6 = temp5 * solar_constant * inverse_relative_distance;
  var temp7 =
    (solar_time_angle_at_end - solar_time_angle_at_start) *
    Math.sin(latitude) *
    Math.sin(solar_declination);
  var temp20 =
    Math.cos(latitude) *
    Math.cos(solar_declination) *
    (Math.sin(solar_time_angle_at_end) - Math.sin(solar_time_angle_at_start));

  var extraterrestrial_radiation = temp6 * (temp7 + temp20);
  // ................................

  var daylight_hours = (24 * sunset_hour_angle) / 3.1415;

  var actual_duration_of_sunshine = actual_duration_of_sunshine_hours;

  var temp8 = actual_duration_of_sunshine / daylight_hours;

  var solar_radiation = (0.25 + 0.5 * temp8) * extraterrestrial_radiation;

  var clear_sky_solar_radiation =
    (0.75 + 0.00002 * z) * extraterrestrial_radiation;

  var net_shortwave_radiation = (1 - 0.23) * solar_radiation;
  // .......................................
  // console.log(net_shortwave_radiation, "net_shortwave_radiation");
  var temp9 =
    4.903 *
    0.0001 *
    0.00001 *
    (0.34 - 0.14 * Math.sqrt(actual_vapour_pressure));
  var temp10 = (1.35 * solar_radiation) / clear_sky_solar_radiation - 0.35;
  var temp11 = (max_temp + 273.16 + (min_temp + 273.16)) / 2;

  var net_longwave_radiation = temp9 * temp10 * temp11;

  var net_radiation = net_shortwave_radiation - net_longwave_radiation;

  var soil_heat_flux = 0.1 * net_radiation;

  var temp50 = Math.log(67.8 * 10 - 5.42);
  var wind_speed = (wind_speed_10m * 4.87) / temp50;

  var temp12 =
    0.408 * slope_sat_vap_pre_curve * (net_radiation - soil_heat_flux);
  var temp13 =
    (psychrometric_constant * 900 * wind_speed * vapour_pressure_deficit) /
    (mean_temp + 273);
  var temp14 =
    slope_sat_vap_pre_curve + psychrometric_constant * (1 + 0.34 * wind_speed);

  var reference_evapotranspiration = (temp12 + temp13) / temp14;

  return {
    elevation: z,
    pressure: pressure,
    psychrometric_constant: psychrometric_constant,
    temperature: temperature,
    humidity: humidity,
    month: month,
    day: day,
    latitude: latitude_degree,
    actual_duration_of_sunshine_hours: actual_duration_of_sunshine,
    wind_speed_2m: wind_speed,
    midpoint_time: midpoint_time,
    longitude_of_the_centre_of_local_time_zone:
      longitude_of_the_centre_of_local_time_zone,
    longitude_of_the_measurement_site: longitude_of_the_measurement_site,
    reference_evapotranspiration: reference_evapotranspiration,
  };
}
