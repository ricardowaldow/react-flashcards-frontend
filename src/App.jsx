// App.jsx
import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { api } from "./services/api";
import DecksView from "./components/DecksView";
import EditDeckView from "./components/EditDeckView";
import StudyView from "./components/StudyView";

export default function FlashcardsApp() {
  const [currentView, setCurrentView] = useState("decks");
  const [decks, setDecks] = useState([]);
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getDecks();
      setDecks(data.results || data);
    } catch (err) {
      setError(
        "Erro ao carregar decks. Verifique se a API está rodando em http://localhost:8000"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDeck = async (name) => {
    try {
      await api.createDeck(name);
      await loadDecks();
    } catch (err) {
      setError("Erro ao criar deck");
    }
  };

  const handleSelectDeck = async (deck) => {
    try {
      const cards = await api.getDeckCards(deck.id);
      setSelectedDeck({ ...deck, cards });
      setCurrentView("edit");
    } catch (err) {
      setError("Erro ao carregar cards do deck");
    }
  };

  const handleStartStudy = async (deck) => {
    try {
      const cards = await api.getDeckCards(deck.id);
      if (cards.length === 0) {
        setError("Este deck não possui cards para estudar");
        return;
      }
      setSelectedDeck({ ...deck, cards });
      setCurrentView("study");
    } catch (err) {
      setError("Erro ao iniciar estudo");
    }
  };

  const handleBackToDecks = () => {
    setCurrentView("decks");
    setSelectedDeck(null);
    loadDecks();
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{ backgroundColor: "#EFF6FF" }}
      >
        <div
          className="spinner-border"
          style={{ color: "#2563EB" }}
          role="status"
        >
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#EFF6FF", minHeight: "100vh" }}>
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show m-3"
          role="alert"
        >
          <AlertCircle className="me-2" size={20} />
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
            aria-label="Fechar alerta"
          ></button>
        </div>
      )}

      {currentView === "decks" && (
        <DecksView
          decks={decks}
          onCreateDeck={handleCreateDeck}
          onSelectDeck={handleSelectDeck}
          onStartStudy={handleStartStudy}
        />
      )}

      {currentView === "edit" && selectedDeck && (
        <EditDeckView
          deck={selectedDeck}
          onBack={handleBackToDecks}
          onStartStudy={() => setCurrentView("study")}
        />
      )}

      {currentView === "study" && selectedDeck && (
        <StudyView deck={selectedDeck} onBack={handleBackToDecks} />
      )}
    </div>
  );
}
