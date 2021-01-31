import { message } from "antd";

export default function showSuccessMessage(
  messageText: string | undefined = undefined
) {
  message.success(messageText || "Success!");
}
