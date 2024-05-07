import React, { useState } from "react";
import { CopilotTextarea } from "@copilotkit/react-ui";

function TweetInput({ onSuggest }) {
  const [prompt, setPrompt] = useState("");

  const handleSuggest = () => {
    onSuggest(prompt);
  };

  return (
    <div>
      <CopilotTextarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt..."
        features={["autocompletion", "textGeneration"]}
      />
      <button onClick={handleSuggest}>Suggest Tweet</button>
    </div>
  );
}import React, { useState } from "react";
import axios from "axios";
import { CopilotTextarea } from "@copilotkit/react-ui";

function TweetInput({ onSuggest }) {
  const [idea, setIdea] = useState("");

  const handleSuggest = async () => {
    try {
      const response = await axios.post("/api/suggest-eco-friendly", {
        prompt: idea,
      });
      const { suggestion } = response.data;
      if (suggestion) {
        onSuggest(suggestion);
      }
    } catch (error) {
      console.error("Error suggesting eco-friendly tweet:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your eco-friendly idea or question..."
      />
      <button onClick={handleSuggest}>Get Eco-Friendly Suggestion</button>
    </div>
  );
}

export default TweetInput;


export default TweetInput;
