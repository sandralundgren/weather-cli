const meow = require('meow');

const cliFlags = meow(`
  Usage
    $ say-weather <flag>

  Options
    --celcius, -c     Show temperature in celcius degrees
    --fahrenheit, -f  Show temperature in fahrenheit degrees
    --wind, -w        Show wind speed
    --sun, -s         Show sunrise and sunset times
`, {
  flags: {
    celcius: {
      type: 'boolean',
      alias: 'c'
    },
    fahrenheit: {
      type: 'boolean',
      alias: 'f'
    },
    wind: {
      type: 'boolean',
      alias: 'w'
    },
    sun: {
      type: 'boolean',
      alias: 's'
    }
  }
});

module.exports = cliFlags;
