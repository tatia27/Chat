import s from "./Phone.module.scss";

export const Phone = ({ phone, setPhone, setChatId, setMessages }) => {
  const handleStartChat = (e) => {
    e.preventDefault();

    if (phone) {
      const cleanPhone = phone.replace(/\D/g, "");
      setChatId(`${cleanPhone}@c.us`);
      setMessages([]);
    }
  };

  // * Render
  return (
    <form onSubmit={handleStartChat} className={s.form}>
      <input
        type="text"
        placeholder="Введите телефон"
        className={s.input}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
        style={{ flexGrow: 1 }}
      />
      <button className={s.button} type="submit">
        Начать чат
      </button>
    </form>
  );
};
