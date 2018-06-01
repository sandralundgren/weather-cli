const moment = require('moment');

const getHumanTime = (data) => {
  const utcSunset = moment.utc(data * 1000).format('HH:mm');
  const localSunset = moment(data * 1000).local().toDate().toTimeString();

  return {
    utc: utcSunset,
    local: localSunset
  };
}

module.exports = getHumanTime;
