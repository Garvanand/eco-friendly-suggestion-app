import React, { useState, useEffect } from "react";
import axios from "axios";
import EcoFriendlySuggestionList from "./EcoFriendlySuggestionList";
import EcoFriendlyInput from "./EcoFriendlyInput";
import EcoFriendlySuggestion from "./EcoFriendlySuggestion";

function App() {
  const [suggestion, setSuggestion] = useState(null);

  useEffect(() => {
    fetchSuggestions();
  }, []);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get("/api/suggestions");
      const { suggestions } = response.data;
      if (suggestions && suggestions.length > 0) {
        setSuggestion(suggestions[0]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleSuggest = (prompt) => {
    fetch("/api/suggest-tweet", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    })
      .then((response) => response.json())
      .then((data) => setSuggestion(data.suggestion));
  };

  return (
    <div>
      <h1>Eco-Friendly Recommendation App</h1>
      <EcoFriendlySuggestionList />
      <EcoFriendlyInput onSuggest={handleSuggest} />
      {suggestion && <EcoFriendlySuggestion suggestion={suggestion} />}
    </div>
  );
}

export default App;
