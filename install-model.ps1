# install-model.ps1

$ErrorActionPreference = "Stop"

Write-Host "Détection des performances machine..."

# RAM
$ram = [math]::Round(
    (Get-CimInstance Win32_ComputerSystem).TotalPhysicalMemory / 1GB
)

$model = ""


# Détection GPU NVIDIA
$nvidia = Get-Command nvidia-smi -ErrorAction SilentlyContinue


if ($nvidia) {

    $vram = nvidia-smi --query-gpu=memory.total --format=csv,noheader,nounits
    $vram = [int]$vram

    Write-Host "GPU NVIDIA détecté : $vram MB VRAM"

    if ($vram -ge 20000) {
        $model = "qwen2.5:32b"
    }
    elseif ($vram -ge 12000) {
        $model = "qwen2.5:14b"
    }
    elseif ($vram -ge 8000) {
        $model = "qwen2.5:7b"
    }
    else {
        $model = "llama3.2:3b"
    }

}
else {

    Write-Host "Pas de GPU NVIDIA"
    Write-Host "RAM détectée : $ram GB"

    if ($ram -ge 32) {
        $model = "qwen2.5:7b"
    }
    elseif ($ram -ge 16) {
        $model = "llama3.2:3b"
    }
    else {
        $model = "llama3.2:1b"
    }

}


Write-Host ""
Write-Host "Modèle sélectionné : $model"


# Téléchargement du modèle Ollama

docker exec ollama ollama pull $model


# Ecriture dans .env

$envFile = "./backend/.env"


if (Test-Path $envFile) {

    $content = Get-Content $envFile

    $updated = $false

    $newContent = $content | ForEach-Object {

        if ($_ -match "^MODEL_OLLAMA=") {

            $updated = $true
            "MODEL_OLLAMA=$model"
        }
        else {
            $_
        }

    }
    if (!$updated) {
        $newContent += "MODEL_OLLAMA=$model"
    }
    $newContent | Set-Content $envFile
}
else {
    @"
MODEL_OLLAMA=$model
"@ | Set-Content $envFile
}


Write-Host ""
Write-Host ".env mis à jour :"
Write-Host "MODEL_OLLAMA=$model"