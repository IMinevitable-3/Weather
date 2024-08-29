import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import UserHistory from "./components/UserHistory";
import axios from "axios";
const App = () => {
  const [history, setHistory] = useState([]);

  const fetchSearchHistory = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "user/getSearchHistory/",
        { withCredentials: true }
      );
      setHistory(response.data.history);
    } catch (err) {
      console.error("Error fetching search history:", err);
    }
  };

  useEffect(() => {
    fetchSearchHistory();
  }, []);

  const addCityToHistory = (city) => {
    setHistory((prevHistory) => [...prevHistory, city]);
  };

  return (
    <div className="app">
      <Weather addCityToHistory={addCityToHistory} />
      <UserHistory history={history} />
    </div>
  );
};

export default App;
