// import MouseFollow from "./components/MouseFollow";
import { useState } from "react";
import { TURNS } from "./constansts";
import { resetGameFromStorage } from "./logic/storage";
import Game from "./components/Game";

function App() {
  const [modo, setModo] = useState(null);
  const [playerChoise, setPlayerChoise] = useState(null);

  const handleReset = () => {
    setModo(null);
    setPlayerChoise(null);
    resetGameFromStorage();
  }
  
  return (
    <>
      {!modo && (
        <div>
          <h1 style={{ textAlign: "center" }}>Bienvenido</h1>
          <p style={{ textAlign: "center", margin: "1rem 0" }}>
            Como desea jugar?
          </p>
          <div>
            <button className="btn" onClick={() => setModo("computer")}>
              1 jugador
            </button>
            <button className="btn" onClick={() => setModo("normal")}>
              2 jugadores
            </button>
          </div>
        </div>
      )}
      {modo && (
        <div style={{ display: playerChoise ? "none" : "block" }}>
          <h3 style={{ textAlign: "center" }}>Jugador 1 selecciona tu turno</h3>
          <p style={{ textAlign: "center", color: "gray" }}>
            (El turno del jugador 2 se generara segun la eleccion del jugador 1)
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="btn"
              onClick={() => setPlayerChoise(TURNS.x)}
              type="button"
            >
              Jugar como X
            </button>
            <button
              className="btn"
              onClick={() => setPlayerChoise(TURNS.o)}
              type="button"
            >
              Jugar como O
            </button>
          </div>
        </div>
      )}
      {playerChoise && (
        <>
          <button
            className="btn"
            onClick={handleReset}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            Volver al Inicio
          </button>
          <Game players={playerChoise} modo={modo} />
        </>
      )}
      {/* <MouseFollow /> */}
    </>
  );
}

export default App;
