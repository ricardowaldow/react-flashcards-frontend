// services/api.js
const API_URL = "http://localhost:8000/api";

export const api = {
  getDecks: async () => {
    const response = await fetch(`${API_URL}/decks/`);
    if (!response.ok) throw new Error("Erro ao buscar decks");
    return response.json();
  },

  createDeck: async (name) => {
    const response = await fetch(`${API_URL}/decks/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Erro ao criar deck");
    return response.json();
  },

  updateDeck: async (id, name) => {
    const response = await fetch(`${API_URL}/decks/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar deck");
    return response.json();
  },

  deleteDeck: async (id) => {
    const response = await fetch(`${API_URL}/decks/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar deck");
  },

  getDeckCards: async (deckId) => {
    const response = await fetch(`${API_URL}/decks/${deckId}/cards/`);
    if (!response.ok) throw new Error("Erro ao buscar cards");
    return response.json();
  },

  createCard: async (deckId, front, back) => {
    const response = await fetch(`${API_URL}/cards/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ deck: deckId, front, back }),
    });
    if (!response.ok) throw new Error("Erro ao criar card");
    return response.json();
  },

  updateCard: async (id, front, back) => {
    const response = await fetch(`${API_URL}/cards/${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ front, back }),
    });
    if (!response.ok) throw new Error("Erro ao atualizar card");
    return response.json();
  },

  deleteCard: async (id) => {
    const response = await fetch(`${API_URL}/cards/${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Erro ao deletar card");
  },
};
