import { useState } from "react";

function App() {
  const [presion, setPresion] = useState("");
  const [volumen, setVolumen] = useState("");
  const [temperatura, setTemperatura] = useState("");
  const [resultado, setResultado] = useState(null);

  const calcular = async () => {
    try {
      const res = await fetch("http://localhost:5001/calcular", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          entrada: `${presion}+${volumen}+${temperatura}`
        })
      });
  
      const data = await res.json();
      setResultado(`Resultado del backend: ${data.resultado}`);
    } catch (err) {
      setResultado("Error al conectar con el backend");
    }
  };
  

  return (
    <div style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h1>Calculadora Termodinámica</h1>

      <label>Presión (Pa):</label>
      <input
        type="number"
        value={presion}
        onChange={(e) => setPresion(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <label>Volumen (m³):</label>
      <input
        type="number"
        value={volumen}
        onChange={(e) => setVolumen(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <label>Temperatura (K):</label>
      <input
        type="number"
        value={temperatura}
        onChange={(e) => setTemperatura(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={calcular} style={{ marginTop: 10 }}>
        Calcular
      </button>

      {resultado && (
        <pre style={{ backgroundColor: "#f5f5f5", padding: 10, marginTop: 20 }}>
          {resultado}
        </pre>
      )}
    </div>
  );
}

export default App;

