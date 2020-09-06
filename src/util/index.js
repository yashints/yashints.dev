exports.getPostPath = (title, date) => {
  const postDate = new Date(date);
  const month = `${postDate.getMonth() + 1}`.padStart(2, '0');
  const day = `${postDate.getUTCDate()}`.padStart(2, '0');
  const path = title
    .toLowerCase()
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/\?/g, '')
    .replace(/\//g, '')
    .replace(/\,/g, '')
    .replace(/'/g, '')
    .replace(/ /g, '-');
  return `/blog/${postDate.getFullYear()}/${month}/${day}/${path}`;
};
