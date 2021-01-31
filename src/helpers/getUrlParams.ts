export default function getUrlParams(
  search: string = window.location.search
): object {
  const searchParams = new URLSearchParams(search);
  const filters: { [key: string]: string } = {};
  Array.from(searchParams.entries()).forEach((entry: string[]) => {
    const [key, value] = entry;
    filters[key as keyof object] = value;
  });
  return filters;
}
