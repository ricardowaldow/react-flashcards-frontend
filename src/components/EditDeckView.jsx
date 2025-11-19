// components/EditDeckView.jsx
import React, { useState } from "react";
import { ArrowLeft, Plus, Book, Trash2 } from "lucide-react";
import { api } from "../services/api";
import CardItem from "./CardItem";

export default function EditDeckView({ deck, onBack, onStartStudy }) {
  const [deckName, setDeckName] = useState(deck.name);
  const [cards, setCards] = useState(deck.cards || []);
  const [editingCard, setEditingCard] = useState(null);
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");

  const handleUpdateDeckName = async () => {
    if (deckName.trim() && deckName !== deck.name) {
      try {
        await api.updateDeck(deck.id, deckName.trim());
      } catch (err) {
        console.error("Erro ao atualizar nome do deck:", err);
      }
    }
  };

  const handleDeleteDeck = async () => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir este deck? Todos os cards serão perdidos."
      )
    ) {
      try {
        await api.deleteDeck(deck.id);
        onBack();
      } catch (err) {
        console.error("Erro ao deletar deck:", err);
      }
    }
  };

  const handleSaveCard = async (e) => {
    e.preventDefault();
    if (cardFront.trim() && cardBack.trim()) {
      try {
        if (editingCard) {
          const updated = await api.updateCard(
            editingCard.id,
            cardFront.trim(),
            cardBack.trim()
          );
          setCards(cards.map((c) => (c.id === editingCard.id ? updated : c)));
        } else {
          const newCard = await api.createCard(
            deck.id,
            cardFront.trim(),
            cardBack.trim()
          );
          setCards([...cards, newCard]);
        }
        resetForm();
      } catch (err) {
        console.error("Erro ao salvar card:", err);
      }
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Tem certeza que deseja excluir este card?")) {
      try {
        await api.deleteCard(cardId);
        setCards(cards.filter((c) => c.id !== cardId));
      } catch (err) {
        console.error("Erro ao deletar card:", err);
      }
    }
  };

  const handleEditCard = (card) => {
    setEditingCard(card);
    setCardFront(card.front);
    setCardBack(card.back);
    setShowCardForm(true);
  };

  const resetForm = () => {
    setCardFront("");
    setCardBack("");
    setEditingCard(null);
    setShowCardForm(false);
  };

  return (
    <div className="container py-4 px-3">
      <button
        className="btn btn-link mb-3 p-0"
        onClick={onBack}
        style={{ color: "#2563EB", textDecoration: "none" }}
      >
        <ArrowLeft size={20} className="me-2" />
        Voltar aos Decks
      </button>

      <div className="card mb-4" style={{ backgroundColor: "white" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <input
              type="text"
              className="form-control form-control-lg border-0 p-0"
              style={{
                color: "#1E3A8A",
                fontSize: "1.5rem",
                fontWeight: "bold",
              }}
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              onBlur={handleUpdateDeckName}
              aria-label="Nome do deck"
            />
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={handleDeleteDeck}
              aria-label="Excluir deck"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <p style={{ color: "#6B7280" }}>
            {cards.length} {cards.length === 1 ? "card" : "cards"}
          </p>
          {cards.length > 0 && (
            <button
              className="btn w-100 mt-2"
              style={{
                backgroundColor: "#2563EB",
                borderColor: "#2563EB",
                color: "white",
              }}
              onClick={onStartStudy}
            >
              <Book size={20} className="me-2" />
              Começar a Estudar
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        {!showCardForm ? (
          <button
            className="btn w-100"
            style={{
              backgroundColor: "#2563EB",
              borderColor: "#2563EB",
              color: "white",
            }}
            onClick={() => setShowCardForm(true)}
          >
            <Plus size={20} className="me-2" />
            Adicionar Card
          </button>
        ) : (
          <div className="card p-3" style={{ backgroundColor: "white" }}>
            <div className="mb-3">
              <label
                htmlFor="cardFront"
                className="form-label"
                style={{ color: "#1F2937" }}
              >
                Frente do Card
              </label>
              <textarea
                id="cardFront"
                className="form-control"
                value={cardFront}
                onChange={(e) => setCardFront(e.target.value)}
                placeholder="Ex: Hallo"
                rows="2"
                required
                aria-required="true"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="cardBack"
                className="form-label"
                style={{ color: "#1F2937" }}
              >
                Verso do Card
              </label>
              <textarea
                id="cardBack"
                className="form-control"
                value={cardBack}
                onChange={(e) => setCardBack(e.target.value)}
                placeholder="Ex: Olá"
                rows="2"
                required
                aria-required="true"
              />
            </div>
            <div className="d-flex gap-2">
              <button
                onClick={handleSaveCard}
                className="btn flex-grow-1"
                style={{
                  backgroundColor: "#2563EB",
                  borderColor: "#2563EB",
                  color: "white",
                }}
              >
                {editingCard ? "Atualizar" : "Adicionar"}
              </button>
              <button onClick={resetForm} className="btn btn-secondary">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-5">
          <p style={{ color: "#6B7280" }}>
            Nenhum card neste deck. Adicione cards para começar a estudar!
          </p>
        </div>
      ) : (
        <div className="row g-3">
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
            />
          ))}
        </div>
      )}
    </div>
  );
}
