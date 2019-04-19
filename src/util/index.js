exports.getPostPath = (path, date) => {
  const postDate = new Date(date)
  const month = `${postDate.getMonth() + 1}`.padStart(2, '0')
  const day = `${postDate.getDate()}`.padStart(2, '0')
  return `/${postDate.getFullYear()}/${month}/${day}${path}`
}
