export default function mapResultsToManagerGridSelectOptions(results) {
  const resultsEntries = Object.entries(results);
  return resultsEntries.map(item => {
    return {
      value: item[1], // id (same with slug)
      label: item[1] // full name
    }
  })
}
