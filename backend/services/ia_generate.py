import requests

url = "http://ollama:11434/api/generate"

class Ia_generate():
    


    def fetch_ia(self,html_prompt):
        
        payload = {
        "model": "qwen2.5:7b",
        "prompt": str(html_prompt),
        "system": "Tu es resumeur de texte profetionnelle tu vas recevoir un text dans le désordre et tu dois mettre de l'ordre dans l'idée et ne pas oublié des détails n'oublie jamais que ce text viens de page web",
        "stream": False,
        "options": {
        "temperature": 0.2,
        "num_predict": 512
        }
    }
        response = requests.post(url, json=payload)
        response.raise_for_status()
        data = response.json()

        print(data["response"])
        return data["response"]