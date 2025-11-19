// components/CompletionView.jsx
import React from "react";

export default function CompletionView({ onBack }) {
  return (
    <div className="container py-4">
      <div className="text-center py-5">
        <div className="mb-4" style={{ fontSize: "5rem" }}>
          🎉
        </div>
        <h2 style={{ color: "#1E3A8A" }}>Parabéns!</h2>
        <p style={{ color: "#6B7280" }} className="mb-4">
          Você concluiu a revisão deste deck!
        </p>
        <button
          className="btn btn-lg"
          style={{
            backgroundColor: "#2563EB",
            borderColor: "#2563EB",
            color: "white",
          }}
          onClick={onBack}
        >
          Voltar aos Decks
        </button>
      </div>
    </div>
  );
}
