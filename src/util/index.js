exports.getPostPath = (path, date) => {
  const postDate = new Date(date)
  return `/${postDate.getFullYear()}/${postDate.getMonth()}/${postDate.getDate()}${path}`
}
