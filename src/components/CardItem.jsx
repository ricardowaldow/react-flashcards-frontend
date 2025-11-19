// components/CardItem.jsx
import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function CardItem({ card, onEdit, onDelete }) {
  return (
    <div className="col-12">
      <div className="card" style={{ backgroundColor: "#DBEAFE" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <div className="flex-grow-1">
              <strong style={{ color: "#1E3A8A" }}>Frente:</strong>
              <p className="mb-2" style={{ color: "#1F2937" }}>
                {card.front}
              </p>
              <strong style={{ color: "#1E3A8A" }}>Verso:</strong>
              <p className="mb-0" style={{ color: "#1F2937" }}>
                {card.back}
              </p>
            </div>
            <div className="d-flex gap-2 ms-3">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => onEdit(card)}
                aria-label={`Editar card ${card.front}`}
              >
                <Edit2 size={16} />
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => onDelete(card.id)}
                aria-label={`Excluir card ${card.front}`}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
