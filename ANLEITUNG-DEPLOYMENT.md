# Schritt-für-Schritt-Anleitung
## Jekyll → GitHub → Netlify → CMS im Browser
### Für: Robin Olbricht | System: Linux

---

## Was wir in dieser Anleitung machen

```
Dein Rechner          GitHub              Netlify
──────────────        ──────────          ───────────────────────
Projektordner   →→→   Repository   →→→   Webseite live
(Jekyll)              (Speicher           (baut automatisch,
                      in der Cloud)        hostet, gibt dir CMS)
```

Kurz erklärt: GitHub ist wie ein USB-Stick in der Cloud wo dein Code liegt.
Netlify holt sich den Code von GitHub, baut daraus die fertige Webseite
und macht sie unter deiner Domain erreichbar. Das CMS ist ein Webinterface
womit du Inhalte im Browser ändern kannst ohne Code anzufassen.

---

## PHASE 1 – Vorbereitung auf deinem Linux-Rechner

### Schritt 1: Git installieren (falls noch nicht vorhanden)

Öffne ein Terminal (Strg+Alt+T) und tippe:

```bash
git --version
```

Wenn eine Versionsnummer erscheint (z.B. `git version 2.43.0`) → Git ist
schon installiert, weiter zu Schritt 2.

Wenn "command not found" erscheint → installieren:

```bash
sudo apt update && sudo apt install git -y
```

### Schritt 2: Git einmalig konfigurieren

Das machst du nur einmal auf deinem Rechner. Git braucht deinen Namen und
deine E-Mail um zu wissen wer die Änderungen gemacht hat.

```bash
git config --global user.name "Robin Olbricht"
git config --global user.email "kontakt@olbricht-digital.de"
```

Kontrolle ob es gespeichert wurde:

```bash
git config --global --list
# Ausgabe: user.name=Robin Olbricht
#          user.email=kontakt@olbricht-digital.de
```

### Schritt 3: Ruby und Jekyll installieren (falls noch nicht vorhanden)

Prüfen ob Ruby installiert ist:

```bash
ruby --version
```

Falls nicht installiert:

```bash
sudo apt install ruby-full build-essential zlib1g-dev -y
```

Dann Bundler installieren (verwaltet die Jekyll-Abhängigkeiten):

```bash
gem install bundler
```

---

## PHASE 2 – GitHub Repository anlegen und Code hochladen

### Schritt 4: GitHub Account erstellen

1. Gehe zu https://github.com im Browser
2. Klicke auf "Sign up"
3. Du hast bereits den Account **edgebird-lab** → direkt einloggen unter
   https://github.com/login

### Schritt 5: Neues Repository auf GitHub anlegen

1. Eingeloggt auf GitHub, klicke oben rechts auf das **+** Symbol
2. Wähle **"New repository"**
3. Fülle aus:
   - **Repository name:** `robin-olbricht-website`
     (oder einfach `website` – du entscheidest den Namen)
   - **Description:** `Persönliche Website – olbricht-digital.de`
   - **Public** oder **Private** – wähle **Public** (Netlify Free-Tier
     funktioniert problemlos mit Public Repos; bei Private brauchst du
     Netlify Pro für Git Gateway)
   - **WICHTIG:** Hake NICHTS an bei "Initialize this repository" –
     wir bringen unseren eigenen Code mit
4. Klicke **"Create repository"**

Du siehst jetzt eine leere Seite mit einer URL die so aussieht:
`https://github.com/edgebird-lab/robin-olbricht-website`
Diese URL brauchst du gleich.

### Schritt 6: SSH-Key für GitHub einrichten (einmalig)

SSH ist ein sicheres Protokoll damit GitHub weiß dass du es bist wenn
du Code hochlädst – ohne jedes Mal dein Passwort eingeben zu müssen.

```bash
# SSH-Key erstellen (Enter drücken bei allen Fragen = Standardwerte nehmen)
ssh-keygen -t ed25519 -C "kontakt@olbricht-digital.de"
```

Den öffentlichen Key anzeigen und kopieren:

```bash
cat ~/.ssh/id_ed25519.pub
```

Die Ausgabe sieht ungefähr so aus:
`ssh-ed25519 AAAAC3Nza... kontakt@olbricht-digital.de`
→ Diese ganze Zeile komplett kopieren (Strg+Shift+C im Terminal)

Jetzt auf GitHub:
1. Klicke oben rechts auf dein Profilbild → **Settings**
2. Links in der Seitenleiste: **SSH and GPG keys**
3. Klicke **"New SSH key"**
4. **Title:** `Linux Laptop` (oder ein Name den du erkennst)
5. **Key:** Den kopierten Text einfügen
6. **"Add SSH key"** klicken

Verbindung testen:

```bash
ssh -T git@github.com
# Erwartete Ausgabe: Hi edgebird-lab! You've successfully authenticated...
```

### Schritt 7: Projektordner in Git-Repository umwandeln

Navigiere im Terminal in deinen Projektordner:

```bash
cd ~/Downloads/robin-olbricht
# (oder wo auch immer der Ordner liegt)
```

Git initialisieren und Code hochladen:

```bash
# Git-Repository im Ordner initialisieren
git init

# Alle Dateien zum "Staging" hinzufügen (vorbereiten zum Hochladen)
git add .

# Ersten Commit erstellen (wie ein Speicherpunkt mit Beschreibung)
git commit -m "Erste Version der Website"

# Den Haupt-Branch 'main' nennen (GitHub-Standard)
git branch -M main

# Dein GitHub-Repository als Ziel setzen
# (URL anpassen falls du einen anderen Repository-Namen gewählt hast)
git remote add origin git@github.com:edgebird-lab/robin-olbricht-website.git

# Code zu GitHub hochladen
git push -u origin main
```

Wenn alles geklappt hat siehst du im Terminal sowas wie:
`Branch 'main' set up to track remote branch 'main' from 'origin'.`

Gehe jetzt auf https://github.com/edgebird-lab/robin-olbricht-website
→ Alle deine Dateien sind jetzt online sichtbar.

---

## PHASE 3 – Netlify einrichten und Webseite live schalten

### Schritt 8: Netlify Account erstellen

1. Gehe zu https://netlify.com
2. Klicke **"Sign up"**
3. Wähle **"Sign up with GitHub"** – damit verbindest du beide Konten
   direkt und Netlify kann auf deine Repositories zugreifen
4. GitHub fragt dich ob du Netlify Zugriff erlaubst → **"Authorize Netlify"**

### Schritt 9: Neue Webseite aus GitHub-Repository erstellen

Du bist jetzt im Netlify Dashboard (sieht aus wie eine leere Übersicht).

1. Klicke auf den großen Button **"Add new site"**
2. Wähle **"Import an existing project"**
3. Wähle **"Deploy with GitHub"**
4. Netlify zeigt dir eine Liste deiner GitHub-Repositories
   → Wähle **`robin-olbricht-website`** (oder wie du es genannt hast)
5. Du siehst jetzt die Build-Einstellungen:

```
Branch to deploy:   main              ← so lassen
Build command:      bundle exec jekyll build   ← genau so eingeben
Publish directory:  _site             ← genau so eingeben
```

6. Klicke **"Deploy robin-olbricht-website"**

Netlify fängt jetzt an zu bauen. Das dauert beim ersten Mal 1–3 Minuten.
Du siehst im Dashboard einen orangefarbenen Punkt der sich dreht.
Wenn er grün wird und "Published" steht → Webseite ist live!

Netlify gibt dir erstmal eine automatische URL wie:
`https://amazing-franklin-abc123.netlify.app`
Über diese URL kannst du deine Seite schon aufrufen.

### Schritt 10: Eigene Domain einrichten (olbricht-digital.de)

**Im Netlify Dashboard:**

1. Klicke auf deinen Site-Namen
2. Gehe zu **"Domain management"** (oder "Site settings" → "Domain management")
3. Klicke **"Add a domain"**
4. Gib ein: `olbricht-digital.de` → **"Verify"** → **"Add domain"**
5. Wiederhole für: `www.olbricht-digital.de`

Netlify zeigt dir jetzt Netlify-Nameserver, die ungefähr so aussehen:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

**Bei deinem Domain-Anbieter** (wo du olbricht-digital.de registriert hast,
z.B. IONOS, Strato, All-Inkl, etc.):

1. Einloggen → Domain-Verwaltung → `olbricht-digital.de`
2. **Nameserver** oder **DNS** Einstellungen öffnen
3. Die alten Nameserver durch die vier Netlify-Nameserver ersetzen
4. Speichern

Das Umstellen der Nameserver kann bis zu 24 Stunden dauern (meistens
aber nur 1–2 Stunden). Sobald es umgestellt ist aktiviert Netlify
automatisch ein kostenloses HTTPS/SSL-Zertifikat.

---

## PHASE 4 – Netlify CMS einrichten (Browser-Editor)

### Schritt 11: Netlify Identity aktivieren

Damit du und später Kunden sich ins CMS einloggen können braucht
Netlify Identity.

1. Im Netlify Dashboard → deine Website anklicken
2. Gehe zu **"Integrations"** (oder "Site configuration")
3. Suche nach **"Identity"** → Klicke **"Enable Identity"**

Jetzt in den Identity-Einstellungen:

4. Scrolle zu **"Registration preferences"**
5. Ändere von "Open" auf **"Invite only"**
   → Nur wer von dir eingeladen wird kann sich registrieren

6. Scrolle zu **"Git Gateway"** → Klicke **"Enable Git Gateway"**
   → Das verbindet das CMS mit GitHub damit Änderungen gespeichert werden

### Schritt 12: Deinen eigenen CMS-Zugang anlegen

1. Gehe zu **"Identity"** im Netlify Dashboard
2. Klicke **"Invite users"**
3. Gib deine E-Mail ein: `kontakt@olbricht-digital.de`
4. Du bekommst eine E-Mail von Netlify
5. In der E-Mail auf den Link klicken → Passwort festlegen → fertig

### Schritt 13: CMS aufrufen und testen

Rufe im Browser auf:
`https://olbricht-digital.de/admin`

(Während die Domain noch nicht umgestellt ist kannst du die Netlify-URL
nutzen: `https://amazing-franklin-abc123.netlify.app/admin`)

1. Klicke **"Login with Netlify Identity"**
2. E-Mail und Passwort eingeben
3. Du siehst das CMS-Dashboard mit allen Bereichen:
   - Persönliche Infos (Hero, Profil)
   - Lebenslauf (Timeline-Stationen)
   - Leistungen
   - Aktuelles
   - Rechtliches (Impressum)

**Wenn du etwas änderst und auf "Publish" klickst** passiert folgendes
automatisch im Hintergrund:
```
CMS speichert → GitHub-Commit → Netlify baut neu → Live in ~60 Sekunden
```

---

## PHASE 5 – Laufender Betrieb: So aktualisierst du die Seite

### Option A: Über das CMS im Browser (für Inhalte)

`https://olbricht-digital.de/admin` → Login → Bereich auswählen →
Ändern → Publish → fertig. Kein Terminal nötig.

### Option B: Direkt im Code (für Design/Layout-Änderungen)

```bash
# Ins Projektverzeichnis wechseln
cd ~/Downloads/robin-olbricht

# Änderungen machen (CSS, HTML, etc.)
# ...

# Lokale Vorschau starten
bundle exec jekyll serve --livereload
# → Webseite live ansehen auf http://localhost:4000

# Wenn du zufrieden bist: hochladen
git add .
git commit -m "Beschreibung was du geändert hast"
git push

# Netlify erkennt den Push und baut automatisch neu → live in ~60 Sek.
```

---

## Häufige Fehler und Lösungen

**Problem:** `bundle install` schlägt fehl mit "permission denied"
```bash
# Lösung: gems ins Home-Verzeichnis installieren
echo '# Install Ruby Gems to ~/gems' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/gems"' >> ~/.bashrc
echo 'export PATH="$HOME/gems/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install bundler
```

**Problem:** `git push` sagt "Permission denied (publickey)"
```bash
# SSH-Key prüfen
ssh -T git@github.com
# Falls Fehler: SSH-Key neu generieren und wieder bei GitHub eintragen
# (Schritt 6 wiederholen)
```

**Problem:** Netlify baut nicht (Build failed)
→ Im Netlify Dashboard auf "Deploys" klicken → fehlgeschlagenes Deploy
  anklicken → "Deploy log" lesen → meistens steht dort genau was fehlt

**Problem:** CMS zeigt "Git Gateway error"
→ Netlify Dashboard → Identity → Git Gateway → prüfen ob aktiviert
→ Falls nein: erneut "Enable" klicken

**Problem:** Änderungen im CMS erscheinen nicht auf der Webseite
→ Warten (Netlify braucht ~60 Sekunden zum Neubauen)
→ Im Dashboard unter "Deploys" den Status prüfen

---

## Zusammenfassung der wichtigsten URLs

| Was                    | URL                                          |
|------------------------|----------------------------------------------|
| Deine Webseite         | https://olbricht-digital.de                  |
| CMS-Adminbereich       | https://olbricht-digital.de/admin            |
| GitHub Repository      | https://github.com/edgebird-lab/robin-olbricht-website |
| Netlify Dashboard      | https://app.netlify.com                      |

---

*Erstellt für Robin Olbricht · Einzelunternehmen · olbricht-digital.de*
