/// <reference types="chrome" />

console.log("SERVICE WORKER STARTED")

function showShortcutFeedback(
  status: "success" | "warning" | "error",
  message: string
) {
  const badgeText =
    status === "success" ? "OK" : status === "warning" ? "!" : "ERR"
  const badgeColor =
    status === "success"
      ? [0, 128, 0, 255]
      : status === "warning"
        ? [255, 165, 0, 255]
        : [255, 0, 0, 255]

  chrome.action.setBadgeText({ text: badgeText })
  chrome.action.setBadgeBackgroundColor({ color: badgeColor })

  setTimeout(() => {
    chrome.action.setBadgeText({ text: "" })
  }, 2500)

  if (chrome.notifications) {
    chrome.notifications.create(
      {
        type: "basic",
        iconUrl: "icon48.png",
        title: "Job Pilot",
        message,
        priority: 2
      },
      () => undefined
    )
  }
}

chrome.commands.onCommand.addListener(async (command) => {
  console.log("COMMAND RECEIVED:", command)

  if (command !== "add-job") {
    return
  }

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    })

    if (!tab?.id || !tab.url) {
      console.warn("Aucun onglet actif disponible pour la commande.")
      showShortcutFeedback("warning", "Pas d'onglet actif pour le raccourci.")
      return
    }

    if (
      tab.url.startsWith("chrome://") ||
      tab.url.startsWith("chrome-extension://") ||
      tab.url.startsWith("about:") ||
      tab.url.startsWith("edge://") ||
      tab.url.startsWith("moz-extension://")
    ) {
      console.warn("Raccourci non disponible sur cette page :", tab.url)
      showShortcutFeedback("warning", "Raccourci indisponible sur cette page.")
      return
    }

    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.documentElement.outerHTML
    })

    const html = results?.[0]?.result
    const length = typeof html === "string" ? html.length : 0
    console.log("HTML extrait via raccourci (length):", length)
    showShortcutFeedback("success", `HTML extrait (${length} caractères).`)
  } catch (error) {
    console.error("Erreur lors de l'exécution du raccourci :", error)
    showShortcutFeedback("error", "Erreur lors de l'exécution du raccourci.")
  }
})

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed")
})
