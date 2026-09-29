# Sito personale — Pasquale Cerullo

Portfolio bilingue e spazio didattico realizzato con Astro. Il sito raccoglie progetti,
esperienza, articoli e materiali per gli studenti. La ricerca globale si apre con
`Cmd + K` su macOS e `Ctrl + K` su Windows/Linux.

## Comandi

```sh
npm install
npm run check
npm run build
```

Per lavorare in locale, il server va avviato in background:

```sh
npx astro dev --background
npx astro dev status
npx astro dev logs
npx astro dev stop
```

## Aggiungere un materiale didattico

I materiali sono gestiti dalla collection `materials`. Crea un file Markdown in
`src/content/materials/it/` e, quando disponibile, la sua versione inglese in
`src/content/materials/en/`.

```md
---
title: 'Titolo della risorsa'
description: 'Descrizione breve e utile per studenti e ricerca.'
lang: 'it'
translationKey: 'risorsa-esempio'
category: 'Programmazione web'
format: 'guide'
level: 'Secondaria di secondo grado'
topics: ['PHP', 'Web']
href: '/percorso-risorsa/'
downloadHref: '/percorso/file.pdf'
updatedDate: '2026-09-28'
featured: false
order: 2
---
```

I formati accettati sono `guide`, `notes`, `exercise`, `slides` e `video`. Le risorse
vengono inserite automaticamente nella pagina Didattica e nell'indice della ricerca.

Le traduzioni della stessa risorsa devono usare lo stesso `translationKey`, anche
se i nomi dei file sono diversi. Senza chiave si usa il percorso del file senza
il prefisso `it/` o `en/`. Ogni risorsa appare una sola volta: si preferisce la
lingua selezionata, altrimenti si mostra quella disponibile. La selezione avviene
prima del filtro dei materiali in evidenza.

`lang` indica la lingua della scheda. Se il documento collegato è in un’altra
lingua, specifica `resourceLang` (ad esempio `it` per la scheda inglese della
guida PHP). `downloadLang` permette di indicare una lingua diversa per il PDF.
Se manca il download nella scheda selezionata, viene usato quello dell’altra
versione, con la lingua segnalata sul pulsante.

## Aggiungere un articolo

Crea un file `.md` o `.mdx` in `src/content/blog/it/` oppure
`src/content/blog/en/`. Il frontmatter richiede titolo, descrizione, data e lingua.
Gli articoli vengono aggiunti automaticamente alla pagina Appunti e alla ricerca.
Anche articoli e feed RSS recuperano i contenuti dalla lingua alternativa. Usa lo
stesso nome del file per le traduzioni, oppure un `translationKey` comune (usato
anche come slug). Il cambio lingua mantiene l’articolo aperto e la navigazione
nella lingua scelta, anche se il testo non è ancora tradotto.

## Aggiornare la guida PHP

```sh
npm run update:guide
```

Il comando rigenera il progetto Quarto e copia il risultato in `public/guida-php`.
È possibile passare un percorso diverso al progetto sorgente:

```sh
npm run update:guide -- "/percorso/della/guida-quarto"
```

La versione HTML è disponibile in `/guida-php/`; il PDF in
`/guida-php/Guida-alla-programmazione-PHP.pdf`.

## Struttura principale

- `src/components/`: componenti riutilizzabili dell'interfaccia.
- `src/content/blog/`: articoli bilingui.
- `src/content/materials/`: catalogo dei materiali didattici.
- `src/data/portfolio.ts`: profilo, progetti, competenze ed esperienza.
- `src/i18n/`: testi dell'interfaccia e utilità per italiano e inglese.
- `src/pages/[locale]/`: pagine e route localizzate.
- `public/guida-php/`: output statico della guida Quarto.

## Pubblicazione

Il sito è statico. `npm run build` genera la cartella `dist`, pronta per un hosting
statico. Prima di ogni pubblicazione eseguire `npm run check` e `npm run build`.

## Lingua del 2048

L’inglese resta la lingua predefinita del sito. I link al gioco includono
`?lang=it` oppure `?lang=en`. Il gioco usa questa scelta per testi, accessibilità
e collegamenti di ritorno. Se il parametro manca, considera prima la pagina di
provenienza dello stesso sito, poi l’ultima lingua visitata, infine l’inglese.
La navigazione funziona anche quando il browser non consente il salvataggio locale.

Test delle traduzioni e dei collegamenti del gioco (Node 22.18+):

```sh
node --test tests/localization.test.mjs
```
