export default function getUrlParams(search = window.location.search) {
  const searchParams = new URLSearchParams(search);
  const filters = {};
  Array.from(searchParams.entries()).forEach(entry => {
    const [key, value] = entry;
    filters[key] = value;
  });
  return filters;
}
