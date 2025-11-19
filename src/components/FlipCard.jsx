// components/FlipCard.jsx
import React from "react";

export default function FlipCard({ card, isFlipped, onFlip }) {
  return (
    <div className="row justify-content-center mb-4">
      <div className="col-12 col-md-10 col-lg-8">
        <div
          className="card shadow-lg"
          style={{
            height: "400px",
            cursor: "pointer",
            perspective: "1000px",
            backgroundColor: "transparent",
            border: "none",
          }}
          onClick={onFlip}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === "Enter" && onFlip()}
          aria-label="Clique para virar o card"
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              transition: "transform 0.6s",
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front of card */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                padding: "2rem",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              <div className="text-center">
                <p className="text-muted mb-2">Frente</p>
                <h2
                  style={{
                    color: "#1E3A8A",
                    fontSize: "2rem",
                    wordBreak: "break-word",
                  }}
                >
                  {card.front}
                </h2>
              </div>
            </div>

            {/* Back of card */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                borderRadius: "0.5rem",
                padding: "2rem",
                transform: "rotateY(180deg)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              <div className="text-center">
                <p className="text-muted mb-2">Verso</p>
                <h2
                  style={{
                    color: "#1E3A8A",
                    fontSize: "2rem",
                    wordBreak: "break-word",
                  }}
                >
                  {card.back}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-3" style={{ color: "#6B7280" }}>
          Clique no card para virar
        </p>
      </div>
    </div>
  );
}
