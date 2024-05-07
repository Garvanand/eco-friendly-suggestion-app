import React, { useState, useEffect } from "react";

function EcoFriendlySuggestionList({ suggestions }) {
  return (
    <div>
      <h2>Eco-Friendly Suggestions</h2>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </div>
  );
}

export default EcoFriendlySuggestionList;
