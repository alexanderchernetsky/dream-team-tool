import { message } from "antd";

export default function showErrorMessage(error) {
  message.error(error.message || "Error");
  console.error("Error: ", error);
}
