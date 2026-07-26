/// <reference types="chrome" />

import { useState } from "react"

import { handleScanPage } from "~tools"

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
  const [domString, setDomString] = useState("")
  const [loading, setLoading] = useState(false)
  const [responseApi, setResponseApi] = useState({})
  if (command !== "add-job") {
    handleScanPage({
      domString,
      setDomString,
      setLoading,
      setResponseApi
    })
  }
  console.log(responseApi, loading)
})

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed")
})
