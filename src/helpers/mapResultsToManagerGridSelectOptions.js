import capitalize from "./capitalize";

export default function mapResultsToManagerGridSelectOptions(results) {
  const resultsEntries = Object.entries(results);
  return resultsEntries.map(item => {
    return {
      value: item[1], // id (same with slug)
      label: capitalize(item[1]) // full name
    }
  })
}
