export async function getCurrentTab() {
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

export function isSupportedUrl(url?: string) {
  if (!url) {
    return false
  }

  const blockedPrefixes = [
    "chrome://",
    "chrome-extension://",
    "edge://",
    "about:",
    "moz-extension://",
    "https://vlad-cerisier.fr/"
  ]
  console.log("supported url")

  return !blockedPrefixes.some((prefix) => url.startsWith(prefix))
}

export async function sendHtml(domString) {
  const response = await fetch("http://localhost:8000/api/jobs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ html: domString })
  })
  console.log("fetched end")

  return await response.json()
}

export async function getHtmlWithTab(tab) {
  return await chrome.scripting.executeScript({
    target: {
      tabId: tab.id
    },
    func: () => {
      return document.documentElement?.outerHTML ?? ""
    }
  })
}

export async function handleScanPage({
  setLoading,
  setDomString,
  domString,
  setResponseApi
}) {
  setLoading(true)

  try {
    const tab = await getCurrentTab()
    console.log("getted current tab")

    if (!tab?.id) {
      setDomString("Erreur : Impossible de récupérer l'onglet actif.")
      console.log("Err : tab act")

      return
    }

    if (!isSupportedUrl(tab.url)) {
      setDomString("Cette page ne peut pas être analysée par une extension.")
      console.log("no supported url")
      return
    }
    const results = getHtmlWithTab(tab)

    if (!results.length) {
      setDomString("Impossible de récupérer le HTML.")
      console.log("no html into tab")
      return
    }

    const html = typeof results[0]?.result === "string" ? results[0].result : ""
    setDomString(html || "Aucun HTML n'a été trouvé sur cette page.")
    console.log("no html")
  } catch (error) {
    console.error(error)
    setDomString("Une erreur est survenue pendant l'extraction du HTML.")
  }
  try {
    const result = sendHtml(domString)
    setResponseApi(result)
  } catch (error) {
    setResponseApi({ erreur: "unknow error client" })
  } finally {
    setLoading(false)
  }
}
