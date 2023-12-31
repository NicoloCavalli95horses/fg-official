import filters from './filters'

/**
 *
 * @param {Object} args
 * @param {string} args.string - the ID of the YouTube video (e.g., DUMUhDF2vek)
 * @returns YouTube video information: title, year, src, href, duration
 */
export async function apiGetYouTubeData({ firebase_id, yt_id }) {
  const data = {
    firebase_id,
    yt_id,
    title: '',
    year: -1,
    src: '',
    href: '',
    duration: ''
  }

  const requests = [
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${yt_id}&key=AIzaSyApcFqDDN0iy1-gy1gD6zYB-biOqxiTcus`
    ),
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${yt_id}&part=contentDetails&key=AIzaSyApcFqDDN0iy1-gy1gD6zYB-biOqxiTcus`
    )
  ]

  try {
    const res = await Promise.all(requests);
    const dataArr = await Promise.all(res.map((item) => item.json()));

    dataArr.forEach((obj) => {
      if (obj.items[0]?.snippet?.title) {
        data.title = obj.items[0]?.snippet?.title;
      }
      if (obj.items[0]?.snippet?.publishedAt) {
        data.year = new Date(obj.items[0]?.snippet?.publishedAt).getFullYear();
      }
      if (obj.items[0]?.snippet?.thumbnails) {
        data.src = obj.items[0]?.snippet?.thumbnails?.high?.url;
      }
      if (obj.items[0]?.contentDetails?.duration) {
        data.duration = filters.mmss(obj.items[0]?.contentDetails?.duration);
      }
      data.href = 'https://youtu.be/' + yt_id;
    })
  } catch (err) {
    console.error('Multiple fetch failed:', yt_id);
  }

  return data
}
