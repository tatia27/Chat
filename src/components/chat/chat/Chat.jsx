import { useState } from "react";
import { Messages } from "../messages/messages/Messages";
import { API_BASE } from "../../consts/consts";
import s from "./Chat.module.scss";

export const Chat = ({ chatId, messages, credentials, setMessages }) => {
  const [inputMsg, setInputMsg] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!inputMsg.trim() || !credentials || !chatId) return;

    const msgToSend = inputMsg;

    setInputMsg("");

    const tempId = Date.now().toString();

    setMessages((prev) => [
      ...prev,
      { id: tempId, text: msgToSend, type: "outgoing" },
    ]);

    try {
      const url = `${API_BASE}/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatId,
          message: msgToSend,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // * Render
  return (
    <div className={s.chat}>
      <Messages messages={messages} />
      <form className={s.messageInput} onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Наберите сообщение"
          className={s.input}
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
        />
        <button className={s.button} type="submit">
          Отправить
        </button>
      </form>
    </div>
  );
};
