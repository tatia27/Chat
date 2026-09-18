import { Message } from "../message/Message";
import s from "./Messages.module.scss";

export const Messages = ({ messages }) => {
  // * Render
  return (
    <div className={s.messages}>
      {messages.map((item) => (
        <Message key={item.id} text={item.text} type={item.type} />
      ))}
    </div>
  );
};
