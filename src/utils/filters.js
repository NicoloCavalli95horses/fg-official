const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/

const filters = {
  mmss: (length) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let totalseconds = 0;

    if (!reptms.test(length)) {
      return undefined;
    }

    let matches = reptms.exec(length);

    if (matches[1]) {
      hours = Number(matches[1]);
      hours < 9 ? (hours = '0' + hours) : true;
    }

    if (matches[2]) {
      minutes = Number(matches[2]);
      minutes < 9 ? (minutes = '0' + minutes) : true;
    }

    if (matches[3]) {
      seconds = Number(matches[3]);
      seconds < 9 ? (seconds = '0' + seconds) : true;
    }
    return { hours, minutes, seconds }
  },

  slice: (title, length = 40) => {
    return title.length < length ? title : (title = title.slice(0, length) + '...');
  },
}

export default filters
