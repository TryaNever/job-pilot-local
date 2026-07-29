import requests
from pathlib import Path


class Ia_service():
    PROMPTS_DIR = Path(__file__).parent / "prompts"
    PROMPTS_NAME = "default"
    URL = "http://ollama:11434/api/generate"
    
    def __init__(self, prompts_name: str = "default.md"):
        self.PROMPTS_NAME = prompts_name

    def get_systeme_prompt(self) -> str:
        path = self.PROMPTS_DIR / f"{self.PROMPTS_NAME}.md"
        
        if not path.exists():
            path = self.PROMPTS_DIR / "default.md"
        return path.read_text(encoding="utf-8")

    def fetch_ia(self,html_prompt):
        systeme = self.get_systeme_prompt()
        payload = {
        "model": "qwen2.5:7b",
        "prompt": str(html_prompt),
        "system": systeme,
        "stream": False,
        "options": {
            "temperature": 0.1,
            "top_p": 0.9,
            "top_k": 40,
            "repeat_penalty": 1.1,
            "num_predict": 2048,
            "num_ctx": 8192
            }
        }
        response = requests.post(self.URL, json=payload)
        response.raise_for_status()
        data = response.json()

        return data["response"]