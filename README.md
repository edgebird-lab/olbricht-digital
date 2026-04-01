# Olbricht Digital – Website

Statische Website für GitHub Pages. Kein Build-Prozess, kein Framework – reines HTML/CSS/JS.

## Dateistruktur

```
olbricht-digital/
├── _config.yml          # GitHub Pages Konfiguration
├── index.html           # Startseite
├── about.html           # Über mich
├── kontakt.html         # Kontaktseite
├── impressum.html       # Impressum (noindex)
├── datenschutz.html     # Datenschutzerklärung (noindex)
└── assets/
    └── css/
        └── style.css    # Gemeinsames Stylesheet (alle Pages)
```

## GitHub Pages einrichten

1. Repository auf GitHub erstellen (z. B. `olbricht-digital`)
2. Alle Dateien in das Repository pushen
3. Unter **Settings → Pages** den Branch `main` und den Root-Ordner (`/`) auswählen
4. Optional: Custom Domain eintragen (z. B. `olbricht-digital.de`)

### Mit Custom Domain

1. Bei deinem DNS-Anbieter (Inwx) folgende Records setzen:
   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  deinusername.github.io
   ```
2. In `_config.yml` die `url` auf deine Domain setzen
3. Datei `CNAME` im Root mit dem Inhalt `olbricht-digital.de` erstellen

## TODO-Liste (vor Launch)

- [ ] `impressum.html`: Straße/Hausnummer eintragen
- [ ] `impressum.html`: Telefonnummer ergänzen oder Zeile entfernen
- [ ] `datenschutz.html`: Adresse eintragen
- [ ] `kontakt.html`: E-Mail-Adresse prüfen (`kontakt@olbricht-digital.de`)
- [ ] `kontakt.html`: Formular-Backend einrichten (Formspree oder mailto-Fallback belassen)
- [ ] `_config.yml`: `url` auf finale Domain setzen
- [ ] `CNAME`-Datei erstellen (wenn Custom Domain)
- [ ] Hero-Badge „Im Aufbau" entfernen, wenn live

## Formular-Optionen

Das Kontaktformular in `kontakt.html` nutzt aktuell einen `mailto:`-Fallback.
Für echten E-Mail-Versand ohne Backend:

### Option A: Formspree (empfohlen, kostenlos bis 50 Mails/Monat)
```html
<form action="https://formspree.io/f/DEIN_KEY" method="POST">
```
Account unter [formspree.io](https://formspree.io) erstellen.

### Option B: Netlify Forms (falls zu Netlify gewechselt wird)
```html
<form data-netlify="true" name="kontakt">
```

## CSS anpassen

Alle Design-Variablen stehen oben in `assets/css/style.css` unter `:root {}`.
Zum Anpassen nur diese Werte ändern:

```css
:root {
  --bg:      #0b0c10;   /* Haupthintergrund */
  --accent:  #ff5e1a;   /* Akzentfarbe (Orange) */
  --accent2: #ffaa55;   /* Sekundärer Akzent */
  --text:    #e8eaf0;   /* Haupttextfarbe */
  --muted:   #7a7e8e;   /* Gedämpfter Text */
}
```
