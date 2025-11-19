// components/DeckCard.jsx
import React, { useState } from "react";
import { Book, Edit2 } from "lucide-react";

export default function DeckCard({ deck, onSelect, onStudy }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className="card h-100"
        style={{
          backgroundColor: "white",
          cursor: "pointer",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.2s",
          boxShadow: isHovered
            ? "0 4px 12px rgba(0,0,0,0.1)"
            : "0 1px 3px rgba(0,0,0,0.1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(deck)}
      >
        <div className="card-body">
          <h5 className="card-title" style={{ color: "#1E3A8A" }}>
            {deck.name}
          </h5>
          <p className="card-text" style={{ color: "#6B7280" }}>
            {deck.cards_count || 0} {deck.cards_count === 1 ? "card" : "cards"}
          </p>
        </div>
        <div className="card-footer bg-transparent border-0 d-flex gap-2 pb-3 px-3">
          <button
            className="btn btn-sm flex-grow-1"
            style={{
              backgroundColor: "#2563EB",
              borderColor: "#2563EB",
              color: "white",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onStudy(deck);
            }}
            disabled={!deck.cards_count || deck.cards_count === 0}
            aria-label={`Estudar deck ${deck.name}`}
          >
            <Book size={16} className="me-1" />
            Estudar
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(deck);
            }}
            aria-label={`Editar deck ${deck.name}`}
          >
            <Edit2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
