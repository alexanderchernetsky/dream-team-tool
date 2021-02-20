import capitalize from "./capitalize";
import { SelectOption } from "../interfaces/common";

export default function mapResultsToManagerGridSelectOptions(
  results: string[]
): SelectOption[] {
  const resultsEntries: string[][] = Object.entries(results);
  return resultsEntries.map((item: string[]) => {
    return {
      value: item[1], // id (same with slug)
      label: capitalize(item[1]), // full name
    };
  });
}
