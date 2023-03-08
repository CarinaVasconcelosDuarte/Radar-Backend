# Radar-Backend

Projekt für die Blockwoche WEBLAB indem eine Applikation mit modernen Webtechnologien umgesetzt wurde. Dies ist das Backend des Technologie Radars. Die Daten sind über MongoDB Atlas erreichbar.

## Installation

Klonen Sie das Repository zu sich lokal: 

```bash
git clone https://github.com/CarinaVasconcelosDuarte/Technologie-Radar.git
```

Nebst der Dokumentation wurde eine .env Datei abgegeben mit den nötigen Angaben für die Applikation. Bitte kopieren sie diese in das root Verzeichnis des Servers:

```bash
.
├── middleware
│   └── auth.js
├── models
│   ├── technology.js
│   └── user.js
├── routes
│   └── routes.js
├── src
│   └── index.js
├── .env
├── package.json
├── package-lock.json
└── README.md
```

## Usage

Um alle Module zu installieren folgenden Befehl zuvor ausführen:

```bash
npm install 
```

Um den Server zu starten:

```bash
npm start 
```
