import capitalize from "./capitalize";
import { ISelectOption } from "../interfaces/common";

export default function mapResultsToManagerGridSelectOptions(
  results: string[]
): ISelectOption[] {
  const resultsEntries: string[][] = Object.entries(results);
  return resultsEntries.map((item: string[]) => {
    return {
      value: item[1], // id (same with slug)
      label: capitalize(item[1]), // full name
    };
  });
}
