# Robin Olbricht – Persönliche Webseite

Persönliche Website auf Basis von **Jekyll** mit Dark-Theme-Design.

## Voraussetzungen

- Ruby ≥ 3.0
- Bundler (`gem install bundler`)

## Lokale Entwicklung

```bash
# 1. Ins Projektverzeichnis wechseln
cd robin-olbricht

# 2. Abhängigkeiten installieren
bundle install

# 3. Entwicklungsserver starten
bundle exec jekyll serve --livereload

# Webseite läuft auf: http://localhost:4000
```

## Deployment

### Netlify (empfohlen)
1. Repository auf GitHub pushen
2. Netlify-Account → "New site from Git" → Repository auswählen
3. Build-Command: `bundle exec jekyll build`
4. Publish-Directory: `_site`
5. Deploy!

### GitHub Pages
```bash
# In _config.yml: baseurl auf "" setzen, url auf deine GitHub-Pages-URL
bundle exec jekyll build
# _site/ Inhalt auf gh-pages Branch pushen
```

## Netlify CMS einrichten (für Kundenprojekte)

1. `netlify.toml` und `admin/`-Ordner anlegen (Anleitung: https://decapcms.org/docs/netlify/)
2. Netlify Identity aktivieren
3. Kunde erhält Login-Link → kann Inhalte im Browser bearbeiten

## Personalisieren

| Was | Wo |
|---|---|
| Name, Social Links | `_config.yml` |
| Portrait | `assets/img/portrait.jpg` hinzufügen + CSS in `.portrait-placeholder` anpassen |
| E-Mail Formular | `index.html` → Formspree-ID ersetzen: `action="https://formspree.io/f/DEINE_ID"` |
| Farben / Fonts | `assets/css/main.css` → `:root` Block |
| Impressum-Adresse | `impressum.html` |

## Tech-Stack

- **Jekyll 4.x** – Static Site Generator
- **Liquid** – Template-Engine
- **Vanilla JS** – Keine Framework-Abhängigkeiten
- **Google Fonts** – Playfair Display, Syne, DM Mono
- **Formspree** – Kontaktformular (kein eigener Server nötig)
