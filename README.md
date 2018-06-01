# Weather-cli

A Node CLI app to display current weather information for your location, as well as the forecast for today and tomorrow on the command line.

Weather data from [Open Weather Map API](https://openweathermap.org/api "Open Weather Map API").

## Features

![Preview](https://raw.github.com/sandralundgren/weather-cli/master/preview.png)

Displays a brief summary of:

- Current weather, temperature, humidity and cloudiness

- Today's forecast

- Tomorrow's forecast

Forecasts are shown with min-max temperatures.

### Options

Metric units are the default. You can specify imperial units with the -f flag and metric with the -c flag.

You can also specify which unit to use (-c for Celsius, -f for Fahrenheit).

View wind speed information with the flag -w.

View sunrise and sunset times with the flag -s.


## How to use

Get a free Open Weather Map API key.

Create a .env file based on .env.sample and add your Open Weather Map API key.


## Notes

OpenWeatherMap's [Weather Condition Codes](https://openweathermap.org/weather-conditions "Open Weather Map API")

