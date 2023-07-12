const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/

const filters = {
  mmss: (length) => {
    let hh = 0;
    let mm = 0;
    let ss = 0;

    if (!reptms.test(length)) {
      return undefined;
    }

    let matches = reptms.exec(length);

    if (matches[1]) {
      hh = Number(matches[1]);
      hh < 9 ? (hh = '0' + hh) : true;
    }

    if (matches[2]) {
      mm = Number(matches[2]);
      mm < 9 ? (mm = '0' + mm) : true;
    }

    if (matches[3]) {
      ss = Number(matches[3]);
      ss < 9 ? (ss = '0' + ss) : true;
    }
    return { hh, mm, ss }
  },

  slice: (title, length = 40) => {
    return title.length < length ? title : (title = title.slice(0, length) + '...');
  },
}

export default filters
