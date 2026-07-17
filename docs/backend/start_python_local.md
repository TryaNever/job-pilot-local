Voici ta documentation avec une meilleure structure, des titres, et les commandes ajoutées sans trop modifier ton contenu.

# Setup Python Backend - Installation et lancement

## 1. Vérifier si Python est installé

Pour vérifier que Python est bien installé :

```powershell
python --version
```

ou :

```powershell
py --version
```

Résultat attendu :

```text
Python 3.x.x
```

---

## 2. Installer Python (si non installé)

Si Python n'est pas installé :

Télécharger Python depuis le site officiel :

[https://www.python.org/downloads/](https://www.python.org/downloads/)

Pendant l'installation, cocher :

```text
☑ Add Python to PATH
```

Puis vérifier :

```powershell
python --version
```

---

# 3. Vérifier l'installation de pip

`pip` est le gestionnaire de packages Python.

Il permet d'installer des bibliothèques comme :

* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

Pour vérifier que pip est installé :

```powershell
py -m pip --version
```

Résultat attendu :

```text
pip 26.x.x from ...
```

---

# 4. Installer pip (si non installé)

Si pip n'est pas présent :

Télécharger le script d'installation :

```powershell
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
```

Puis lancer :

```powershell
py get-pip.py
```

Vérifier ensuite :

```powershell
py -m pip --version
```

---

# 5. Installer un package Python

Pour installer un package :

```powershell
py -m pip install nom_du_package
```

Exemple :

```powershell
py -m pip install fastapi
```

---

## Installer FastAPI pour le backend

Installation recommandée :

```powershell
py -m pip install "fastapi[standard]"
```

Cela installe :

* FastAPI
* Uvicorn
* dépendances nécessaires au développement

---

# 6. Créer un environnement virtuel (VM / venv)

Un environnement virtuel permet d'isoler les dépendances d'un projet.

Créer une VM Python :

```powershell
py -m venv .venv
```

Cela crée :

```text
backend/
│
├── .venv/
│
└── autres fichiers du projet
```

Chaque projet possède ses propres packages.

---

# 7. Entrer dans l'environnement virtuel

Activer le venv :

```powershell
.\.venv\Scripts\Activate.ps1
```

Après activation, le terminal affiche :

```powershell
(.venv) PS C:\projet\backend>
```

Cela signifie que l'environnement virtuel est actif.

---

## Désactiver l'environnement virtuel

Pour sortir du venv :

```powershell
deactivate
```

---

# 8. Installer les packages dans le venv

Une fois le venv activé :

```powershell
python -m pip install package_name
```

Exemple :

```powershell
python -m pip install "fastapi[standard]"
```

---

# 9. Vérifier les packages installés

Voir les packages installés :

```powershell
python -m pip list
```

Voir les informations d'un package :

```powershell
python -m pip show fastapi
```

---


# 11. Lancer le serveur FastAPI

Commande :

```powershell
fastapi dev main.py
```

ou :

```powershell
uvicorn main:app --reload
```

Explication :

```text
main
│
└── fichier main.py


app
│
└── variable FastAPI()
```

---

# 12. Tester le serveur

Dans le navigateur :

API :

```
http://127.0.0.1:8000
```

Documentation Swagger :

```
http://127.0.0.1:8000/docs
```

Documentation ReDoc :

```
http://127.0.0.1:8000/redoc
```

---

# Résumé des commandes principales

| Action               | Commande                                |
| -------------------- | --------------------------------------- |
| Vérifier Python      | `python --version`                      |
| Vérifier pip         | `py -m pip --version`                   |
| Installer pip        | `py get-pip.py`                         |
| Installer un package | `py -m pip install package`             |
| Créer un venv        | `py -m venv .venv`                      |
| Activer le venv      | `.\.venv\Scripts\Activate.ps1`          |
| Désactiver le venv   | `deactivate`                            |
| Installer FastAPI    | `py -m pip install "fastapi[standard]"` |
| Voir les packages    | `python -m pip list`                    |
| Lancer FastAPI       | `fastapi dev main.py`                   |
| Lancer avec Uvicorn  | `uvicorn main:app --reload`             |

---

Cette base correspond à un setup propre pour démarrer ton backend **Job Pilot avec FastAPI**.
