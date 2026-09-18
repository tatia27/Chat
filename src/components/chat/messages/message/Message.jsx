import React from "react";
import s from "./Message.module.scss";

export const Message = React.memo(({ text, type }) => (
  <div className={`${s.message} ${s[type]}`}>{text}</div>
));
