export async function getCurrentTab() {
  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    return tab ?? null
  } catch (error) {
    return null
  }
}

export async function isSupportedUrl(url?: string) {
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
  return !blockedPrefixes.some((prefix) => url.startsWith(prefix))
}

export async function sendHtml(domString, tab) {
  const response = await fetch("http://localhost:8000/upload/offers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ html_brut: domString, url_offers: tab.url })
  })
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
  setResponseApi
}) {
  setLoading(true)

  try {
    const tab = await getCurrentTab()
    console.log("getted current tab")

    if (!tab?.id) {
      // setDomString("Erreur : Impossible de récupérer l'onglet actif.")
      return
    }

    if (await !isSupportedUrl(tab.url)) {
      // setDomString("Cette page ne peut pas être analysée par une extension.")
      return
    }
    const results = await getHtmlWithTab(tab)

    if (!results.length) {
      // setDomString("Impossible de récupérer le HTML.")
      return
    }

    const html = typeof results[0]?.result === "string" ? results[0].result : ""
    // setDomString(html || "Aucun HTML n'a été trouvé sur cette page.")

    const result = await sendHtml(html, tab)

    setResponseApi(result)
  } catch (error) {
    console.error(error)
    // setDomString("Une erreur est survenue pendant l'extraction du HTML.")
  } finally {
    setLoading(false)
  }
}
