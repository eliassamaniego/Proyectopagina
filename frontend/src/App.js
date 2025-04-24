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
      {["Suelo", "Paredes", "Techo", "Abertura"].map((nombre, i) => (
  <div key={i} style={{ marginBottom: 10, display: 'flex', gap: '10px', alignItems: 'center' }}>
    <label style={{ width: 150 }}>Conductividad {nombre} (W/m·K):</label>
    <input
      type="number"
      value={materiales[i].conductividad}
      onChange={(e) => actualizarMaterial(i, "conductividad", e.target.value)}
    />
    <label style={{ width: 130 }}>Espesor {nombre} (mm):</label>
    <input
      type="number"
      value={materiales[i].espesor}
      onChange={(e) => actualizarMaterial(i, "espesor", e.target.value)}
    />
  </div>
      ))}

      <button onClick={enviarDatos}>Calcular</button>

      {resultado && resultado.length > 0 && (
  <div style={{ marginTop: 30 }}>
    <h3>Resultados:</h3>
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Caja</th>
          <th>R térmica [m²K/W]</th>
          <th>Flujo calor [W]</th>
          <th>Calor 10 días [J]</th>
          <th>Masa hielo [kg]</th>
          <th>Volumen hielo [m³]</th>
          <th>Eficiencia térmica [%]</th>
        </tr>
      </thead>
      <tbody>
        {resultado.map((fila, index) => (
          <tr key={index}>
            <td>{fila.Caja}</td>
            <td>{fila.R_termina.toFixed(3)}</td>
            <td>{fila.Flujo_calor.toFixed(2)}</td>
            <td>{fila.Calor_total.toLocaleString()}</td>
            <td>{fila.Masa_hielo.toFixed(2)}</td>
            <td>{fila.Volumen_hielo.toFixed(4)}</td>
            <td>{fila.Eficiencia.toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
}

export default App;
