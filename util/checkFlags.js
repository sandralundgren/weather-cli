const checkFlags = (flags, opts) => {
  if (flags.fahrenheit || flags.f) {
    opts.unitsFormat = 'imperial';
    opts.temperature = '°F';
    opts.windSpeed = 'miles/hour';
  }
  if (flags.wind || flags.w) {
    opts.showWindInfo = true;
  }   
  if (flags.sun || flags.s) {
    opts.showSunInfo = true;
  }
  return opts;
}

module.exports = checkFlags;
