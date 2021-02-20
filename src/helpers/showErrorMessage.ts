import { message } from "antd";

export default function showErrorMessage(
  error: { message?: string } & Response
): void {
  message.error(error.message || "Error");
  console.error("Error: ", error);
}
