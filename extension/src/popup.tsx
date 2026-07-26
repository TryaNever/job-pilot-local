import { useState } from "react"

import { handleScanPage } from "~tools"

function IndexPopup() {
  const [domString, setDomString] = useState("")
  const [loading, setLoading] = useState(false)
  const [responseApi, setResponseApi] = useState({})

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
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          cursor: loading ? "default" : "pointer"
        }}>
        {loading ? "Extraction..." : "Afficher le HTML"}
      </button>

      {responseApi && (
        <div style={{ marginTop: 16 }}>
          <h3>HTML de la page</h3>

          <textarea
            readOnly
            value={JSON.stringify(responseApi)}
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
