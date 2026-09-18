import { useState, useEffect } from "react";
import { Login } from "../login/Login";
import { Phone } from "../phone/Phone";
import { Chat } from "../chat/chat/Chat";
import { API_BASE } from "../consts/consts";
import s from "../app/App.module.scss";

export const App = () => {
  const [credentials, setCredentials] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!credentials || !chatId) return;

    let cancelled = false;

    const receiveNotification = async () => {
      try {
        const url = `${API_BASE}/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenInstance}`;
        const response = await fetch(url);

        if (!response.ok) return;

        const data = await response.json();

        if (cancelled || !data?.receiptId) return;

        const { receiptId, body } = data;

        if (
          (body.typeWebhook === "incomingMessageReceived" ||
            body.typeWebhook === "outgoingMessageReceived") &&
          body.messageData?.typeMessage === "textMessage"
        ) {
          const text = body.messageData.textMessageData.textMessage;
          const type =
            body.typeWebhook === "incomingMessageReceived"
              ? "incoming"
              : "outgoing";

          setMessages((prev) => {
            const id = body.idMessage ?? receiptId;
            if (prev.some((m) => m.id === id)) return prev;
            return [...prev, { id, text, type }];
          });
        }

        await fetch(
          `${API_BASE}/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`,
          { method: "DELETE" },
        );
      } catch (err) {
        console.error(err);
      }
    };

    const intervalId = setInterval(receiveNotification, 4000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [credentials, chatId]);

  if (credentials === null) {
    return <Login setCredentials={setCredentials} />;
  }

  // * Render
  return (
    <div className={s.container}>
      {!chatId ? (
        <Phone
          phone={phone}
          setPhone={setPhone}
          setChatId={setChatId}
          setMessages={setMessages}
        />
      ) : (
        <div className={s.header}>
          <h2>Чат: {chatId.replace("@c.us", "")}</h2>
          <button className={s.button} onClick={() => setChatId("")}>
            Закрыть чат
          </button>
        </div>
      )}

      {chatId && (
        <Chat
          credentials={credentials}
          chatId={chatId}
          messages={messages}
          setMessages={setMessages}
        />
      )}
    </div>
  );
};
