import { useState } from "react"

import { handleScanPage } from "~tools"

function IndexPopup() {
  const [domString, setDomString] = useState("")
  const [loading, setLoading] = useState(false)
  const [responseApi, setResponseApi] = useState({})

  let socket = new WebSocket("ws://localhost:8000/ws/offers")

  socket.onopen = () => {
    setDomString("connection etablie")
  }

  socket.onmessage = (event) => {
  setDomString((domString) => `${domString} Message reçu :, ${event.data}`);
};

  return (
    <div
      style={{
        width: 500,
        padding: 16,
        fontFamily: "sans-serif"
      }}>
      <h2>Job Pilot</h2>

      <button
        onClick={() =>
          handleScanPage({
            domString,
            setDomString,
            setLoading,
            setResponseApi
          })
        }
        style={{
          width: "100%",
          padding: "10px",
          cursor: loading ? "default" : "pointer"
        }}>
        ajouter cette offre
      </button>

      {domString && (
        <div style={{ marginTop: 16 }}>
          <h3>HTML de la page</h3>

          <textarea
            readOnly
            value={JSON.stringify(domString)}
            style={{
              width: "100%",
              height: 350,
              fontFamily: "monospace",
              fontSize: 11,
              whiteSpace: "pre",
              resize: "vertical",
              padding: 8,
              border: "1px solid #ccc",
              borderRadius: 4
            }}
          />
        </div>
      )}
    </div>
  )
}

export default IndexPopup
