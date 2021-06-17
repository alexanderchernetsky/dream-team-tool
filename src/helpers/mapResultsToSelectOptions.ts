import { ISelectOption } from "../interfaces/common";

export default function mapResultsToSelectOptions(
  results: string[]
): ISelectOption[] {
  const resultsEntries: string[][] = Object.entries(results);
  return resultsEntries.map((item: string[]) => {
    return {
      value: item[0], // id
      label: item[1], // full name
    };
  });
}
