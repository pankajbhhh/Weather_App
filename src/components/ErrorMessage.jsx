import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="initial-message">
      <i
        className="fas fa-exclamation-triangle"
        style={{ fontSize: "28px", color: "red" }}
      ></i>
      <p>{message}</p>
      <button className="search-btn" onClick={() => onRetry()}>
        Try Again
      </button>
    </div>
  );
}
