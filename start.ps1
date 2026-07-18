# start.ps1

Write-Host "Starting JobPilot..."

# Start containers
docker compose up -d

# Wait for Ollama
Start-Sleep -Seconds 10

# Detect and install model
.\install-model.ps1

# Start browser
Start-Process "http://localhost:3000"