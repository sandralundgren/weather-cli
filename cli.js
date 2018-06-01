#!/usr/bin/env node

const axios  = require('axios');
const meow   = require('meow');
const moment = require('moment');
const chalk  = require('chalk');
const dotenv = require('dotenv');

const cliFlags       = require('./cliFlags');
const defaultOptions = require('./defaultOptions');
const checkFlags     = require('./util/checkFlags');
const getEmoji       = require('./util/getEmoji');
const getHumanTime   = require('./util/getHumanTime');

dotenv.config();

const openWeatherAPIKEY = process.env.OPEN_WEATHER_API_KEY;

(async () => {

  const currentOptions = checkFlags(cliFlags.flags, defaultOptions);

  try {
    let res = await axios.get('http://ipinfo.io');

    const latLon = res.data.loc.split(',');
    const lat = latLon[0];
    const lon = latLon[1];

    const openWeatherBaseURL = 'http://api.openweathermap.org/data/2.5';
    const currentOpenWeatherURL = `${openWeatherBaseURL}/weather?q=&lat=${lat}&lon=${lon}&units=${currentOptions.unitsFormat}&appid=${openWeatherAPIKEY}`;

    const daysCount = 2;
    const forecastOpenWeatherURL = `${openWeatherBaseURL}/forecast/daily?q=&lat=${lat}&lon=${lon}&cnt=${daysCount}&units=${currentOptions.unitsFormat}&appid=${openWeatherAPIKEY}`;

    const weatherRes = await axios.get(currentOpenWeatherURL);
    const weatherForecast = await axios.get(forecastOpenWeatherURL);

    const now = Math.floor(moment().utc().valueOf()/1000);
    const todaysSunrise = weatherRes.data.sys.sunrise;
    const todaysSunset = weatherRes.data.sys.sunset;

    const beforeSunset = moment(now).isSameOrBefore(todaysSunset);

    const weatherCodeNow = weatherRes.data.weather[0].id;
    const weatherEmojiNow = getEmoji(weatherCodeNow, beforeSunset);
    const weatherMain = weatherRes.data.weather[0].main;
    const weatherDesc = weatherRes.data.weather[0].description;
    const humidity = weatherRes.data.main.humidity;
    const clouds = weatherRes.data.clouds.all;
    const temp = Math.ceil(weatherRes.data.main.temp);

    const forecastArr = weatherForecast.data.list;

    const todayMinTemp = Math.ceil(forecastArr[0].temp.min);
    const todayMaxTemp = Math.ceil(forecastArr[0].temp.max);
    const todayMain = forecastArr[0].weather[0].main;
    const weatherCodeToday = forecastArr[0].weather[0].id;
    const weatherEmojiToday = getEmoji(weatherCodeToday);

    const tomorrowMinTemp = Math.ceil(forecastArr[1].temp.min);
    const tomorrowMaxTemp = Math.ceil(forecastArr[1].temp.max);
    const tomorrowMain = forecastArr[1].weather[0].main;
    const weatherCodeTomorrow = forecastArr[1].weather[0].id;
    const weatherEmojiTomorrow = getEmoji(weatherCodeTomorrow);

    const weatherLocation = `Weather in ${res.data.city}, ${res.data.country}. ${moment().toDate()}\n`;
    const weatherNow = `Now: ${weatherEmojiNow}  ${weatherMain}, ${weatherDesc}, ${chalk.yellow.bold(temp) + chalk.yellow.bold(currentOptions.temperature)}.`;
    let weatherNowAddition = `${humidity}% humidity and ${clouds}% cloudiness. `;

    let windInfo = '';
    if (currentOptions.showWindInfo) {
      windInfo = `Wind speed: ${weatherRes.data.wind.speed} ${currentOptions.windSpeed}. `;
      weatherNowAddition += windInfo;
    }
    let sunInfo = '';
    if (currentOptions.showSunInfo) {
      sunInfo = `Sunrise at ${getHumanTime(todaysSunrise).local}. Sunset at ${getHumanTime(todaysSunset).local}.`;
    }
    const weatherToday = `Today: ${weatherEmojiToday}  ${todayMain}, ${todayMaxTemp}${currentOptions.temperature} - ${todayMinTemp}${currentOptions.temperature}.`;
    const weatherTomorrow = `Tomorrow: ${weatherEmojiTomorrow}  ${tomorrowMain}, ${tomorrowMaxTemp}${currentOptions.temperature} - ${tomorrowMinTemp}${currentOptions.temperature}`;

    console.log(`${weatherLocation}\n${weatherNow}\n${weatherNowAddition}\n${weatherToday} ${sunInfo}\n${weatherTomorrow}.`);
  }
  catch(err) {
    console.log(`Error: ${err}. ${err.response.status} ${err.response.statusText}`);
    if (/^5\d\d/.test(err.response.status)) {
      console.log('Server error 💩');
    }
  }

})();
