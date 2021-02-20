export default function createSearchString(queryParams: object = {}): string {
  let searchString = "?";
  const filters = Object.keys(queryParams).map((key) => {
    return `${key}=${queryParams[key as keyof object]}`;
  });

  searchString += filters.join("&");
  return searchString;
}
