// components/DecksView.jsx
import React, { useState } from "react";
import { Plus, Book } from "lucide-react";
import DeckCard from "./DeckCard";

export default function DecksView({
  decks,
  onCreateDeck,
  onSelectDeck,
  onStartStudy,
}) {
  const [newDeckName, setNewDeckName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newDeckName.trim()) {
      onCreateDeck(newDeckName.trim());
      setNewDeckName("");
      setShowForm(false);
    }
  };

  return (
    <div className="container py-4 px-3">
      <header
        className="mb-4 p-4 rounded"
        style={{ backgroundColor: "#1E3A8A", color: "white" }}
      >
        <h1 className="h3 mb-0">Meus Flashcards</h1>
      </header>

      <div className="mb-4">
        {!showForm ? (
          <button
            className="btn w-100 py-3"
            style={{
              backgroundColor: "#2563EB",
              borderColor: "#2563EB",
              color: "white",
            }}
            onClick={() => setShowForm(true)}
            aria-label="Criar novo deck"
          >
            <Plus size={20} className="me-2" />
            Criar Novo Deck
          </button>
        ) : (
          <div className="card p-3" style={{ backgroundColor: "white" }}>
            <div className="mb-3">
              <label
                htmlFor="deckName"
                className="form-label"
                style={{ color: "#1F2937" }}
              >
                Nome do Deck
              </label>
              <input
                id="deckName"
                type="text"
                className="form-control"
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                placeholder="Ex: Vocabulário Alemão - Básico"
                autoFocus
                aria-required="true"
              />
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={handleSubmit}
                className="btn flex-grow-1"
                style={{
                  backgroundColor: "#2563EB",
                  borderColor: "#2563EB",
                  color: "white",
                }}
              >
                Criar
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setNewDeckName("");
                }}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {decks.length === 0 ? (
        <div className="text-center py-5">
          <Book size={64} style={{ color: "#6B7280" }} className="mb-3" />
          <h3 style={{ color: "#1F2937" }}>Nenhum deck criado ainda</h3>
          <p style={{ color: "#6B7280" }}>
            Crie seu primeiro deck para começar a estudar!
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onSelect={onSelectDeck}
              onStudy={onStartStudy}
            />
          ))}
        </div>
      )}
    </div>
  );
}
