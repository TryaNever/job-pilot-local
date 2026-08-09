import { useEffect, useState } from "react"

import { handleScanPage } from "~tools"

import "../style.css"

function IndexPopup() {
  const [loading, setLoading] = useState(false)
  const [jobs, setJobs] = useState([])

  const statusColor = {
    QUEUED: "bg-gray-100 text-gray-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    failed: "bg-red-100 text-red-700"
  }

  useEffect(() => {
    console.log("Connexion WebSocket établie 1")

    const socket = new WebSocket("ws://localhost:8000/ws/worker")
    console.log(socket)

    socket.onopen = () => {
      console.log("Connexion WebSocket établie 3")
    }

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)

        console.log(data)

        const sorted = [...data].sort(
          (a, b) => Number(b.created_date) - Number(a.created_date)
        )

        console.log(sorted)

        setJobs(sorted)
      } catch (err) {
        console.error("JSON invalide :", err)
      }
    }

    socket.onerror = (err) => {
      console.error(err)
    }

    socket.onclose = () => {
      console.log("Connexion fermée")
    }

    return () => socket.close()
  }, [])

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
            setLoading
          })
        }
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          cursor: loading ? "default" : "pointer"
        }}>
        Ajouter cette offre
      </button>

      <div className="mt-6 rounded-xl border bg-white shadow">
        <div className="border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Historique des traitements</h2>
        </div>

        <div className="divide-y">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColor[job.status] ?? "bg-gray-100 text-gray-700"
                    }`}>
                    {job.status}
                  </span>

                  {job.step && (
                    <span className="text-sm text-gray-600">{job.step}</span>
                  )}
                </div>

                <p className="mt-1 text-xs text-gray-400">
                  {new Date(Number(job.created_date) * 1000).toLocaleString()}
                </p>
              </div>

              <div className="w-44">
                <div className="mb-1 flex justify-between text-xs">
                  <span>Progression</span>
                  <span>{job.progress}%</span>
                </div>

                <div className="h-2 rounded-full bg-gray-200">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      job.status === "completed"
                        ? "bg-green-500"
                        : job.status === "processing"
                          ? "bg-blue-500"
                          : "bg-gray-400"
                    }`}
                    style={{
                      width: `${job.progress}%`
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IndexPopup
