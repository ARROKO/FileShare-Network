
````markdown
# 📂 FileShare Network

> Une application de partage de fichiers en réseau simple et élégante.  

FileShare Network permet de **partager facilement des fichiers** entre plusieurs machines connectées au même réseau local.  
Construit avec **React (Vite)**, **Express**, **TailwindCSS** et **Multer**, il offre une interface moderne et une API backend robuste.

---

## ✨ Fonctionnalités

- 📤 Upload de fichiers depuis l’interface web  
- 📂 Liste et gestion des fichiers disponibles sur le serveur  
- 📥 Téléchargement des fichiers partagés  
- 🗑️ Suppression des fichiers inutiles  
- 🌐 Accessible depuis n’importe quel appareil du même réseau  
- ⚡ UI réactive et rapide grâce à React + TailwindCSS  

---

## 🛠️ Stack technique

- **Frontend** : [React](https://react.dev/) + [Vite](https://vitejs.dev/) + [TailwindCSS](https://tailwindcss.com/)  
- **Backend** : [Express.js](https://expressjs.com/) + [Multer](https://github.com/expressjs/multer)  
- **Outils** : [Concurrently](https://www.npmjs.com/package/concurrently) pour lancer client + serveur  

---

## 🚀 Installation

Clone le projet :

```bash
git clone https://github.com/ARROKO/file-share-network.git
cd file-share-network
````

Installe les dépendances :

```bash
npm install
```

Lance l’application en mode développement (client + serveur) :

```bash
npm run dev
```

* Frontend : [http://localhost:5173](http://localhost:5173)
* Backend API : [http://localhost:4001](http://localhost:4001)

---

## 📦 Build

Pour builder la partie frontend :

```bash
npm run build
```

Puis prévisualiser :

```bash
npm run preview
```

---

## 📡 API Backend

L’API permet d’interagir directement avec le serveur de fichiers.
Toutes les routes commencent par :

```
http://<IP_MACHINE>:4001/api
```

### 🔹 Récupérer la liste des fichiers

```http
GET /api/files
```

**Réponse :**

```json
[
  {
    "id": "1735912400000-123456789-document.pdf",
    "name": "document.pdf",
    "originalName": "1735912400000-123456789-document.pdf",
    "size": 24821,
    "uploadDate": "2025-01-01T12:00:00.000Z",
    "type": "pdf"
  }
]
```

---

### 🔹 Upload d’un fichier

```http
POST /api/upload
```

**Body (form-data) :**

```
file=<votre fichier>
```

**Réponse :**

```json
{
  "message": "Fichier uploadé avec succès",
  "file": {
    "id": "1735912400000-987654321-photo.png",
    "name": "photo.png",
    "size": 58321,
    "type": "png"
  }
}
```

---

### 🔹 Télécharger un fichier

```http
GET /api/download/:filename
```

➡️ Exemple :

```
GET /api/download/1735912400000-987654321-photo.png
```

Le fichier sera téléchargé avec son **nom original**.

---

### 🔹 Supprimer un fichier

```http
DELETE /api/files/:filename
```

➡️ Exemple :

```
DELETE /api/files/1735912400000-987654321-photo.png
```

**Réponse :**

```json
{ "message": "Fichier supprimé avec succès" }
```

---

## 📸 Aperçu

*(Ajoute ici des captures d’écran de l’UI une fois prêtes)*

---

## 🤝 Contribution

Les contributions sont les bienvenues !
Forkez le repo, créez une branche, et proposez une Pull Request 🚀

---

## 📜 Licence

Ce projet est sous licence **MIT**.
Tu es libre de l’utiliser, le modifier et le distribuer.

---

💡 **FileShare Network** : le moyen le plus simple de partager des fichiers sur ton réseau local.

```

---

👉 Veux-tu que j’ajoute aussi une **section “Déploiement”** (par exemple sur un VPS ou Docker) pour ton README, ou pour l’instant tu veux rester sur une doc usage local/réseau ?
```
