import { useState } from "react";
import s from "../login/Login.module.scss";

export const Login = ({ setCredentials }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (idInstance && apiTokenInstance) {
      setCredentials({ idInstance, apiTokenInstance });
    }
  };

  // * Render
  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleLogin}>
        <h2 className={s.form__title}>Авторизация в Green API</h2>
        <input
          type="text"
          placeholder="idInstance"
          className={s.input}
          value={idInstance}
          onChange={(e) => setIdInstance(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="apiTokenInstance"
          className={s.input}
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
          required
        />
        <button className={s.button} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
