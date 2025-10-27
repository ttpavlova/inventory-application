import { useEffect, useState } from "react";

function App() {
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    // Такой запрос при сборке проксируется к localhost:5000/api/hello
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setApiMessage(data.message));
  }, []);

  return (
    <div>
      <h1>Express + React Integration</h1>
      <p>Сообщение с сервера: {apiMessage}</p>
    </div>
  );
}

export default App;
