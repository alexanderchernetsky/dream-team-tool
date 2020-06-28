export default function mapResultsToSelectOptions(results) {
  const resultsEntries = Object.entries(results);
  return resultsEntries.map(item => {
    return {
      value: item[0], // id
      label: item[1] // full name
    }
  })
}
