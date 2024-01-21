import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import Loader from "./Loader";

function Ai() {
  const [messages, setMessages] = useState([
    { text: "Hi, how can I help you?", isUser: false },
  ]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Give me alternative packages to pandocfilters",
    "What are the best practices to keep Github branch healthy?",
    "What are the best practices to keep Github branch sustainable?",
  ]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setUserInput(suggestion);
  };

  function chat() {
    let question = userInput;
    setIsLoading(true);
    setMessages((messages) => [...messages, { text: question, isUser: true }]);
    setUserInput("");
    fetch("http://127.0.0.1:8001/answer/?question=" + question)
      .then((res) => res.json())
      .then((data) => {
        setMessages((messages) => [
          ...messages,
          { text: data["answer"], isUser: false },
        ]);
        setSuggestions(data["follow_up"]);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }

  return (
    <div className="chat-container">
      <div className="button-container">
        <button className="button-purple" style={{ float: "right" }}>
          <small>
            <i
              class="fa-regular fa-comment"
              style={{ marginRight: "0.5rem" }}
            ></i>
          </small>
          Chat with the AI
        </button>
      </div>
      <div className="messages-container">
        <ul className="chat-messages">
          {messages.map((message) => (
            <li
              key={message.text}
              className={message.isUser ? "user-message" : "bot-message"}
            >
              <div>
                <Markdown>{message.text}</Markdown>
              </div>
            </li>
          ))}
        </ul>
        {suggestions.length > 0 && (
          <>
            <ul className="suggestion-list">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  className={
                    "button " + suggestion === selectedSuggestion
                      ? "selected-suggestion"
                      : ""
                  }
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </ul>
          </>
        )}
        <div className="chat-input">
          <label htmlFor="question" className="input-label">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="input"
              placeholder="Type your question here..."
            />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                onClick={chat}
                disabled={isLoading}
                className="button chat-button"
              >
                {" "}
                <i
                  class="fa-solid fa-paper-plane"
                  style={{ background: "transparent" }}
                ></i>
              </button>
            )}
          </label>
        </div>
      </div>
    </div>
  );
}

export default Ai;
