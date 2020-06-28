import { message } from "antd";

export default function showSuccessMessage(messageText) {
  message.success(messageText || "Success!");
}
