# Consultant Web (sito statico)

Sito in HTML, CSS e JavaScript. In locale puoi provarlo con:

```bash
python3 -m http.server 8000
```

Poi apri `http://localhost:8000` (home: `index.html`).

---

## Deploy sul dominio (cPanel)

Questi sono i passaggi effettivi usati per pubblicare il progetto sull’hosting.

### 1. Accedi al cPanel

Apri il pannello di controllo dell’hosting (es. indirizzo tipo **cpanel16** fornito dal provider) e accedi con le tue credenziali.

### 2. Aggiorna il codice da GitHub — *Git Version Control*

1. Nel cPanel apri la sezione **Git Version Control** (Controllo versione Git).
2. Apri il repository già collegato al progetto (o la voce **Pull or Deploy** / gestione del clone, a seconda dell’interfaccia).
3. Clicca su **Update from remote** (Aggiorna dal remoto) per scaricare l’ultima versione da GitHub.

In questo modo sulla macchina dell’hosting viene aggiornata la cartella che contiene il clone del repository (di solito con nome tipo **`consultant-web`**).

### 3. Copia i file nella root del sito — *Gestione file*

1. Nel cPanel apri **Strumenti → Gestione file** (File Manager).
2. Individua la cartella del clone aggiornato al passo precedente (es. **`consultant-web`**), con dentro `index.html`, `styles.css`, `images/`, ecc.
3. **Copia tutti i file e le cartelle** di quella directory (il contenuto del progetto) nella cartella **`public_html`** del dominio che deve mostrare il sito.

   - Obiettivo: che **`index.html`** si trovi **direttamente** in `public_html` (non in `public_html/consultant-web/`), così la home è raggiungibile all’URL principale del dominio.
   - Se in `public_html` ci sono file vecchi del sito, sostituiscili o elimina prima ciò che non serve, poi incolla la versione aggiornata.

### 4. Verifica

Apri il dominio nel browser: la home deve caricarsi e le pagine interne devono funzionare come in locale.

---

## Aggiornare il sito dopo una modifica

1. Sul tuo computer: `git push` verso GitHub (branch usato dal clone sul server, di solito `main`).
2. Sul cPanel: ripeti **Git Version Control → Update from remote**.
3. Ripeti la copia da **`consultant-web`** a **`public_html`** come sopra (o solo i file cambiati, se preferisci un aggiornamento mirato).

---

## Repository

`https://github.com/gfilomena/consultant-web.git`
