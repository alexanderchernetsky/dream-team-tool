import { message } from "antd";

export default function showSuccessMessage(
  messageText?: string
): void {
  message.success(messageText || "Success!");
}
