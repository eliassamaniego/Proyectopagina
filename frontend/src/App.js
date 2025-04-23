import { useState } from "react";

function App() {
  const [nombre, setNombre] = useState("");
  const [area, setArea] = useState("");
  const [deltaT, setDeltaT] = useState("");
  const [materiales, setMateriales] = useState([
    { conductividad: "", espesor: "" },  // Suelo
    { conductividad: "", espesor: "" },  // Paredes
    { conductividad: "", espesor: "" },  // Techo
    { conductividad: "", espesor: "" }   // Abertura
  ]);
  const [resultado, setResultado] = useState(null);

  const actualizarMaterial = (i, campo, valor) => {
    const nuevos = [...materiales];
    nuevos[i][campo] = valor;
    setMateriales(nuevos);
  };

  const enviarDatos = async () => {
    const caja = {
      nombre,
      area: parseFloat(area),
      delta_t: parseFloat(deltaT),
      materiales: materiales.map(m => ({
        conductividad: parseFloat(m.conductividad),
        espesor_mm: parseFloat(m.espesor)
      }))
    };

    try {
      const res = await fetch("http://localhost:5000/calcular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cajas: [caja] })
      });

      const data = await res.json();
      setResultado(data);
    } catch (error) {
      setResultado([{ error: "Error al conectar con el servidor" }]);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h2>Calculadora de Eficiencia Térmica</h2>

      <input
        type="text"
        placeholder="Nombre de la caja"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Área (m²)"
        value={area}
        onChange={(e) => setArea(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Diferencia de temperatura (°C)"
        value={deltaT}
        onChange={(e) => setDeltaT(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <h4>Materiales:</h4>
      {materiales.map((m, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <input
            type="number"
            placeholder={`Conductividad ${i + 1}`}
            value={m.conductividad}
            onChange={(e) => actualizarMaterial(i, "conductividad", e.target.value)}
          />
          <input
            type="number"
            placeholder={`Espesor (mm) ${i + 1}`}
            value={m.espesor}
            onChange={(e) => actualizarMaterial(i, "espesor", e.target.value)}
          />
        </div>
      ))}

      <button onClick={enviarDatos}>Calcular</button>

      {resultado && (
        <div style={{ marginTop: 20 }}>
          <h3>Resultado:</h3>
          <pre>{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
