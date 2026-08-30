import { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [message, setMessage] = useState("Checking API...");
  const [error, setError] = useState("");

  useEffect(() => {
    const checkApi = async () => {
      try {
        const response = await api.get("/health");

        setMessage(response.data.message);
      } catch (error) {
        console.error(error);

        setError("Unable to connect to backend");
      }
    };

    checkApi();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="rounded-xl bg-white p-10 text-center shadow-lg">
        <h1 className="text-3xl font-bold">
          Employee Task Management System
        </h1>

        <p className="mt-4 text-lg">
          {error || message}
        </p>
      </div>
    </div>
  );
}

export default App;