export default function createSearchString(queryParams = {}) {
  let searchString = "?";
  const filters = Object.keys(queryParams).map(key => {
    return `${key}=${queryParams[key]}`;
  });

  searchString += filters.join("&");
  return searchString;
}
