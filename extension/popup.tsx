import { useState } from "react"

async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    return tab ?? null
  } catch (error) {
    console.error("Erreur lors de la récupération de l'onglet :", error)
    return null
  }
}

function isSupportedUrl(url?: string) {
  if (!url) {
    return false
  }

  const blockedPrefixes = [
    "chrome://",
    "chrome-extension://",
    "edge://",
    "about:",
    "moz-extension://"
  ]

  return !blockedPrefixes.some((prefix) => url.startsWith(prefix))
}

function IndexPopup() {
  const [domString, setDomString] = useState("")
  const [loading, setLoading] = useState(false)

  const handleScanPage = async () => {
    setLoading(true)

    try {
      const tab = await getCurrentTab()

      if (!tab?.id) {
        setDomString("Erreur : Impossible de récupérer l'onglet actif.")
        return
      }

      if (!isSupportedUrl(tab.url)) {
        setDomString("Cette page ne peut pas être analysée par une extension.")
        return
      }
      console.log(chrome)
      console.log(chrome.tabs)
      console.log(chrome.scripting)

      const results = await chrome.scripting.executeScript({
        target: {
          tabId: tab.id
        },
        func: () => {
          return document.documentElement?.outerHTML ?? ""
        }
      })

      if (!results.length) {
        setDomString("Impossible de récupérer le HTML.")
        return
      }

      const html =
        typeof results[0]?.result === "string" ? results[0].result : ""
      setDomString(html || "Aucun HTML n'a été trouvé sur cette page.")
    } catch (error) {
      console.error(error)
      setDomString("Une erreur est survenue pendant l'extraction du HTML.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        width: 500,
        padding: 16,
        fontFamily: "sans-serif"
      }}>
      <h2>Job Pilot</h2>

      <button
        onClick={handleScanPage}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          cursor: loading ? "default" : "pointer"
        }}>
        {loading ? "Extraction..." : "Afficher le HTML"}
      </button>

      {domString && (
        <div style={{ marginTop: 16 }}>
          <h3>HTML de la page</h3>

          <textarea
            readOnly
            value={domString}
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
