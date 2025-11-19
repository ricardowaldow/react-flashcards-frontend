// components/StudyView.jsx
import React, { useState } from "react";
import { ArrowLeft, Check, X } from "lucide-react";
import FlipCard from "./FlipCard";
import CompletionView from "./CompletionView";

export default function StudyView({ deck, onBack }) {
  const [cards, setCards] = useState(deck.cards || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState(new Set());
  const [completed, setCompleted] = useState(false);

  const currentCard = cards[currentIndex];
  const progress =
    cards.length > 0
      ? ((knownCards.size / deck.cards.length) * 100).toFixed(0)
      : 0;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    const newKnownCards = new Set(knownCards);
    newKnownCards.add(currentCard.id);
    setKnownCards(newKnownCards);

    const remainingCards = cards.filter((c) => !newKnownCards.has(c.id));

    if (remainingCards.length === 0) {
      setCompleted(true);
    } else {
      moveToNext(remainingCards);
    }
  };

  const handleUnknown = () => {
    const remainingCards = cards.filter((c) => !knownCards.has(c.id));
    moveToNext(remainingCards);
  };

  const moveToNext = (remainingCards) => {
    setIsFlipped(false);
    if (currentIndex >= remainingCards.length - 1) {
      setCurrentIndex(0);
      setCards(remainingCards);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (completed) {
    return <CompletionView onBack={onBack} />;
  }

  if (!currentCard) {
    return (
      <div className="container py-4">
        <div className="text-center py-5">
          <p style={{ color: "#6B7280" }}>Nenhum card para estudar.</p>
          <button className="btn btn-primary mt-3" onClick={onBack}>
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4 px-3">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <button
          className="btn btn-link p-0"
          onClick={onBack}
          style={{ color: "#2563EB", textDecoration: "none" }}
        >
          <ArrowLeft size={20} className="me-2" />
          Sair
        </button>
        <div className="text-end">
          <div
            className="progress mb-2"
            style={{ width: "200px", height: "8px" }}
          >
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progress}%`, backgroundColor: "#10B981" }}
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label={`Progresso: ${progress}%`}
            />
          </div>
          <small style={{ color: "#6B7280" }}>{progress}% completo</small>
        </div>
      </div>

      <FlipCard card={currentCard} isFlipped={isFlipped} onFlip={handleFlip} />

      <div className="row justify-content-center mt-4">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="d-flex gap-3">
            <button
              className="btn btn-lg flex-grow-1"
              style={{
                backgroundColor: "#EF4444",
                borderColor: "#EF4444",
                color: "white",
              }}
              onClick={handleUnknown}
              aria-label="Não sei esta palavra"
            >
              <X size={24} className="me-2" />
              Não Sei
            </button>
            <button
              className="btn btn-lg flex-grow-1"
              style={{
                backgroundColor: "#10B981",
                borderColor: "#10B981",
                color: "white",
              }}
              onClick={handleKnown}
              aria-label="Sei esta palavra"
            >
              <Check size={24} className="me-2" />
              Sei
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
